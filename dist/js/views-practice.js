/* Practice views: practice hub, untimed sessions, timed rehearsals, results,
   flashcards, mistake notebook and flagged questions. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var ui = SSS.ui, core = SSS.core, store = SSS.store, esc = ui.esc;
  var V = SSS.views = SSS.views || {};

  var session = null;   // untimed practice session (in memory)
  var cardSession = null;

  /* ---------- flagging questionable items ---------- */

  function flagControl(q) {
    var f = store.state.flags[q.id];
    return '<details class="flag"' + (f ? ' open' : '') + '><summary>' + (f ? 'Flagged as questionable' : 'Flag this question as unclear or questionable') + '</summary>' +
      '<label for="flag-' + q.id + '">What seems wrong or ambiguous? (optional)</label><textarea id="flag-' + q.id + '" rows="2">' + esc(f ? f.note : '') + '</textarea>' +
      '<p><button type="button" class="btn btn-small" data-flag="' + q.id + '">' + (f ? 'Update flag' : 'Save flag') + '</button>' + (f ? ' <button type="button" class="btn btn-small" data-unflag="' + q.id + '">Remove flag</button>' : '') + '</p></details>';
  }
  function bindFlags(container) {
    ui.$$('[data-flag]', container).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-flag');
        var note = ui.$('#flag-' + id, container).value;
        store.update(function (s) { s.flags[id] = { note: note, at: Date.now() }; });
        b.textContent = 'Flag saved';
        ui.announce('Question flagged. Review flagged questions under Review.');
      });
    });
    ui.$$('[data-unflag]', container).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-unflag');
        store.update(function (s) { delete s.flags[id]; });
        b.textContent = 'Flag removed';
        b.disabled = true;
      });
    });
  }

  /* ================= PRACTICE HUB ================= */

  function pickQuestions(pool, n) {
    var seen = store.seenMap();
    var unseen = core.shuffle(pool.filter(function (q) { return !seen[q.id]; }));
    var rest = core.shuffle(pool.filter(function (q) { return seen[q.id]; }));
    return unseen.concat(rest).slice(0, n);
  }

  function startSession(mode, title, questions) {
    session = {
      mode: mode, title: title,
      qids: questions.map(function (q) { return q.id; }),
      orders: {}, idx: 0, results: [], seen: store.seenMap()
    };
    questions.forEach(function (q) { session.orders[q.id] = core.optionOrder(q); });
    location.hash = '#/practice/session';
  }

  V.practice = function () {
    var st = store.state;
    var seen = store.seenMap();
    var mistakes = ui.unresolvedMistakes();
    var html = '<h1 tabindex="-1">Practice</h1><p class="lede">Untimed sets give feedback after each answer. Timed rehearsals give feedback only after you submit. All questions are original course material — not live exam questions.</p>';

    if (st.activeRehearsal) {
      html += '<div class="callout callout-warn"><p><strong>A timed rehearsal is in progress.</strong> Finish or submit it before starting another.</p><p><a class="btn btn-primary" href="#/rehearsal">Return to the rehearsal</a></p></div>';
    }

    html += '<div class="grid-2">';
    html += '<section class="card" aria-labelledby="qs-h"><h2 id="qs-h">Quick set</h2><p>Ten questions, unseen ones first.</p><form id="quick-form"><label for="quick-track">Questions from</label><select id="quick-track"><option value="all">All 160 questions</option><option value="psm">PSM I pool (shared + Scrum Master)</option><option value="pspo">PSPO I pool (shared + Product Owner)</option></select><div class="form-actions"><button class="btn btn-primary" type="submit">Start quick set</button></div></form></section>';

    html += '<section class="card" aria-labelledby="ts-h"><h2 id="ts-h">Topic set</h2><p>All ten questions for one module, in random order.</p><form id="topic-form"><label for="topic-mod">Module</label><select id="topic-mod">' +
      SSS.MODULES.map(function (m) {
        var n = ui.moduleQuestions(m.num).filter(function (q) { return seen[q.id]; }).length;
        return '<option value="' + m.num + '">' + m.num + '. ' + esc(m.title) + ' (' + n + '/10 seen)</option>';
      }).join('') + '</select><div class="form-actions"><button class="btn btn-primary" type="submit">Start topic set</button></div></form></section>';

    html += '<section class="card" aria-labelledby="ms-h"><h2 id="ms-h">Missed and uncertain questions</h2><p>' + mistakes.length + ' unresolved item' + (mistakes.length === 1 ? '' : 's') + ' in your notebook. A confident correct answer resolves an item.</p><div class="form-actions"><button class="btn btn-primary" id="missed-start"' + (mistakes.length ? '' : ' disabled') + '>Practice up to 20</button> <a class="btn" href="#/review/mistakes">Open the notebook</a></div></section>';

    html += '<section class="card" aria-labelledby="rh-h"><h2 id="rh-h">Timed course rehearsal</h2><p>80 questions sampled across topics from the 120 eligible for the track, in 60 minutes. The clock uses a fixed deadline: it keeps running if you switch tabs, close the page or your device sleeps. Your answers survive a refresh.</p>' +
      ['psm', 'pspo'].map(function (t) {
        var pool = core.eligibleQuestions(SSS.QUESTIONS, t);
        var n = pool.filter(function (q) { return seen[q.id]; }).length;
        return '<p><button class="btn btn-primary" data-rehearse="' + t + '"' + (st.activeRehearsal ? ' disabled' : '') + '>Start ' + (t === 'psm' ? 'PSM I' : 'PSPO I') + ' rehearsal</button> <span class="muted">' + n + ' of 120 already seen</span></p>';
      }).join('') +
      '<p class="fine">A course rehearsal is not an official assessment or a validated prediction of exam performance. The pool is finite, so repeats are reported separately in your results.</p></section>';
    html += '</div>';

    if (st.rehearsals.length) {
      html += '<section aria-labelledby="past-h"><h2 id="past-h">Past rehearsals</h2><table class="data-table"><thead><tr><th scope="col">Date</th><th scope="col">Track</th><th scope="col">Score</th><th scope="col">Previously seen</th><th scope="col">Unseen accuracy</th><th scope="col"><span class="sr-only">Details</span></th></tr></thead><tbody>';
      st.rehearsals.slice().reverse().forEach(function (r) {
        html += '<tr><td>' + ui.fmtDateTime(r.submittedAt) + '</td><td>' + (r.track === 'psm' ? 'PSM I' : 'PSPO I') + '</td><td>' + r.pct + '%' + (!core.isCurrentRehearsal(r, store.questionsById()) ? ' <span class="warn-text">(historical content)</span>' : '') + (r.timedOut ? ' <span class="muted">(time expired)</span>' : '') + '</td><td>' + r.seenCount + ' of ' + r.total + '</td><td>' + (r.unseenCount ? ui.pct(r.unseenCorrect, r.unseenCount) + '% of ' + r.unseenCount : '—') + '</td><td><a href="#/rehearsal/result/' + r.id + '">Review</a></td></tr>';
      });
      html += '</tbody></table></section>';
    }

    return {
      title: 'Practice', html: html,
      mount: function (main) {
        ui.$('#quick-form', main).addEventListener('submit', function (e) {
          e.preventDefault();
          var t = ui.$('#quick-track', main).value;
          var pool = t === 'all' ? SSS.QUESTIONS : core.eligibleQuestions(SSS.QUESTIONS, t);
          startSession('practice', 'Quick set', pickQuestions(pool, 10));
        });
        ui.$('#topic-form', main).addEventListener('submit', function (e) {
          e.preventDefault();
          var n = Number(ui.$('#topic-mod', main).value);
          startSession('practice', 'Topic set: module ' + n, core.shuffle(ui.moduleQuestions(n)));
        });
        var ms = ui.$('#missed-start', main);
        ms.addEventListener('click', function () {
          var byId = store.questionsById();
          startSession('missed', 'Missed and uncertain questions', core.shuffle(ui.unresolvedMistakes().map(function (id) { return byId[id]; })).slice(0, 20));
        });
        ui.$$('[data-rehearse]', main).forEach(function (b) {
          b.addEventListener('click', function () { startRehearsal(b.getAttribute('data-rehearse')); });
        });
      }
    };
  };

  /* ================= UNTIMED SESSION ================= */

  V.session = function () {
    if (!session) {
      return { title: 'Practice', html: '<h1 tabindex="-1">No practice set in progress</h1><p>Untimed sets are not kept after a page refresh, but every answer you submitted is saved. <a href="#/practice">Start a new set</a>.</p>' };
    }
    var html = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/practice">Practice</a> <span aria-hidden="true">›</span> ' + esc(session.title) + '</nav><h1 tabindex="-1">' + esc(session.title) + '</h1><div id="session-body"></div>';
    return { title: session.title, html: html, mount: function (main) { renderSessionQuestion(main); } };
  };

  function renderSessionQuestion(main) {
    var body = ui.$('#session-body', main);
    var byId = store.questionsById();
    if (session.idx >= session.qids.length) return renderSessionSummary(main);
    var q = byId[session.qids[session.idx]];
    var wasSeen = session.seen[q.id];
    var html = '<p class="progress-line">' + (session.idx + 1) + ' of ' + session.qids.length + ' · ' + ui.trackTag(q.track) + ' Module ' + q.module + ' · ' + esc(q.difficulty) + (wasSeen ? ' · <span class="muted">seen before</span>' : ' · <span class="muted">new to you</span>') + '</p>';
    html += '<form id="sq-form" class="quiz" novalidate>' + ui.renderQuestion(q, { order: session.orders[q.id], idPrefix: 'sq', showConfidence: true }) +
      '<div class="form-actions"><button type="submit" class="btn btn-primary">Submit answer</button></div></form><div id="sq-fb" tabindex="-1"></div>';
    body.innerHTML = html;
    var form = ui.$('#sq-form', body);
    ui.bindSelectionLimits(form);
    var leg = ui.$('legend', form);
    if (leg) { leg.setAttribute('tabindex', '-1'); if (session.idx > 0) leg.focus(); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = ui.readSelection(form, q, 'sq');
      if (!sel.length) { ui.$('#sq-fb', body).innerHTML = '<p class="warn-text">Select an answer first.</p>'; ui.$('#sq-fb', body).focus(); return; }
      var conf = ui.readConfidence(form, q, 'sq');
      var ok;
      store.update(function (s) { ok = store.recordAnswer(s, q, sel, session.mode, conf); });
      session.results.push({ qid: q.id, ok: ok, sel: sel, conf: conf, seen: wasSeen });
      ui.$$('input', form).forEach(function (i) { i.disabled = true; });
      ui.$('.form-actions', form).remove();
      var fb = ui.$('#sq-fb', body);
      fb.innerHTML = ui.renderFeedback(q, sel, ok, { unsure: conf === 'unsure' }) + flagControl(q) +
        '<div class="form-actions"><button type="button" class="btn btn-primary" id="sq-next">' + (session.idx + 1 < session.qids.length ? 'Next question' : 'See summary') + '</button></div>';
      bindFlags(fb);
      fb.focus();
      ui.announce(ok ? 'Correct.' : 'Incorrect.');
      ui.$('#sq-next', fb).addEventListener('click', function () { session.idx++; renderSessionQuestion(main); });
    });
  }

  function renderSessionSummary(main) {
    var body = ui.$('#session-body', main), byId = store.questionsById();
    var r = session.results, ok = r.filter(function (x) { return x.ok; }).length;
    var seenR = r.filter(function (x) { return x.seen; }), unseenR = r.filter(function (x) { return !x.seen; });
    var html = '<section class="card" aria-labelledby="sum-h"><h2 id="sum-h" tabindex="-1">Summary</h2><p class="big">' + ok + ' of ' + r.length + ' correct</p>' +
      '<p class="muted">New to you: ' + unseenR.filter(function (x) { return x.ok; }).length + ' of ' + unseenR.length + ' · Seen before: ' + seenR.filter(function (x) { return x.ok; }).length + ' of ' + seenR.length + '. Scores on repeated questions are weaker evidence of understanding.</p><ol class="result-list">';
    r.forEach(function (x) {
      var q = byId[x.qid];
      html += '<li><span class="' + (x.ok ? 'ok-text' : 'bad-text') + '">' + (x.ok ? '✓ Correct' : '✗ Incorrect') + '</span>' + (x.conf === 'unsure' ? ' <span class="muted">(marked uncertain)</span>' : '') + ' — ' + esc(q.stem) + '</li>';
    });
    html += '</ol><div class="form-actions"><a class="btn btn-primary" href="#/practice">Back to practice</a> <a class="btn" href="#/review/mistakes">Mistake notebook</a></div></section>';
    body.innerHTML = html;
    ui.$('#sum-h', body).focus();
    ui.announce('Set complete. ' + ok + ' of ' + r.length + ' correct.');
    session = null;
  }

  /* ================= TIMED REHEARSAL ================= */

  function startRehearsal(track) {
    if (store.state.activeRehearsal) { location.hash = '#/rehearsal'; return; }
    var label = track === 'psm' ? 'PSM I' : 'PSPO I';
    if (!root.confirm('Start a timed ' + label + ' course rehearsal?\n\n80 questions, 60 minutes. The clock starts now and keeps running even if you leave the page.')) return;
    var seen = store.seenMap();
    var qids = core.sampleRehearsal(SSS.QUESTIONS, track, seen);
    var byId = store.questionsById();
    var start = Date.now();
    var ar = {
      id: 'r' + start, track: track, contentVersion: SSS.CONTENT_VERSION, startedAt: start, deadline: core.makeDeadline(start),
      qids: qids, orders: {}, answers: {}, bookmarks: {}, current: 0, seenBefore: {}
    };
    qids.forEach(function (id) { ar.orders[id] = core.optionOrder(byId[id]); if (seen[id]) ar.seenBefore[id] = true; });
    var ok = store.update(function (s) { s.activeRehearsal = ar; });
    if (!ok) root.alert('Warning: this browser is not saving progress, so the rehearsal will be lost if you refresh or close the tab.');
    location.hash = '#/rehearsal';
  }

  function submitRehearsal(timedOut) {
    if (store.status.stale) return null;
    var st = store.state, ar = st.activeRehearsal;
    if (!ar) return null;
    var byId = store.questionsById();
    var g = core.gradeRehearsal(ar, byId);
    var rec = {
      id: ar.id, track: ar.track, contentVersion: ar.contentVersion || '1.0.0', startedAt: ar.startedAt, submittedAt: Math.min(Date.now(), ar.deadline + 1000), timedOut: !!timedOut,
      total: g.total, correct: g.correct, answered: g.answered, pct: g.pct,
      seenCount: g.seenCount, seenCorrect: g.seenCorrect, unseenCount: g.unseenCount, unseenCorrect: g.unseenCorrect,
      byModule: g.byModule, byType: g.byType, items: g.items, bookmarks: Object.keys(ar.bookmarks), orders: ar.orders
    };
    store.update(function (s) {
      g.items.forEach(function (it) {
        store.recordAnswer(s, byId[it.qid], it.selected, 'rehearsal', ar.bookmarks[it.qid] ? 'unsure' : null, ar.id);
      });
      s.rehearsals.push(rec);
      s.activeRehearsal = null;
    });
    return rec;
  }

  V.rehearsal = function () {
    if (store.status.stale) return { title: 'Reload needed', html: '<h1 tabindex="-1">Reload to continue</h1><p>Another tab saved newer progress. Use the notice above to reload before resuming the rehearsal.</p>' };
    var ar = store.state.activeRehearsal;
    if (!ar) return { title: 'Rehearsal', html: '<h1 tabindex="-1">No rehearsal in progress</h1><p><a href="#/practice">Start one from Practice</a>.</p>' };
    if (core.isExpired(ar.deadline, Date.now())) {
      var rec = submitRehearsal(true);
      return { title: 'Rehearsal', html: '<h1 tabindex="-1">Time expired</h1><p>The 60-minute deadline passed, so your rehearsal was submitted with the answers you had saved.</p><p><a class="btn btn-primary" href="#/rehearsal/result/' + rec.id + '">See results</a></p>' };
    }
    var label = ar.track === 'psm' ? 'PSM I' : 'PSPO I';
    var html = '<div class="rehearsal-bar" role="region" aria-label="Rehearsal status"><div><strong>' + label + ' course rehearsal</strong></div>' +
      '<div class="clock-wrap"><span class="muted">Time left</span> <span id="clock" class="clock" role="timer" aria-live="off">' + core.formatClock(core.remainingMs(ar.deadline, Date.now())) + '</span></div>' +
      '<div><span id="answered-count"></span></div></div>';
    html += '<h1 class="sr-only" tabindex="-1">' + label + ' course rehearsal</h1><div id="rq"></div>';
    html += '<details class="card overview" id="overview"><summary>Answer overview</summary><div id="overview-grid" class="overview-grid"></div><p class="muted">Bookmarked questions you answer correctly are added to your review list as uncertain.</p></details>';
    html += '<div class="card submit-box"><div id="submit-area"><button type="button" class="btn" id="submit-open">Submit rehearsal…</button></div></div>';
    html += '<p class="fine">Feedback appears after you submit or time runs out. A course rehearsal is not an official assessment.</p>';
    return { title: label + ' rehearsal', html: html, mount: mountRehearsal };
  };

  function mountRehearsal(main) {
    var byId = store.questionsById();
    var announced = {};

    function ar() { return store.state.activeRehearsal; }

    function counts() {
      var a = ar(), answered = 0;
      a.qids.forEach(function (id) { if (a.answers[id] && a.answers[id].length) answered++; });
      return { answered: answered, unanswered: a.qids.length - answered, bookmarked: Object.keys(a.bookmarks).length };
    }

    function renderCounts() {
      var c = counts();
      ui.$('#answered-count', main).textContent = c.answered + ' of ' + ar().qids.length + ' answered';
    }

    function renderOverview() {
      var a = ar();
      ui.$('#overview-grid', main).innerHTML = a.qids.map(function (id, i) {
        var ans = a.answers[id] && a.answers[id].length, bm = a.bookmarks[id];
        return '<button type="button" class="ov' + (ans ? ' is-answered' : '') + (bm ? ' is-bookmarked' : '') + (i === a.current ? ' is-current' : '') + '" data-go="' + i + '" aria-label="Question ' + (i + 1) + (ans ? ', answered' : ', unanswered') + (bm ? ', bookmarked' : '') + '">' + (i + 1) + (bm ? '<span aria-hidden="true">★</span>' : '') + '</button>';
      }).join('');
      ui.$$('[data-go]', main).forEach(function (b) {
        b.addEventListener('click', function () { go(Number(b.getAttribute('data-go'))); });
      });
    }

    function go(i) {
      store.update(function (s) { s.activeRehearsal.current = i; });
      renderQuestion(true);
      renderOverview();
    }

    function renderQuestion(focus) {
      var a = ar();
      var id = a.qids[a.current], q = byId[id];
      var bm = !!a.bookmarks[id];
      var wrap = ui.$('#rq', main);
      wrap.innerHTML = '<form id="rq-form" class="quiz card" novalidate>' + ui.renderQuestion(q, { order: a.orders[id], selected: a.answers[id] || [], number: a.current + 1, total: a.qids.length, idPrefix: 'rh' }) +
        '<div class="rq-actions"><button type="button" class="btn" id="rq-prev"' + (a.current === 0 ? ' disabled' : '') + '>← Previous</button>' +
        '<button type="button" class="btn" id="rq-bm" aria-pressed="' + bm + '">' + (bm ? '★ Bookmarked' : '☆ Bookmark') + '</button>' +
        '<button type="button" class="btn btn-primary" id="rq-next"' + (a.current === a.qids.length - 1 ? ' disabled' : '') + '>Next →</button></div></form>';
      var form = ui.$('#rq-form', wrap);
      ui.bindSelectionLimits(form);
      ui.$$('.options input', form).forEach(function (inp) {
        inp.addEventListener('change', function () {
          var sel = ui.readSelection(form, q, 'rh');
          store.update(function (s) { s.activeRehearsal.answers[id] = sel; });
          renderCounts();
          renderOverview();
        });
      });
      ui.$('#rq-prev', form).addEventListener('click', function () { go(a.current - 1); });
      ui.$('#rq-next', form).addEventListener('click', function () { go(a.current + 1); });
      ui.$('#rq-bm', form).addEventListener('click', function () {
        store.update(function (s) { if (s.activeRehearsal.bookmarks[id]) delete s.activeRehearsal.bookmarks[id]; else s.activeRehearsal.bookmarks[id] = true; });
        renderQuestion(false);
        ui.$('#rq-bm', main).focus();
        renderOverview();
      });
      if (focus) { var leg = ui.$('legend', form); leg.setAttribute('tabindex', '-1'); leg.focus(); }
    }

    function finish(timedOut) {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
      var rec = submitRehearsal(timedOut);
      if (rec) location.hash = '#/rehearsal/result/' + rec.id;
    }

    function openSubmit() {
      var c = counts();
      var area = ui.$('#submit-area', main);
      area.innerHTML = '<div role="alertdialog" aria-labelledby="sub-h" aria-describedby="sub-d" class="confirm"><h2 id="sub-h" class="h-small" tabindex="-1">Submit this rehearsal?</h2><p id="sub-d">' +
        (c.unanswered ? '<strong>' + c.unanswered + ' unanswered</strong> question' + (c.unanswered === 1 ? '' : 's') + ' will be scored as incorrect. ' : 'All questions are answered. ') +
        (c.bookmarked ? c.bookmarked + ' bookmarked for review. ' : '') + 'Time left: ' + core.formatClock(core.remainingMs(ar().deadline, Date.now())) + '.</p>' +
        '<p><button type="button" class="btn btn-primary" id="sub-yes">Submit now</button> <button type="button" class="btn" id="sub-no">Keep working</button></p></div>';
      ui.$('#sub-h', area).focus();
      ui.$('#sub-yes', area).addEventListener('click', function () { finish(false); });
      ui.$('#sub-no', area).addEventListener('click', function () {
        area.innerHTML = '<button type="button" class="btn" id="submit-open">Submit rehearsal…</button>';
        ui.$('#submit-open', area).addEventListener('click', openSubmit);
        ui.$('#submit-open', area).focus();
      });
    }

    function tick() {
      if (store.status.stale) return;
      var a = ar();
      if (!a) return;
      var left = core.remainingMs(a.deadline, Date.now());
      var clock = ui.$('#clock', main);
      if (clock) clock.textContent = core.formatClock(left);
      [10, 5, 1].forEach(function (m) {
        if (left <= m * 60000 && left > (m * 60000 - 5000) && !announced[m]) { announced[m] = true; ui.announce(m + ' minute' + (m === 1 ? '' : 's') + ' remaining.'); }
      });
      if (left <= 0) { ui.announce('Time is up. Your rehearsal has been submitted.'); finish(true); }
    }

    renderQuestion(false);
    renderCounts();
    renderOverview();
    ui.$('#submit-open', main).addEventListener('click', openSubmit);
    var timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return function cleanup() { clearInterval(timer); document.removeEventListener('visibilitychange', tick); };
  }

  /* ================= REHEARSAL RESULTS ================= */

  V.result = function (params) {
    var rec = store.state.rehearsals.filter(function (r) { return r.id === params[0]; })[0];
    if (!rec) return V.notFound();
    var byId = store.questionsById();
    var label = rec.track === 'psm' ? 'PSM I' : 'PSPO I';
    var html = '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/practice">Practice</a> <span aria-hidden="true">›</span> Rehearsal results</nav>';
    html += '<h1 tabindex="-1">' + label + ' course rehearsal — ' + rec.pct + '%</h1>';
    if (!core.isCurrentRehearsal(rec, byId)) html += '<div class="callout"><p>Some questions have been revised since this attempt. This result is historical and does not count toward the current rehearsal readiness check.</p></div>';
    html += '<p class="lede">' + rec.correct + ' of ' + rec.total + ' correct · ' + rec.answered + ' answered · ' + ui.fmtDateTime(rec.submittedAt) + (rec.timedOut ? ' · submitted automatically when time expired' : ' · submitted after ' + Math.max(1, Math.round((rec.submittedAt - rec.startedAt) / 60000)) + ' min') + '</p>';
    html += '<div class="callout"><p><strong>How to read this.</strong> This is a course rehearsal, not an official assessment, and it is not a validated prediction of your exam result. ' +
      rec.seenCount + ' of ' + rec.total + ' questions had been seen before. On those you scored ' + (rec.seenCount ? ui.pct(rec.seenCorrect, rec.seenCount) + '%' : '—') + '; on questions new to you, ' + (rec.unseenCount ? ui.pct(rec.unseenCorrect, rec.unseenCount) + '%' : '—') + '. Accuracy on new questions is the stronger evidence.</p></div>';

    html += '<section aria-labelledby="bm-h"><h2 id="bm-h">By module</h2><table class="data-table"><thead><tr><th scope="col">Module</th><th scope="col">Correct</th><th scope="col">Share</th></tr></thead><tbody>';
    Object.keys(rec.byModule).sort(function (a, b) { return a - b; }).forEach(function (n) {
      var b = rec.byModule[n], m = ui.moduleByNum(Number(n)), p = ui.pct(b.correct, b.total);
      html += '<tr' + (p < 70 ? ' class="row-warn"' : '') + '><td><a href="#/module/' + m.id + '">' + m.num + '. ' + esc(m.title) + '</a></td><td>' + b.correct + ' of ' + b.total + '</td><td>' + p + '%' + (p < 70 ? ' <span class="bad-text">· repair</span>' : '') + '</td></tr>';
    });
    html += '</tbody></table><p class="muted">By format: ' + Object.keys(rec.byType).map(function (t) { var b = rec.byType[t]; return ({ single: 'single answer', multi: 'multiple answer', tf: 'true/false' }[t] || t) + ' ' + b.correct + '/' + b.total; }).join(' · ') + '</p></section>';

    html += '<section aria-labelledby="rv-h"><h2 id="rv-h">Review every question</h2><div class="filter-row" role="group" aria-label="Filter questions"><button type="button" class="btn btn-small" data-filter="all" aria-pressed="true">All</button> <button type="button" class="btn btn-small" data-filter="wrong" aria-pressed="false">Incorrect only</button> <button type="button" class="btn btn-small" data-filter="bm" aria-pressed="false">Bookmarked</button></div><ol class="review-list">';
    rec.items.forEach(function (it, i) {
      var q = byId[it.qid];
      if (!q) return;
      var stale = q.v !== it.v;
      var bm = rec.bookmarks.indexOf(it.qid) >= 0;
      html += '<li class="card review-item" data-ok="' + it.correct + '" data-bm="' + bm + '"><p class="qnum">Question ' + (i + 1) + ' · Module ' + q.module + (it.seenBefore ? ' · seen before' : ' · new to you') + (bm ? ' · bookmarked' : '') + '</p><p class="stem">' + esc(q.stem) + '</p>' +
        (stale ? '<p class="warn-text">This question has been revised since your attempt; the explanation below reflects the current version.</p>' : '') +
        ui.renderFeedback(q, it.selected, it.correct) + flagControl(q) + '</li>';
    });
    html += '</ol></section><p><a class="btn btn-primary" href="#/review/mistakes">Open the mistake notebook</a> <a class="btn" href="#/readiness">See readiness evidence</a></p>';
    return {
      title: 'Rehearsal results', html: html,
      mount: function (main) {
        bindFlags(main);
        ui.$$('[data-filter]', main).forEach(function (b) {
          b.addEventListener('click', function () {
            var f = b.getAttribute('data-filter');
            ui.$$('[data-filter]', main).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
            ui.$$('.review-item', main).forEach(function (li) {
              var show = f === 'all' || (f === 'wrong' && li.getAttribute('data-ok') === 'false') || (f === 'bm' && li.getAttribute('data-bm') === 'true');
              li.hidden = !show;
            });
          });
        });
      }
    };
  };

  /* ================= REVIEW ================= */

  function reviewTabs(active) {
    var tabs = [['cards', '#/review', 'Flashcards'], ['mistakes', '#/review/mistakes', 'Mistake notebook'], ['flags', '#/review/flags', 'Flagged questions']];
    return '<nav class="tabs" aria-label="Review sections">' + tabs.map(function (t) {
      return '<a href="' + t[1] + '"' + (t[0] === active ? ' aria-current="page" class="is-active"' : '') + '>' + t[2] + '</a>';
    }).join('') + '</nav>';
  }

  V.review = function (params) {
    var sub = params[0] || 'cards';
    if (sub === 'mistakes') return mistakesView();
    if (sub === 'flags') return flagsView();
    return cardsView();
  };

  function cardsView() {
    var st = store.state, now = Date.now();
    var due = ui.dueCards(now);
    var eligible = SSS.CARDS.filter(ui.cardEligible);
    var html = '<h1 tabindex="-1">Review</h1>' + reviewTabs('cards');
    html += '<p class="lede">48 cards on concepts, distinctions and decision rules. Cards join your rotation when you start a module. Try to answer aloud before revealing. Successful recall schedules the next review roughly 1, 3, then 7 days later; a missed card comes back soon. This is a practical heuristic, not an optimized algorithm.</p>';
    html += '<div class="card"><p><strong>' + due.length + '</strong> card' + (due.length === 1 ? '' : 's') + ' due now · ' + eligible.length + ' of 48 in rotation</p><div class="form-actions"><button class="btn btn-primary" id="cards-due"' + (due.length ? '' : ' disabled') + '>Review due cards</button> <button class="btn" id="cards-all">Review all 48</button></div>' +
      '<form id="cards-mod-form" class="inline-form"><label for="cards-mod">Or one module:</label> <select id="cards-mod">' + SSS.MODULES.map(function (m) { return '<option value="' + m.id + '">' + m.num + '. ' + esc(m.title) + '</option>'; }).join('') + '</select> <button class="btn" type="submit">Review module cards</button></form></div>';
    html += '<div id="card-area"></div>';
    var reviewed = SSS.CARDS.filter(function (c) { return st.cards[c.id]; });
    if (reviewed.length) {
      html += '<details class="card"><summary>Card schedule (' + reviewed.length + ' reviewed)</summary><table class="data-table"><thead><tr><th scope="col">Card</th><th scope="col">Reviews</th><th scope="col">Next due</th></tr></thead><tbody>' +
        reviewed.map(function (c) { var cs = st.cards[c.id]; return '<tr><td>' + esc(c.front) + '</td><td>' + cs.reviews + '</td><td>' + (cs.due <= now ? 'Now' : ui.fmtDateTime(cs.due)) + '</td></tr>'; }).join('') + '</tbody></table></details>';
    }
    return {
      title: 'Flashcards', html: html,
      mount: function (main) {
        function begin(cards, label) {
          cardSession = { queue: cards.map(function (c) { return c.id; }), idx: 0, label: label, results: { missed: 0, partial: 0, recalled: 0 }, requeued: {} };
          renderCard(main);
        }
        ui.$('#cards-due', main).addEventListener('click', function () { begin(core.shuffle(ui.dueCards(Date.now())), 'Due cards'); });
        ui.$('#cards-all', main).addEventListener('click', function () { begin(core.shuffle(SSS.CARDS), 'All cards'); });
        ui.$('#cards-mod-form', main).addEventListener('submit', function (e) {
          e.preventDefault();
          var id = ui.$('#cards-mod', main).value;
          begin(SSS.CARDS.filter(function (c) { return c.module === id; }), 'Module cards');
        });
      }
    };
  }

  function renderCard(main) {
    var area = ui.$('#card-area', main);
    var cs = cardSession;
    if (cs.idx >= cs.queue.length) {
      area.innerHTML = '<section class="card" aria-labelledby="cd-h"><h2 id="cd-h" tabindex="-1">Session complete</h2><p>Recalled ' + cs.results.recalled + ' · partly ' + cs.results.partial + ' · missed ' + cs.results.missed + '.</p><p><a class="btn" href="#/review">Back to review</a></p></section>';
      ui.$('#cd-h', area).focus();
      cardSession = null;
      return;
    }
    var card = SSS.CARDS.filter(function (c) { return c.id === cs.queue[cs.idx]; })[0];
    var m = ui.moduleById(card.module);
    area.innerHTML = '<section class="card flashcard" aria-labelledby="fc-h"><p class="muted">' + esc(cs.label) + ' · ' + (cs.idx + 1) + ' of ' + cs.queue.length + ' · Module ' + m.num + '</p><h2 id="fc-h" class="fc-front" tabindex="-1">' + esc(card.front) + '</h2>' +
      '<div id="fc-back" hidden><p class="fc-back">' + esc(card.back) + '</p><p class="src">Reading: ' + (card.sources || []).map(ui.sourceLink).join(' · ') + '</p><fieldset class="rate"><legend>How did you do?</legend><button type="button" class="btn" data-rate="missed">Missed it</button> <button type="button" class="btn" data-rate="partial">Partly</button> <button type="button" class="btn btn-primary" data-rate="recalled">Recalled it</button></fieldset></div>' +
      '<p id="fc-reveal-wrap"><button type="button" class="btn btn-primary" id="fc-reveal">Show answer</button></p><p class="muted"><a href="#/module/' + m.id + '">Module ' + m.num + ': ' + esc(m.title) + '</a></p></section>';
    ui.$('#fc-h', area).focus();
    ui.$('#fc-reveal', area).addEventListener('click', function () {
      ui.$('#fc-back', area).hidden = false;
      ui.$('#fc-reveal-wrap', area).remove();
      ui.$('[data-rate="recalled"]', area).focus();
    });
    ui.$$('[data-rate]', area).forEach(function (b) {
      b.addEventListener('click', function () {
        var rating = b.getAttribute('data-rate');
        store.update(function (s) { s.cards[card.id] = core.reviewCard(s.cards[card.id], rating, Date.now()); });
        cs.results[rating]++;
        if (rating === 'missed' && !cs.requeued[card.id]) { cs.requeued[card.id] = true; cs.queue.push(card.id); }
        cs.idx++;
        renderCard(main);
      });
    });
  }

  function mistakesView() {
    var st = store.state, byId = store.questionsById();
    var un = ui.unresolvedMistakes();
    var resolved = Object.keys(st.mistakes).filter(function (id) { return st.mistakes[id].resolved && byId[id]; });
    var html = '<h1 tabindex="-1">Review</h1>' + reviewTabs('mistakes');
    html += '<p class="lede">Every incorrect answer, and every correct answer you marked as uncertain. An item resolves when you later answer it correctly without marking it uncertain, or when you mark it resolved after studying the explanation.</p>';
    html += '<p class="form-actions"><a class="btn btn-primary" href="#/practice" id="go-missed">Practice these questions</a></p>';
    if (!un.length) html += '<div class="card"><p>Your notebook is empty. Incorrect and uncertain answers will appear here.</p></div>';
    var groups = {};
    un.forEach(function (id) { var n = byId[id].module; (groups[n] = groups[n] || []).push(id); });
    Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (n) {
      var m = ui.moduleByNum(Number(n));
      html += '<section aria-labelledby="mg-' + n + '"><h2 id="mg-' + n + '">' + ui.trackTag(m.track) + ' Module ' + m.num + ': ' + esc(m.title) + ' <span class="muted">(' + groups[n].length + ')</span></h2>' + (groups[n].length >= 2 ? '<p class="warn-text">Recurring confusion: revisit this module before more practice.</p>' : '') + '<ul class="review-list">';
      groups[n].forEach(function (id) {
        var q = byId[id], mk = st.mistakes[id];
        var stale = mk.v !== q.v;
        html += '<li class="card review-item"><p class="qnum">' + (mk.reason === 'incorrect' ? '<span class="bad-text">Answered incorrectly</span>' : '<span class="warn-text">Correct but uncertain</span>') + (mk.count > 1 ? ' · ' + mk.count + ' times' : '') + ' · added ' + ui.fmtDate(mk.addedAt) + '</p><p class="stem">' + esc(q.stem) + '</p>' +
          (stale ? '<p class="warn-text">This question was revised after your attempt.</p>' : '') +
          ui.renderFeedback(q, mk.lastSelected || [], mk.reason !== 'incorrect') +
          '<p><button type="button" class="btn btn-small" data-resolve="' + id + '">Mark resolved</button></p></li>';
      });
      html += '</ul></section>';
    });
    if (resolved.length) {
      html += '<details class="card"><summary>Resolved items (' + resolved.length + ')</summary><ul>' + resolved.map(function (id) {
        return '<li>' + esc(byId[id].stem) + ' <span class="muted">— resolved ' + ui.fmtDate(st.mistakes[id].resolvedAt) + '</span> <button type="button" class="btn btn-small" data-reopen="' + id + '">Reopen</button></li>';
      }).join('') + '</ul></details>';
    }
    return {
      title: 'Mistake notebook', html: html,
      mount: function (main) {
        var gm = ui.$('#go-missed', main);
        if (!un.length) gm.setAttribute('aria-disabled', 'true');
        gm.addEventListener('click', function (e) {
          e.preventDefault();
          if (!un.length) return;
          startSession('missed', 'Missed and uncertain questions', core.shuffle(un.map(function (id) { return byId[id]; })).slice(0, 20));
        });
        ui.$$('[data-resolve]', main).forEach(function (b) {
          b.addEventListener('click', function () {
            var id = b.getAttribute('data-resolve');
            store.update(function (s) { s.mistakes[id].resolved = true; s.mistakes[id].resolvedAt = Date.now(); s.mistakes[id].resolvedBy = 'manual'; });
            ui.announce('Marked resolved.');
            SSS.app.rerender();
          });
        });
        ui.$$('[data-reopen]', main).forEach(function (b) {
          b.addEventListener('click', function () {
            var id = b.getAttribute('data-reopen');
            store.update(function (s) { s.mistakes[id].resolved = false; delete s.mistakes[id].resolvedAt; });
            SSS.app.rerender();
          });
        });
      }
    };
  }

  function flagsView() {
    var st = store.state, byId = store.questionsById();
    var ids = Object.keys(st.flags).filter(function (id) { return byId[id]; });
    var html = '<h1 tabindex="-1">Review</h1>' + reviewTabs('flags');
    html += '<p class="lede">Questions you flagged as unclear or questionable. Check each against its cited source. If the official text does not support the course answer, trust the source.</p>';
    if (!ids.length) html += '<div class="card"><p>No flagged questions. You can flag any question after answering it.</p></div>';
    html += '<ul class="review-list">' + ids.map(function (id) {
      var q = byId[id], f = st.flags[id];
      return '<li class="card review-item"><p class="qnum">Module ' + q.module + ' · ' + esc(q.id) + ' (version ' + q.v + ') · flagged ' + ui.fmtDate(f.at) + '</p><p class="stem">' + esc(q.stem) + '</p>' + (f.note ? '<p><strong>Your note:</strong> ' + esc(f.note) + '</p>' : '') +
        ui.renderFeedback(q, q.correct, true, { neutral: true }) + flagControl(q) + '</li>';
    }).join('') + '</ul>';
    return { title: 'Flagged questions', html: html, mount: function (main) { bindFlags(main); } };
  }

  SSS.practice = { startRehearsal: startRehearsal, submitRehearsal: submitRehearsal };
})(typeof window !== 'undefined' ? window : globalThis);
