const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const nav=$('#nav');addEventListener('scroll',()=>{nav.classList.toggle('s',scrollY>40);const h=$('.hero').offsetHeight,i=$('#start').getBoundingClientRect();$('.fab').classList.toggle('on',scrollY>h*.7&&!(i.top<innerHeight&&i.bottom>0));if(!RM)$('.hero-img').style.transform=`translateY(${Math.min(scrollY*.3,300)}px)`;$('#sprog').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});
const bg=$('#burger'),mn=$('#mnav');const setM=o=>{mn.classList.toggle('o',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');document.body.style.overflow=o?'hidden':''};bg.onclick=()=>setM(!mn.classList.contains('o'));$$('#mnav a').forEach(a=>a.onclick=()=>setM(false));addEventListener('keydown',e=>{if(e.key=='Escape')setM(false)});
// split headline
const h1=$('h1.split');h1.innerHTML=h1.innerHTML.split('<br>').map(l=>l.replace(/(<em>)?([^<]+)(<\/em>)?/g,(m,a,t,b)=>(a||'')+t.trim().split(' ').map(w=>`<span class="w">${w}</span>`).join(' ')+(b||''))).join('<br>');$$('h1 .w').forEach((w,i)=>w.style.animationDelay=(.25+i*.09)+'s');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});$$('.rv').forEach(e=>io.observe(e));
// steps autoplay
let cur=0,t0=performance.now(),D=4200,paused=false;const steps=$$('#steps li'),cards=$$('.card');
function go(i){cur=i;t0=performance.now();steps.forEach((s,j)=>s.classList.toggle('on',j==i));cards.forEach((c,j)=>c.classList.toggle('on',j==i));$$('#sdots button').forEach((d,j)=>d.classList.toggle('on',j==i))}
$$('#sdots button').forEach((d,i)=>d.onclick=()=>go(i));
steps.forEach((s,i)=>{s.onclick=()=>go(i);s.onmouseenter=()=>{go(i);paused=true};s.onmouseleave=()=>paused=false});
let vis=false;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe($('#stage'));
(function tick(n){if(paused||!vis)t0=n-((parseFloat($('#prog').style.width)||0)/100*D);const p=Math.min((n-t0)/D,1);$('#prog').style.width=p*100+'%';if(p>=1)go((cur+1)%4);requestAnimationFrame(tick)})(performance.now());
// tabs
const tb=$$('.tabs button');function tab(i,f){tb.forEach((x,j)=>{x.classList.toggle('on',j==i);x.setAttribute('aria-selected',j==i);x.tabIndex=j==i?0:-1});$$('.pane').forEach((p,j)=>{p.classList.toggle('on',j==i);p.hidden=j!=i});if(f)tb[i].focus()}tb.forEach((b,i)=>{b.onclick=()=>tab(i);b.onkeydown=e=>{if(e.key=='ArrowRight')tab((i+1)%3,1);if(e.key=='ArrowLeft')tab((i+2)%3,1)}});
// tilt
$$('.tilt').forEach(el=>{el.onmousemove=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`};el.onmouseleave=()=>el.style.transform=''});
// form
const m2=$('#m2');m2.oninput=()=>$('#m2o').textContent=(+m2.value).toLocaleString('nl-BE')+(m2.value>=20000?'+':'')+' m²';
let st=0;const fs=$$('.fs:not(.done)'),lb=$$('.flabels li');
function show(){fs.forEach((f,i)=>f.classList.toggle('on',i==st));lb.forEach((l,i)=>{l.classList.toggle('on',i==st);l.classList.toggle('ok',i<st)});$('#fprog').style.width=((st+1)/4*100)+'%';$('#prev').style.visibility=st?'visible':'hidden';$('#next').textContent=st==3?'Verstuur aanvraag ✓':'Volgende →';$('#err').textContent='';$('#fstep').textContent=`Stap ${st+1} van 4`}
function valid(){const f=fs[st];if(st==0&&!f.querySelector('[name=type]:checked'))return'Kies een type site.';if(st==1&&!f.querySelector('[name=taken]:checked'))return'Kies minstens één taak.';if(st==2&&!f.querySelector('[name=freq]:checked'))return'Kies een frequentie.';if(st==3){for(const i of f.querySelectorAll('[required]'))if(!i.checkValidity()){i.focus();return i.type=='email'?'Vul een geldig e-mailadres in.':'Vul alle verplichte velden in.'}}return''}
$('#next').onclick=()=>{const e=valid();if(e){$('#err').textContent=e;return}if(st<3){st++;show();$('#f').scrollIntoView({behavior:'smooth',block:'start'})}else{if($('.hp').value)return;const nb=$('#next');nb.classList.add('loading');nb.innerHTML='Versturen<span class="ld" aria-hidden="true"></span>';setTimeout(()=>{const d=new FormData($('#f'));try{localStorage.removeItem('vc-intake')}catch(_){}fs.forEach(f=>f.classList.remove('on'));$('.fnav').style.display='none';$('.flabels').style.display='none';$('#fprog').style.width='100%';$('#done').classList.add('on');$('#sum').textContent=`${d.get('type')} · ${d.getAll('taken').join(', ')} · ${d.get('freq')} · ${d.get('gemeente')}`;$('#fstep').textContent='Verzonden';$('#done').focus()/* TODO: koppel formulierdienst */},900)}};
$('#prev').onclick=()=>{if(st){st--;show()}};$$('.opts input[type=radio]').forEach(r=>r.addEventListener('change',()=>setTimeout(()=>{if(st>0&&st<3&&!valid()){st++;show()}},350)));show();

// magnetic buttons
if(matchMedia('(hover:hover)').matches)$$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.25}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
// chat demo
const msgs=[['k','Morgen is Ahmed ziek, kan iemand overnemen?'],['a','Melding ontvangen. Vervanger Sara is ingewerkt op uw site en ingepland voor 6u.'],['m','Ik bel u vrijdag even voor de wekelijkse kwaliteitscheck.']];
let chatOn=false;new IntersectionObserver(e=>{if(e[0].isIntersecting&&!chatOn){chatOn=true;play()}}).observe($('#chat'));
async function play(){const b=$('#chb');const w=t=>new Promise(r=>setTimeout(r,t));while(true){b.innerHTML='';for(const[k,t]of msgs){const d=document.createElement('div');d.className='bub '+k;d.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';b.appendChild(d);await w(900);d.textContent=t;await w(1600)}await w(4000)}}

// bewaar ingevulde velden lokaal (geen server)
const F=$('#f');try{const sv=JSON.parse(localStorage.getItem('vc-intake')||'{}');for(const[k,v]of Object.entries(sv)){const els=F.querySelectorAll(`[name="${k}"]`);els.forEach(el=>{if(el.type=='radio'||el.type=='checkbox')el.checked=[].concat(v).includes(el.value);else el.value=v})}m2.oninput()}catch(_){}
F.addEventListener('input',()=>{const d=new FormData(F),o={};for(const k of new Set(d.keys()))if(k!='website')o[k]=d.getAll(k).length>1?d.getAll(k):d.get(k);try{localStorage.setItem('vc-intake',JSON.stringify(o))}catch(_){}});
// video pas laden op desktop met goede verbinding
const vd=$('.hero-img video'),cn=navigator.connection;if(!RM&&innerWidth>860&&!(cn&&(cn.saveData||/2g/.test(cn.effectiveType)))){addEventListener('load',()=>setTimeout(()=>{vd.src=vd.dataset.src;vd.oncanplay=()=>{vd.classList.add('ready');vd.play().catch(()=>{})};vd.load()},600))}
