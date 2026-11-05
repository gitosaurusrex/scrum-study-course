/* Scrum Study Studio — pure logic (no DOM). Loaded in the browser as a classic
   script and in Node by the test scripts. Everything here is deterministic
   given its inputs, except where a random function is passed in. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};

  var DAY = 24 * 60 * 60 * 1000;
  var REHEARSAL_SIZE = 80;
  var REHEARSAL_MINUTES = 60;
  var CARD_INTERVAL_DAYS = [0, 1, 3, 7];
  var MISSED_CARD_DELAY_MS = 10 * 60 * 1000;
  var SCHEMA_VERSION = 1;
  var MAX_IMPORT_BYTES = 2 * 1024 * 1024;

  /* ---------- scoring ---------- */

  // Exact-set match, no partial credit. `selected` and `correct` are arrays of
  // original option indexes. An empty selection is always incorrect.
  function isCorrect(question, selected) {
    if (!selected || !selected.length) return false;
    var a = uniqueSorted(selected);
    var b = uniqueSorted(question.correct);
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function uniqueSorted(arr) {
    var seen = {}, out = [];
    for (var i = 0; i < arr.length; i++) {
      var n = Number(arr[i]);
      if (!seen[n]) { seen[n] = true; out.push(n); }
    }
    return out.sort(function (x, y) { return x - y; });
  }

  function selectionCount(question) {
    return question.type === 'multi' ? question.correct.length : 1;
  }

  /* ---------- shuffling ---------- */

  function shuffle(arr, rand) {
    rand = rand || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Returns a display order: an array of original option indexes. True/false
  // questions keep their natural order so "True" always appears first.
  function optionOrder(question, rand) {
    var idx = question.options.map(function (_, i) { return i; });
    if (question.type === 'tf') return idx;
    return shuffle(idx, rand);
  }

  /* ---------- rehearsal sampling ---------- */

  function eligibleQuestions(questions, track) {
    return questions.filter(function (q) {
      return q.track === 'shared' || q.track === track;
    });
  }

  // Sample `size` questions spread evenly across modules. Within each module,
  // unseen questions are preferred so the rehearsal gives fresher evidence.
  function sampleRehearsal(questions, track, seen, rand, size) {
    rand = rand || Math.random;
    size = size || REHEARSAL_SIZE;
    seen = seen || {};
    var pool = eligibleQuestions(questions, track);
    var byModule = {};
    pool.forEach(function (q) { (byModule[q.module] = byModule[q.module] || []).push(q); });
    var modules = Object.keys(byModule).sort(function (a, b) { return a - b; });
    var base = Math.floor(size / modules.length);
    var extra = size - base * modules.length;
    var extraModules = {};
    shuffle(modules, rand).slice(0, extra).forEach(function (m) { extraModules[m] = true; });
    var picked = [];
    modules.forEach(function (m) {
      var want = base + (extraModules[m] ? 1 : 0);
      var list = byModule[m];
      var unseen = shuffle(list.filter(function (q) { return !seen[q.id]; }), rand);
      var seenList = shuffle(list.filter(function (q) { return seen[q.id]; }), rand);
      picked = picked.concat(unseen.concat(seenList).slice(0, want));
    });
    // A module with fewer questions than its share leaves a shortfall; fill it
    // from the remaining pool.
    if (picked.length < size) {
      var ids = {};
      picked.forEach(function (q) { ids[q.id] = true; });
      var rest = shuffle(pool.filter(function (q) { return !ids[q.id]; }), rand);
      picked = picked.concat(rest.slice(0, size - picked.length));
    }
    return shuffle(picked, rand).map(function (q) { return q.id; });
  }

  /* ---------- timed attempts ---------- */

  function makeDeadline(startMs, minutes) {
    return startMs + (minutes || REHEARSAL_MINUTES) * 60 * 1000;
  }

  function remainingMs(deadline, nowMs) {
    return Math.max(0, deadline - nowMs);
  }

  function isExpired(deadline, nowMs) {
    return nowMs >= deadline;
  }

  function formatClock(ms) {
    var total = Math.ceil(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // Grades a finished rehearsal. `seenBefore` marks questions answered in an
  // earlier session before the rehearsal began.
  function gradeRehearsal(attempt, questionsById) {
    var res = {
      total: attempt.qids.length, correct: 0, answered: 0,
      seenCount: 0, seenCorrect: 0, unseenCount: 0, unseenCorrect: 0,
      byModule: {}, byType: {}, items: []
    };
    attempt.qids.forEach(function (id) {
      var q = questionsById[id];
      var sel = (attempt.answers && attempt.answers[id]) || [];
      var ok = !!q && isCorrect(q, sel);
      if (sel.length) res.answered++;
      if (ok) res.correct++;
      var wasSeen = !!(attempt.seenBefore && attempt.seenBefore[id]);
      if (wasSeen) { res.seenCount++; if (ok) res.seenCorrect++; }
      else { res.unseenCount++; if (ok) res.unseenCorrect++; }
      var mk = q ? q.module : 0;
      var bm = res.byModule[mk] = res.byModule[mk] || { total: 0, correct: 0 };
      bm.total++; if (ok) bm.correct++;
      var tk = q ? q.type : 'unknown';
      var bt = res.byType[tk] = res.byType[tk] || { total: 0, correct: 0 };
      bt.total++; if (ok) bt.correct++;
      res.items.push({ qid: id, v: q ? q.v : 0, selected: sel.slice(), correct: ok, seenBefore: wasSeen });
    });
    res.pct = res.total ? Math.round((res.correct / res.total) * 1000) / 10 : 0;
    return res;
  }

  /* ---------- flashcard review ---------- */

  // rating: 'missed' | 'partial' | 'recalled'. Returns the new card state.
  // Intervals of roughly 1, 3 and 7 days are a practical heuristic only.
  function reviewCard(card, rating, nowMs) {
    var box = card && typeof card.box === 'number' ? card.box : 0;
    var due;
    if (rating === 'missed') {
      box = 0;
      due = nowMs + MISSED_CARD_DELAY_MS;
    } else if (rating === 'partial') {
      box = Math.max(1, box);
      due = nowMs + DAY;
    } else {
      box = Math.min(CARD_INTERVAL_DAYS.length - 1, box + 1);
      due = nowMs + CARD_INTERVAL_DAYS[box] * DAY;
    }
    var prevLast = card && card.last;
    var history = (card && card.history ? card.history.slice(-19) : []);
    history.push({ at: nowMs, rating: rating, gapDays: prevLast ? Math.floor((nowMs - prevLast) / DAY) : null });
    return { box: box, due: due, last: nowMs, reviews: ((card && card.reviews) || 0) + 1, history: history };
  }

  function isCardDue(card, nowMs) {
    if (!card) return true;
    return card.due <= nowMs;
  }

  /* ---------- dates ---------- */

  function todayISO(nowMs) {
    var d = new Date(nowMs);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function addDaysISO(iso, days) {
    var p = iso.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2] + days);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function isValidISODate(s) {
    if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    var p = s.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    return d.getFullYear() === p[0] && d.getMonth() === p[1] - 1 && d.getDate() === p[2];
  }

  function dayKey(ms) { return todayISO(ms); }

  /* ---------- progress state ---------- */

  function emptyState(nowMs, contentVersion) {
    return {
      schema: SCHEMA_VERSION,
      contentVersion: contentVersion,
      created: nowMs,
      updated: nowMs,
      settings: { schedule: '12', startDate: todayISO(nowMs) },
      modules: {},
      notes: {},
      scenarios: {},
      attempts: [],
      mistakes: {},
      flags: {},
      cards: {},
      rehearsals: [],
      activeRehearsal: null,
      official: [],
      checklist: {},
      planTasks: {}
    };
  }

  function isPlainObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  // Validates an imported progress object. `catalog` holds the known content
  // IDs: { modules, scenarios, questions, cards, tasks } as lookup objects.
  // Returns { ok, errors, warnings }. It never mutates the input.
  function validateProgress(data, catalog) {
    return SSS.progressValidation(data, catalog);
  }

  /* ---------- readiness helpers ---------- */

  // Rehearsals at or above `threshold` and the number of distinct days they fell on.
  function strongRehearsals(rehearsals, track, threshold, questionsById) {
    var list = rehearsals.filter(function (r) { return r.track === track && r.pct >= threshold && (!questionsById || isCurrentRehearsal(r, questionsById)); });
    var days = {};
    list.forEach(function (r) { days[dayKey(r.submittedAt)] = true; });
    return { list: list, distinctDays: Object.keys(days).length };
  }

  function isCurrentRehearsal(r, questionsById) {
    if (r.contentVersion && r.contentVersion !== SSS.CONTENT_VERSION) return false;
    return Array.isArray(r.items) && r.items.length === REHEARSAL_SIZE && r.items.every(function (it) { var q=questionsById[it.qid]; return q && it.v === q.v; });
  }

  // Two self-reported results at 100% on different dates for a named assessment.
  function separatedPerfectResults(official, assessment) {
    var days = {};
    official.forEach(function (o) { if (o.assessment === assessment && o.score >= 100) days[o.date] = true; });
    return Object.keys(days).length;
  }

  SSS.core = {
    DAY: DAY,
    REHEARSAL_SIZE: REHEARSAL_SIZE,
    REHEARSAL_MINUTES: REHEARSAL_MINUTES,
    CARD_INTERVAL_DAYS: CARD_INTERVAL_DAYS,
    SCHEMA_VERSION: SCHEMA_VERSION,
    MAX_IMPORT_BYTES: MAX_IMPORT_BYTES,
    isCorrect: isCorrect,
    selectionCount: selectionCount,
    shuffle: shuffle,
    optionOrder: optionOrder,
    eligibleQuestions: eligibleQuestions,
    sampleRehearsal: sampleRehearsal,
    makeDeadline: makeDeadline,
    remainingMs: remainingMs,
    isExpired: isExpired,
    formatClock: formatClock,
    gradeRehearsal: gradeRehearsal,
    reviewCard: reviewCard,
    isCardDue: isCardDue,
    todayISO: todayISO,
    addDaysISO: addDaysISO,
    isValidISODate: isValidISODate,
    dayKey: dayKey,
    emptyState: emptyState,
    validateProgress: validateProgress,
    strongRehearsals: strongRehearsals,
    isCurrentRehearsal: isCurrentRehearsal,
    separatedPerfectResults: separatedPerfectResults
  };
})(typeof window !== 'undefined' ? window : globalThis);
