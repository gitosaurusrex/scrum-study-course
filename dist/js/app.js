/* Application shell: hash router, navigation, storage notice, rehearsal watchdog. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var ui = SSS.ui, core = SSS.core, store = SSS.store, V = SSS.views;

  var ROUTES = [
    { re: /^$/, view: 'home', nav: 'home' },
    { re: /^plan$/, view: 'plan', nav: 'plan' },
    { re: /^course$/, view: 'course', nav: 'course' },
    { re: /^module\/(m\d\d)$/, view: 'module', nav: 'course' },
    { re: /^scenarios$/, view: 'scenarios', nav: 'scenarios' },
    { re: /^scenario\/(s\d)$/, view: 'scenario', nav: 'scenarios' },
    { re: /^practice$/, view: 'practice', nav: 'practice' },
    { re: /^practice\/session$/, view: 'session', nav: 'practice' },
    { re: /^rehearsal$/, view: 'rehearsal', nav: 'practice' },
    { re: /^rehearsal\/result\/(r\d+)$/, view: 'result', nav: 'practice' },
    { re: /^review(?:\/(mistakes|flags))?$/, view: 'review', nav: 'review' },
    { re: /^readiness$/, view: 'readiness', nav: 'readiness' },
    { re: /^notes$/, view: 'notes', nav: 'notes' },
    { re: /^resources$/, view: 'resources', nav: 'resources' },
    { re: /^progress$/, view: 'progress', nav: 'progress' }
  ];

  var cleanup = null;
  var notice = '';

  function parse() {
    var h = (location.hash || '#/').replace(/^#\/?/, '').replace(/\/$/, '');
    for (var i = 0; i < ROUTES.length; i++) {
      var m = h.match(ROUTES[i].re);
      if (m) return { route: ROUTES[i], params: m.slice(1).filter(function (x) { return x !== undefined; }) };
    }
    return { route: { view: 'notFound', nav: '' }, params: [] };
  }

  function updateNav(active) {
    ui.$$('#nav a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var badge = ui.$('#review-badge');
    if (badge) {
      var n = ui.dueCards(Date.now()).length + ui.unresolvedMistakes().length;
      badge.textContent = n ? String(n) : '';
      badge.hidden = !n;
      badge.setAttribute('aria-label', n + ' items to review');
    }
    var reh = ui.$('#nav-rehearsal');
    if (reh) reh.hidden = !store.state.activeRehearsal;
  }

  function renderBanner() {
    var el = ui.$('#banner');
    var msgs = [];
    if (store.status.message) msgs.push('<p><strong>' + (store.status.persistent ? 'Note:' : 'Progress is not being saved.') + '</strong> ' + ui.esc(store.status.message) + ' <a href="#/progress">Progress &amp; data</a></p>');
    if (notice) msgs.push('<p>' + notice + ' <button type="button" class="btn btn-small" id="notice-dismiss">Dismiss</button></p>');
    if (store.status.stale) msgs.push('<p><button type="button" class="btn btn-primary" id="reload-progress">Reload latest progress</button> <a href="#/progress">Export this tab</a></p>');
    el.innerHTML = msgs.join('');
    if (store.status.stale) ui.$$('#main input, #main select, #main textarea, #main button').forEach(function (e) { if (e.id !== 'export-btn') e.disabled = true; });
    var reload = ui.$('#reload-progress', el);
    if (reload) reload.addEventListener('click', function () { location.reload(); });
    el.hidden = !msgs.length;
    el.className = 'banner' + (store.status.persistent ? '' : ' banner-bad');
    var d = ui.$('#notice-dismiss', el);
    if (d) d.addEventListener('click', function () { notice = ''; renderBanner(); });
  }

  function render(focusSel) {
    if (typeof cleanup === 'function') { try { cleanup(); } catch (e) { /* ignore */ } }
    cleanup = null;
    var p = parse();
    var viewFn = V[p.route.view] || V.notFound;
    var view;
    try { view = viewFn(p.params); }
    catch (e) {
      if (root.console) root.console.error(e);
      view = { title: 'Something went wrong', html: '<h1 tabindex="-1">Something went wrong</h1><p>This page could not be displayed. Your saved progress has not been changed. <a href="#/">Go home</a>.</p>' };
    }
    var main = ui.$('#main');
    main.innerHTML = view.html;
    document.title = view.title + ' · Scrum Study Studio';
    if (view.mount) cleanup = view.mount(main) || null;
    updateNav(p.route.nav);
    renderBanner();
    closeMenu();
    var target = (focusSel && ui.$(focusSel, main)) || ui.$('h1', main);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: !!focusSel });
      if (focusSel) target.scrollIntoView({ block: 'start' });
      else root.scrollTo(0, 0);
    }
  }

  function closeMenu() {
    var nav = ui.$('#nav'), btn = ui.$('#menu-btn');
    if (!nav || !btn) return;
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  // Submit a rehearsal whose deadline passed while the learner was elsewhere.
  function rehearsalWatchdog() {
    if (store.status.stale) return;
    var ar = store.state.activeRehearsal;
    if (!ar || !core.isExpired(ar.deadline, Date.now())) return;
    if (parse().route.view === 'rehearsal') return; // the rehearsal view handles its own expiry
    var rec = SSS.practice.submitRehearsal(true);
    if (rec) {
      notice = 'Your timed rehearsal reached its 60-minute deadline and was submitted automatically with the answers you had saved. <a href="#/rehearsal/result/' + rec.id + '">See results</a>.';
      renderBanner();
      updateNav(parse().route.nav);
    }
  }

  function init() {
    store.load();
    ui.$('.skip-link').addEventListener('click', function (e) { e.preventDefault(); var main = ui.$('#main'); main.focus(); main.scrollIntoView({ block: 'start' }); });
    ['click','input','change','submit'].forEach(function (type) { document.addEventListener(type, function (e) {
      if (!ui.$('#main').contains(e.target) || !e.target.closest('button,input,select,textarea,form') || e.target.id === 'export-btn') return;
      if (!store.ensureFresh()) { e.preventDefault(); e.stopImmediatePropagation(); renderBanner(); }
    }, true); });
    rehearsalWatchdog();
    store.onChange(function () { updateNav(parse().route.nav); if (!store.status.persistent || store.status.message) renderBanner(); });
    root.addEventListener('hashchange', function () { render(); });
    var btn = ui.$('#menu-btn');
    btn.addEventListener('click', function () {
      var nav = ui.$('#nav');
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) { var first = ui.$('a', nav); if (first) first.focus(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ui.$('#nav').classList.contains('is-open')) { closeMenu(); btn.focus(); }
    });
    setInterval(rehearsalWatchdog, 5000);
    document.addEventListener('visibilitychange', rehearsalWatchdog);
    render();
  }

  SSS.app = { rerender: render, init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window);
