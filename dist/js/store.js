/* Progress store: browser-local, versioned, with a visible in-memory fallback
   when storage is unavailable or full. Never claims a save that failed. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var core = SSS.core;
  var KEY = 'scrum-study-studio:v1';

  var state = null;
  var lastSavedRaw = null;
  var status = { persistent: true, message: '' };
  var listeners = [];

  function now() { return Date.now(); }

  function catalog() {
    var c = { modules: {}, scenarios: {}, questions: {}, cards: {}, tasks: {}, contentVersion: SSS.CONTENT_VERSION };
    SSS.MODULES.forEach(function (m) { c.modules[m.id] = m; });
    SSS.SCENARIOS.forEach(function (s) { c.scenarios[s.id] = s; });
    SSS.QUESTIONS.forEach(function (q) { c.questions[q.id] = q; });
    SSS.CARDS.forEach(function (f) { c.cards[f.id] = true; });
    Object.keys(SSS.MANUAL_TASKS).forEach(function (t) { c.tasks[t] = true; });
    return c;
  }

  function storageAvailable() {
    try {
      var k = KEY + ':probe';
      root.localStorage.setItem(k, '1');
      root.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  }

  function load() {
    var fresh = core.emptyState(now(), SSS.CONTENT_VERSION);
    if (!storageAvailable()) {
      state = fresh;
      status = { persistent: false, message: 'This browser is not allowing the course to save progress (storage is blocked or unavailable). Your work will last only until you close this tab. Use Progress & data → Export to keep a copy.' };
      return state;
    }
    var raw = null;
    try { raw = root.localStorage.getItem(KEY); } catch (e) { raw = null; }
    lastSavedRaw = raw;
    if (!raw) { state = fresh; save(); return state; }
    var parsed = null;
    try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
    var check = parsed ? core.validateProgress(parsed, catalog()) : { ok: false, errors: ['Saved progress could not be read.'] };
    if (!check.ok) {
      // Keep the unreadable copy rather than overwriting it silently.
      try { root.localStorage.setItem(KEY + ':unreadable-' + now(), raw); } catch (e) { /* ignore */ }
      state = fresh;
      status = { persistent: true, message: 'Saved progress in this browser could not be read, so the course started fresh. The unreadable copy was kept in browser storage. Details: ' + check.errors.slice(0, 3).join(' ') };
      save();
      return state;
    }
    state = parsed;
    state.contentVersion = SSS.CONTENT_VERSION;
    if (state.settings.schedule === '4') { state.settings.schedule = '12'; save(); }
    return state;
  }

  function markStale() {
    status = { persistent: true, stale: true, message: 'Another course tab saved newer progress. This tab is read-only so it cannot overwrite that work. Reload to continue with the latest progress. You can export this tab before reloading.' };
    listeners.forEach(function (l) { l(); });
  }

  function ensureFresh() {
    if (status.stale) return false;
    try { if (root.localStorage.getItem(KEY) !== lastSavedRaw) { markStale(); return false; } }
    catch (e) { /* blocked storage uses the existing visible in-memory fallback */ }
    return true;
  }

  if (root.addEventListener) root.addEventListener('storage', function (e) {
    if (state && (e.key === KEY || e.key === null) && e.newValue !== lastSavedRaw) markStale();
  });

  function save() {
    if (!ensureFresh()) return false;
    state.updated = now();
    state.revision = (state.revision || 0) + 1;
    try {
      var raw = JSON.stringify(state);
      root.localStorage.setItem(KEY, raw);
      lastSavedRaw = raw;
      if (!status.persistent) status = { persistent: true, message: '' };
      return true;
    } catch (e) {
      status = { persistent: false, message: 'Progress could not be saved in this browser (storage may be full or blocked). Recent changes exist only in this tab. Export your progress now to avoid losing it.' };
      return false;
    }
  }

  function update(fn) {
    if (!ensureFresh()) return false;
    fn(state);
    var ok = save();
    listeners.forEach(function (l) { l(); });
    return ok;
  }

  function onChange(fn) { listeners.push(fn); }

  /* ---------- derived lookups ---------- */

  var qById = null;
  function questionsById() {
    if (!qById) { qById = {}; SSS.QUESTIONS.forEach(function (q) { qById[q.id] = q; }); }
    return qById;
  }

  // Questions answered at least once in their current content version.
  function seenMap() {
    var byId = questionsById(), seen = {};
    state.attempts.forEach(function (a) {
      var q = byId[a.qid];
      if (q && (a.v || 1) === q.v) seen[a.qid] = true;
    });
    return seen;
  }

  function moduleState(id) { return state.modules[id] || {}; }

  function isModuleComplete(id) { return !!moduleState(id).complete; }

  function refreshModuleCompletion(s, id) {
    var ms = s.modules[id];
    if (!ms) return;
    if (!ms.complete && ms.activityDone && ms.teachRating && ms.checkDone) {
      ms.complete = true;
      ms.completedAt = now();
    }
  }

  /* ---------- recording answers ---------- */

  // Records one answer and maintains the mistake notebook.
  // confidence: 'unsure' | null.
  function recordAnswer(s, q, selected, mode, confidence, extra) {
    var ok = core.isCorrect(q, selected);
    var at = now();
    s.attempts.push({
      qid: q.id, v: q.v, mode: mode, selected: selected.slice(), correct: ok,
      confidence: confidence || null, at: at, ref: extra || null
    });
    var existing = s.mistakes[q.id];
    if (!ok) {
      s.mistakes[q.id] = { v: q.v, addedAt: existing && !existing.resolved ? existing.addedAt : at, reason: 'incorrect', resolved: false, lastSelected: selected.slice(), count: ((existing && existing.count) || 0) + 1 };
    } else if (confidence === 'unsure') {
      if (!existing || existing.resolved) {
        s.mistakes[q.id] = { v: q.v, addedAt: at, reason: 'uncertain', resolved: false, lastSelected: selected.slice(), count: ((existing && existing.count) || 0) + 1 };
      } else {
        existing.lastSelected = selected.slice();
      }
    } else if (existing && !existing.resolved) {
      existing.resolved = true;
      existing.resolvedAt = at;
      existing.resolvedBy = 'confident-correct';
    }
    return ok;
  }

  /* ---------- import / export / reset ---------- */

  function exportJSON() { return JSON.stringify(state, null, 2); }

  function parseImport(text) {
    if (typeof text !== 'string') return { ok: false, errors: ['No file content.'] };
    if (text.length > core.MAX_IMPORT_BYTES) return { ok: false, errors: ['The file is larger than 2 MB, which is far bigger than any course progress file. Import was cancelled.'] };
    var data;
    try { data = JSON.parse(text); } catch (e) { return { ok: false, errors: ['The file is not valid JSON.'] }; }
    var res = core.validateProgress(data, catalog());
    res.data = res.ok ? data : null;
    return res;
  }

  function replaceWith(data) {
    if (!ensureFresh() || !core.validateProgress(data, catalog()).ok) return false;
    var previous = state;
    state = JSON.parse(JSON.stringify(data));
    state.settings.schedule = '12';
    state.contentVersion = SSS.CONTENT_VERSION;
    var ok = save();
    if (!ok) {
      state = previous;
      return false;
    }
    listeners.forEach(function (l) { l(); });
    return true;
  }

  function reset() {
    if (!ensureFresh()) return false;
    state = core.emptyState(now(), SSS.CONTENT_VERSION);
    var ok = save();
    listeners.forEach(function (l) { l(); });
    return ok;
  }

  SSS.store = {
    load: load,
    save: save,
    update: update,
    onChange: onChange,
    ensureFresh: ensureFresh,
    get state() { return state; },
    get status() { return status; },
    catalog: catalog,
    questionsById: questionsById,
    seenMap: seenMap,
    moduleState: moduleState,
    isModuleComplete: isModuleComplete,
    refreshModuleCompletion: refreshModuleCompletion,
    recordAnswer: recordAnswer,
    exportJSON: exportJSON,
    parseImport: parseImport,
    replaceWith: replaceWith,
    reset: reset
  };
})(typeof window !== 'undefined' ? window : globalThis);
