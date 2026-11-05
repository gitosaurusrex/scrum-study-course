// Focused tests for scoring, sampling, deadlines, review scheduling, persistence and import.
// Run: node --test scripts/
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { load, memoryStorage } = require('./load');

function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const SSS = load();
const core = SSS.core;
const byId = {};
SSS.QUESTIONS.forEach((q) => { byId[q.id] = q; });
const single = SSS.QUESTIONS.find((q) => q.type === 'single');
const multi = SSS.QUESTIONS.find((q) => q.type === 'multi');
const tf = SSS.QUESTIONS.find((q) => q.type === 'tf');

test('scoring: single, true/false and empty answers', () => {
  assert.equal(core.isCorrect(single, single.correct), true);
  const wrong = single.options.map((_, i) => i).find((i) => i !== single.correct[0]);
  assert.equal(core.isCorrect(single, [wrong]), false);
  assert.equal(core.isCorrect(single, []), false);
  assert.equal(core.isCorrect(single, null), false);
  assert.equal(core.isCorrect(tf, tf.correct), true);
  assert.equal(core.isCorrect(tf, [1 - tf.correct[0]]), false);
});

test('scoring: multiple answer requires the exact set, in any order, no partial credit', () => {
  const c = multi.correct;
  assert.equal(core.isCorrect(multi, c.slice().reverse()), true);
  assert.equal(core.isCorrect(multi, c.slice(0, 1)), false, 'subset gets no credit');
  const extra = multi.options.map((_, i) => i).find((i) => c.indexOf(i) < 0);
  assert.equal(core.isCorrect(multi, c.concat([extra])), false, 'superset gets no credit');
  assert.equal(core.isCorrect(multi, c.concat([c[0]])), true, 'duplicate selections are ignored');
  assert.equal(core.selectionCount(multi), c.length);
});

test('shuffled option order keeps answers attached to their original options', () => {
  const rand = seeded(42);
  SSS.QUESTIONS.forEach((q) => {
    for (let k = 0; k < 5; k++) {
      const order = core.optionOrder(q, rand);
      assert.deepEqual(Array.from(order).sort((a, b) => a - b), Array.from(q.options, (_, i) => i), q.id + ' order is a permutation');
      // Simulate a learner choosing the displayed positions whose text is a correct option.
      const chosenValues = order.filter((origIdx) => q.correct.indexOf(origIdx) >= 0);
      assert.equal(core.isCorrect(q, chosenValues), true, q.id);
    }
    if (q.type === 'tf') assert.deepEqual(Array.from(core.optionOrder(q, rand)), [0, 1], 'true/false keeps natural order');
  });
});

test('rehearsal sampling: 80 unique eligible questions covering every module and format', () => {
  ['psm', 'pspo'].forEach((track, n) => {
    const ids = core.sampleRehearsal(SSS.QUESTIONS, track, {}, seeded(7 + n));
    assert.equal(ids.length, 80);
    assert.equal(new Set(ids).size, 80, 'no duplicates');
    const counts = {};
    const types = new Set();
    ids.forEach((id) => {
      const q = byId[id];
      assert.ok(q.track === 'shared' || q.track === track, id + ' eligible for ' + track);
      counts[q.module] = (counts[q.module] || 0) + 1;
      types.add(q.type);
    });
    assert.equal(Object.keys(counts).length, 12, 'all 12 relevant modules represented');
    Object.values(counts).forEach((c) => assert.ok(c === 6 || c === 7, 'balanced coverage'));
    assert.deepEqual([...types].sort(), ['multi', 'single', 'tf']);
  });
});

test('rehearsal sampling prefers unseen questions', () => {
  const seen = {};
  SSS.QUESTIONS.filter((q) => q.module === 1).slice(0, 5).forEach((q) => { seen[q.id] = true; });
  const ids = core.sampleRehearsal(SSS.QUESTIONS, 'psm', seen, seeded(3));
  const unseenM1 = SSS.QUESTIONS.filter((q) => q.module === 1 && !seen[q.id]).map((q) => q.id);
  unseenM1.forEach((id) => assert.ok(ids.indexOf(id) >= 0, id + ' (unseen) should be picked before seen ones'));
});

