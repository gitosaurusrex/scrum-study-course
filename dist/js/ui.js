/* Shared UI helpers, question rendering, plan progress and readiness evidence. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var core = SSS.core;

  var ui = SSS.ui = {};

  ui.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  var esc = ui.esc;

  ui.LETTERS = 'ABCDEFGH';
  ui.NUMWORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

  ui.$ = function (sel, el) { return (el || document).querySelector(sel); };
  ui.$$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  ui.announce = function (msg) {
    var live = document.getElementById('live');
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 50);
  };

  ui.fmtDate = function (ms) {
    return new Date(ms).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  ui.fmtDateTime = function (ms) {
    return new Date(ms).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };
  ui.fmtISO = function (iso) {
    var p = iso.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };
  ui.fmtMinutes = function (min) {
    var h = Math.floor(min / 60), m = min % 60;
    if (!h) return m + ' min';
    return h + ' h' + (m ? ' ' + m + ' min' : '');
  };
  ui.pct = function (n, d) { return d ? Math.round((n / d) * 100) : 0; };

  /* ---------- content lookups ---------- */

  ui.moduleById = function (id) { return SSS.MODULES.filter(function (m) { return m.id === id; })[0]; };
  ui.moduleByNum = function (n) { return SSS.MODULES.filter(function (m) { return m.num === n; })[0]; };
  ui.scenarioById = function (id) { return SSS.SCENARIOS.filter(function (s) { return s.id === id; })[0]; };
  ui.moduleQuestions = function (num) { return SSS.QUESTIONS.filter(function (q) { return q.module === num; }); };
  ui.checkQuestions = function (num) { return ui.moduleQuestions(num).slice(0, 5); };

  ui.TRACK = {
    shared: { label: 'Shared foundation', short: 'Shared' },
    psm: { label: 'PSM I track', short: 'PSM I' },
    pspo: { label: 'PSPO I track', short: 'PSPO I' }
  };
  ui.trackTag = function (track) {
    return '<span class="tag tag-' + track + '">' + esc(ui.TRACK[track].short) + '</span>';
  };

  // Modules and scenarios relevant to each exam track.
  ui.trackModules = function (track) {
    return SSS.MODULES.filter(function (m) { return m.track === 'shared' || m.track === track; });
  };
  ui.trackScenarios = function (track) {
    return SSS.SCENARIOS.filter(function (s) { return s.track === 'shared' || s.track === track; });
  };

  ui.sourceLink = function (src) {
    if (!src) return '';
    return '<a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(src.label) + (src.section ? ' — ' + esc(src.section) : '') + '<span class="sr-only"> (opens in a new tab)</span></a>';
  };

  /* ---------- questions ---------- */

  ui.selectInstruction = function (q) {
    if (q.type === 'multi') return 'Choose ' + ui.NUMWORDS[q.correct.length] + '.';
    if (q.type === 'tf') return 'Choose true or false.';
    return 'Choose the best answer.';
  };

  // opts: { order, selected, number, total, disabled, confidence, showConfidence, idPrefix }
  ui.renderQuestion = function (q, opts) {
    opts = opts || {};
    var order = opts.order || q.options.map(function (_, i) { return i; });
    var sel = opts.selected || [];
    var multi = q.type === 'multi';
    var name = (opts.idPrefix || 'q') + '-' + q.id;
    var legendId = name + '-legend';
    var html = '<fieldset class="question" data-qid="' + esc(q.id) + '"' + (multi ? ' data-limit="' + q.correct.length + '"' : '') + ' aria-describedby="' + name + '-instr">';
    html += '<legend id="' + legendId + '">' + (opts.number ? '<span class="qnum">Question ' + opts.number + (opts.total ? ' of ' + opts.total : '') + '</span>' : '') + '<span class="stem">' + esc(q.stem) + '</span></legend>';
    html += '<p class="instr" id="' + name + '-instr">' + esc(ui.selectInstruction(q)) + (multi ? ' <span class="count" aria-live="polite">' + sel.length + ' of ' + q.correct.length + ' selected</span>' : '') + '</p>';
    html += '<div class="options">';
    order.forEach(function (oi, pos) {
      var id = name + '-o' + oi;
      var checked = sel.indexOf(oi) >= 0;
      html += '<div class="option"><input type="' + (multi ? 'checkbox' : 'radio') + '" id="' + id + '" name="' + name + '" value="' + oi + '"' + (checked ? ' checked' : '') + (opts.disabled ? ' disabled' : '') + '>' +
        '<label for="' + id + '"><span class="letter" aria-hidden="true">' + ui.LETTERS[pos] + '</span><span>' + esc(q.options[oi]) + '</span></label></div>';
    });
    html += '</div>';
    if (opts.showConfidence) {
      var cid = name + '-unsure';
      html += '<div class="confidence"><input type="checkbox" id="' + cid + '" name="' + cid + '"' + (opts.confidence === 'unsure' ? ' checked' : '') + (opts.disabled ? ' disabled' : '') + '><label for="' + cid + '">I\'m not sure about this one (optional — keeps it in review even if correct)</label></div>';
    }
    html += '</fieldset>';
    return html;
  };

  // Enforces "choose N" on checkbox groups and keeps the counter current.
  ui.bindSelectionLimits = function (container) {
    ui.$$('fieldset.question[data-limit]', container).forEach(function (fs) {
      var limit = Number(fs.getAttribute('data-limit'));
      var boxes = ui.$$('.options input[type=checkbox]', fs);
      if (!boxes.length || boxes.every(function (b) { return b.disabled; })) return; // answered and locked
      function sync() {
        var n = boxes.filter(function (b) { return b.checked; }).length;
        boxes.forEach(function (b) { if (!b.checked) b.disabled = n >= limit; });
        var c = ui.$('.count', fs);
        if (c) c.textContent = n + ' of ' + limit + ' selected';
      }
      boxes.forEach(function (b) { b.addEventListener('change', sync); });
      sync();
    });
  };

  ui.readSelection = function (container, q, idPrefix) {
    var name = (idPrefix || 'q') + '-' + q.id;
    return ui.$$('input[name="' + name + '"]:checked', container).map(function (i) { return Number(i.value); }).sort(function (a, b) { return a - b; });
  };
  ui.readConfidence = function (container, q, idPrefix) {
    var el = document.getElementById((idPrefix || 'q') + '-' + q.id + '-unsure');
    return el && el.checked ? 'unsure' : null;
  };

  ui.answerText = function (q, idx) {
    if (!idx || !idx.length) return '<em>No answer</em>';
    return idx.map(function (i) { return esc(q.options[i]); }).join('; ');
  };

  ui.renderFeedback = function (q, selected, ok, opts) {
    opts = opts || {};
    var cls = ok ? 'fb-correct' : 'fb-incorrect';
    var label = ok ? 'Correct' : (selected.length ? 'Incorrect' : 'Not answered');
    var html = '<div class="feedback ' + (opts.neutral ? 'fb-neutral' : cls) + '">';
    if (!opts.neutral) html += '<p class="fb-status"><span class="fb-icon" aria-hidden="true">' + (ok ? '✓' : '✗') + '</span> <strong>' + label + '.</strong>' + (opts.unsure && ok ? ' You marked this as uncertain, so it stays in your review list.' : '') + '</p>';
    if (!ok && !opts.neutral) {
      html += '<p><span class="muted">Your answer:</span> ' + ui.answerText(q, selected) + '</p>';
    }
    html += '<p><span class="muted">Correct answer:</span> ' + ui.answerText(q, q.correct) + '</p>';
    html += '<p>' + esc(q.explain) + '</p>';
    if (q.distractors) html += '<p class="muted-block"><strong>What the other options overlook:</strong> ' + esc(q.distractors) + '</p>';
    html += '<p class="src">' + (q.basis === 'judgment' ? '<span class="basis">Situational guidance, not a framework rule.</span> ' : q.basis === 'concept' ? '<span class="basis">Source-defined concept; not a Scrum Guide rule.</span> ' : '<span class="basis">Scrum framework rule.</span> ') + 'Source: ' + ui.sourceLink(q.source) + '</p>';
    if (q.additionalSources && q.additionalSources.length) html += '<p class="src">Additional reading: ' + q.additionalSources.map(ui.sourceLink).join(' · ') + '</p>';
    var mod = ui.moduleByNum(q.module);
    if (mod && !opts.hideLessonLink) html += '<p><a href="#/module/' + mod.id + '">Revisit module ' + mod.num + ': ' + esc(mod.title) + '</a></p>';
    html += '</div>';
    return html;
  };

  /* ---------- plan progress ---------- */

  ui.taskInfo = function (item) {
    var st = SSS.store.state;
    if (item.type === 'module') {
      var m = ui.moduleById(item.ref);
      return { key: 'module:' + item.ref, label: 'Module ' + m.num + ': ' + m.title, minutes: m.minutes, href: '#/module/' + m.id, done: SSS.store.isModuleComplete(m.id), auto: true, kind: 'Lesson', track: m.track };
    }
    if (item.type === 'scenario') {
      var s = ui.scenarioById(item.ref);
      return { key: 'scenario:' + item.ref, label: 'Scenario ' + s.num + ': ' + s.title, minutes: s.minutes, href: '#/scenario/' + s.id, done: !!(st.scenarios[s.id] && st.scenarios[s.id].done), auto: true, kind: 'Scenario', track: s.track };
    }
    if (item.type === 'rehearsal') {
      var n = st.rehearsals.filter(function (r) { return r.track === item.ref; }).length;
      var label = (item.ref === 'psm' ? 'PSM I' : 'PSPO I') + ' course rehearsal' + (item.count > 1 ? ' #' + item.count + ' (a separate attempt, ideally on a different day)' : '') + ': 80 questions in 60 minutes, then review every explanation';
      return { key: 'rehearsal:' + item.ref + ':' + item.count, label: label, minutes: 60, href: '#/practice', done: n >= item.count, auto: true, kind: 'Rehearsal', track: item.ref };
    }
    var t = SSS.MANUAL_TASKS[item.ref];
    return { key: 'manual:' + item.ref, id: item.ref, label: t.label, minutes: t.minutes, link: t.link, done: !!st.planTasks[item.ref], auto: false, exam: !!t.exam, kind: t.exam ? 'Exam block' : 'Task' };
  };

  ui.planProgress = function () {
    var st = SSS.store.state;
    var plan = SSS.PLANS['12'];
    var days = plan.days.map(function (d, i) {
      var tasks = d.items.map(ui.taskInfo);
      var study = tasks.filter(function (t) { return !t.exam; }).reduce(function (a, t) { return a + t.minutes; }, 0);
      var exam = tasks.filter(function (t) { return t.exam; }).reduce(function (a, t) { return a + t.minutes; }, 0);
      var done = tasks.filter(function (t) { return t.done; }).length;
      return { index: i, num: i + 1, title: d.title, tasks: tasks, studyMinutes: study, examMinutes: exam, done: done, total: tasks.length, date: core.addDaysISO(st.settings.startDate, i) };
    });
    var current = null, next = null;
    for (var i = 0; i < days.length && !next; i++) {
      for (var j = 0; j < days[i].tasks.length; j++) {
        if (!days[i].tasks[j].done) { current = days[i]; next = days[i].tasks[j]; break; }
      }
    }
    return { plan: plan, days: days, current: current, next: next };
  };

  /* ---------- reviews ---------- */

  ui.cardEligible = function (card) {
    var ms = SSS.store.state.modules[card.module];
    return !!(ms && (ms.complete || ms.checkDone || ms.activityDone));
  };
  ui.dueCards = function (nowMs) {
    var st = SSS.store.state;
    return SSS.CARDS.filter(function (c) { return ui.cardEligible(c) && core.isCardDue(st.cards[c.id], nowMs); });
  };
  ui.unresolvedMistakes = function () {
    var st = SSS.store.state, byId = SSS.store.questionsById();
    return Object.keys(st.mistakes).filter(function (id) { return !st.mistakes[id].resolved && byId[id]; });
  };

  /* ---------- readiness ---------- */

  // Returns an evidence summary for 'psm' or 'pspo'. Status labels are
  // course guidance, never an eligibility decision or a pass prediction.
  ui.readiness = function (track) {
    var st = SSS.store.state, byId = SSS.store.questionsById();
    var mods = ui.trackModules(track);
    var lessonsDone = mods.filter(function (m) { return SSS.store.isModuleComplete(m.id); }).length;
    var sharedDone = mods.filter(function (m) { return m.track === 'shared' && SSS.store.isModuleComplete(m.id); }).length;
    var teachClear = mods.filter(function (m) { return (st.modules[m.id] || {}).teachRating === 'clearly'; }).length;
    var scen = ui.trackScenarios(track);
    var scenDone = scen.filter(function (s) { return st.scenarios[s.id] && st.scenarios[s.id].done; }).length;
    var reh = st.rehearsals.filter(function (r) { return r.track === track; });
    var strong = core.strongRehearsals(st.rehearsals, track, 90, byId);
    var lastReh = reh.length ? reh[reh.length - 1] : null;

    var modNums = {};
    mods.forEach(function (m) { modNums[m.num] = m; });
    var unresolved = ui.unresolvedMistakes().filter(function (id) { return modNums[byId[id].module]; });
    var perModule = {};
    unresolved.forEach(function (id) { var n = byId[id].module; perModule[n] = (perModule[n] || 0) + 1; });
    var recurring = Object.keys(perModule).filter(function (n) { return perModule[n] >= 2; }).map(function (n) { return { module: modNums[n], count: perModule[n] }; });
    var highConfidenceErrors = unresolved.filter(function (id) { return st.mistakes[id].reason === 'incorrect'; }).length;

    // Delayed recall: card reviews at least a day after the previous review.
    var delayedTotal = 0, delayedRecalled = 0;
    mods.forEach(function (m) {
      SSS.CARDS.filter(function (c) { return c.module === m.id; }).forEach(function (c) {
        var cs = st.cards[c.id];
        (cs && cs.history || []).forEach(function (h) {
          if (h.gapDays !== null && h.gapDays >= 1) { delayedTotal++; if (h.rating === 'recalled') delayedRecalled++; }
        });
      });
    });

    var scrumOpenDays = core.separatedPerfectResults(st.official, 'scrum-open');
    var poOpenDays = core.separatedPerfectResults(st.official, 'po-open');
    var officialOk = track === 'psm' ? scrumOpenDays >= 2 : (scrumOpenDays >= 2 && poOpenDays >= 2);
    var rulesReviewed = !!st.checklist[track + '-rules'];

    var checks = [
      { id: 'lessons', ok: lessonsDone === mods.length, label: 'Lessons complete', detail: lessonsDone + ' of ' + mods.length },
      { id: 'scenarios', ok: scenDone === scen.length, label: 'Scenarios worked through', detail: scenDone + ' of ' + scen.length },
      { id: 'teach', ok: teachClear >= Math.ceil(mods.length * 0.75), label: 'Teach-backs you rated "I could explain this clearly"', detail: teachClear + ' of ' + mods.length + ' (aim for most)' },
      { id: 'rehearsals', ok: strong.list.length >= 2 && strong.distinctDays >= 2, label: 'Two course rehearsals at 90% or above, on separate days', detail: strong.list.length + ' current-version results at 90%+ across ' + strong.distinctDays + ' day' + (strong.distinctDays === 1 ? '' : 's') },
      { id: 'mistakes', ok: highConfidenceErrors <= 3 && recurring.length === 0, label: 'Few unresolved errors and no recurring confusion', detail: unresolved.length + ' unresolved (' + highConfidenceErrors + ' incorrect, ' + (unresolved.length - highConfidenceErrors) + ' uncertain)' + (recurring.length ? '; recurring in ' + recurring.length + ' module' + (recurring.length === 1 ? '' : 's') : '') },
      { id: 'delayed', ok: delayedTotal >= 10 && delayedRecalled / delayedTotal >= 0.8, label: 'Delayed recall: flashcards remembered a day or more later', detail: delayedTotal ? delayedRecalled + ' of ' + delayedTotal + ' delayed reviews recalled' : 'No delayed reviews yet' },
      { id: 'official', ok: officialOk, label: track === 'psm' ? 'Scrum Open at 100% on two separate dates (self-reported)' : 'Scrum Open and Product Owner Open each at 100% on two separate dates (self-reported)', detail: 'Scrum Open: ' + scrumOpenDays + ' date' + (scrumOpenDays === 1 ? '' : 's') + (track === 'pspo' ? ' · Product Owner Open: ' + poOpenDays + ' date' + (poOpenDays === 1 ? '' : 's') : '') },
      { id: 'rules', ok: rulesReviewed, label: 'Reviewed current exam requirements and conduct rules', detail: rulesReviewed ? 'Marked as reviewed' : 'Not yet marked' }
    ];
    var met = checks.filter(function (c) { return c.ok; }).length;

    var status, tone;
    var sharedTotal = mods.filter(function (m) { return m.track === 'shared'; }).length;
    if (sharedDone < sharedTotal) { status = 'Foundation in progress'; tone = 'progress'; }
    else if (recurring.length || (lastReh && lastReh.pct < 85)) { status = 'Repair these topics'; tone = 'repair'; }
    else if (met === checks.length) { status = 'Suggested preparation checks complete'; tone = 'complete'; }
    else { status = 'Review your evidence before sitting'; tone = 'review'; }

    return {
      track: track, status: status, tone: tone, checks: checks, met: met,
      lessonsDone: lessonsDone, lessonsTotal: mods.length, rehearsals: reh, lastRehearsal: lastReh,
      recurring: recurring, unresolved: unresolved
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
