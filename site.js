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
$$('[data-chooser]').forEach(ch=>{const cs=$$('.dc',ch),bs=$$('.chip',ch),out=$('[data-count]',ch);bs.forEach(b=>b.onclick=()=>{const f=b.dataset.f;bs.forEach(x=>{x.classList.toggle('on',x==b);x.setAttribute('aria-pressed',x==b)});let n=0;cs.forEach(c=>{const s=f=='*'||c.dataset.g==f;c.hidden=!s;if(s){n++;c.classList.add('vi');c.classList.remove('in-f');void c.offsetWidth;c.classList.add('in-f')}});out.textContent=n+' diensten getoond'})});
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