test('timed attempts use an absolute deadline', () => {
  const start = Date.UTC(2026, 9, 13, 9, 0, 0);
  const deadline = core.makeDeadline(start);
  assert.equal(deadline - start, 60 * 60 * 1000);
  assert.equal(core.isExpired(deadline, deadline - 1), false);
  assert.equal(core.isExpired(deadline, deadline), true);
  // A tab that slept for two hours still sees the deadline as passed.
  assert.equal(core.isExpired(deadline, start + 2 * 60 * 60 * 1000), true);
  assert.equal(core.remainingMs(deadline, deadline + 5000), 0);
  assert.equal(core.formatClock(60 * 60 * 1000), '60:00');
  assert.equal(core.formatClock(61 * 1000), '1:01');
  assert.equal(core.formatClock(500), '0:01');
});

test('grading reports seen/unseen and unanswered questions honestly', () => {
  const qids = SSS.QUESTIONS.slice(0, 4).map((q) => q.id);
  const answers = {};
  answers[qids[0]] = byId[qids[0]].correct;            // correct, seen
  answers[qids[1]] = byId[qids[1]].correct;            // correct, unseen
  answers[qids[2]] = [ (byId[qids[2]].correct[0] + 1) % byId[qids[2]].options.length ]; // wrong
  // qids[3] unanswered
  const res = core.gradeRehearsal({ qids, answers, seenBefore: { [qids[0]]: true } }, byId);
  assert.equal(res.total, 4);
  assert.equal(res.correct, 2);
  assert.equal(res.answered, 3);
  assert.equal(res.seenCount, 1);
  assert.equal(res.seenCorrect, 1);
  assert.equal(res.unseenCount, 3);
  assert.equal(res.unseenCorrect, 1);
  assert.equal(res.pct, 50);
  assert.equal(res.items[3].correct, false);
  assert.deepEqual(Array.from(res.items[3].selected), []);
});

test('flashcard intervals: about 1, 3, 7 days on recall; missed returns soon', () => {
  const DAY = core.DAY;
  let t = Date.UTC(2026, 9, 13);
  let c = core.reviewCard(undefined, 'recalled', t);
  assert.equal(c.box, 1); assert.equal(c.due - t, DAY);
  t = c.due; c = core.reviewCard(c, 'recalled', t);
  assert.equal(c.box, 2); assert.equal(c.due - t, 3 * DAY);
  t = c.due; c = core.reviewCard(c, 'recalled', t);
  assert.equal(c.box, 3); assert.equal(c.due - t, 7 * DAY);
  t = c.due; c = core.reviewCard(c, 'recalled', t);
  assert.equal(c.box, 3, 'stays at the longest interval');
  t = c.due; c = core.reviewCard(c, 'missed', t);
  assert.equal(c.box, 0); assert.equal(c.due - t, 10 * 60 * 1000);
  c = core.reviewCard(c, 'partial', t);
  assert.equal(c.box, 1); assert.equal(c.due - t, DAY);
  assert.equal(c.reviews, 6);
  assert.equal(c.history[c.history.length - 1].gapDays, 0);
});

test('validation accepts fresh progress and rejects malformed data without mutating it', () => {
  const S2 = load();
  const cat = S2.store.catalog();
  const fresh = S2.core.emptyState(Date.now(), S2.CONTENT_VERSION);
  assert.equal(S2.core.validateProgress(fresh, cat).ok, true);

  const bad = JSON.parse(JSON.stringify(fresh));
  bad.schema = 99;
  assert.equal(S2.core.validateProgress(bad, cat).ok, false);

  const unknown = JSON.parse(JSON.stringify(fresh));
  unknown.modules.m99 = { complete: true };
  unknown.attempts.push({ qid: 'q99-01', selected: [0], correct: true, at: 1 });
  const before = JSON.stringify(unknown);
  const r = S2.core.validateProgress(unknown, cat);
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => /m99/.test(e)));
  assert.ok(r.errors.some((e) => /q99-01/.test(e)));
  assert.equal(JSON.stringify(unknown), before, 'input not mutated');

  assert.equal(S2.core.validateProgress(null, cat).ok, false);
  assert.equal(S2.core.validateProgress([], cat).ok, false);
  const badOfficial = JSON.parse(JSON.stringify(fresh));
  badOfficial.official.push({ assessment: 'scrum-open', score: 140, date: '2026-10-13' });
  assert.equal(S2.core.validateProgress(badOfficial, cat).ok, false);
});

