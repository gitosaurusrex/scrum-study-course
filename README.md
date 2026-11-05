# Scrum Study Studio

A private, buildless course for preparing for **PSM I first, then PSPO I**, built from
the active development plan, using 12 study days by default with flexible pacing.

## What's in it

| Area | Contents |
| --- | --- |
| Course | 16 modules (8 shared, 4 PSM, 4 PSPO). Each has an objective, explanation, worked example (the fictional "Launchpad" onboarding portal), misconception, decision or sort activity, teach-back with rubric, five-question check, and source links. |
| Scenario lab | 8 scenarios with 2–3 decision points each; feedback separates framework rules from situational judgment. |
| Question bank | 160 original questions (80 shared, 40 PSM, 40 PSPO): single answer, multiple answer, true/false. Each has an explanation, what the distractors overlook, a source, and a rule/judgment label. |
| Practice | Quick sets, topic sets, missed/uncertain questions, and timed 80-question / 60-minute course rehearsals per track. |
| Review | 48 flashcards with ~1/3/7-day intervals, a mistake notebook, and locally flagged questions. |
| Plan | 12-day recommended schedule with flexible pacing, editable start date, carry-forward. |
| Readiness | Separate PSM I / PSPO I evidence panels, self-reported Open results, no pass predictions. |
| Data | Progress in browser storage, export/import with validation, confirmed reset. |

## Run locally

Open `dist/index.html` directly, or serve the folder:

```bash
python -m http.server 8123 --directory dist
```

## Checks

```bash
npm run validate
```

```bash
npm test
```

```bash
npm run register
```

- `validate` checks content counts, IDs, answer keys, sources/anchors, plans and risky wording. Add `:links` (`npm run validate:links`) to request every external URL; scrum.org answers automated requests with HTTP 403, so verify those pages in a browser.
- `test` covers scoring, option shuffling, rehearsal sampling, the absolute deadline, review scheduling, persistence, storage failure, strict import validation, stale-tab protection, legacy progress migration, start-date changes and readiness.
- `register` regenerates `content-register.md` from the dated item reviews and competency map, including lessons, questions, scenarios, cards, resource references and resolved findings. It refuses stale source reviews.

## Structure

```
dist/                     publishable site (hosting config points here)
  index.html, styles.css
  js/core.js              pure logic (scoring, sampling, deadlines, review, validation)
  js/store.js             browser-local progress with visible fallback
  js/ui.js                rendering helpers, plan progress, readiness evidence
  js/views-*.js           pages
  js/app.js               router and shell
  js/data/*.js            curriculum, questions, scenarios, flashcards, plans, sources
scripts/                  validation, tests, register generator (not published)
content-register.md       generated source-to-content register
source-audit.json          dated source reviews tied to each learning item's content
competency-map.json        all published exam-focus areas and eligible course practice
.openai/hosting.json      existing Sites hosting identity (static directory: dist)
```

## Updating content

Edit the data files in `dist/js/data/`. When a question changes materially, bump its `v` so earlier
attempts are not treated as mastery of the revised item. Bump `SSS.CONTENT_VERSION` in `sources.js`
and the `?v=` query strings in `index.html` when publishing an update. Then run the three checks above.

Content changes require a fresh source review and updated `source-audit.json` records. The checks
detect unreviewed changes; regenerating a register does not itself certify the content. Update
`competency-map.json` when a question's topic changes. Keep precise article/section citations and
distinguish Scrum Guide rules from separate concepts and course judgment.

Independent study tool; not affiliated with Scrum.org. Practice scores are not a prediction of passing.
