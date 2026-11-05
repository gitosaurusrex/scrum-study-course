#!/usr/bin/env node
// Validates course content against the release specification.
// Usage: node scripts/validate-content.js [--links]
//   --links  also requests every external URL and reports failures (needs network).
'use strict';
const { load } = require('./load');
const SSS = load();

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);

// Anchors present on https://scrumguides.org/scrum-guide.html (checked October 13, 2026).
const GUIDE_ANCHORS = new Set([
  'purpose-of-the-scrum-guide', 'scrum-definition', 'scrum-theory', 'transparency', 'inspection', 'adaptation',
  'scrum-values', 'scrum-team', 'developers', 'product-owner', 'scrum-master', 'scrum-events', 'the-sprint',
  'sprint-planning', 'topic-one-why-is-this-sprint-valuable', 'topic-two-what-can-be-done-this-sprint',
  'topic-three-how-will-the-chosen-work-get-done', 'daily-scrum', 'sprint-review', 'sprint-retrospective',
  'scrum-artifacts', 'product-backlog', 'commitment-product-goal', 'sprint-backlog', 'commitment-sprint-goal',
  'increment', 'commitment-definition-of-done', 'end-note'
]);

const urls = new Set();
function checkSource(src, where) {
  if (!src || typeof src.url !== 'string' || !/^https:\/\//.test(src.url) || !src.label) { err(where + ': missing or invalid source'); return; }
  urls.add(src.url.split('#')[0]);
  const m = src.url.match(/^https:\/\/scrumguides\.org\/scrum-guide\.html#(.+)$/);
  if (m && !GUIDE_ANCHORS.has(m[1])) err(where + ': unknown Scrum Guide anchor #' + m[1]);
}

// ---------- modules ----------
const M = SSS.MODULES;
if (M.length !== 16) err('Expected 16 modules, found ' + M.length);
const trackCounts = { shared: 0, psm: 0, pspo: 0 };
M.forEach((m, i) => {
  const where = 'Module ' + m.id;
  const n = i + 1;
  if (m.num !== n || m.id !== 'm' + String(n).padStart(2, '0')) err(where + ': id/num out of sequence');
  trackCounts[m.track]++;
  ['title', 'objective', 'explanation', 'example'].forEach((k) => { if (!m[k] || m[k].length < 20) err(where + ': missing ' + k); });
  if (!m.misconception || !m.misconception.myth || !m.misconception.reality) err(where + ': missing misconception');
  if (!m.teachBack || !m.teachBack.prompt || !m.teachBack.model || !(m.teachBack.rubric || []).length) err(where + ': incomplete teach-back');
  if (!(m.minutes >= 25 && m.minutes <= 35)) warnings.push(where + ': minutes ' + m.minutes + ' outside 25–35');
  const a = m.activity;
  if (!a) err(where + ': missing activity');
  else if (a.type === 'decision') {
    if (a.options.filter((o) => o.best).length !== 1) err(where + ': decision must have exactly one best option');
    a.options.forEach((o, j) => { if (!o.text || !o.feedback) err(where + ': decision option ' + j + ' incomplete'); });
  } else if (a.type === 'sort') {
    a.items.forEach((it, j) => {
      if (a.categories.indexOf(it.answer) < 0) err(where + ': sort item ' + j + ' answer not in categories');
      if (!it.why) err(where + ': sort item ' + j + ' missing explanation');
    });
  } else err(where + ': unknown activity type');
  if (!(m.sources || []).length) err(where + ': no sources');
  (m.sources || []).forEach((s, j) => checkSource(s, where + ' source ' + j));
});
if (trackCounts.shared !== 8 || trackCounts.psm !== 4 || trackCounts.pspo !== 4) err('Module track distribution wrong: ' + JSON.stringify(trackCounts));

// ---------- questions ----------
const Q = SSS.QUESTIONS;
if (Q.length !== 160) err('Expected 160 questions, found ' + Q.length);
const ids = new Set();
const perModule = {};
const perTrack = { shared: 0, psm: 0, pspo: 0 };
const perType = { single: 0, multi: 0, tf: 0 };
const typeByModule = {};
Q.forEach((q) => {
  const where = 'Question ' + q.id;
  if (ids.has(q.id)) err(where + ': duplicate id');
  ids.add(q.id);
  if (!/^q\d\d-\d\d$/.test(q.id)) err(where + ': bad id format');
  if (!(q.v >= 1)) err(where + ': missing version');
  perModule[q.module] = (perModule[q.module] || 0) + 1;
  perTrack[q.track]++;
  if (!(q.type in perType)) { err(where + ': bad type ' + q.type); return; }
  perType[q.type]++;
  (typeByModule[q.module] = typeByModule[q.module] || new Set()).add(q.type);
  if (['foundation', 'applied', 'challenging'].indexOf(q.difficulty) < 0) err(where + ': bad difficulty');
  if (['rule', 'judgment', 'concept'].indexOf(q.basis) < 0) err(where + ': bad basis');
  if (!q.stem || q.stem.length < 15) err(where + ': stem too short');
  if (!Array.isArray(q.options) || q.options.length < 2) err(where + ': needs options');
  if (new Set(q.options).size !== q.options.length) err(where + ': duplicate option text');
  if (!Array.isArray(q.correct) || !q.correct.length) err(where + ': no correct answers');
  q.correct.forEach((c) => { if (!(c >= 0 && c < q.options.length)) err(where + ': correct index out of range'); });
  if (new Set(q.correct).size !== q.correct.length) err(where + ': duplicate correct index');
  if ((q.type === 'single' || q.type === 'tf') && q.correct.length !== 1) err(where + ': single/tf must have one correct answer');
  if (q.type === 'multi' && (q.correct.length < 2 || q.correct.length >= q.options.length)) err(where + ': multi must have 2..n-1 correct answers');
  if (q.type === 'tf' && (q.options.length !== 2 || q.options[0] !== 'True' || q.options[1] !== 'False')) err(where + ': tf options must be True/False');
  if (!q.explain || q.explain.length < 30) err(where + ': explanation missing or thin');
  if (!q.distractors || q.distractors.length < 20) err(where + ': distractor explanation missing');
  checkSource(q.source, where);
  if (!q.source.section) err(where + ': missing named source section');
  (q.additionalSources || []).forEach((src, j) => checkSource(src, where + ' additional source ' + j));
  const expectedTrack = q.module <= 8 ? 'shared' : q.module <= 12 ? 'psm' : 'pspo';
  if (q.track !== expectedTrack) err(where + ': track does not match module');
});
for (let n = 1; n <= 16; n++) if (perModule[n] !== 10) err('Module ' + n + ' has ' + (perModule[n] || 0) + ' questions (expected 10)');
if (perTrack.shared !== 80 || perTrack.psm !== 40 || perTrack.pspo !== 40) err('Question track distribution wrong: ' + JSON.stringify(perTrack));
for (let n = 1; n <= 16; n++) {
  const t = typeByModule[n] || new Set();
  if (!t.has('multi') || !t.has('tf') || !t.has('single')) warnings.push('Module ' + n + ' lacks a format: ' + [...t].join(','));
}

// ---------- scenarios ----------
const SC = SSS.SCENARIOS;
if (SC.length !== 8) err('Expected 8 scenarios, found ' + SC.length);
SC.forEach((s, i) => {
  const where = 'Scenario ' + s.id;
  if (s.id !== 's' + (i + 1) || s.num !== i + 1) err(where + ': out of sequence');
  if (s.steps.length < 2 || s.steps.length > 3) err(where + ': needs 2–3 decision points');
  s.steps.forEach((st, j) => {
    if (st.options.filter((o) => o.quality === 'strong').length !== 1) err(where + ' step ' + j + ': exactly one strong option required');
    st.options.forEach((o) => { if (['strong', 'mixed', 'weak'].indexOf(o.quality) < 0 || !o.consequence || !o.explanation) err(where + ' step ' + j + ': incomplete option'); });
    if (!st.rule || !st.judgment) err(where + ' step ' + j + ': missing rule/judgment note');
  });
  s.modules.forEach((mid) => { if (!M.some((m) => m.id === mid)) err(where + ': unknown module ' + mid); });
  (s.sources || []).forEach((src, j) => checkSource(src, where + ' source ' + j));
});

// ---------- flashcards ----------
const C = SSS.CARDS;
if (C.length !== 48) err('Expected 48 flashcards, found ' + C.length);
const cardIds = new Set(C.map((c) => c.id));
if (cardIds.size !== C.length) err('Duplicate flashcard ids');
M.forEach((m) => { const n = C.filter((c) => c.module === m.id).length; if (n !== 3) err('Module ' + m.id + ' has ' + n + ' flashcards (expected 3)'); });
C.forEach((c) => { if (!(c.sources || []).length) err('Card ' + c.id + ': no sources'); (c.sources || []).forEach((src,j) => checkSource(src,'Card ' + c.id + ' source ' + j)); });

// A source review remains valid only for the reviewed content. This catches
// unreviewed edits without presenting automated metadata checks as a content audit.
const { validateAudit } = require('./audit-contract');
const audit = require('../source-audit.json');
const matrix = require('../competency-map.json');
validateAudit(SSS, audit, matrix).forEach(err);

// ---------- plans ----------
Object.keys(SSS.PLANS).forEach((k) => {
  const plan = SSS.PLANS[k];
  const mods = {}, scens = {};
  plan.days.forEach((d, i) => d.items.forEach((it) => {
    const where = 'Plan ' + k + ' day ' + (i + 1);
    if (it.type === 'module') { if (!M.some((m) => m.id === it.ref)) err(where + ': unknown module'); mods[it.ref] = (mods[it.ref] || 0) + 1; }
    else if (it.type === 'scenario') { if (!SC.some((s) => s.id === it.ref)) err(where + ': unknown scenario'); scens[it.ref] = (scens[it.ref] || 0) + 1; }
    else if (it.type === 'manual') { if (!SSS.MANUAL_TASKS[it.ref]) err(where + ': unknown task ' + it.ref); }
    else if (it.type === 'rehearsal') { if (['psm', 'pspo'].indexOf(it.ref) < 0) err(where + ': bad rehearsal track'); }
    else err(where + ': unknown item type');
  }));
  M.forEach((m) => { if (mods[m.id] !== 1) err('Plan ' + k + ': module ' + m.id + ' appears ' + (mods[m.id] || 0) + ' times'); });
  SC.forEach((s) => { if (scens[s.id] !== 1) err('Plan ' + k + ': scenario ' + s.id + ' appears ' + (scens[s.id] || 0) + ' times'); });
});
Object.values(SSS.MANUAL_TASKS).forEach((t) => { if (t.link && t.link.external) urls.add(t.link.href.split('#')[0]); });
Object.values(SSS.SRC).forEach((s) => urls.add(s.url.split('#')[0]));

// ---------- language checks ----------
function allText() {
  const parts = [];
  M.forEach((m) => parts.push(['module ' + m.id, JSON.stringify(m)]));
  Q.forEach((q) => parts.push(['question ' + q.id, JSON.stringify(q)]));
  SC.forEach((s) => parts.push(['scenario ' + s.id, JSON.stringify(s)]));
  C.forEach((c) => parts.push(['card ' + c.id, JSON.stringify(c)]));
  return parts;
}
const RISKY = [
  [/development team/i, 'obsolete 2017 term "Development Team"'],
  [/servant[- ]leader/i, 'obsolete term "servant-leader" (2020 Guide: "true leaders who serve")'],
  [/self-organi[sz]/i, 'obsolete term "self-organizing" (2020 Guide: "self-managing")'],
  [/\bguarantee(d|s)? (you|a) pass/i, 'pass guarantee'],
  [/\bwill pass\b/i, 'pass prediction'],
  [/\b\d+\s?% of (the )?(exam|live|real) (questions|exam)/i, 'claimed exam weighting'],
  [/sprint backlog items? (are|is) (a )?commit/i, 'treats selected items as a commitment']
];
allText().forEach(([where, text]) => {
  RISKY.forEach(([re, label]) => { if (re.test(text)) err(where + ': ' + label); });
});

// ---------- report ----------
console.log('Modules: ' + M.length + ' · Questions: ' + Q.length + ' (' + JSON.stringify(perTrack) + ', types ' + JSON.stringify(perType) + ') · Scenarios: ' + SC.length + ' · Flashcards: ' + C.length);
console.log('Distinct external URLs: ' + urls.size);
warnings.forEach((w) => console.log('WARN  ' + w));
errors.forEach((e) => console.log('ERROR ' + e));

async function checkLinks() {
  let bad = 0;
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
      if (res.status === 403) { console.log('LINK UNVERIFIED (automated request blocked) ' + u); continue; }
      const ok = res.status < 400;
      console.log((ok ? 'LINK ok   ' : 'LINK FAIL ') + res.status + ' ' + u);
      if (!ok) bad++;
    } catch (e) { console.log('LINK FAIL ' + e.message + ' ' + u); bad++; }
  }
  return bad;
}

(async () => {
  let linkFailures = 0;
  if (process.argv.includes('--links')) linkFailures = await checkLinks();
  if (errors.length || linkFailures) { console.log('\nFAILED: ' + errors.length + ' content error(s), ' + linkFailures + ' link failure(s).'); process.exit(1); }
  console.log('\nContent validation passed' + (warnings.length ? ' with ' + warnings.length + ' warning(s).' : '.'));
})();
