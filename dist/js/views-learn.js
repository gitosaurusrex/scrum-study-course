/* Learning views: home, study plan, course, module lessons, scenarios, notes. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var ui = SSS.ui, core = SSS.core, store = SSS.store, esc = ui.esc;
  var V = SSS.views = SSS.views || {};

  function debounce(fn, ms) {
    var t;
    return function () { var a = arguments, self = this; clearTimeout(t); t = setTimeout(function () { fn.apply(self, a); }, ms); };
  }

  function saveIndicator(el, ok) {
    if (!el) return;
    el.textContent = ok ? 'Saved in this browser' : 'Not saved — see the storage notice';
    el.className = 'save-state ' + (ok ? 'ok' : 'warn');
  }

  function statusChip(done, started) {
    if (done) return '<span class="chip chip-done">Complete</span>';
    if (started) return '<span class="chip chip-progress">In progress</span>';
    return '<span class="chip">Not started</span>';
  }

  /* ================= HOME ================= */

  V.home = function () {
    var st = store.state, now = Date.now();
    var pp = ui.planProgress();
    var lessons = SSS.MODULES.filter(function (m) { return store.isModuleComplete(m.id); }).length;
    var scen = SSS.SCENARIOS.filter(function (s) { return st.scenarios[s.id] && st.scenarios[s.id].done; }).length;
    var due = ui.dueCards(now).length;
    var mistakes = ui.unresolvedMistakes().length;
    var seen = Object.keys(store.seenMap()).length;

    var html = '<h1 tabindex="-1">Scrum Study Studio</h1>';
    html += '<p class="lede">A self-paced course for PSM I first, then PSPO I. It teaches the reasoning behind Scrum decisions and makes weak areas visible before you spend money on an exam attempt.</p>';

    if (st.activeRehearsal) {
      var left = core.remainingMs(st.activeRehearsal.deadline, now);
      html += '<div class="callout callout-warn"><p><strong>A timed rehearsal is in progress.</strong> ' + (left > 0 ? core.formatClock(left) + ' remaining. The clock keeps running while you are away.' : 'Its time has expired; open it to see your results.') + '</p><p><a class="btn btn-primary" href="#/rehearsal">Return to the rehearsal</a></p></div>';
    }

    html += '<section class="card next-card" aria-labelledby="next-h"><h2 id="next-h">Next useful step</h2>';
    if (pp.next) {
      var t = pp.next;
      html += '<p class="muted">' + esc(pp.plan.label) + ' · Day ' + pp.current.num + ': ' + esc(pp.current.title) + '</p>';
      html += '<p class="next-task"><span class="kind">' + esc(t.kind) + '</span> ' + esc(t.label) + ' <span class="muted">(' + ui.fmtMinutes(t.minutes) + ')</span></p>';
      var href = t.href || (t.link && t.link.href) || '#/plan';
      var ext = t.link && t.link.external && !t.href;
      html += '<p><a class="btn btn-primary" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + (t.auto ? 'Start' : 'Open') + (ext ? '<span class="sr-only"> (opens in a new tab)</span>' : '') + '</a> <a class="btn" href="#/plan">See the full plan</a></p>';
    } else {
      html += '<p>Every task in your study plan is complete. Keep reviewing due cards and your mistake notebook, and check your readiness evidence before sitting an exam.</p><p><a class="btn btn-primary" href="#/readiness">Review readiness</a></p>';
    }
    html += '</section>';

    html += '<section aria-labelledby="glance-h"><h2 id="glance-h" class="sr-only">Progress at a glance</h2><ul class="stats">' +
      '<li><span class="stat-num">' + lessons + '<span class="of">/16</span></span><span class="stat-label">lessons complete</span></li>' +
      '<li><span class="stat-num">' + scen + '<span class="of">/8</span></span><span class="stat-label">scenarios worked</span></li>' +
      '<li><a href="#/review"><span class="stat-num">' + due + '</span><span class="stat-label">flashcards due</span></a></li>' +
      '<li><a href="#/review/mistakes"><span class="stat-num">' + mistakes + '</span><span class="stat-label">items in mistake notebook</span></a></li>' +
      '<li><span class="stat-num">' + seen + '<span class="of">/160</span></span><span class="stat-label">questions seen</span></li>' +
      '</ul></section>';

    html += '<section aria-labelledby="tracks-h"><h2 id="tracks-h">Exam preparation</h2><div class="grid-2">';
    ['psm', 'pspo'].forEach(function (track) {
      var r = ui.readiness(track);
      html += '<div class="card track-card track-' + track + '"><h3>' + (track === 'psm' ? 'PSM I — Professional Scrum Master' : 'PSPO I — Professional Scrum Product Owner') + '</h3>' +
        '<p class="status status-' + r.tone + '">' + esc(r.status) + '</p>' +
        '<p class="muted">' + r.lessonsDone + ' of ' + r.lessonsTotal + ' relevant lessons complete · ' + r.met + ' of ' + r.checks.length + ' suggested checks met</p>' +
        '<p><a href="#/readiness">See the evidence</a></p></div>';
    });
    html += '</div></section>';

    html += '<section aria-labelledby="mods-h"><h2 id="mods-h">Lessons</h2><ol class="mod-strip">';
    SSS.MODULES.forEach(function (m) {
      var done = store.isModuleComplete(m.id);
      html += '<li><a class="mod-cell' + (done ? ' is-done' : '') + ' track-' + m.track + '" href="#/module/' + m.id + '"><span class="n">' + m.num + '</span><span class="sr-only">' + esc(m.title) + (done ? ' — complete' : ' — not complete') + '</span></a></li>';
    });
    html += '</ol></section>';

    html += '<p class="fine">Independent study course. Not affiliated with or endorsed by Scrum.org. Course completion and practice scores are not a prediction or promise of passing.</p>';
    return { title: 'Home', html: html };
  };

  /* ================= PLAN ================= */

  V.plan = function () {
    var st = store.state;
    var pp = ui.planProgress();
    var html = '<h1 tabindex="-1">Study plan</h1>';
    html += '<p class="lede">Use the 12-day plan as your default. If you have more study time, you can regroup the same activities across approximately a week; preserve delayed recall and the separate-day rehearsals. Unfinished work carries forward — the plan always shows the next useful task, not a missed deadline.</p>';

    var study = pp.days.map(function(d) { return d.studyMinutes; });
    html += '<form class="card plan-settings" id="plan-form"><h2>Recommended: 12 study days</h2><p>About ' + Math.min.apply(null, study) + '–' + Math.max.apply(null, study) + ' minutes of study per day, based on the activities listed; breaks and optional exam blocks are additional.</p><div class="field"><label for="start-date">Start date</label><input type="date" id="start-date" value="' + esc(st.settings.startDate) + '"><p class="hint">Dates are a guide. Readiness is never unlocked by the calendar, and no exam is booked for you.</p></div><p class="save-state" id="plan-save" role="status"></p></form>';

    pp.days.forEach(function (d) {
      var isCurrent = pp.current && pp.current.index === d.index;
      html += '<section class="card day' + (isCurrent ? ' is-current' : '') + (d.done === d.total ? ' is-done' : '') + '" aria-labelledby="day-' + d.num + '">';
      html += '<div class="day-head"><h2 id="day-' + d.num + '">Day ' + d.num + ': ' + esc(d.title) + '</h2><p class="muted">' + ui.fmtISO(d.date) + ' · about ' + ui.fmtMinutes(d.studyMinutes) + ' of study' + (d.examMinutes ? ' + a separate ' + ui.fmtMinutes(d.examMinutes) + ' exam block (optional)' : '') + ' · ' + d.done + ' of ' + d.total + ' done' + (isCurrent ? ' · <strong>Current focus</strong>' : '') + '</p></div><ul class="tasks">';
      d.tasks.forEach(function (t) {
        html += '<li class="task' + (t.done ? ' is-done' : '') + (t.exam ? ' is-exam' : '') + '">';
        if (t.auto) {
          html += '<span class="tick" aria-hidden="true">' + (t.done ? '✓' : '○') + '</span><span class="task-body"><span class="kind">' + esc(t.kind) + '</span> <a href="' + esc(t.href) + '">' + esc(t.label) + '</a> <span class="muted">· ' + ui.fmtMinutes(t.minutes) + ' · ' + (t.done ? 'done' : 'completes automatically') + '</span></span>';
        } else {
          var cid = 'task-' + d.num + '-' + t.id;
          html += '<input type="checkbox" id="' + cid + '" data-task="' + esc(t.id) + '"' + (t.done ? ' checked' : '') + '><span class="task-body"><span class="kind">' + esc(t.kind) + '</span> <label for="' + cid + '">' + esc(t.label) + '</label> <span class="muted">· ' + ui.fmtMinutes(t.minutes) + '</span>' +
            (t.link ? ' · <a href="' + esc(t.link.href) + '"' + (t.link.external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(t.link.label) + (t.link.external ? '<span class="sr-only"> (opens in a new tab)</span>' : '') + '</a>' : '') + '</span>';
        }
        html += '</li>';
      });
      html += '</ul></section>';
    });

    return {
      title: 'Study plan', html: html,
      mount: function (main) {
        var saveEl = ui.$('#plan-save', main);
        ui.$('#start-date', main).addEventListener('change', function (e) {
          var v = e.target.value;
          if (!core.isValidISODate(v)) { saveEl.textContent = 'Enter a valid date.'; return; }
          store.update(function (s) { s.settings.startDate = v; });
          SSS.app.rerender();
          ui.announce('Start date updated.');
        });
        ui.$$('input[data-task]', main).forEach(function (cb) {
          cb.addEventListener('change', function () {
            var id = cb.getAttribute('data-task');
            var ok = store.update(function (s) { if (cb.checked) s.planTasks[id] = Date.now(); else delete s.planTasks[id]; });
            saveIndicator(saveEl, ok);
            // Keep other copies of the same task (in the other schedule) consistent on next render.
            ui.$$('input[data-task="' + id + '"]', main).forEach(function (o) { o.checked = cb.checked; });
            cb.closest('li').classList.toggle('is-done', cb.checked);
          });
        });
      }
    };
  };

  /* ================= COURSE ================= */

  V.course = function () {
    var st = store.state;
    var html = '<h1 tabindex="-1">Course</h1><p class="lede">Sixteen modules. Each has one learning objective, an explanation, a worked example, a common misconception, a decision activity, a teach-back and a five-question check. Plan on 25–35 minutes each.</p>';
    html += '<details class="card example-intro"><summary>About the recurring example: Launchpad</summary>' + SSS.EXAMPLE_INTRO + '</details>';
    var groups = [
      { track: 'shared', title: 'Shared foundation (modules 1–8)', note: 'Required for both exams.' },
      { track: 'psm', title: 'PSM I track (modules 9–12)', note: 'Scrum Master reasoning. PSM I also covers product value, so the shared foundation and some Product Owner ideas matter here too.' },
      { track: 'pspo', title: 'PSPO I track (modules 13–16)', note: 'Product Owner reasoning. PSPO I relies on the whole framework as well.' }
    ];
    groups.forEach(function (g) {
      html += '<section aria-labelledby="g-' + g.track + '"><h2 id="g-' + g.track + '">' + ui.trackTag(g.track) + ' ' + esc(g.title) + '</h2><p class="muted">' + esc(g.note) + '</p><ol class="module-list">';
      SSS.MODULES.filter(function (m) { return m.track === g.track; }).forEach(function (m) {
        var ms = st.modules[m.id] || {};
        var started = ms.activityDone || ms.checkDone || ms.teachRating;
        html += '<li class="card module-row"><div><h3><a href="#/module/' + m.id + '">Module ' + m.num + ': ' + esc(m.title) + '</a></h3><p>' + esc(m.objective) + '</p></div>' +
          '<div class="module-meta">' + statusChip(ms.complete, started) + '<span class="muted">' + m.minutes + ' min</span>' + (ms.checkDone ? '<span class="muted">Last check: ' + ms.checkScore + '/5</span>' : '') + '</div></li>';
      });
      html += '</ol></section>';
    });
    return { title: 'Course', html: html };
  };

  /* ================= MODULE ================= */

  V.module = function (params) {
    var m = ui.moduleById(params[0]);
    if (!m) return V.notFound();
    var st = store.state;
    var ms = st.modules[m.id] || {};
    var idx = SSS.MODULES.indexOf(m);
    var prev = SSS.MODULES[idx - 1], next = SSS.MODULES[idx + 1];
    var checkQs = ui.checkQuestions(m.num);

    var html = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/course">Course</a> <span aria-hidden="true">›</span> Module ' + m.num + '</nav>';
    html += '<header class="lesson-head"><p class="eyebrow">' + ui.trackTag(m.track) + ' Module ' + m.num + ' · about ' + m.minutes + ' minutes</p><h1 tabindex="-1">' + esc(m.title) + '</h1>' +
      '<div class="objective"><h2 class="h-small">Learning objective</h2><p>' + esc(m.objective) + '</p></div></header>';

    html += '<section class="card progress-box" aria-labelledby="mp-h"><h2 id="mp-h" class="h-small">Your progress in this module</h2><ul class="checklist" id="module-checklist">' + moduleChecklist(ms) + '</ul></section>';

    html += '<section class="lesson-section prose" aria-labelledby="ex-h"><h2 id="ex-h">Explanation</h2>' + m.explanation + '</section>';

    html += '<section class="lesson-section" aria-labelledby="we-h"><h2 id="we-h">Worked example</h2><details class="example-intro"><summary>Who\'s who in Launchpad</summary>' + SSS.EXAMPLE_INTRO + '</details><div class="prose">' + m.example + '</div></section>';

    html += '<section class="lesson-section" aria-labelledby="mc-h"><h2 id="mc-h">Common misconception</h2><div class="misconception"><p><span class="label">Myth</span> ' + esc(m.misconception.myth) + '</p><p><span class="label label-ok">Reality</span> ' + esc(m.misconception.reality) + '</p></div></section>';

    html += '<section class="lesson-section" aria-labelledby="act-h"><h2 id="act-h">Try it: ' + (m.activity.type === 'sort' ? 'sort the decisions' : 'make the call') + '</h2>' + renderActivity(m) + '</section>';

    html += '<section class="lesson-section" aria-labelledby="tb-h"><h2 id="tb-h">Teach it back</h2>' + renderTeachBack(m, ms) + '</section>';

    html += '<section class="lesson-section" aria-labelledby="ck-h"><h2 id="ck-h">Lesson check</h2><p>Five questions with explanations. ' + (ms.checkDone ? 'Your last score was <strong>' + ms.checkScore + ' of 5</strong>. You can retake it any time.' : 'Feedback appears after you submit.') + '</p>' +
      '<form id="check-form" class="quiz" novalidate>' + checkQs.map(function (q, i) {
        return ui.renderQuestion(q, { order: core.optionOrder(q), number: i + 1, total: checkQs.length, idPrefix: 'chk', showConfidence: true });
      }).join('') + '<div class="form-actions"><button type="submit" class="btn btn-primary">Submit check</button></div></form><div id="check-result" tabindex="-1"></div></section>';

    html += '<section class="lesson-section" aria-labelledby="src-h"><h2 id="src-h">Read the source</h2><p>Verify this lesson against the official text. The course paraphrases; the sources are the authority.</p><ul class="sources">' +
      m.sources.map(function (s) { return '<li>' + ui.sourceLink(s) + '</li>'; }).join('') + '</ul></section>';

    html += '<section class="lesson-section" aria-labelledby="nt-h"><h2 id="nt-h">Your notes</h2><label for="module-notes" class="sr-only">Notes for module ' + m.num + '</label><textarea id="module-notes" rows="4" placeholder="Anything worth remembering — differences from your past experience, questions to check later…">' + esc(st.notes[m.id] || '') + '</textarea><p class="save-state" id="notes-save" role="status"></p><p class="hint">Notes appear on the printable <a href="#/notes">Notes &amp; reference</a> page.</p></section>';

    html += '<nav class="pager" aria-label="Module navigation">' + (prev ? '<a class="btn" href="#/module/' + prev.id + '">← Module ' + prev.num + '</a>' : '<span></span>') + (next ? '<a class="btn" href="#/module/' + next.id + '">Module ' + next.num + ' →</a>' : '<a class="btn" href="#/practice">Go to practice →</a>') + '</nav>';

    return {
      title: 'Module ' + m.num + ': ' + m.title, html: html,
      mount: function (main) { mountModule(main, m, checkQs); }
    };
  };

  function moduleChecklist(ms) {
    function item(ok, label) { return '<li class="' + (ok ? 'is-done' : '') + '"><span aria-hidden="true">' + (ok ? '✓' : '○') + '</span> ' + label + '<span class="sr-only">' + (ok ? ' — done' : ' — not done') + '</span></li>'; }
    var html = item(ms.activityDone, 'Decision activity attempted') + item(!!ms.teachRating, 'Teach-back self-rated') + item(ms.checkDone, 'Lesson check submitted');
    html += ms.complete ? '<li class="is-done complete-line"><strong>Module complete.</strong> Its flashcards are now in your review rotation.</li>' : '<li class="muted">The module completes when all three are done.</li>';
    return html;
  }

  function renderActivity(m) {
    var a = m.activity;
    var html = '<form id="activity-form" class="activity card" novalidate><p class="prompt">' + esc(a.prompt) + '</p>';
    if (a.type === 'decision') {
      html += '<fieldset><legend class="sr-only">Choose one response</legend>';
      a.options.forEach(function (o, i) {
        html += '<div class="option"><input type="radio" name="act" id="act-' + i + '" value="' + i + '"><label for="act-' + i + '"><span class="letter" aria-hidden="true">' + ui.LETTERS[i] + '</span><span>' + esc(o.text) + '</span></label></div>';
      });
      html += '</fieldset>';
    } else {
      html += '<table class="sort-table"><thead><tr><th scope="col">Item</th><th scope="col">Belongs to</th></tr></thead><tbody>';
      a.items.forEach(function (it, i) {
        html += '<tr><th scope="row"><label for="sort-' + i + '">' + esc(it.text) + '</label></th><td><select id="sort-' + i + '"><option value="">Choose…</option>' +
          a.categories.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('') + '</select><div class="sort-fb" id="sort-fb-' + i + '"></div></td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '<div class="form-actions"><button type="submit" class="btn btn-primary">Check my answer' + (a.type === 'sort' ? 's' : '') + '</button></div><div id="activity-fb" tabindex="-1" aria-live="polite"></div></form>';
    return html;
  }

  function renderTeachBack(m, ms) {
    var tb = m.teachBack;
    var rating = ms.teachRating || '';
    var html = '<div class="card teachback"><p class="prompt">' + esc(tb.prompt) + '</p>' +
      '<label for="teach-text">Your explanation (saved locally; not graded automatically)</label><textarea id="teach-text" rows="6">' + esc(ms.teachText || '') + '</textarea><p class="save-state" id="teach-save" role="status"></p>' +
      '<p><button type="button" class="btn" id="teach-reveal" aria-expanded="false" aria-controls="teach-model">Compare with a model explanation</button></p>' +
      '<div id="teach-model" hidden><h3 class="h-small">Model explanation</h3><div class="model">' + tb.model + '</div><h3 class="h-small">Check your explanation against this rubric</h3><ul class="rubric">' +
      tb.rubric.map(function (r, i) { return '<li><input type="checkbox" id="rub-' + i + '"><label for="rub-' + i + '">' + esc(r) + '</label></li>'; }).join('') + '</ul></div>' +
      '<fieldset class="rating"><legend>How well could you explain this without notes?</legend>';
    [['notyet', 'Not yet'], ['partly', 'Partly'], ['clearly', 'I could explain this clearly']].forEach(function (r) {
      html += '<span class="radio-inline"><input type="radio" name="teach-rating" id="tr-' + r[0] + '" value="' + r[0] + '"' + (rating === r[0] ? ' checked' : '') + '><label for="tr-' + r[0] + '">' + r[1] + '</label></span>';
    });
    html += '</fieldset></div>';
    return html;
  }

  function refreshChecklist(main, id) {
    var el = ui.$('#module-checklist', main);
    if (el) el.innerHTML = moduleChecklist(store.state.modules[id] || {});
  }

  function touchModule(s, id) { return (s.modules[id] = s.modules[id] || {}); }

  function mountModule(main, m, checkQs) {
    var a = m.activity;
    var wasComplete = store.isModuleComplete(m.id);
    function afterUpdate() {
      refreshChecklist(main, m.id);
      if (!wasComplete && store.isModuleComplete(m.id)) {
        wasComplete = true;
        ui.announce('Module ' + m.num + ' complete.');
      }
    }

    // Activity
    ui.$('#activity-form', main).addEventListener('submit', function (e) {
      e.preventDefault();
      var fb = ui.$('#activity-fb', main);
      if (a.type === 'decision') {
        var chosen = ui.$('input[name=act]:checked', main);
        if (!chosen) { fb.innerHTML = '<p class="warn-text">Choose a response first.</p>'; fb.focus(); return; }
        var o = a.options[Number(chosen.value)];
        var best = a.options.filter(function (x) { return x.best; })[0];
        fb.innerHTML = '<div class="feedback ' + (o.best ? 'fb-correct' : 'fb-incorrect') + '"><p class="fb-status"><span class="fb-icon" aria-hidden="true">' + (o.best ? '✓' : '✗') + '</span> <strong>' + (o.best ? 'Strong choice.' : 'Not the strongest choice.') + '</strong></p><p>' + esc(o.feedback) + '</p>' +
          (o.best ? '' : '<p><span class="muted">Stronger response:</span> ' + esc(best.text) + '</p><p>' + esc(best.feedback) + '</p>') +
          '<details><summary>Why each option works or not</summary><ul>' + a.options.map(function (x) { return '<li><strong>' + esc(x.text) + '</strong> — ' + esc(x.feedback) + '</li>'; }).join('') + '</ul></details></div>';
        store.update(function (s) { var ms = touchModule(s, m.id); ms.activityDone = true; ms.activityBest = !!o.best; store.refreshModuleCompletion(s, m.id); });
      } else {
        var right = 0, missing = 0;
        a.items.forEach(function (it, i) {
          var sel = ui.$('#sort-' + i, main).value;
          var out = ui.$('#sort-fb-' + i, main);
          if (!sel) { missing++; out.innerHTML = '<span class="warn-text">No choice yet.</span> ' + esc(it.why); return; }
          var ok = sel === it.answer;
          if (ok) right++;
          out.innerHTML = '<span class="' + (ok ? 'ok-text' : 'bad-text') + '">' + (ok ? '✓ Correct.' : '✗ Belongs to: ' + esc(it.answer) + '.') + '</span> ' + esc(it.why);
        });
        fb.innerHTML = '<p class="fb-summary"><strong>' + right + ' of ' + a.items.length + ' correct.</strong>' + (missing ? ' ' + missing + ' left blank.' : '') + ' Each row now shows an explanation.</p>';
        store.update(function (s) { var ms = touchModule(s, m.id); ms.activityDone = true; ms.activityScore = right + '/' + a.items.length; store.refreshModuleCompletion(s, m.id); });
      }
      fb.focus();
      afterUpdate();
    });

    // Teach-back
    var reveal = ui.$('#teach-reveal', main);
    reveal.addEventListener('click', function () {
      var model = ui.$('#teach-model', main);
      model.hidden = !model.hidden;
      reveal.setAttribute('aria-expanded', String(!model.hidden));
      reveal.textContent = model.hidden ? 'Compare with a model explanation' : 'Hide the model explanation';
    });
    var teachSave = debounce(function (v) { saveIndicator(ui.$('#teach-save', main), store.update(function (s) { touchModule(s, m.id).teachText = v; })); }, 500);
    ui.$('#teach-text', main).addEventListener('input', function (e) { teachSave(e.target.value); });
    ui.$$('input[name=teach-rating]', main).forEach(function (r) {
      r.addEventListener('change', function () {
        store.update(function (s) { var ms = touchModule(s, m.id); ms.teachRating = r.value; ms.teachRatedAt = Date.now(); store.refreshModuleCompletion(s, m.id); });
        afterUpdate();
      });
    });

    // Notes
    var notesSave = debounce(function (v) { saveIndicator(ui.$('#notes-save', main), store.update(function (s) { if (v.trim()) s.notes[m.id] = v; else delete s.notes[m.id]; })); }, 500);
    ui.$('#module-notes', main).addEventListener('input', function (e) { notesSave(e.target.value); });

    // Lesson check
    var form = ui.$('#check-form', main);
    ui.bindSelectionLimits(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var results = [];
      store.update(function (s) {
        checkQs.forEach(function (q) {
          var sel = ui.readSelection(form, q, 'chk');
          var conf = ui.readConfidence(form, q, 'chk');
          var ok = store.recordAnswer(s, q, sel, 'check', conf, m.id);
          results.push({ q: q, sel: sel, ok: ok, conf: conf });
        });
        var ms = touchModule(s, m.id);
        ms.checkDone = true;
        ms.checkScore = results.filter(function (r) { return r.ok; }).length;
        ms.checkAt = Date.now();
        store.refreshModuleCompletion(s, m.id);
      });
      var score = results.filter(function (r) { return r.ok; }).length;
      ui.$$('fieldset.question', form).forEach(function (fs, i) {
        var r = results[i];
        ui.$$('input', fs).forEach(function (inp) { inp.disabled = true; });
        fs.insertAdjacentHTML('beforeend', ui.renderFeedback(r.q, r.sel, r.ok, { unsure: r.conf === 'unsure', hideLessonLink: true }));
      });
      ui.$('.form-actions', form).innerHTML = '<button type="button" class="btn" id="check-retake">Retake with fresh order</button>';
      ui.$('#check-retake', form).addEventListener('click', function () { SSS.app.rerender('#ck-h'); });
      var out = ui.$('#check-result', main);
      out.innerHTML = '<div class="callout ' + (score >= 4 ? 'callout-ok' : '') + '"><p><strong>You scored ' + score + ' of 5.</strong> ' +
        (score === 5 ? 'Every answer was correct. Questions you marked as uncertain still go to your review list.' : 'Incorrect answers are in your <a href="#/review/mistakes">mistake notebook</a>. Read each explanation below before moving on.') + '</p></div>';
      out.focus();
      ui.announce('Lesson check submitted. ' + score + ' of 5 correct.');
      afterUpdate();
    });
  }

  /* ================= SCENARIOS ================= */

  V.scenarios = function () {
    var st = store.state;
    var html = '<h1 tabindex="-1">Scenario lab</h1><p class="lede">Eight decision scenarios set in the Launchpad example. Each has two or three decision points with consequences. Feedback separates framework rules from situational judgment — real situations can have more than one reasonable response.</p><ol class="scenario-list">';
    SSS.SCENARIOS.forEach(function (s) {
      var done = st.scenarios[s.id] && st.scenarios[s.id].done;
      html += '<li class="card module-row"><div><h2 class="h3"><a href="#/scenario/' + s.id + '">' + s.num + '. ' + esc(s.title) + '</a></h2><p class="muted">' + ui.trackTag(s.track) + ' ' + s.steps.length + ' decision points · about ' + s.minutes + ' min · related: ' +
        s.modules.map(function (id) { var m = ui.moduleById(id); return 'module ' + m.num; }).join(', ') + '</p></div><div class="module-meta">' + statusChip(done, false) + '</div></li>';
    });
    html += '</ol>';
    return { title: 'Scenario lab', html: html };
  };

  V.scenario = function (params) {
    var sc = ui.scenarioById(params[0]);
    if (!sc) return V.notFound();
    var html = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/scenarios">Scenario lab</a> <span aria-hidden="true">›</span> Scenario ' + sc.num + '</nav>';
    html += '<p class="eyebrow">' + ui.trackTag(sc.track) + ' Scenario ' + sc.num + ' of 8</p><h1 tabindex="-1">' + esc(sc.title) + '</h1>';
    html += '<div class="card setup prose">' + sc.setup + '</div><div id="steps"></div>';
    return {
      title: 'Scenario: ' + sc.title, html: html,
      mount: function (main) { runScenario(main, sc); }
    };
  };

  function runScenario(main, sc) {
    var container = ui.$('#steps', main);
    var choices = [];
    var QUAL = { strong: 'Strong choice', mixed: 'Partly effective', weak: 'Weak choice' };

    function renderStep(i) {
      var step = sc.steps[i];
      var wrap = document.createElement('section');
      wrap.className = 'card step';
      wrap.setAttribute('aria-labelledby', 'step-h-' + i);
      var html = '<h2 id="step-h-' + i + '" tabindex="-1">Decision ' + (i + 1) + ' of ' + sc.steps.length + '</h2><form novalidate><fieldset><legend class="prompt">' + esc(step.prompt) + '</legend>';
      step.options.forEach(function (o, j) {
        html += '<div class="option"><input type="radio" name="step-' + i + '" id="st-' + i + '-' + j + '" value="' + j + '"><label for="st-' + i + '-' + j + '"><span class="letter" aria-hidden="true">' + ui.LETTERS[j] + '</span><span>' + esc(o.text) + '</span></label></div>';
      });
      html += '</fieldset><div class="form-actions"><button type="submit" class="btn btn-primary">Decide</button></div></form><div class="step-fb" tabindex="-1"></div>';
      wrap.innerHTML = html;
      container.appendChild(wrap);
      var form = ui.$('form', wrap), fb = ui.$('.step-fb', wrap);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var c = ui.$('input:checked', form);
        if (!c) { fb.innerHTML = '<p class="warn-text">Choose a response first.</p>'; fb.focus(); return; }
        var o = step.options[Number(c.value)];
        choices.push(Number(c.value));
        ui.$$('input', form).forEach(function (x) { x.disabled = true; });
        ui.$('.form-actions', form).remove();
        fb.innerHTML = '<div class="feedback q-' + o.quality + '"><p class="fb-status"><strong>' + QUAL[o.quality] + '.</strong></p><p><span class="muted">What happens:</span> ' + esc(o.consequence) + '</p><p>' + esc(o.explanation) + '</p>' +
          '<p class="rule-note">' + esc(step.rule) + '<br>' + esc(step.judgment) + '</p>' +
          '<details><summary>See every option and its consequence</summary><ul>' + step.options.map(function (x) { return '<li><strong>' + QUAL[x.quality] + ':</strong> ' + esc(x.text) + ' — <em>' + esc(x.consequence) + '</em> ' + esc(x.explanation) + '</li>'; }).join('') + '</ul></details></div>' +
          '<div class="form-actions"><button type="button" class="btn btn-primary next-step">' + (i + 1 < sc.steps.length ? 'Next decision' : 'Finish scenario') + '</button></div>';
        fb.focus();
        ui.$('.next-step', fb).addEventListener('click', function (ev) {
          ev.target.parentNode.remove();
          if (i + 1 < sc.steps.length) renderStep(i + 1);
          else finish();
        });
      });
      var h = ui.$('h2', wrap);
      if (i > 0) h.focus();
    }

    function finish() {
      var strong = choices.filter(function (c, i) { return sc.steps[i].options[c].quality === 'strong'; }).length;
      store.update(function (s) { s.scenarios[sc.id] = { done: true, choices: choices.slice(), strong: strong, at: Date.now() }; });
      var end = document.createElement('section');
      end.className = 'card wrapup';
      end.innerHTML = '<h2 tabindex="-1">Takeaway</h2><p><strong>You made ' + strong + ' strong choice' + (strong === 1 ? '' : 's') + ' out of ' + sc.steps.length + '.</strong> The goal is the reasoning, not the score.</p><div class="prose">' + sc.wrap + '</div><h3 class="h-small">Verify against the sources</h3><ul class="sources">' +
        sc.sources.map(function (s) { return '<li>' + ui.sourceLink(s) + '</li>'; }).join('') + '</ul><p class="form-actions"><button type="button" class="btn" id="sc-restart">Try again</button> ' +
        (SSS.SCENARIOS[sc.num] ? '<a class="btn btn-primary" href="#/scenario/' + SSS.SCENARIOS[sc.num].id + '">Next scenario →</a>' : '<a class="btn btn-primary" href="#/scenarios">All scenarios</a>') + '</p>';
      container.appendChild(end);
      ui.$('h2', end).focus();
      ui.$('#sc-restart', end).addEventListener('click', function () { SSS.app.rerender(); });
      ui.announce('Scenario complete.');
    }

    renderStep(0);
  }

  /* ================= NOTES & REFERENCE ================= */

  V.notes = function () {
    var st = store.state;
    var html = '<div class="no-print"><h1 tabindex="-1">Notes &amp; reference</h1><p class="lede">A one-page framework summary and your personal notes, formatted for printing. Paper references are permitted during the live assessments; leaving the test window, AI help and help from another person are not.</p><p><button type="button" class="btn btn-primary" id="print-btn">Print this page</button></p></div>';
    html += '<h1 class="print-only">Scrum framework reference and notes</h1>';
    html += '<section class="ref" aria-labelledby="ref-h"><h2 id="ref-h">Framework reference (paraphrased from the 2020 Scrum Guide)</h2>' +
      '<h3>Theory and values</h3><p><strong>Empiricism</strong> (knowledge from experience and observation) and <strong>lean thinking</strong> (reduce waste, focus on essentials). Pillars: <strong>transparency → inspection → adaptation</strong>. Values: <strong>Commitment, Focus, Openness, Respect, Courage</strong>.</p>' +
      '<h3>Accountabilities</h3><table class="ref-table"><thead><tr><th scope="col">Who</th><th scope="col">Accountable for</th></tr></thead><tbody>' +
      '<tr><td>Scrum Team</td><td>One Scrum Master, one Product Owner, Developers; typically 10 or fewer; no sub-teams or hierarchies; cross-functional and self-managing. Whole team: a valuable, useful Increment every Sprint.</td></tr>' +
      '<tr><td>Developers</td><td>Sprint Backlog; quality via the Definition of Done; adapting the plan daily toward the Sprint Goal; holding each other accountable as professionals. Size backlog items.</td></tr>' +
      '<tr><td>Product Owner</td><td>Maximizing product value; Product Backlog management (Product Goal, items, ordering, transparency). One person; may delegate work but stays accountable; only role that can cancel a Sprint.</td></tr>' +
      '<tr><td>Scrum Master</td><td>Establishing Scrum as defined; the team\'s effectiveness. Serves the team, the Product Owner and the organization.</td></tr></tbody></table>' +
      '<h3>Events (maximums for a one-month Sprint)</h3><table class="ref-table"><thead><tr><th scope="col">Event</th><th scope="col">Purpose</th><th scope="col">Timebox</th></tr></thead><tbody>' +
      '<tr><td>Sprint</td><td>Container; fixed length; next starts immediately</td><td>≤ 1 month</td></tr>' +
      '<tr><td>Sprint Planning</td><td>Why (Sprint Goal), what (selection), how (Developers\' plan)</td><td>8 h</td></tr>' +
      '<tr><td>Daily Scrum</td><td>Developers inspect progress toward the Sprint Goal; plan the next day</td><td>15 min</td></tr>' +
      '<tr><td>Sprint Review</td><td>Inspect outcome with key stakeholders; decide adaptations; working session, not a release gate</td><td>4 h</td></tr>' +
      '<tr><td>Sprint Retrospective</td><td>Plan improvements to quality and effectiveness; concludes the Sprint</td><td>3 h</td></tr></tbody></table>' +
      '<h3>Artifacts and commitments</h3><table class="ref-table"><thead><tr><th scope="col">Artifact</th><th scope="col">Commitment</th></tr></thead><tbody>' +
      '<tr><td>Product Backlog — emergent, ordered, single source of work</td><td>Product Goal — one at a time; fulfill or abandon</td></tr>' +
      '<tr><td>Sprint Backlog — goal + selected items + plan; by and for the Developers</td><td>Sprint Goal — single objective; scope can flex around it</td></tr>' +
      '<tr><td>Increment — usable, verified, additive; can release before the Review</td><td>Definition of Done — undone work returns to the Product Backlog</td></tr></tbody></table>' +
      '<h3>Precision checks</h3><ul><li>Story points, velocity, user stories, burn-downs and the three questions are optional techniques.</li><li>Refinement is an ongoing activity, not an event.</li><li>Scope may be renegotiated with the Product Owner; the Sprint Goal and quality are protected.</li><li>Done establishes quality, not proven value.</li><li>Several teams on one product share a Product Goal, Product Backlog, Product Owner and Definition of Done.</li><li>EBM Key Value Areas: Current Value, Unrealized Value, Ability to Innovate, Time to Market (EBM Guide, not the Scrum Guide).</li></ul></section>';

    var noteMods = SSS.MODULES.filter(function (m) { return st.notes[m.id] || (st.modules[m.id] && st.modules[m.id].teachText); });
    html += '<section class="notes-print" aria-labelledby="pn-h"><h2 id="pn-h">Personal notes</h2>';
    if (!noteMods.length) html += '<p class="muted">No notes yet. Notes and teach-back explanations you write in each module appear here.</p>';
    noteMods.forEach(function (m) {
      var ms = st.modules[m.id] || {};
      html += '<article class="note-block"><h3>Module ' + m.num + ': ' + esc(m.title) + '</h3>' +
        (ms.teachText ? '<h4>My teach-back</h4><p class="pre">' + esc(ms.teachText) + '</p>' : '') +
        (st.notes[m.id] ? '<h4>Notes</h4><p class="pre">' + esc(st.notes[m.id]) + '</p>' : '') + '</article>';
    });
    html += '</section>';

    html += '<section class="notes-print" aria-labelledby="el-h"><h2 id="el-h">Error log</h2>';
    var byId = store.questionsById();
    var un = ui.unresolvedMistakes();
    if (!un.length) html += '<p class="muted">No unresolved mistakes.</p>';
    else {
      html += '<table class="ref-table"><thead><tr><th scope="col">Topic</th><th scope="col">Question</th><th scope="col">Correct principle</th></tr></thead><tbody>';
      un.forEach(function (id) {
        var q = byId[id], m = ui.moduleByNum(q.module);
        html += '<tr><td>M' + m.num + ' ' + esc(m.title) + '</td><td>' + esc(q.stem) + '</td><td>' + esc(q.explain) + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '</section>';
    return {
      title: 'Notes & reference', html: html,
      mount: function (main) { ui.$('#print-btn', main).addEventListener('click', function () { root.print(); }); }
    };
  };

  V.notFound = function () {
    return { title: 'Not found', html: '<h1 tabindex="-1">Page not found</h1><p>That page does not exist. <a href="#/">Go home</a>.</p>' };
  };
})(typeof window !== 'undefined' ? window : globalThis);
