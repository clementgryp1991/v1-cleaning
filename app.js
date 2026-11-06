/* CDW site script (home). Dependency-free. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const DATA = {"services": [{"id": "ramen", "cat": "buiten", "catL": "Buiten & projecten", "ic": "window", "img": "img/dienst-interieur-glasreiniging.webp", "t": "Ramen en glas", "d": "Ramen, glazen wanden en lichtstraten, binnen en buiten, op een vaste planning."}, {"id": "zonnepanelen", "cat": "buiten", "catL": "Buiten & projecten", "ic": "solar", "img": "img/zonnepanelen.webp", "t": "Zonnepanelen reinigen", "d": "Panelen op bedrijfsdaken zacht gereinigd, zonder agressieve middelen."}, {"id": "drone", "cat": "buiten", "catL": "Buiten & projecten", "ic": "drone", "img": "img/drone.webp", "t": "Zonnepanelen met drones", "d": "Drone-reiniging voor grote of moeilijk bereikbare industriële daken, met minder werk op hoogte."}, {"id": "gevel", "cat": "buiten", "catL": "Buiten & projecten", "ic": "house", "img": "img/dienst-gevelreiniging-hoogwerker.webp", "t": "Gevel-, dak- en buitenreiniging", "d": "Gevels, PVC, daken, laadkades en verharding, met lage of hoge druk naargelang de ondergrond."}, {"id": "oplevering", "cat": "buiten", "catL": "Buiten & projecten", "ic": "build", "img": "img/oplevering.webp", "t": "Bouw- en opleveringsschoonmaak", "d": "Bouwstof en resten weg na nieuwbouw of renovatie, zodat het gebouw klaar is voor de eerste werkdag."}, {"id": "eind", "cat": "buiten", "catL": "Buiten & projecten", "ic": "box", "img": "img/eindschoonmaak.webp", "t": "Eindschoonmaak bij verhuis", "d": "Een leeg pand grondig schoon na een verhuis, ontruiming of het einde van een huur."}, {"id": "kantoor", "cat": "gebouw", "catL": "Gebouwen", "ic": "office", "img": "img/dienst-kantoorschoonmaak.webp", "t": "Kantoorschoonmaak", "d": "Bureaus, vergaderzalen, keuken en sanitair. Overdag of na de kantooruren."}, {"id": "winkel", "cat": "gebouw", "catL": "Gebouwen", "ic": "shop", "img": "img/dienst-retail-winkelreiniging.webp", "t": "Winkelschoonmaak", "d": "Winkelvloer, inkom, paskamers en etalage, ingepland rond je openingsuren."}, {"id": "industrie", "cat": "industrie", "catL": "Industrie", "ic": "ware", "img": "img/industrie.webp", "t": "Industriële schoonmaak", "d": "Magazijnen, bedrijfshallen en logistieke sites, afgestemd op je shifts en planning."}, {"id": "vloer", "cat": "industrie", "catL": "Industrie", "ic": "floor", "img": "img/dienst-industriele-vloerreiniging.webp", "t": "Industriële vloerreiniging", "d": "Schrobzuigen van betonvloeren, coatings en loopzones, met de juiste machine per vloer."}, {"id": "machine", "cat": "industrie", "catL": "Industrie", "ic": "gear", "img": "img/machine.webp", "t": "Productie- en machinereiniging", "d": "Lijnen, machines en productieruimtes, volgens je reinigings- en hygiëneplan."}, {"id": "diepte", "cat": "industrie", "catL": "Industrie", "ic": "spark", "img": "img/diepte.webp", "t": "Dieptereiniging en grote kuis", "d": "Eenmalige of periodieke grondige reiniging, bijvoorbeeld tijdens een stilstand."}], "sectors": [{"t": "Haven & logistiek", "d": "Kades, magazijnen en doorrijzones. We werken rond lossen en laden.", "art": "logistics", "img": "img/haven.webp"}, {"t": "Voeding", "d": "Volgens je hygiëneplan, met gescheiden materiaal per zone.", "art": "food", "img": "img/voeding.webp"}, {"t": "Productie & industrie", "d": "Lijnen en hallen, gepland tijdens stilstand of tussen shifts.", "art": "industry", "img": "img/machine.webp"}, {"t": "Kantoren", "d": "Bureaus en vergaderzalen, overdag of na de kantooruren.", "art": "office", "img": "img/dienst-kantoorschoonmaak.webp"}, {"t": "Zorg", "d": "Discreet en volgens protocol, rond bezoekuren en zorgmomenten.", "art": "care", "img": "img/zorg.webp"}], "cities": [{"n": "Gent", "p": "Oost-Vlaanderen", "x": 256, "y": 173, "t": "Thuisbasis van CDW. Kantoren, haven, zorg en retail in en rond Gent."}, {"n": "Brugge", "p": "West-Vlaanderen", "x": 164, "y": 125, "t": "Kantoren, winkels en kmo-zones rond Brugge. We stemmen de planning af op je locatie en gewenste werkuren."}, {"n": "Zeebrugge", "p": "West-Vlaanderen", "x": 158, "y": 90, "t": "Havengebied en logistieke sites. Reiniging van kades, loodsen en kantoren rond los- en laadtijden."}, {"n": "Oostende", "p": "West-Vlaanderen", "x": 108, "y": 120, "t": "Kust- en havenbedrijven. Zout en zand vragen een eigen aanpak voor ramen en gevels."}, {"n": "Ieper", "p": "West-Vlaanderen", "x": 102, "y": 231, "t": "Bedrijven in de Westhoek. Industriële sites, kantoren en winkels."}, {"n": "Roeselare", "p": "West-Vlaanderen", "x": 145, "y": 202, "t": "Voeding en agro-industrie. Reiniging volgens hygiëneplan en gescheiden zones."}, {"n": "Kortrijk", "p": "West-Vlaanderen", "x": 173, "y": 237, "t": "Productie- en textielbedrijven in de regio Kortrijk. Machine- en vloerreiniging tussen shifts."}, {"n": "Sint-Niklaas", "p": "Oost-Vlaanderen", "x": 334, "y": 137, "t": "Waasland: logistiek, retail en kantoren."}, {"n": "Aalst", "p": "Oost-Vlaanderen", "x": 316, "y": 205, "t": "Productie en logistiek langs de E40. Reiniging afgestemd op je bedrijfsplanning."}, {"n": "Antwerpen", "p": "Antwerpen", "x": 383, "y": 123, "t": "Haven, logistiek, kantoren en retail. Grote sites, planning rond shifts en los- en laadtijden."}, {"n": "Mechelen", "p": "Antwerpen", "x": 397, "y": 178, "t": "Kmo-zones en kantoren tussen Antwerpen en Brussel. Overdag of na de kantooruren."}, {"n": "Turnhout", "p": "Antwerpen", "x": 483, "y": 93, "t": "Kempen: productie, logistiek en kmo-zones."}, {"n": "Leuven", "p": "Vlaams-Brabant", "x": 438, "y": 223, "t": "Kantoren, labo’s en zorginstellingen. Discreet en volgens protocol."}, {"n": "Hasselt", "p": "Limburg", "x": 557, "y": 208, "below": true, "t": "Kantoren, winkels en industriële sites in Midden-Limburg."}, {"n": "Genk", "p": "Limburg", "x": 587, "y": 196, "t": "Industrie en logistiek rond Genk. Vloer- en machinereiniging tussen shifts."}], "faqs": [["Wat kost professionele schoonmaak?", "De prijs hangt af van de oppervlakte, de taken, de frequentie en de toegankelijkheid. Bezorg ons de details voor een voorstel op maat."], ["Kan de schoonmaak buiten de openingsuren?", "Geef je gewenste werkuren mee bij je aanvraag. We bekijken samen welke momenten haalbaar zijn voor jouw locatie."], ["Kan ik meerdere locaties opnemen in één aanvraag?", "Ja. Vermeld de adressen en geef per locatie kort aan welke schoonmaak je nodig hebt."], ["Wat moet ik doorgeven voor een offerte?", "Het type locatie, de postcode, de gewenste frequentie en de ruimtes of taken die je wil laten opnemen. Een geschatte oppervlakte helpt ook. De aanvraag hieronder vraagt je precies dat."], ["Wie voert het werk uit?", "CDW neemt de schoonmaak op als opdracht. Wij organiseren de ploeg, de planning en de vervanging bij afwezigheid. Jij hebt één contactpersoon."]], "steps": [{"t": "Beschrijf je locatie", "s": "Waar je bedrijf gevestigd is, wat je wil laten schoonmaken en hoe vaak. Dat kan via de aanvraag onderaan deze pagina.", "k": "Stap 1 · Aanvraag", "mock": [["Locatie", "Gent, 9000"], ["Dienst", "Kantoorschoonmaak"], ["Frequentie", "Wekelijks"]]}, {"t": "Bespreek de schoonmaak", "s": "We bellen je of komen langs. Samen leggen we vast welke ruimtes, welke taken en welke uren.", "k": "Stap 2 · Plaatsbezoek", "mock": [["Rondgang", "Ingepland"], ["Werkuren", "Na 18:00"], ["Toegang", "Badge via receptie"]]}, {"t": "Ontvang je voorstel", "s": "Een duidelijk voorstel met taken, frequentie en prijs. Geen verrassingen achteraf.", "k": "Stap 3 · Voorstel", "mock": [["Taken", "14 opgenomen"], ["Prijs", "Per maand, vast"], ["Status", "<span class=\"pill\">Ter goedkeuring</span>"]]}, {"t": "Start en opvolging", "s": "Je vaste ploeg start. Na elke shift krijg je een fotorapport en bij vragen heb je één contactpersoon.", "k": "Stap 4 · Opvolging", "mock": [["Ploeg", "Vast, 2 personen"], ["Fotorapport", "<span class=\"ok\">Verzonden 18:42</span>"], ["Contact", "1 persoon"]]}]};
  const { services, sectors, cities, faqs, steps } = DATA;
  const cfg = window.CDW_CONFIG || {};
  const validPublicUrl = value => typeof value === 'string' && (/^https:\/\/[^\s]+$/i.test(value) || /^\/(?!\/)[^\s]*$/.test(value));
  const canSend = validPublicUrl(cfg.formEndpoint) && validPublicUrl(cfg.privacyUrl);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.contactEmail || '') ? cfg.contactEmail : '';
  const phone = /^[+0-9 ()-]{5,30}$/.test(cfg.phoneHref || '') ? cfg.phoneHref.replace(/[ ()-]/g, '') : '';
  const byId = id => services.find(s => s.id === id);
  const PAGE = {ramen:'ramen-en-glas',zonnepanelen:'zonnepanelen',drone:'zonnepanelen-drone',gevel:'gevel-en-dakreiniging',oplevering:'opleveringsschoonmaak',eind:'eindschoonmaak',kantoor:'kantoorschoonmaak',winkel:'winkelschoonmaak',industrie:'industriele-schoonmaak',vloer:'vloerreiniging',machine:'productie-en-machinereiniging',diepte:'dieptereiniging'};
  const CITYPAGE = {'Gent':'gent','Brugge':'brugge','Zeebrugge':'zeebrugge','Oostende':'oostende','Ieper':'ieper','Roeselare':'roeselare','Kortrijk':'kortrijk','Sint-Niklaas':'sint-niklaas','Aalst':'aalst','Waregem':'waregem','Eeklo':'eeklo'};
  document.documentElement.classList.add('js');

  /* Contact details are never invented. Empty settings hide dummy links. */
  $$('[data-contact]').forEach(link => {
    const isEmail = link.dataset.contact === 'email';
    const value = isEmail ? email : phone;
    if (!value) return;
    link.textContent = isEmail ? email : (cfg.phoneDisplay || phone);
    link.href = (isEmail ? 'mailto:' : 'tel:') + value;
    link.hidden = false;
    if (link.closest('.contact-row')) link.closest('.contact-row').hidden = false;
  });
  if (canSend) $('#form-mode').hidden = true;

  /* Native dialogs supply focus trapping, Escape and return-to-trigger behaviour. */
  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    $('#mbar').classList.remove('show');
  }
  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      document.body.classList.toggle('dialog-open', !!$('dialog[open]'));
      if (dialog.id === 'mobile') $('#burger').setAttribute('aria-expanded', 'false');
      scheduleScroll();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(dialog);
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(document.getElementById(button.dataset.close))));
  $('#burger').onclick = () => { openDialog($('#mobile')); $('#burger').setAttribute('aria-expanded', 'true'); };
  $('#mclose').onclick = () => closeDialog($('#mobile'));
  $$('#mobile a').forEach(a => a.addEventListener('click', () => closeDialog($('#mobile'))));

  const nav = $('#nav'), progress = $('#progress'), mbar = $('#mbar');
  const navLinks = $$('#menu > li > a[href^="#"]');
  let scrollQueued = false;
  function inView(element) { const r = element.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }
  function updateScroll() {
    scrollQueued = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    nav.classList.toggle('scrolled', scrollY > 8);
    progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
    mbar.classList.toggle('show', scrollY > 500 && !inView($('#offerte')) && !$('dialog[open]') && !$('footer').matches(':focus-within'));
    $('#totop').classList.toggle('show', scrollY > 900);
    let current = '';
    navLinks.forEach(a => { const section = document.getElementById(a.hash.slice(1)); if (section && section.getBoundingClientRect().top <= 130) current = a.hash; });
    navLinks.forEach(a => { const active = current === a.hash; a.classList.toggle('active', active); active ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'); });
  }
  function scheduleScroll() { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll, { passive: true });
  $('#totop').onclick = () => window.scrollTo({ top: 0, behavior: reduceQuery.matches ? 'instant' : 'smooth' });

  /* Mega menu: never leave invisible links in the keyboard sequence. */
  const megaOwner = $('.has-mega'), megaPanel = $('#mega-diensten'), megaButton = $('.mtrig');
  let megaTimer;
  function toggleMega(open) {
    clearTimeout(megaTimer);
    megaOwner.classList.toggle('open', open);
    megaButton.setAttribute('aria-expanded', String(open));
    megaPanel.inert = !open;
  }
  toggleMega(false);
  megaButton.onclick = () => toggleMega(!megaOwner.classList.contains('open'));
  megaOwner.addEventListener('mouseleave', () => { megaTimer = setTimeout(() => { if (!megaOwner.contains(document.activeElement)) toggleMega(false); }, 200); });
  megaOwner.addEventListener('focusout', e => { if (!megaOwner.contains(e.relatedTarget)) toggleMega(false); });
  document.addEventListener('click', e => { if (!megaOwner.contains(e.target)) toggleMega(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && megaOwner.classList.contains('open')) { toggleMega(false); megaButton.focus(); }
  });

  function tabArrows(container, selector, callback) {
    container.addEventListener('keydown', e => {
      const tabs = $$(selector,container), current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      let next;
      if (['ArrowRight','ArrowDown'].includes(e.key)) next = (current+1)%tabs.length;
      else if (['ArrowLeft','ArrowUp'].includes(e.key)) next = (current-1+tabs.length)%tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length-1;
      else return;
      e.preventDefault(); callback(next,tabs[next]); tabs[next].focus();
    });
  }

  /* Services retain the original twelve entries and filter groups. */
  function setFilter(value, announce = true) {
    let count = 0;
    $$('#filters .chip').forEach(b => { const selected = b.dataset.f === value; b.classList.toggle('on',selected); b.setAttribute('aria-pressed',String(selected)); });
    $$('#sgrid .scard').forEach(card => { card.hidden = value !== 'all' && card.dataset.cat !== value; if (!card.hidden) count++; });
    if (announce) $('#filter-status').textContent = `${count} ${count === 1 ? 'dienst' : 'diensten'} zichtbaar.`;
  }
  $$('#filters .chip').forEach(b => b.onclick = () => setFilter(b.dataset.f));
  $$('[data-quote]').forEach(a => a.onclick = () => preselect(byId(a.dataset.quote).t, null));
  $$('[data-sector]').forEach(a => a.onclick = () => preselect(null,a.dataset.sector));
  $$('[data-service-link]').forEach(a => a.onclick = () => { setFilter('all',false); toggleMega(false); });
  const scopes = {
    ramen:['Welke ramen, glaswanden en lichtstraten worden opgenomen.','Toegankelijkheid, hoogte en de geschikte werkwijze per gevel.','Frequentie, werkuren en controle na de reiniging.'],
    zonnepanelen:['Het type installatie, de bereikbaarheid en de toestand van de panelen.','De reinigingsmethode en middelen afgestemd op de installatie.','Een veilige uitvoering en planning rond de werking van je site.'],
    drone:['De technische haalbaarheid en geschiktheid van reiniging met een drone.','Toegang, omgeving en de vereiste operationele voorwaarden.','De te reinigen zones, planning en controle van het resultaat.'],
    gevel:['Welke gevels, daken, kades of verhardingen worden gereinigd.','Het materiaal, de vervuiling en een passende reinigingsmethode.','Afzetting van de werkzone en planning rond gebruikers of leveringen.'],
    oplevering:['De staat van de ruimtes na nieuwbouw of renovatie.','Bouwstof, glas, vloeren en resterende afwerkingen.','De opleveringsdatum en afstemming met andere aannemers.'],
    eind:['Welke ruimtes bij het verlaten van het pand worden opgenomen.','Vloeren, sanitair, keuken en glas volgens de afgesproken scope.','Toegang en planning vóór sleuteloverdracht of ingebruikname.'],
    kantoor:['Bureaus, vergaderzalen, keuken, sanitair en gemeenschappelijke ruimtes.','De frequentie en werkuren die bij je bezetting passen.','Toegang, materiaal en de checklist voor elke schoonmaakbeurt.'],
    winkel:['Winkelvloer, inkom, paskamers, sanitair en etalage.','Schoonmaak voor, tijdens of na de openingsuren.','De aandachtspunten en materialen van je winkel of showroom.'],
    industrie:['Magazijnen, bedrijfshallen, looproutes en logistieke zones.','Werkafspraken rond productie, goederenstromen en shifts.','De benodigde machines, middelen en veiligheidsafspraken.'],
    vloer:['Type vloer, coating, vervuiling en te reinigen oppervlakte.','Een passende schrobzuigmachine en reinigingsmiddel.','Bereikbaarheid, droogtijd en afbakening van de werkzone.'],
    machine:['Welke machines, lijnen en productieruimtes in de opdracht zitten.','De stilstand, vrijgave en werkinstructies van je technische team.','Het reinigings- en hygiëneplan dat op jouw site geldt.'],
    diepte:['De zones en vervuiling die een grondige aanpak vragen.','Geschikte machines en middelen per materiaal of ondergrond.','Een eenmalige planning of periodieke reiniging tijdens stilstand.']
  };
  function openService(id) {
    const service = byId(id); if (!service) return;
    $('#service-category').textContent = service.catL;
    $('#service-title').textContent = service.t;
    $('#service-description').textContent = service.d;
    $('#service-image').src = service.img; $('#service-image').alt = service.t;
    $('#service-scope').replaceChildren(...scopes[id].map(text => { const li=document.createElement('li');li.textContent=text;return li; }));
    $('#service-quote').onclick = () => { preselect(service.t,null); closeDialog($('#service-dialog')); };
    const more = $('#service-more'); if (more) { more.href = 'diensten/' + PAGE[id] + '/'; more.textContent = 'Alles over ' + service.t.toLowerCase(); }
    openDialog($('#service-dialog'));
  }
  $$('.service-open').forEach(b => b.onclick = () => openService(b.dataset.service));
  addEventListener('hashchange', () => { if (location.hash.startsWith('#dienst-')) setFilter('all',false); });

  /* Original four-step explanation, now user-controlled and keyboard-accessible. */
  const steplist = $('#steplist'), stage = $('#stage');
  steps.forEach((item,i) => {
    const tab=document.createElement('button');tab.type='button';tab.className='step';tab.id=`work-tab-${i}`;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',`work-panel-${i}`);
    tab.innerHTML=`<span class="n"><em>0${i+1}</em>${icon('check')}</span><div><b>${safe(item.t)}</b><span class="desc">${safe(item.s)}</span></div>`;
    tab.onclick=()=>goStep(i);steplist.append(tab);
    const panel=document.createElement('div');panel.className='panel';panel.id=`work-panel-${i}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);
    panel.innerHTML=`<span class="kicker">${safe(item.k)} · Voorbeeld</span><h3>${safe(item.t)}</h3><p>${safe(item.s)}</p><div class="mock">${item.mock.map(row=>`<div class="row"><span>${safe(row[0])}</span><span>${row[1]}</span></div>`).join('')}</div>`;
    stage.append(panel);
  });
  function goStep(index) {
    $$('.step',steplist).forEach((b,i)=>{b.classList.toggle('on',i===index);b.classList.toggle('done',i<index);b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
    $$('.panel',stage).forEach((p,i)=>{p.classList.toggle('on',i===index);p.hidden=i!==index;});
  }
  tabArrows(steplist,'button',goStep);goStep(0);

  /* Report tabs work both inline and in the enlarged example. */
  function setupReport(root) {
    const tabs=$$('[data-report]',root);
    function select(tab) {
      tabs.forEach(b=>{const active=b===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
      $$('[role="tabpanel"]',root).forEach(panel=>panel.hidden=panel.id!==tab.getAttribute('aria-controls'));
    }
    tabs.forEach(tab=>tab.onclick=()=>select(tab));
    tabArrows($('.report-tabs',root),'[data-report]',(i,tab)=>select(tab));
  }
  setupReport($('.report-preview'));
  $('#open-report').onclick=()=>{
    const clone=$('.report-preview').cloneNode(true);
    $$('[id]',clone).forEach(el=>el.id='expanded-'+el.id);
    $$('[aria-controls]',clone).forEach(el=>el.setAttribute('aria-controls','expanded-'+el.getAttribute('aria-controls')));
    $$('[aria-labelledby]',clone).forEach(el=>el.setAttribute('aria-labelledby','expanded-'+el.getAttribute('aria-labelledby')));
    $('.report-open',clone)?.remove();
    $('#report-expanded').replaceChildren(clone);setupReport(clone);openDialog($('#report-dialog'));
  };

  /* Map retained: label and button state kept in sync, with larger hit targets. */
  $('#mapsvg').setAttribute('role','group');
  const cityGroup=$('#cities'),cityButtons=$('#citybtns'),footRegion=$('#footregio');
  cities.forEach((city,i)=>{
    const el=document.createElementNS('http://www.w3.org/2000/svg','g');el.classList.add('city');el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label',`${city.n}, ${city.p}`);
    const left=city.x>560||['Ieper','Sint-Niklaas'].includes(city.n);
    el.innerHTML=`<circle class="hit" cx="${city.x}" cy="${city.y}" r="13"/><circle class="ring" cx="${city.x}" cy="${city.y}" r="11"/><circle class="dot" cx="${city.x}" cy="${city.y}" r="5"/><text x="${city.x+(left?-10:9)}" y="${city.below?city.y+18:city.y-8}" text-anchor="${left?'end':'start'}">${safe(city.n)}</text>`;
    el.addEventListener('click',()=>pickCity(i));el.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();pickCity(i);}});cityGroup.append(el);
    const button=document.createElement('button');button.type='button';button.textContent=city.n;button.onclick=()=>pickCity(i);cityButtons.append(button);
    if(footRegion&&CITYPAGE[city.n]){const li=document.createElement('li'),a=document.createElement('a');a.href='regio/'+CITYPAGE[city.n]+'/';a.textContent=city.n;li.append(a);footRegion.append(li);}
  });
  function pickCity(index) {
    const city=cities[index];
    $$('.city',cityGroup).forEach((el,i)=>{el.classList.toggle('on',i===index);el.setAttribute('aria-pressed',String(i===index));});
    $$('button',cityButtons).forEach((el,i)=>{el.classList.toggle('on',i===index);el.setAttribute('aria-pressed',String(i===index));});
    $('#mc-prov').textContent=city.p;$('#mc-name').textContent=city.n;$('#mc-text').textContent=city.t;const more=$('#mc-more');if(more){const slug=CITYPAGE[city.n];more.hidden=!slug;if(slug){more.href='regio/'+slug+'/';more.firstChild.textContent='Schoonmaak in '+city.n+' ';}}
  }
  pickCity(0);

  /* Quotation wizard: no false success, no permanent browser storage of personal data. */
  const state={dienst:[],sector:'',opp:'',freq:''};
  const paneList=$$('.pane'),prog=$$('#prog button'),error=$('#err');
  let step=0,busy=false,request=null,sent=false;
  const fields=['bedrijf','naam','email','tel','postcode','msg'];
  function values(){return Object.fromEntries(fields.map(name=>[name,$('#f-'+name).value.trim()]));}
  function clearError(){error.classList.remove('on');error.textContent='';$$('#qform [aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));}
  function showError(message,field){error.textContent=message;error.classList.add('on');if(field){field.setAttribute('aria-invalid','true');field.focus();}else error.focus();}
  $$('.opts').forEach(group=>{
    const field=group.dataset.field,multi=group.dataset.multi==='1';
    $$('.opt',group).forEach(button=>{
      button.setAttribute('aria-pressed','false');
      button.onclick=()=>{
        if(busy)return;
        const value=button.dataset.v;
        if(multi){const i=state[field].indexOf(value);i<0?state[field].push(value):state[field].splice(i,1);}
        else state[field]=value;
        syncOptions();clearError();renderSummary();
      };
    });
  });
  function syncOptions(){
    $$('.opts').forEach(group=>$$('.opt',group).forEach(button=>{
      const field=group.dataset.field,selected=Array.isArray(state[field])?state[field].includes(button.dataset.v):state[field]===button.dataset.v;
      button.classList.toggle('on',selected);button.setAttribute('aria-pressed',String(selected));
    }));
  }
  function renderTags(id,list,fallback){
    const target=$(id);target.replaceChildren();
    if(!list.length){const empty=document.createElement('span');empty.className='empty';empty.textContent=fallback;target.append(empty);return;}
    list.forEach(text=>{const tag=document.createElement('span');tag.className='t';tag.textContent=text;target.append(tag);});
  }
  function renderSummary(){
    renderTags('#s-dienst',state.dienst,'Nog niet gekozen');renderTags('#s-sector',state.sector?[state.sector]:[],'Nog niet gekozen');renderTags('#s-omvang',[state.opp,state.freq].filter(Boolean),'Nog niet gekozen');
    const postcode=$('#f-postcode').value.trim();renderTags('#s-loc',postcode?[`Postcode ${postcode}`]:[],'Postcode volgt');
  }
  $('#f-postcode').addEventListener('input',()=>{renderSummary();clearError();});
  $$('input,textarea',$('#qform')).forEach(input=>input.addEventListener('input',clearError));
  function validate(index){
    const v=values();
    if(index===0&&!state.dienst.length)return ['Kies minstens één dienst.'];
    if(index===1&&!state.sector)return ['Kies het type locatie.'];
    if(index===2){
      if(!state.opp)return ['Kies de geschatte oppervlakte. Je kunt ook “Weet ik niet” kiezen.'];
      if(!state.freq)return ['Kies hoe vaak je schoonmaak nodig hebt.'];
      if(!/^[1-9]\d{3}$/.test(v.postcode))return ['Vul een Belgische postcode van vier cijfers in.',$('#f-postcode')];
    }
    if(index===3){
      if(!v.bedrijf)return ['Vul je bedrijfsnaam in.',$('#f-bedrijf')];
      if(!v.naam)return ['Vul de naam van je contactpersoon in.',$('#f-naam')];
      if(!$('#f-email').validity.valid||!v.email)return ['Vul een geldig e-mailadres in.',$('#f-email')];
      if(!$('#f-consent').checked)return ['Bevestig dat CDW je over deze aanvraag mag contacteren.',$('#f-consent')];
    }
    return null;
  }
  function goTo(index,focus=true){
    step=Math.min(4,Math.max(0,index));
    paneList.forEach(p=>p.classList.toggle('on',Number(p.dataset.pane)===step));
    prog.forEach((button,i)=>{button.classList.toggle('on',i===step);button.classList.toggle('done',i<step);button.disabled=i>step; i===step?button.setAttribute('aria-current','step'):button.removeAttribute('aria-current');});
    $('#back').disabled=step===0||busy;
    $('#next').innerHTML=(step===3?(canSend?'Aanvraag versturen':'Bekijk je aanvraag'):'Volgende')+icon('arrow');
    $('#fnav').hidden=step===4;
    $('#form-mode').hidden=canSend||step===4;
    $('#step-caption').textContent=step===4?(sent?'Aanvraag verzonden':'Overzicht · nog niet verzonden'):`Stap ${step+1} van 4 · ${['Jouw schoonmaak','Jouw locatie','Omvang & planning','Contactgegevens'][step]}`;
    clearError();
    if(focus){
      const heading=$('.pane.on h3');heading.tabIndex=-1;heading.focus({preventScroll:true});
      const r=$('#qform').getBoundingClientRect();if(r.top<95||r.top>innerHeight*.65)$('#qform').scrollIntoView({behavior:reduceQuery.matches?'instant':'smooth',block:'start'});
    }
  }
  function preselect(service,sector){
    if(busy)return;
    if(service&&services.some(s=>s.t===service)&&!state.dienst.includes(service))state.dienst.push(service);
    if(sector&&$$('.opts[data-field="sector"] .opt').some(button=>button.dataset.v===sector))state.sector=sector;
    syncOptions();renderSummary();if(step===4)goTo(0,false);
  }
  function buildRequest(){return {...values(),diensten:[...state.dienst],sector:state.sector,oppervlakte:state.opp,frequentie:state.freq,contactToegestaan:$('#f-consent').checked,website:$('#f-website').value};}
  function requestText(){
    if(!request)return '';
    return ['CDW — OFFERTEAANVRAAG',sent?'Status: verzonden':'Status: opgesteld, niet verzonden','',`Diensten: ${request.diensten.join(', ')}`,`Sector: ${request.sector}`,`Oppervlakte: ${request.oppervlakte}`,`Frequentie: ${request.frequentie}`,`Postcode: ${request.postcode}`,'',`Bedrijf: ${request.bedrijf}`,`Contactpersoon: ${request.naam}`,`E-mail: ${request.email}`,`Telefoon: ${request.tel||'Niet opgegeven'}`,'',`Toelichting: ${request.msg||'Geen'}`,'',`Contact over deze aanvraag toegestaan: ${request.contactToegestaan?'ja':'nee'}`].join('\n');
  }
  function renderResult(){
    const rows=[['Diensten',request.diensten.join(' · ')],['Locatie & planning',`${request.sector} · ${request.postcode}\n${request.oppervlakte} · ${request.frequentie}`],['Contact',`${request.bedrijf}\n${request.naam}\n${request.email}${request.tel?'\n'+request.tel:''}`]];
    if(request.msg)rows.push(['Toelichting',request.msg]);
    $('#request-review').innerHTML='<dl>'+rows.map(([label,value])=>`<div><dt>${safe(label)}</dt><dd>${safe(value)}</dd></div>`).join('')+'</dl>';
    $('#result-title').textContent=sent?'Je aanvraag is verzonden.':'Je aanvraag staat klaar.';
    $('#result-description').textContent=sent?'Bedankt. CDW neemt contact met je op om de aanvraag te bespreken.':'Er is nog niets verzonden. Download of kopieer je aanvraag om ze verder te gebruiken.';
    $('#copy-status').textContent='';
    $('#edit-request').hidden=sent;
    if(email&&!sent){const link=$('#email-request');link.hidden=false;link.href=`mailto:${email}?subject=${encodeURIComponent('Offerteaanvraag CDW — '+request.bedrijf)}&body=${encodeURIComponent(requestText())}`;}else $('#email-request').hidden=true;
  }
  function setBusy(value){busy=value;$('#qform').setAttribute('aria-busy',String(value));$$('#qform button,#qform input,#qform textarea').forEach(el=>el.disabled=value);if(!value){prog.forEach((el,i)=>el.disabled=i>step);$('#back').disabled=step===0;}$('#next').innerHTML=value?'Bezig met verzenden…':(step===3?(canSend?'Aanvraag versturen':'Bekijk je aanvraag'):'Volgende')+icon('arrow');}
  async function next(){
    if(busy||step===4)return;
    const problem=validate(step);if(problem){showError(...problem);return;}
    if(step<3){goTo(step+1);return;}
    // Revalidate earlier steps before making any network request.
    for(let i=0;i<4;i++){const earlier=validate(i);if(earlier){goTo(i);showError(...earlier);return;}}
    request=buildRequest();sent=false;
    if(request.website){showError('Je aanvraag kon niet worden verwerkt. Probeer opnieuw.');return;}
    if(!canSend){renderResult();goTo(4);return;}
    setBusy(true);const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),Math.min(30000,Math.max(3000,Number(cfg.requestTimeoutMs)||15000)));
    try{
      const response=await fetch(cfg.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},credentials:'omit',body:JSON.stringify({...request,source:'cdw-website',version:2}),signal:controller.signal});
      const result=await response.json().catch(()=>null);
      if(!response.ok||!result||result.ok!==true)throw new Error('unconfirmed');
      sent=true;setBusy(false);renderResult();goTo(4);
    }catch(error){setBusy(false);showError(error.name==='AbortError'?'De verbinding duurde te lang. Er is geen bevestiging ontvangen. Je gegevens blijven staan; controleer eerst of de aanvraag toch werd ontvangen voordat je opnieuw probeert.':'We konden de verzending niet bevestigen. Je gegevens blijven staan. Probeer opnieuw of neem rechtstreeks contact op.');}
    finally{clearTimeout(timeout);}
  }
  $('#next').onclick=next;
  $('#back').onclick=()=>{if(!busy&&step>0)goTo(step-1);};
  prog.forEach((button,i)=>button.onclick=()=>{if(!busy&&i<step)goTo(i);});
  $('#qform').addEventListener('submit',e=>{e.preventDefault();next();});
  $('#qform').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input:not([type="checkbox"])')){e.preventDefault();next();}});
  $('#edit-request').onclick=()=>goTo(3);
  $('#reset').onclick=()=>{
    if(busy)return;state.dienst=[];state.sector=state.opp=state.freq='';HTMLFormElement.prototype.reset.call($('#qform'));request=null;sent=false;syncOptions();renderSummary();$('#request-review').replaceChildren();$('#copy-status').textContent='';goTo(0);
  };
  $('#download-request').onclick=()=>{
    const blob=new Blob(['\uFEFF'+requestText()],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='CDW-offerteaanvraag.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  $('#copy-request').onclick=async()=>{
    let copied=false;
    try{await navigator.clipboard.writeText(requestText());copied=true;}catch(_){
      const area=document.createElement('textarea');area.value=requestText();area.style.cssText='position:fixed;top:0;left:-9999px';document.body.append(area);area.select();try{copied=document.execCommand('copy');}catch(_){}area.remove();$('#copy-request').focus();
    }
    $('#copy-status').textContent=copied?'Aanvraag gekopieerd. Plak ze in je e-mail of document.':'Kopiëren is hier niet beschikbaar. Gebruik “Download aanvraag”.';
  };
  syncOptions();renderSummary();goTo(0,false);

  /* Search only changes location on an explicit selection; no hidden preselection. */
  const palette=$('#pal'),searchInput=$('#palin'),resultList=$('#pallist');
  const searchItems=[
    ...services.map(s=>({group:'Diensten',text:s.t,icon:s.ic,href:'#dienst-'+s.id,action:()=>openService(s.id)})),
    ...sectors.map(s=>({group:'Sectoren',text:s.t,icon:'team',href:'#sectoren'})),
    ...cities.map((c,i)=>({group:'Regio’s',text:c.n,icon:'pin',href:'#regio',action:()=>{pickCity(i);location.hash='regio';}})),
    ...[['Alle diensten','diensten/','doc'],['Alle sectoren','sectoren/','team'],['Alle regio’s','regio/','pin'],['Over CDW','over-ons/','user'],['Kwaliteit & fotorapport','kwaliteit/','cam'],['Vergelijking','vergelijking/','check'],['Werken bij CDW','werken-bij/','team']].map(([text,href,ico])=>({group:'Pagina’s',text,href,icon:ico})),
    ...[['Offerte aanvragen','offerte','doc'],['Werkwijze','werkwijze','check'],['Fotorapport','kwaliteit','cam'],['Veelgestelde vragen','faq','search'],['Over CDW','over','user']].map(([text,id,ico])=>({group:'Pagina',text,href:'#'+id,icon:ico}))
  ];
  let searchSelection=0,filtered=searchItems;
  const normal=text=>text.toLocaleLowerCase('nl-BE').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function renderSearch(){
    const query=normal(searchInput.value.trim());filtered=searchItems.filter(item=>normal(item.text+' '+item.group).includes(query));searchSelection=0;
    $('#search-status').textContent=`${filtered.length} resultaten.`;
    if(!filtered.length){resultList.innerHTML='<div class="none">Geen resultaat. Probeer “ramen”, “zorg” of “Gent”.</div>';return;}
    let group='';resultList.innerHTML=filtered.map((item,i)=>{const heading=item.group!==group?`<div class="grp">${safe(item.group)}</div>`:'';group=item.group;return heading+`<a class="it${i===0?' sel':''}" href="${item.href}" data-i="${i}">${icon(item.icon)}<span>${safe(item.text)}</span><small>${safe(item.group)}</small></a>`;}).join('');
    $$('.it',resultList).forEach(a=>{a.onclick=e=>{e.preventDefault();activateSearch(Number(a.dataset.i));};a.onmouseenter=()=>{searchSelection=Number(a.dataset.i);highlightSearch();};});
  }
  function highlightSearch(){const links=$$('.it',resultList);links.forEach((a,i)=>a.classList.toggle('sel',i===searchSelection));links[searchSelection]?.scrollIntoView({block:'nearest'});}
  function activateSearch(index){const item=filtered[index];if(!item)return;closeDialog(palette);if(item.action)item.action();else if(item.href.startsWith('#'))location.hash=item.href;else location.href=item.href;}
  function openSearch(){toggleMega(false);searchInput.value='';renderSearch();openDialog(palette);searchInput.focus();}
  searchInput.addEventListener('input',renderSearch);
  searchInput.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();searchSelection=Math.min(filtered.length-1,searchSelection+1);highlightSearch();}else if(e.key==='ArrowUp'){e.preventDefault();searchSelection=Math.max(0,searchSelection-1);highlightSearch();}else if(e.key==='Enter'){e.preventDefault();activateSearch(searchSelection);}});
  $('#palbtn').onclick=openSearch;
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(palette.open)closeDialog(palette);else if(!$('dialog[open]'))openSearch();}});

  /* Accurate technical notices for this build; not a fabricated approved policy. */
  $$('[data-policy]').forEach(button=>button.addEventListener('click',e=>{
    e.preventDefault();
    if(button.dataset.policy==='privacy'){
      if(canSend&&validPublicUrl(cfg.privacyUrl)){window.open(cfg.privacyUrl,'_blank','noopener,noreferrer');return;}
      $('#policy-title').textContent='Privacy-informatie';
      $('#policy-content').innerHTML='<p class="policy-note"><strong>Voorbeeldwebsite.</strong> De online verzending is nog niet geactiveerd. Dit is technische informatie over deze versie, geen definitieve privacyverklaring.</p><h3>Gegevens in het formulier</h3><p>Je invoer blijft in deze pagina. De website bewaart de formuliergegevens niet in cookies of lokale browseropslag en verstuurt ze niet naar een server. Bij downloaden of kopiëren bepaal je zelf waar je de aanvraag bewaart of deelt.</p><h3>Vóór publicatie</h3><p>De eigenaar moet de contactgegevens, formulierverwerking en definitieve privacyverklaring bevestigen. Zodra de koppeling is geactiveerd, moet de gepubliceerde privacyverklaring de werkelijke verwerking beschrijven.</p>';
    }else{
      $('#policy-title').textContent='Cookies & techniek';
      $('#policy-content').innerHTML='<p>Deze versie bevat geen analytics, advertentiepixels of trackingcookies. Er wordt ook geen cookievoorkeur opgeslagen. Daarom verschijnt er geen overbodige toestemmingsbanner.</p><h3>Lettertypes en afbeeldingen</h3><p>De lettertypes Montserrat en Figtree worden via Google Fonts geladen. Daarbij maakt je browser verbinding met die dienst. Alle websitefoto’s en logo’s zitten in het websitepakket.</p><h3>Bij latere uitbreidingen</h3><p>Deze informatie moet opnieuw worden nagekeken als analytics, externe video’s, een klantenportaal of andere externe diensten worden toegevoegd.</p>';
    }
    $('#policy-content').insertAdjacentHTML('beforeend', button.dataset.policy==='privacy' ? '<p style="margin-top:18px"><a class="link" href="privacy/">Lees het conceptprivacybeleid →</a></p>' : '<p style="margin-top:18px"><a class="link" href="cookies/">Lees het conceptcookiebeleid →</a></p>');
    openDialog($('#policy-dialog'));
  }));

  /* Light entry motion only; all essential content remains present without JavaScript. */
  if(!reduceQuery.matches&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}}),{threshold:.06});
    $$('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight)observer.observe(el);});
  }
  /* Preselection from detail pages (?dienst=slug / ?sector=Naam). */
  try{const qp=new URLSearchParams(location.search);const qd=qp.get('dienst'),qs=qp.get('sector');
    const id=qd&&(Object.keys(PAGE).find(k=>PAGE[k]===qd)||({vloeronderhoud:'vloer','dakgoten-reinigen':'gevel',dakontmossing:'gevel'})[qd]);
    if(id||qs)preselect(id?byId(id).t:null,qs||null);}catch(_){}
  scheduleScroll();
})();
