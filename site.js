const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* menu */
const bg=$('#burger'),mn=$('#mnav');const setM=o=>{mn.classList.toggle('o',o);document.body.classList.toggle('mo',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>setM(!mn.classList.contains('o'));$$('a',mn).forEach(a=>a.onclick=()=>setM(false));addEventListener('keydown',e=>{if(e.key=='Escape')setM(false)});
/* header shrink */
const hd=$('#hd');let tk=0;const sc=()=>{hd.classList.toggle('s',scrollY>24);tk=0};addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(sc)}},{passive:true});sc();
/* reveal */
if('IntersectionObserver'in window&&!RM){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(el.classList.contains('dc')?(i%3)*70:0)+'ms';io.observe(el)})}else $$('.rv').forEach(e=>e.classList.add('vi'));
/* diensten filter */
$$('[data-chooser]').forEach(ch=>{const cs=$$('.dc',ch),bs=$$('.chips:not(.sec) .chip',ch),out=$('[data-count]',ch);bs.forEach(b=>b.onclick=()=>{const f=b.dataset.f;bs.forEach(x=>{x.classList.toggle('on',x==b);x.setAttribute('aria-pressed',x==b)});let n=0;cs.forEach(c=>{const s=f=='*'||c.dataset.g==f;c.hidden=!s;if(s){n++;c.classList.add('vi');c.classList.remove('in-f');void c.offsetWidth;c.classList.add('in-f')}});out.textContent=n+' diensten getoond'})});
/* stepper tabs */
const tl=$('.stl');if(tl){const ts=$$('[role=tab]',tl);const go=(i,f)=>{ts.forEach((t,j)=>{t.setAttribute('aria-selected',j==i);t.tabIndex=j==i?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=j!=i});if(f)ts[i].focus()};
ts.forEach((t,i)=>{t.onclick=()=>go(i);t.onkeydown=e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();go((i+k+ts.length)%ts.length,1)}}})}
/* faq smooth */
if(!RM)$$('.faq details').forEach(d=>{const s=$('summary',d),a=$('.fa',d);s.onclick=e=>{e.preventDefault();if(d.open){const h=a.scrollHeight;a.animate([{height:h+'px'},{height:'0px'}],{duration:260,easing:'ease'}).onfinish=()=>d.open=false}else{d.open=true;const h=a.scrollHeight;a.animate([{height:'0px'},{height:h+'px'}],{duration:300,easing:'ease'})}}});
/* offertewizard */
const w=$('#wz');if(w){const st=$$('.ws:not(.done)',w),lis=$$('.wsteps li',w),bar=$('.wbar i',w),nx=$('#wzn'),bk=$('#wzb'),er=$('#wze');let i=0;const N=st.length;
const show=(f)=>{st.forEach((s,j)=>s.classList.toggle('on',j==i));lis.forEach((l,j)=>{l.classList.toggle('on',j==i);l.classList.toggle('dn',j<i)});bar.style.width=((i+1)/N*100)+'%';bk.style.visibility=i?'visible':'hidden';nx.innerHTML=i==N-1?'Aanvraag afronden <i aria-hidden="true">→</i>':'Volgende <i aria-hidden="true">→</i>';$('#wzs').textContent=`Stap ${i+1} van ${N}: ${lis[i].textContent}`;er.textContent='';if(f){const l=$('legend',st[i]);l.tabIndex=-1;l.focus({preventScroll:true});const y=w.getBoundingClientRect().top+scrollY-90;if(scrollY>y)scrollTo({top:y,behavior:RM?'auto':'smooth'})}};
const ok=()=>{const s=st[i];let bad=[];const need=s.dataset.need;if(need&&!$(`[name=${need}]:checked`,s))bad.push($(`[name=${need}]`,s));
$$('input[required]:not([type=radio]):not([type=checkbox]),textarea[required]',s).forEach(x=>{const v=x.checkValidity();x.setAttribute('aria-invalid',!v);if(!v)bad.push(x)});
['opp','freq'].forEach(n=>{const r=$(`[name=${n}]`,s);if(r&&!$(`[name=${n}]:checked`,s))bad.push(r)});const c=$('[name=ok]',s);if(c&&!c.checked)bad.push(c);
er.textContent=bad.length?(need=='dienst'?'Kies minstens één dienst.':need=='sector'?'Kies een type locatie.':'Vul de ontbrekende velden in.'):'';if(bad[0])bad[0].focus();return!bad.length};
$$('input',w).forEach(x=>x.addEventListener('change',()=>{er.textContent='';x.removeAttribute('aria-invalid')}));
$$('.ws[data-need=sector] input',w).forEach(x=>x.addEventListener('change',()=>{if(i==1)setTimeout(()=>{i=2;show(1)},RM?0:220)}));
bk.onclick=()=>{if(i){i--;show(1)}};nx.onclick=()=>{if(!ok())return;if(i<N-1){i++;show(1);return}if(w.website.value)return;const d=new FormData(w);
const rows=[['Dienst',d.getAll('dienst').join(', ')],['Locatie',d.get('sector')],['Oppervlakte',d.get('opp')],['Frequentie',d.get('freq')],['Postcode',d.get('postcode')],['Bedrijf',d.get('bedrijf')],['Contact',d.get('naam')+' · '+d.get('email')]];
$('#wzsum').innerHTML='';rows.forEach(([a,b])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=a;dd.textContent=b||'–';$('#wzsum').append(dt,dd)});
st.forEach(s=>s.classList.remove('on'));$('.wnav',w).hidden=true;lis.forEach(l=>{l.classList.remove('on');l.classList.add('dn')});bar.style.width='100%';const dn=$('#wzd');dn.classList.add('on');dn.focus()};
$('#wzr').onclick=()=>{w.reset();$('#wzd').classList.remove('on');$('.wnav',w).hidden=false;i=0;show(1)};
const p=new URLSearchParams(location.search).get('dienst');if(p){const c=$(`[data-slug="${CSS.escape(p)}"]`,w);if(c)c.checked=true}show()}
/* werken-bij formulier (bestaand) */
const f=$('#wf');if(f){const fs=$$('#wf fieldset.fs');let i=0;const N=fs.length;const show=()=>{fs.forEach((x,j)=>x.classList.toggle('on',j==i));$('#wstep').textContent=`Stap ${i+1} van ${N}`;$('#wprog').style.width=((i+1)/N*100)+'%';$('#wprev').style.visibility=i?'visible':'hidden';$('#wnext').textContent=i==N-1?'Verstuur aanmelding →':'Volgende →'};
const ok=()=>{const bad=[...fs[i].querySelectorAll('[required]')].filter(x=>x.type=='radio'?!fs[i].querySelector(`[name=${x.name}]:checked`):x.type=='checkbox'?!x.checked:!x.checkValidity());$('#werr').textContent=bad.length?'Vul de verplichte velden in.':'';if(bad[0])bad[0].focus();return!bad.length};
$('#wprev').onclick=()=>{if(i){i--;show()}};$('#wnext').onclick=()=>{if(!ok())return;if(i<N-1){i++;show();return}if(f.website.value)return;const d=new FormData(f);fs.forEach(x=>x.classList.remove('on'));f.querySelector('.fnav').style.display='none';$('#wstep').textContent='Verzonden';$('#wprog').style.width='100%';$('#wsum').textContent=`${d.get('type')} · ${d.get('regio')} · ${d.get('naam')}`;const dn=$('#wdone');dn.classList.add('on');dn.focus()};show()}
/* ===== v3 ===== */
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches,ROOT=document.body.dataset.root||'';
/* hero carrousel */
const hc=$('#hero');if(hc){const ss=$$('.hs',hc),ds=$$('.hd-dot',hc),bar=$('.hbar i',hc),pp=$('#hpp');let k=0,t0=performance.now(),paused=RM,hold=false,raf;const D=6500;
const go=n=>{k=(n+ss.length)%ss.length;ss.forEach((s,j)=>{const on=j==k;s.classList.toggle('on',on);s.setAttribute('aria-hidden',!on);$$('a',s).forEach(a=>a.tabIndex=on?0:-1);const im=$('img',s);if(on&&im.loading=='lazy')im.loading='eager'});ds.forEach((d,j)=>{d.classList.toggle('on',j==k);j==k?d.setAttribute('aria-current','true'):d.removeAttribute('aria-current')});t0=performance.now();bar.style.width='0'};
const setP=p=>{paused=p;hc.classList.toggle('paused',p);pp.setAttribute('aria-label',p?'Speel de carrousel af':'Pauzeer de carrousel')};setP(RM);
const tick=now=>{if(!paused&&!hold){const p=(now-t0)/D;bar.style.width=Math.min(p,1)*100+'%';if(p>=1)go(k+1)}else t0=now-(parseFloat(bar.style.width)||0)/100*D;raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
$('#hnext').onclick=()=>go(k+1);$('#hprev').onclick=()=>go(k-1);ds.forEach((d,j)=>d.onclick=()=>go(j));pp.onclick=()=>setP(!paused);
hc.addEventListener('mouseenter',()=>hold=true);hc.addEventListener('mouseleave',()=>hold=false);hc.addEventListener('focusin',()=>hold=true);hc.addEventListener('focusout',()=>hold=false);
hc.addEventListener('keydown',e=>{if(e.key=='ArrowRight')go(k+1);if(e.key=='ArrowLeft')go(k-1)});
let sx=null,sy=0;hc.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});hc.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))go(k+(dx<0?1:-1));sx=null},{passive:true});
document.addEventListener('visibilitychange',()=>{hold=document.hidden})}
/* telling (echte aantallen) */
if(!RM&&'IntersectionObserver'in window){const io2=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io2.unobserve(e.target);const el=e.target,n=+el.dataset.n,t=performance.now();const f=now=>{const p=Math.min((now-t)/900,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}));$$('[data-n]').forEach(e=>io2.observe(e))}
/* sector-kiezer */
$$('[data-chooser][data-sm]').forEach(ch=>{const SM=JSON.parse(ch.dataset.sm),cs=$$('.dc',ch),sb=$$('.chips.sec .chip',ch),tb=$$('.chips:not(.sec) .chip',ch),out=$('[data-count]',ch);
sb.forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!='true';sb.forEach(x=>{x.classList.toggle('on',x==b&&on);x.setAttribute('aria-pressed',x==b&&on)});tb.forEach(x=>{x.classList.toggle('on',x.dataset.f=='*');x.setAttribute('aria-pressed',x.dataset.f=='*')});
const L=on?SM[b.dataset.s]:null;let n=0;const g=$('.dgrid',ch);(L?[...cs].sort((a,b2)=>L.indexOf(a.dataset.s)-L.indexOf(b2.dataset.s)):cs).forEach(c=>g.append(c));cs.forEach(c=>{const s=!L||L.includes(c.dataset.s);c.hidden=!s;if(s){n++;c.classList.add('vi');c.classList.remove('in-f');void c.offsetWidth;c.classList.add('in-f')}});out.textContent=n+' diensten voor deze sector'}));
tb.forEach(b=>b.addEventListener('click',()=>sb.forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed',false)})))});
/* cursor-volgend label op kaarten */
if(FINE)$$('.dci').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--cx',e.clientX-r.left+'px');c.style.setProperty('--cy',e.clientY-r.top+'px')}));
/* magnetische knoppen */
if(FINE&&!RM)$$('.btn,.hbtn').forEach(b=>{b.classList.add('mg');b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
/* werkwijze: scroll-gestuurde voortgang */
const sw=$('#werkwijze');if(sw){const tabs=$$('.stl [role=tab]',sw),bi=$('.stbar i',sw);let man=0;tabs.forEach(t=>t.addEventListener('click',()=>man=performance.now()));
const upd=()=>{const r=sw.getBoundingClientRect(),vh=innerHeight;const p=Math.min(Math.max((vh*.75-r.top)/(r.height),0),1);bi.style.height=p*100+'%';if(performance.now()-man<1500)return;const i=Math.min(tabs.length-1,Math.floor(p*tabs.length*1.05));if(p>0&&tabs[i].getAttribute('aria-selected')!='true')tabs[i].click(),man=0};
addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});upd()}
/* kaart <-> lijst */
$$('.mapw').forEach(m=>{const by=c=>$$(`[data-c="${c}"]`,m);$$('[data-c]',m).forEach(el=>{['pointerenter','focus'].forEach(ev=>el.addEventListener(ev,()=>by(el.dataset.c).forEach(x=>x.classList.add('hl'))));['pointerleave','blur'].forEach(ev=>el.addEventListener(ev,()=>by(el.dataset.c).forEach(x=>x.classList.remove('hl'))))})});
/* sticky offerte-CTA mobiel */
const mc=$('#mcta');if(mc){const of=$('#offerte'),hr=$('#hero');let vis={o:false};const io3=new IntersectionObserver(es=>{es.forEach(e=>vis[e.target.id]=e.isIntersecting);mc.classList.toggle('on',!vis.offerte&&!(hr&&vis.hero)&&scrollY>300)});[of,hr].filter(Boolean).forEach(x=>io3.observe(x));addEventListener('scroll',()=>{if(!of&&!hr)mc.classList.toggle('on',scrollY>400)},{passive:true});if(!of)mc.href=ROOT+'#offerte'}
/* command / zoek-overlay */
const cm=$('#cmd'),ci=$('#cmdi'),cl=$('#cmdl'),sbn=$('#sbtn');if(cm){let data=null,sel=0,list=[],last=null;
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const render=()=>{const q=norm(ci.value.trim());list=(data||[]).map(x=>{const h=norm(x.t+' '+x.g+' '+x.k);let sc=!q?1:norm(x.t).startsWith(q)?3:norm(x.t).includes(q)?2:q.split(/\s+/).every(w=>h.includes(w))?1:0;return[sc,x]}).filter(a=>a[0]).sort((a,b)=>b[0]-a[0]).map(a=>a[1]).slice(0,12);sel=0;
cl.innerHTML='';if(!list.length){const li=document.createElement('li');li.className='em';li.textContent=data?'Geen resultaten. Probeer "ramen" of "Gent".':'Laden…';cl.append(li);return}
list.forEach((x,i)=>{const li=document.createElement('li');li.id='co'+i;li.setAttribute('role','option');li.setAttribute('aria-selected',i==sel);const b=document.createElement('b');b.textContent=x.t;const s=document.createElement('small');s.textContent=x.g;li.append(b,s);li.onclick=()=>openx(x);li.onpointermove=()=>mark(i);cl.append(li)});ci.setAttribute('aria-activedescendant','co0')};
const mark=i=>{sel=i;$$('li',cl).forEach((l,j)=>l.setAttribute('aria-selected',j==i));ci.setAttribute('aria-activedescendant','co'+i);const el=$('#co'+i);el&&el.scrollIntoView({block:'nearest'})};
const openx=x=>{close();location.href=ROOT+x.u};
const open=()=>{last=document.activeElement;cm.hidden=false;document.body.style.overflow='hidden';ci.value='';ci.focus();if(!data)fetch(ROOT+'zoek.json').then(r=>r.json()).then(d=>{data=d;render()});render()};
const close=()=>{cm.hidden=true;document.body.style.overflow='';last&&last.focus&&last.focus()};
sbn.onclick=open;$('[data-close]',cm).onclick=close;ci.oninput=render;
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();cm.hidden?open():close()}else if(e.key=='/'&&cm.hidden&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();open()}
if(cm.hidden)return;if(e.key=='Escape')close();if(e.key=='ArrowDown'){e.preventDefault();list.length&&mark((sel+1)%list.length)}if(e.key=='ArrowUp'){e.preventDefault();list.length&&mark((sel-1+list.length)%list.length)}if(e.key=='Enter'&&list[sel]){e.preventDefault();openx(list[sel])}if(e.key=='Tab'){e.preventDefault();ci.focus()}})}
/* links naar #offerte met ?dienst: wizard bijwerken zonder reload */
$$('a[href^="?dienst="]').forEach(a=>a.addEventListener('click',e=>{const w=$('#wz');if(!w)return;e.preventDefault();const s=new URLSearchParams(a.getAttribute('href').split('#')[0]).get('dienst');$$('[name=dienst]',w).forEach(c=>c.checked=c.dataset.slug==s);history.replaceState(null,'','?dienst='+s+'#offerte');$('#offerte').scrollIntoView({behavior:RM?'auto':'smooth'})}));