test('store: refresh persistence, export/import round trip, and invalid import leaves progress intact', () => {
  const ls = memoryStorage();
  const A = load({ localStorage: ls });
  A.store.load();
  const q = A.QUESTIONS[0];
  A.store.update((s) => { A.store.recordAnswer(s, q, q.correct, 'practice', null); s.notes.m01 = 'remember empiricism'; });
  const exported = A.store.exportJSON();

  // "Refresh": a new app instance reading the same storage.
  const B = load({ localStorage: ls });
  B.store.load();
  assert.equal(B.store.state.attempts.length, 1);
  assert.equal(B.store.state.notes.m01, 'remember empiricism');

  // Invalid import leaves progress alone.
  const badParse = B.store.parseImport('{not json');
  assert.equal(badParse.ok, false);
  const wrong = B.store.parseImport(JSON.stringify({ schema: 1 }));
  assert.equal(wrong.ok, false);
  assert.equal(B.store.state.attempts.length, 1);
  const huge = B.store.parseImport('x'.repeat(core.MAX_IMPORT_BYTES + 1));
  assert.equal(huge.ok, false);

  // Valid import into a fresh browser.
  const C = load();
  C.store.load();
  const res = C.store.parseImport(exported);
  assert.equal(res.ok, true);
  assert.equal(C.store.replaceWith(res.data), true);
  assert.equal(C.store.state.notes.m01, 'remember empiricism');
  assert.equal(C.store.state.attempts.length, 1);
});

test('store: storage failure is reported, never silently claimed as saved', () => {
  let fail = false;
  const ls = memoryStorage({ failWrites: () => fail });
  const A = load({ localStorage: ls });
  A.store.load();
  assert.equal(A.store.status.persistent, true);
  A.store.update((s) => { s.notes.m01 = 'first'; });
  fail = true;
  const ok = A.store.update((s) => { s.notes.m01 = 'second'; });
  assert.equal(ok, false);
  assert.equal(A.store.status.persistent, false);
  assert.match(A.store.status.message, /could not be saved/);
  // An import that cannot be saved is rolled back.
  const data = JSON.parse(A.store.exportJSON());
  data.notes.m02 = 'imported';
  assert.equal(A.store.replaceWith(data), false);
  assert.equal(A.store.state.notes.m02, undefined);
  // The stored copy still holds the last successful save.
  assert.equal(JSON.parse(ls.getItem('scrum-study-studio:v1')).notes.m01, 'first');
});

test('store: blocked storage falls back to memory with a visible message', () => {
  const blocked = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() {} };
  const A = load({ localStorage: blocked });
  A.store.load();
  assert.equal(A.store.status.persistent, false);
  assert.ok(A.store.status.message.length > 20);
  assert.equal(A.store.update((s) => { s.notes.m01 = 'x'; }), false);
  assert.equal(A.store.state.notes.m01, 'x', 'in-memory state still usable');
});

test('store: corrupted saved progress is preserved, not overwritten', () => {
  const ls = memoryStorage();
  ls.setItem('scrum-study-studio:v1', '{"schema":1, broken');
  const A = load({ localStorage: ls });
  A.store.load();
  assert.match(A.store.status.message, /could not be read/);
  const kept = [...ls._data.keys()].filter((k) => k.indexOf(':unreadable-') > 0);
  assert.equal(kept.length, 1);
});

