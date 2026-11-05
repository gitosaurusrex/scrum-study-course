/* The active 12-day study plan. Completed task IDs survive start-date changes. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var S = SSS.SRC;

  // Manual tasks (learner ticks them off). Module, scenario and rehearsal tasks
  // complete automatically from course activity.
  SSS.MANUAL_TASKS = {
    'baseline': { label: 'Baseline: a 10-question quick practice set, no references', minutes: 15, link: { href: '#/practice', label: 'Open practice' } },
    'read-guide-1': { label: 'First full reading of the Scrum Guide; note unfamiliar terms and where it differs from past experience', minutes: 60, link: { href: S.guide.url, label: 'Scrum Guide', external: true } },
    'read-guide-2': { label: 'Second Scrum Guide reading; check your framework map against it', minutes: 45, link: { href: S.guide.url, label: 'Scrum Guide', external: true } },
    'framework-map': { label: 'Reconstruct the framework map from memory (accountabilities, events, artifacts, commitments), then check it', minutes: 15, link: { href: '#/notes', label: 'Reference sheet' } },
    'scrum-open-1': { label: 'Scrum Open, first attempt; record the result and review every miss and guess', minutes: 30, link: { href: S.scrumOpen.url, label: 'Scrum Open', external: true } },
    'scrum-open-2': { label: 'Scrum Open, separated attempt after further study; record the result', minutes: 30, link: { href: S.scrumOpen.url, label: 'Scrum Open', external: true } },
    'scrum-open-3': { label: 'Scrum Open, final check before PSPO I; record the result', minutes: 20, link: { href: S.scrumOpen.url, label: 'Scrum Open', external: true } },
    'po-open-1': { label: 'Product Owner Open, first attempt; record the result and review feedback', minutes: 20, link: { href: S.poOpen.url, label: 'Product Owner Open', external: true } },
    'po-open-2': { label: 'Product Owner Open, separated attempt; record the result', minutes: 20, link: { href: S.poOpen.url, label: 'Product Owner Open', external: true } },
    'read-sm-resources': { label: 'Read selected Scrum Master resources: self-management, facilitation, coaching, impediments', minutes: 30, link: { href: S.smResources.url, label: 'Scrum Master resources', external: true } },
    'read-po-resources': { label: 'Read selected Product Owner resources: vision, value, backlog management, stakeholders, forecasting', minutes: 30, link: { href: S.poResources.url, label: 'Product Owner resources', external: true } },
    'read-ebm': { label: 'Read the Evidence-Based Management Guide once, focusing on Key Value Areas and the experiment loop', minutes: 30, link: { href: S.ebm.url, label: 'EBM Guide', external: true } },
    'delayed-review-1': { label: 'Delayed recall: due flashcards and unresolved mistakes from earlier modules', minutes: 20, link: { href: '#/review', label: 'Open review' } },
    'repair-foundation': { label: 'Repair: revisit weak foundation topics; redo the framework map without notes', minutes: 45, link: { href: '#/review', label: 'Open review' } },
    'psm-topic-practice': { label: 'Topic practice on modules 9–12; read every explanation', minutes: 25, link: { href: '#/practice', label: 'Open practice' } },
    'psm-repair': { label: 'Explain and repair: review every PSM rehearsal miss and uncertain answer; revisit the linked lessons', minutes: 45, link: { href: '#/review/mistakes', label: 'Mistake notebook' } },
    'delayed-review-psm': { label: 'Delayed recall for PSM: due flashcards and missed-question practice', minutes: 20, link: { href: '#/review', label: 'Open review' } },
    'psm-readiness': { label: 'Review PSM I readiness evidence, current exam requirements and conduct rules', minutes: 15, link: { href: '#/readiness', label: 'Readiness' } },
    'exam-psm': { label: 'Optional: sit PSM I in a separate one-hour block if your evidence supports it; otherwise use the hour for repair and move the exam', minutes: 60, exam: true, link: { href: S.psmScope.url, label: 'PSM I page', external: true } },
    'product-exercise': { label: 'Product exercise: write a goal, customer problem, three backlog items, an ordering decision, a value hypothesis and a measure', minutes: 20, link: { href: '#/notes', label: 'Notes' } },
    'pspo-repair': { label: 'Explain and repair: review every PSPO rehearsal miss and uncertain answer; revisit linked lessons', minutes: 45, link: { href: '#/review/mistakes', label: 'Mistake notebook' } },
    'delayed-review-pspo': { label: 'Delayed recall for PSPO: explain the product exercise and EBM without notes; due flashcards', minutes: 20, link: { href: '#/review', label: 'Open review' } },
    'pspo-readiness': { label: 'Review PSPO I readiness evidence, current exam requirements and conduct rules', minutes: 15, link: { href: '#/readiness', label: 'Readiness' } },
    'exam-pspo': { label: 'Optional: sit PSPO I in a separate one-hour block if your evidence supports it; otherwise use the hour for repair and move the exam', minutes: 60, exam: true, link: { href: S.pspoScope.url, label: 'PSPO I page', external: true } },
    'supplementary-psm': { label: 'Optional independent practice: a fresh 60-question PSM I set in 45 minutes (check disputed explanations against official sources)', minutes: 60, link: { href: S.tsmPsm.url, label: 'Independent PSM practice', external: true } },
    'supplementary-pspo': { label: 'Optional independent practice: a fresh 60-question PSPO I set in 45 minutes', minutes: 60, link: { href: S.tsmPspo.url, label: 'Independent PSPO practice', external: true } }
  };

  function m(ref) { return { type: 'module', ref: ref }; }
  function s(ref) { return { type: 'scenario', ref: ref }; }
  function t(id) { return { type: 'manual', ref: id }; }
  function r(track, n) { return { type: 'rehearsal', ref: track, count: n }; }

  SSS.PLANS = {
    '12': {
      id: '12', label: 'Recommended: 12 study days',
      summary: 'Daily time estimates are calculated from the activities below. Move at your own pace; exams have separate one-hour blocks when you are ready.',
      days: [
        { title: 'Orientation and empiricism', items: [t('baseline'), m('m01'), m('m02'), t('read-guide-1')] },
        { title: 'Accountabilities and artifacts', items: [m('m03'), m('m04'), t('framework-map')] },
        { title: 'The Sprint and its events', items: [m('m05'), m('m06'), s('s1'), t('read-guide-2')] },
        { title: 'Quality, Done, and forecasting', items: [m('m07'), m('m08'), s('s2'), s('s8'), t('scrum-open-1')] },
        { title: 'Scrum Master foundations', items: [m('m09'), m('m10'), s('s3'), t('read-sm-resources'), t('delayed-review-1')] },
        { title: 'Facilitation and the organization', items: [m('m11'), m('m12'), s('s4'), t('psm-topic-practice')] },
        { title: 'PSM rehearsal and repair', items: [r('psm', 1), t('psm-repair')] },
        { title: 'PSM readiness', items: [t('delayed-review-psm'), t('scrum-open-2'), r('psm', 2), t('psm-readiness'), t('exam-psm')] },
        { title: 'Product direction and stakeholders', items: [m('m13'), m('m14'), s('s5'), t('po-open-1'), t('read-po-resources')] },
        { title: 'Value and evidence', items: [m('m15'), m('m16'), s('s6'), s('s7'), t('read-ebm')] },
        { title: 'PSPO rehearsal and repair', items: [r('pspo', 1), t('pspo-repair'), t('product-exercise')] },
        { title: 'PSPO readiness', items: [t('delayed-review-pspo'), t('po-open-2'), r('pspo', 2), t('pspo-readiness'), t('exam-pspo')] }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
