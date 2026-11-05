/* Information views: readiness evidence, official resources, progress & data. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var ui = SSS.ui, core = SSS.core, store = SSS.store, esc = ui.esc;
  var V = SSS.views = SSS.views || {};
  var S = SSS.SRC;

  function ext(src, text) {
    return '<a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(text || src.label) + '<span class="sr-only"> (opens in a new tab)</span></a>';
  }

  var ASSESSMENTS = { 'scrum-open': 'Scrum Open', 'po-open': 'Product Owner Open', 'other': 'Other official practice' };

  /* ================= READINESS ================= */

  V.readiness = function () {
    var st = store.state;
    var html = '<h1 tabindex="-1">Readiness</h1><p class="lede">Evidence to help you decide whether to sit each exam. There is no single readiness score, and nothing here is an official eligibility decision or a prediction of passing. You decide.</p>';
    html += '<div class="grid-2">';
    ['psm', 'pspo'].forEach(function (track) {
      var r = ui.readiness(track);
      var label = track === 'psm' ? 'PSM I' : 'PSPO I';
      html += '<section class="card track-card track-' + track + '" aria-labelledby="rd-' + track + '"><h2 id="rd-' + track + '">' + label + '</h2><p class="status status-' + r.tone + '">' + esc(r.status) + '</p>';
      if (r.tone === 'complete') html += '<p class="fine">The suggested checks are complete. This is course guidance, not an official eligibility decision or a guarantee. Recheck the current exam page before buying an attempt.</p>';
      html += '<ul class="evidence">' + r.checks.map(function (c) {
        return '<li class="' + (c.ok ? 'is-met' : '') + '"><span class="ev-icon" aria-hidden="true">' + (c.ok ? '✓' : '○') + '</span><span><strong>' + esc(c.label) + '</strong><span class="sr-only">' + (c.ok ? ' — met' : ' — not yet met') + '</span><br><span class="muted">' + esc(c.detail) + '</span></span></li>';
      }).join('') + '</ul>';
      if (r.recurring.length) {
        html += '<h3 class="h-small">Repair these topics</h3><ul>' + r.recurring.map(function (x) {
          return '<li><a href="#/module/' + x.module.id + '">Module ' + x.module.num + ': ' + esc(x.module.title) + '</a> — ' + x.count + ' unresolved items</li>';
        }).join('') + '</ul>';
      }
      if (r.rehearsals.length) {
        html += '<h3 class="h-small">Course rehearsals</h3><ul>' + r.rehearsals.slice().reverse().map(function (x) {
          return '<li><a href="#/rehearsal/result/' + x.id + '">' + ui.fmtDate(x.submittedAt) + ': ' + x.pct + '%</a>' + (!core.isCurrentRehearsal(x, store.questionsById()) ? ' <span class="warn-text">Historical content; excluded from the current check.</span>' : '') + ' <span class="muted">— ' + x.seenCount + ' of ' + x.total + ' previously seen; new-question accuracy ' + (x.unseenCount ? ui.pct(x.unseenCorrect, x.unseenCount) + '%' : '—') + '</span></li>';
        }).join('') + '</ul>';
      }
      html += '<div class="radio-row"><input type="checkbox" id="rules-' + track + '" data-rules="' + track + '"' + (st.checklist[track + '-rules'] ? ' checked' : '') + '><label for="rules-' + track + '">I have reviewed the current ' + label + ' requirements (' + ext(track === 'psm' ? S.psmScope : S.pspoScope, 'exam page') + ') and the ' + ext(S.conduct, 'assessment conduct rules') + '.</label></div>';
      html += '</section>';
    });
    html += '</div>';

    html += '<section class="card" aria-labelledby="off-h"><h2 id="off-h">Official practice results (self-reported)</h2><p>Record your ' + ext(S.scrumOpen) + ' and ' + ext(S.poOpen) + ' results here. The course cannot verify them. Scrum.org describes its Open Assessments as easier than the certification assessments, so a perfect Open score supports — but does not prove — readiness. Aim for 100% on separated attempts and be able to explain each answer.</p>' +
      '<form id="off-form" class="form-grid" novalidate><div class="field"><label for="off-a">Assessment</label><select id="off-a">' + Object.keys(ASSESSMENTS).map(function (k) { return '<option value="' + k + '">' + ASSESSMENTS[k] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="off-s">Score (%)</label><input type="number" id="off-s" min="0" max="100" step="1" inputmode="numeric" required></div>' +
      '<div class="field"><label for="off-d">Date</label><input type="date" id="off-d" value="' + core.todayISO(Date.now()) + '" required></div>' +
      '<div class="field field-wide"><label for="off-n">Note (optional)</label><input type="text" id="off-n" maxlength="200" placeholder="e.g. guessed two; unsure about refinement"></div>' +
      '<div class="form-actions"><button class="btn btn-primary" type="submit">Add result</button><span id="off-msg" role="status" class="muted"></span></div></form>';
    if (st.official.length) {
      html += '<table class="data-table"><thead><tr><th scope="col">Date</th><th scope="col">Assessment</th><th scope="col">Score</th><th scope="col">Note</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>' +
        st.official.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).map(function (o) {
          return '<tr><td>' + ui.fmtISO(o.date) + '</td><td>' + esc(ASSESSMENTS[o.assessment] || o.assessment) + ' <span class="muted">(self-reported)</span></td><td>' + o.score + '%</td><td>' + esc(o.note || '') + '</td><td><button type="button" class="btn btn-small" data-del="' + esc(o.id) + '">Delete</button></td></tr>';
        }).join('') + '</tbody></table>';
    }
    html += '</section>';

    html += '<section class="card" aria-labelledby="gate-h"><h2 id="gate-h">Before you sit</h2><ul>' +
      '<li>Both exams currently have 80 questions in 60 minutes with an 85% passing score (as checked ' + esc(SSS.CHECKED_ON) + '). Recheck the official pages before buying an attempt.</li>' +
      '<li>If a check fails, name the gap, spend 60–90 minutes repairing it, and retest after a break. Another study session costs less than an avoidable retake.</li>' +
      '<li>Pacing target for 80 questions: about question 20 at 12 minutes, 40 at 25, 60 at 37 and 80 at 50, leaving time to review bookmarks.</li>' +
      '<li>During the live assessment, paper references are permitted. AI tools, help from another person, and leaving the test window are not. ' + ext(S.conduct, 'Conduct rules') + '.</li></ul></section>';

    return {
      title: 'Readiness', html: html,
      mount: function (main) {
        ui.$$('[data-rules]', main).forEach(function (cb) {
          cb.addEventListener('change', function () {
            var t = cb.getAttribute('data-rules');
            store.update(function (s) { if (cb.checked) s.checklist[t + '-rules'] = Date.now(); else delete s.checklist[t + '-rules']; });
            SSS.app.rerender();
          });
        });
        ui.$('#off-form', main).addEventListener('submit', function (e) {
          e.preventDefault();
          var msg = ui.$('#off-msg', main);
          var score = Number(ui.$('#off-s', main).value);
          var date = ui.$('#off-d', main).value;
          if (ui.$('#off-s', main).value === '' || isNaN(score) || score < 0 || score > 100) { msg.textContent = 'Enter a score from 0 to 100.'; ui.$('#off-s', main).focus(); return; }
          if (!core.isValidISODate(date)) { msg.textContent = 'Enter a valid date.'; ui.$('#off-d', main).focus(); return; }
          store.update(function (s) {
            s.official.push({ id: 'o' + Date.now(), assessment: ui.$('#off-a', main).value, score: Math.round(score), date: date, note: ui.$('#off-n', main).value.slice(0, 200), at: Date.now() });
          });
          ui.announce('Result added.');
          SSS.app.rerender('#off-h');
        });
        ui.$$('[data-del]', main).forEach(function (b) {
          b.addEventListener('click', function () {
            if (!root.confirm('Delete this self-reported result?')) return;
            var id = b.getAttribute('data-del');
            store.update(function (s) { s.official = s.official.filter(function (o) { return o.id !== id; }); });
            SSS.app.rerender('#off-h');
          });
        });
      }
    };
  };

  /* ================= RESOURCES ================= */

  V.resources = function () {
    function li(src, note) { return '<li>' + ext(src) + (note ? ' — <span class="muted">' + esc(note) + '</span>' : '') + '</li>'; }
    var html = '<h1 tabindex="-1">Resources</h1><p class="lede">Official sources are the authority for this course. Framework rules, exam facts, conduct rules and EBM terminology were verified against official pages on <strong>' + esc(SSS.CHECKED_ON) + '</strong>. A blocked automated link request is unverified, not confirmation that a page works. Recheck requirements before buying an attempt.</p>';
    html += '<section class="card" aria-labelledby="r1"><h2 id="r1">Core reading</h2><ul class="sources">' +
      li(S.guide, 'the shared foundation; read completely, then revisit weak sections') +
      li(S.ebm, 'one focused reading on value, outcomes and experimentation') + '</ul></section>';
    html += '<section class="card" aria-labelledby="r2"><h2 id="r2">Exam scope and suggested reading</h2><ul class="sources">' +
      li(S.psmScope, 'focus areas, format, price') + li(S.psmReading) + li(S.smResources, 'select accountabilities, self-management, facilitation, coaching, impediments') +
      li(S.pspoScope, 'focus areas, format, price') + li(S.pspoReading) + li(S.poResources, 'select vision, strategy, value, backlog management, stakeholders, forecasting') + '</ul></section>';
    html += '<section class="card" aria-labelledby="r3"><h2 id="r3">Official practice</h2><ul class="sources">' +
      li(S.scrumOpen, 'free, 30 questions') + li(S.poOpen, 'free, 15 questions') + li(S.prepare, 'official preparation guidance, including password delivery timing') + '</ul>' +
      '<p>Optional independent practice (not official, not an exam predictor; check disputed explanations against official sources):</p><ul class="sources">' + li(S.tsmPsm) + li(S.tsmPspo) + '</ul></section>';
    html += '<section class="card" aria-labelledby="r4"><h2 id="r4">Exam facts (as checked ' + esc(SSS.CHECKED_ON) + ')</h2><table class="data-table"><tbody>' +
      '<tr><th scope="row">Format</th><td>80 questions in 60 minutes; multiple choice, multiple answer and true/false</td></tr>' +
      '<tr><th scope="row">Passing score</th><td>85%</td></tr>' +
      '<tr><th scope="row">Cost</th><td>$200 USD per attempt, plus any applicable taxes; budget $400 plus taxes for both on the first try</td></tr>' +
      '<tr><th scope="row">Password</th><td>One attempt per self-purchased password; no expiry; sent within one business day — buy ahead of your study block if you want to sit on schedule</td></tr>' +
      '<tr><th scope="row">Renewal</th><td>No annual renewal fee</td></tr>' +
      '<tr><th scope="row">After the exam</th><td>Scrum.org provides focus-area feedback, not question-by-question answers. ' + ext(S.results, 'Results guidance') + '</td></tr></tbody></table></section>';
    html += '<section class="card" aria-labelledby="r5"><h2 id="r5">Assessment conduct</h2><ul><li>Stay in the active assessment window; do not navigate away.</li><li>No AI tools and no help from another person.</li><li>Paper references, such as a printed Scrum Guide or the course reference sheet, are permitted.</li><li>Do not recreate, share or seek live exam questions.</li></ul><p>' + ext(S.conduct) + ' · ' + ext(S.tech) + '</p></section>';
    html += '<section class="card" aria-labelledby="r6"><h2 id="r6">About this course</h2><p>Scrum Study Studio is an independent personal study tool. It is not affiliated with, endorsed by or a substitute for Scrum.org, and completing it does not award any credential. Lessons paraphrase official sources in original prose; the question bank is original instructional material and contains no live exam content. Where the course gives situational guidance rather than a framework rule, it says so.</p><p class="muted">Content version ' + esc(SSS.CONTENT_VERSION) + '.</p></section>';
    return { title: 'Resources', html: html };
  };

  /* ================= PROGRESS & DATA ================= */

  V.progress = function () {
    var st = store.state, status = store.status;
    var html = '<h1 tabindex="-1">Progress &amp; data</h1>';
    html += '<section class="card" aria-labelledby="pd1"><h2 id="pd1">Where your progress lives</h2><p>Progress is saved in <strong>this browser on this device only</strong>. It is not synchronized anywhere and no analytics are collected. To move to another device or keep a backup, export a file and import it there.</p>' +
      '<p class="' + (status.persistent && !status.stale ? 'ok-text' : 'bad-text') + '"><strong>' + (status.stale ? 'This tab is read-only until you reload.' : status.persistent ? 'Saving is working in this browser.' : 'Saving is not working in this browser.') + '</strong> ' + esc(status.message || '') + '</p>' +
      '<p class="muted">Started ' + ui.fmtDate(st.created) + ' · last change ' + ui.fmtDateTime(st.updated) + ' · ' + st.attempts.length + ' answers recorded · content version ' + esc(SSS.CONTENT_VERSION) + '</p></section>';

    html += '<section class="card" aria-labelledby="pd2"><h2 id="pd2">Export</h2><p>Downloads a JSON file with everything: lessons, answers, notes, flashcard schedule, rehearsals and self-reported results.</p><p><button class="btn btn-primary" id="export-btn">Export progress</button></p></section>';

    html += '<section class="card" aria-labelledby="pd3"><h2 id="pd3">Import</h2><p>Importing <strong>replaces</strong> all progress in this browser. The file is checked before anything changes; an invalid file leaves your current progress untouched.</p>' +
      '<label for="import-file">Choose an exported progress file</label> <input type="file" id="import-file" accept="application/json,.json"><div id="import-result" tabindex="-1" aria-live="polite"></div></section>';

    html += '<section class="card danger-zone" aria-labelledby="pd4"><h2 id="pd4">Reset</h2><p>Erases all progress in this browser. This cannot be undone. Export first if you might want it back.</p>' +
      '<div class="radio-row"><input type="checkbox" id="reset-confirm"><label for="reset-confirm">I understand that resetting permanently erases my progress in this browser.</label></div><p><button class="btn btn-danger" id="reset-btn" disabled>Reset all progress</button></p></section>';

    return {
      title: 'Progress & data', html: html,
      mount: function (main) {
        function download() {
          var blob = new Blob([store.exportJSON()], { type: 'application/json' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'scrum-study-progress-' + core.todayISO(Date.now()) + '.json';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
          ui.announce('Progress file exported.');
        }
        ui.$('#export-btn', main).addEventListener('click', download);

        ui.$('#import-file', main).addEventListener('change', function (e) {
          var out = ui.$('#import-result', main);
          var file = e.target.files && e.target.files[0];
          if (!file) return;
          if (file.size > core.MAX_IMPORT_BYTES) { out.innerHTML = '<p class="bad-text">That file is larger than 2 MB, which is far bigger than any progress file. Nothing was changed.</p>'; return; }
          var reader = new FileReader();
          reader.onerror = function () { out.innerHTML = '<p class="bad-text">The file could not be read. Nothing was changed.</p>'; };
          reader.onload = function () {
            var res = store.parseImport(String(reader.result));
            if (!res.ok) {
              out.innerHTML = '<div class="callout callout-bad"><p><strong>This file was not imported.</strong> Your current progress is unchanged.</p><ul>' + res.errors.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
              out.focus();
              return;
            }
            var d = res.data;
            var lessons = Object.keys(d.modules).filter(function (k) { return d.modules[k].complete; }).length;
            out.innerHTML = '<div class="callout"><p><strong>The file is valid.</strong> It contains ' + lessons + ' completed lesson' + (lessons === 1 ? '' : 's') + ', ' + d.attempts.length + ' recorded answers and ' + d.rehearsals.length + ' rehearsal' + (d.rehearsals.length === 1 ? '' : 's') + ', last changed ' + ui.fmtDateTime(d.updated) + '.</p>' +
              (res.warnings.length ? '<p class="warn-text">' + res.warnings.map(esc).join(' ') + '</p>' : '') +
              '<p>Importing will <strong>replace</strong> your current progress in this browser.</p><p><button class="btn" id="imp-export">Export current progress first</button> <button class="btn btn-primary" id="imp-yes">Replace my progress</button> <button class="btn" id="imp-no">Cancel</button></p></div>';
            out.focus();
            ui.$('#imp-export', out).addEventListener('click', download);
            ui.$('#imp-no', out).addEventListener('click', function () { out.innerHTML = '<p class="muted">Import cancelled. Nothing was changed.</p>'; e.target.value = ''; });
            ui.$('#imp-yes', out).addEventListener('click', function () {
              var ok = store.replaceWith(d);
              if (ok) { ui.announce('Progress imported.'); SSS.app.rerender(); }
              else out.innerHTML = '<p class="bad-text">The imported progress could not be saved in this browser (storage may be full or blocked). Your previous progress was kept.</p>';
            });
          };
          reader.readAsText(file);
        });

        var rc = ui.$('#reset-confirm', main), rb = ui.$('#reset-btn', main);
        rc.addEventListener('change', function () { rb.disabled = !rc.checked; });
        rb.addEventListener('click', function () {
          if (!rc.checked) return;
          if (!root.confirm('Erase all progress in this browser? This cannot be undone.')) return;
          if (!store.reset()) { ui.announce('Reset was not saved. Check the progress notice.'); return; }
          ui.announce('Progress reset.');
          location.hash = '#/';
        });
      }
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