test('mistake notebook: incorrect, uncertain-correct, and confident-correct resolution', () => {
  const A = load();
  A.store.load();
  const q = A.QUESTIONS.find((x) => x.type === 'single');
  const wrong = [(q.correct[0] + 1) % q.options.length];
  A.store.update((s) => A.store.recordAnswer(s, q, wrong, 'practice', null));
  assert.equal(A.store.state.mistakes[q.id].reason, 'incorrect');
  assert.deepEqual(Array.from(A.ui.unresolvedMistakes()), [q.id]);
  A.store.update((s) => A.store.recordAnswer(s, q, q.correct, 'practice', 'unsure'));
  assert.equal(A.store.state.mistakes[q.id].resolved, false, 'uncertain correct answer keeps it open');
  A.store.update((s) => A.store.recordAnswer(s, q, q.correct, 'practice', null));
  assert.equal(A.store.state.mistakes[q.id].resolved, true);

  const q2 = A.QUESTIONS.find((x) => x.type === 'multi');
  A.store.update((s) => A.store.recordAnswer(s, q2, q2.correct, 'check', 'unsure'));
  assert.equal(A.store.state.mistakes[q2.id].reason, 'uncertain');
  assert.equal(A.store.state.mistakes[q2.id].resolved, false);
});

test('seen questions are tracked by content version', () => {
  const A = load();
  A.store.load();
  const q = A.QUESTIONS[0];
  A.store.update((s) => A.store.recordAnswer(s, q, q.correct, 'practice', null));
  assert.equal(A.store.seenMap()[q.id], true);
  A.store.update((s) => { s.attempts[0].v = q.v + 1; }); // attempt made on a different version
  assert.equal(A.store.seenMap()[q.id], undefined);
});

test('plan: changing the start date preserves completed work and carry-forward', () => {
  const A=load();A.store.load();
  A.store.update(s=>{s.planTasks['read-guide-1']=Date.now();s.modules.m01={complete:true};s.settings.startDate='2020-01-01';});
  const p=A.ui.planProgress();
  assert.equal(p.plan.id,'12');assert.equal(p.current.num,1);
  assert.equal(p.next.key,'manual:baseline');
  assert.equal(p.days[0].tasks.find(t=>t.key==='module:m01').done,true);
  assert.equal(Object.keys(A.PLANS).join(','),'12');
});

test('readiness: never claims completion without evidence; self-reported results labeled by date', () => {
  const A = load();
  A.store.load();
  let r = A.ui.readiness('psm');
  assert.equal(r.status, 'Foundation in progress');
  // Mark everything relevant complete but give only one rehearsal.
  A.store.update((s) => {
    A.MODULES.forEach((m) => { s.modules[m.id] = { complete: true, teachRating: 'clearly' }; });
    A.SCENARIOS.forEach((x) => { s.scenarios[x.id] = { done: true }; });
    s.rehearsals.push({ id: 'r1', track: 'psm', pct: 95, submittedAt: Date.UTC(2026, 9, 10), items: [], total: 80 });
  });
  r = A.ui.readiness('psm');
  assert.equal(r.status, 'Review your evidence before sitting');
  assert.equal(r.checks.find((c) => c.id === 'rehearsals').ok, false, 'one rehearsal is not enough');
  // Two perfect Scrum Open results on the same date count as one date.
  A.store.update((s) => {
    s.official.push({ id: 'o1', assessment: 'scrum-open', score: 100, date: '2026-10-10' });
    s.official.push({ id: 'o2', assessment: 'scrum-open', score: 100, date: '2026-10-10' });
  });
  assert.equal(A.ui.readiness('psm').checks.find((c) => c.id === 'official').ok, false);
  // A low latest rehearsal triggers repair.
  A.store.update((s) => { s.rehearsals.push({ id: 'r2', track: 'psm', pct: 70, submittedAt: Date.UTC(2026, 9, 11), items: [], total: 80 }); });
  assert.equal(A.ui.readiness('psm').status, 'Repair these topics');
});
