/* CDW core: iPhone/iPad viewport + shared navigation for inner pages. Dependency-free. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* Visible height and the gap under it (Safari toolbar / home indicator) → --vvh, --vv-bottom. */
  const setVh = () => {
    const vv = window.visualViewport;
    const h = (vv && vv.height) || innerHeight;
    root.style.setProperty('--vvh', Math.round(h) + 'px');
    const covered = vv ? Math.max(0, innerHeight - vv.height - vv.offsetTop) : 0;
    root.style.setProperty('--vv-bottom', Math.round(covered) + 'px');
  };
  setVh();
  addEventListener('resize', setVh, { passive: true });
  addEventListener('orientationchange', () => setTimeout(setVh, 250));
  if (window.visualViewport) {
    visualViewport.addEventListener('resize', setVh);
    visualViewport.addEventListener('scroll', setVh);
  }

  /* Body scroll lock while any modal dialog is open (iOS ignores overflow:hidden on body). */
  let lockY = 0, locked = false;
  const lock = on => {
    if (on === locked) return; locked = on;
    const b = document.body;
    if (on) { lockY = scrollY; b.style.position = 'fixed'; b.style.top = -lockY + 'px'; b.style.left = '0'; b.style.right = '0'; b.style.width = '100%'; }
    else { b.style.position = b.style.top = b.style.left = b.style.right = b.style.width = ''; scrollTo({ top: lockY, behavior: 'instant' }); }
  };
  const syncLock = () => lock(!!$('dialog[open]'));
  $$('dialog').forEach(d => new MutationObserver(syncLock).observe(d, { attributes: true, attributeFilter: ['open'] }));

  /* Hero and any other video: inline, muted. Reduced motion keeps the poster. */
  const syncVideo = v => {
    v.muted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
    if (reduce.matches) { v.removeAttribute('autoplay'); v.pause(); }
    else if (v.autoplay || v.hasAttribute('autoplay')) v.play().catch(() => {});
  };
  $$('video').forEach(syncVideo);
  reduce.addEventListener?.('change', () => $$('video').forEach(syncVideo));

  /* Static hero: keep the chip scroller and the hero-out flag. No carousel. */
  const vh = document.querySelector('.vhero');
  if (vh) {
    const strip = vh.querySelector('.vstrip');
    if (strip && 'IntersectionObserver' in window) new IntersectionObserver(e => document.body.classList.toggle('hero-out', !e[0].isIntersecting)).observe(strip);
    else document.body.classList.add('hero-out');
    const sc = vh.querySelector('.vscroll'), more = vh.querySelector('.vmore');
    if (sc && more) {
      const upd = () => { const over = sc.scrollWidth > sc.clientWidth + 4; more.hidden = !over; more.classList.toggle('end', sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 4); };
      more.addEventListener('click', () => { const end = sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 4; sc.scrollBy({ left: end ? -sc.scrollWidth : sc.clientWidth * .7, behavior: reduce.matches ? 'auto' : 'smooth' }); });
      sc.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    }
  }
  /* One reveal observer for every page, including the homepage. */
  if (!reduce.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .06 });
    $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) io.observe(el); });
  }
  if (document.body.dataset.page === 'home') return; /* home uses app.js */

  const open = d => { if (d && !d.open) d.showModal(); };
  const close = d => { if (d && d.open) d.close(); };
  $$('dialog').forEach(d => d.addEventListener('click', e => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(d);
  }));
  $$('[data-close]').forEach(b => b.addEventListener('click', () => close(document.getElementById(b.dataset.close))));

  /* Mobile menu */
  const burger = $('#burger'), mobile = $('#mobile');
  if (burger && mobile) {
    burger.onclick = () => { open(mobile); burger.setAttribute('aria-expanded', 'true'); };
    mobile.addEventListener('close', () => burger.setAttribute('aria-expanded', 'false'));
    $$('#mobile a').forEach(a => a.addEventListener('click', () => close(mobile)));
    $('#mclose') && ($('#mclose').onclick = () => close(mobile));
  }

  /* Mega menu: click/tap to open, tap outside or Escape to close. */
  const owner = $('.has-mega'), panel = $('#mega-diensten'), trig = $('.mtrig');
  const mega = on => { if (!owner) return; owner.classList.toggle('open', on); trig.setAttribute('aria-expanded', String(on)); panel.inert = !on; };
  if (owner) {
    mega(false);
    trig.onclick = e => { e.stopPropagation(); mega(!owner.classList.contains('open')); };
    owner.addEventListener('focusout', e => { if (!owner.contains(e.relatedTarget)) mega(false); });
    document.addEventListener('pointerdown', e => { if (!owner.contains(e.target)) mega(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && owner.classList.contains('open')) { mega(false); trig.focus(); } });
  }

  /* Sticky nav state, reading progress, bottom bar, back-to-top */
  const nav = $('#nav'), prog = $('#progress'), mbar = $('#mbar'), totop = $('#totop');
  let q = false;
  const onScroll = () => {
    q = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav && nav.classList.toggle('scrolled', y > 8);
    prog && (prog.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`);
    mbar && mbar.classList.toggle('show', y > 48 && !$('dialog[open]'));
    totop && totop.classList.toggle('show', y > 900);
  };
  addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  totop && (totop.onclick = () => scrollTo({ top: 0, behavior: reduce.matches ? 'instant' : 'smooth' }));

  /* Service chooser on /diensten/ */
  const ch = $('[data-chooser]');
  if (ch) {
    const SM = JSON.parse(ch.dataset.sm || '{}'), cards = $$('.dc', ch), status = $('[data-count]', ch);
    const apply = (f, s) => {
      let n = 0;
      cards.forEach(c => { const ok = (f === '*' || c.dataset.g === f) && (!s || (SM[s] || []).includes(c.dataset.s)); c.hidden = !ok; if (ok) n++; });
      status && (status.textContent = n + (n === 1 ? ' dienst' : ' diensten') + ' zichtbaar.');
    };
    let f = '*', s = '';
    $$('.chip[data-f]', ch).forEach(b => b.onclick = () => { f = b.dataset.f; $$('.chip[data-f]', ch).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); }); apply(f, s); });
    $$('.chip[data-s]', ch).forEach(b => b.onclick = () => { s = s === b.dataset.s ? '' : b.dataset.s; $$('.chip[data-s]', ch).forEach(x => { const on = x.dataset.s === s; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); }); apply(f, s); });
  }

  /* Search palette (data from zoek.json) */
  const pal = $('#pal'), input = $('#palin'), list = $('#pallist'), btn = $('#palbtn');
  if (pal && input && list) {
    const base = document.body.dataset.root || './';
    let items = [], sel = 0, shown = [];
    const norm = t => t.toLocaleLowerCase('nl-BE').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const render = () => {
      const qv = norm(input.value.trim());
      shown = items.filter(i => norm(`${i.t} ${i.g} ${i.k || ''}`).includes(qv)); sel = 0;
      $('#search-status') && ($('#search-status').textContent = `${shown.length} resultaten.`);
      if (!shown.length) { list.innerHTML = '<div class="none">Geen resultaat. Probeer “ramen”, “zorg” of “Gent”.</div>'; return; }
      let g = ''; list.innerHTML = shown.map((i, n) => { const h = i.g !== g ? `<div class="grp">${esc(i.g)}</div>` : ''; g = i.g; return h + `<a class="it${n === 0 ? ' sel' : ''}" href="${base}${esc(i.u)}" data-i="${n}"><svg aria-hidden="true"><use href="#i-arrow"/></svg><span>${esc(i.t)}</span><small>${esc(i.g)}</small></a>`; }).join('');
    };
    const hl = () => { $$('.it', list).forEach((a, n) => a.classList.toggle('sel', n === sel)); $$('.it', list)[sel]?.scrollIntoView({ block: 'nearest' }); };
    const openSearch = async () => {
      mega(false);
      if (!items.length) { try { items = await (await fetch(base + 'zoek.json')).json(); } catch (_) { items = []; } }
      input.value = ''; render(); open(pal); input.focus();
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); hl(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); hl(); }
      else if (e.key === 'Enter') { e.preventDefault(); const a = $$('.it', list)[sel]; if (a) location.href = a.href; }
    });
    btn && (btn.onclick = openSearch);
    document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? close(pal) : (!$('dialog[open]') && openSearch()); } });
  }

})();
