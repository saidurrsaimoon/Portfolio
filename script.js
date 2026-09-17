/* Loader */
(function(){
  const l=document.getElementById('loader');
  window.addEventListener('load',()=>setTimeout(()=>l.classList.add('hide'),1500));
  setTimeout(()=>l.classList.add('hide'),2200);
})();

/* Theme */
(function(){
  const b=document.getElementById('theme');
  const i=b.querySelector('i');
  if(localStorage.getItem('theme')==='light'){document.body.classList.add('light');i.className='fas fa-sun';}
  b.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    const L=document.body.classList.contains('light');
    i.className=L?'fas fa-sun':'fas fa-moon';
    localStorage.setItem('theme',L?'light':'dark');
  });
})();

/* Typing */
(function(){
  const el=document.getElementById('type');
  const roles=['Web Designer','Web Developer','Problem Solver','Soil Science Student','Creative Thinker'];
  let i=0,j=0,del=false;
  function t(){
    const c=roles[i];
    el.textContent=del?c.slice(0,--j):c.slice(0,++j);
    let sp=del?45:85;
    if(!del&&j===c.length){sp=1700;del=true;}
    else if(del&&j===0){del=false;i=(i+1)%roles.length;sp=350;}
    setTimeout(t,sp);
  }
  t();
})();

/* Reveal + Bars + Counters */
(function(){
  const reveals=document.querySelectorAll('.reveal');
  const cnt=el=>{
    const t=+el.dataset.n,dur=1400,st=performance.now();
    function s(now){
      const p=Math.min((now-st)/dur,1);
      const e=1-Math.pow(1-p,3);
      el.textContent=Math.floor(e*t);
      if(p<1)requestAnimationFrame(s);else el.textContent=t;
    }
    requestAnimationFrame(s);
  };
  const obs=new IntersectionObserver(en=>{
    en.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('active');
      e.target.querySelectorAll('.bar-fill').forEach(f=>f.style.width=f.dataset.w+'%');
      e.target.querySelectorAll('.cnt').forEach(c=>{
        if(!c.dataset.done){c.dataset.done='1';cnt(c);}
      });
      obs.unobserve(e.target);
    });
  },{threshold:0.15});
  reveals.forEach(el=>obs.observe(el));
})();

/* Navbar scroll + progress + top */
(function(){
  const n=document.getElementById('nav');
  const b=document.getElementById('bar');
  const u=document.getElementById('up');
  function s(){
    const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    const p=h>0?y/h:0;
    n.classList.toggle('scrolled',y>30);
    b.style.width=(p*100)+'%';
    u.classList.toggle('show',y>350);
  }
  addEventListener('scroll',s,{passive:true});s();
  u.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();

/* Menu */
(function(){
  const b=document.getElementById('burger');
  const m=document.getElementById('menu');
  b.addEventListener('click',()=>{b.classList.toggle('active');m.classList.toggle('open');});
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{b.classList.remove('active');m.classList.remove('open');}));
})();

/* Smooth */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length<2)return;
      const t=document.querySelector(id);
      if(!t)return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();

/* Confetti — fun button */
function party(e){
  const colors=['#00d4aa','#6c5ce7','#fdcb6e','#4a9eff','#ffa726'];
  const x=e.clientX||innerWidth/2,y=e.clientY||innerHeight/2;
  for(let i=0;i<26;i++){
    const c=document.createElement('div');
    c.className='confetti';
    c.style.left=x+'px';c.style.top=y+'px';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.transform=`translateX(${(Math.random()-.5)*200}px)`;
    c.style.animationDelay=(Math.random()*0.15)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),1800);
  }
}

/* Emoji pop */
(function(){
  if(window.matchMedia('(max-width:900px)').matches)return;
  const em=['✨','💫','⭐','🌟','💡','🚀','🎯'];
  let last=0;
  document.addEventListener('mousemove',e=>{
    const n=Date.now();
    if(n-last<500)return;
    if(Math.random()>0.12)return;
    last=n;
    const el=document.createElement('div');
    el.className='emoji-pop';
    el.textContent=em[Math.floor(Math.random()*em.length)];
    el.style.left=e.clientX+'px';el.style.top=e.clientY+'px';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),900);
  });
})();

/* Form → WhatsApp */
(function(){
  const f=document.getElementById('cForm');
  const s=document.getElementById('formMsg');
  const WA='8801610426493';
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const m=(new FormData(f).get('message')||'').trim();
    if(!m){s.textContent='Please write a message.';s.className='form-msg error';return;}
    s.textContent='Opening WhatsApp...';s.className='form-msg';
    const txt=`💬 *New Message from Portfolio*\n\n${m}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`,'_blank');
    s.textContent='✅ WhatsApp opened! Press Send.';
    s.className='form-msg success';
    f.reset();
    setTimeout(()=>{s.textContent='';s.className='form-msg';},5000);
  });
})();
