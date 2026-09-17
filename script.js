/* Preloader % Counter */
(function(){
  const num=document.getElementById('plNum');
  const pl=document.getElementById('preloader');
  let n=0;
  const iv=setInterval(()=>{
    n+=Math.floor(Math.random()*4)+1;
    if(n>=100){n=100;clearInterval(iv);}
    num.textContent=n;
  },40);
  window.addEventListener('load',()=>setTimeout(()=>pl.classList.add('hide'),1900));
  setTimeout(()=>pl.classList.add('hide'),3000);
})();

/* Theme Toggle */
(function(){
  const btn=document.getElementById('themeBtn');
  if(localStorage.getItem('theme')==='light')document.body.classList.add('light');
  btn.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');
  });
})();

/* Custom Cursor + Trail */
(function(){
  if(window.matchMedia('(max-width:900px)').matches)return;
  const dot=document.querySelector('.cursor-dot');
  const ring=document.querySelector('.cursor-ring');
  const trails=['trail1','trail2','trail3','trail4','trail5'].map(id=>document.getElementById(id));
  const pos=trails.map(()=>({x:innerWidth/2,y:innerHeight/2}));
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  function loop(){
    rx+=(mx-rx)*.18;ry+=(my-ry)*.18;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    let px=mx,py=my;
    trails.forEach((t,i)=>{
      const p=pos[i];
      p.x+=(px-p.x)*.35;p.y+=(py-p.y)*.35;
      t.style.transform=`translate(${p.x}px,${p.y}px) translate(-50%,-50%)`;
      px=p.x;py=p.y;
    });
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a,button,.service-card,.project-card,.flip-card,.info-row,textarea').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      dot.style.width='10px';dot.style.height='10px';
      ring.style.width='60px';ring.style.height='60px';
      ring.style.borderColor='rgba(168,85,247,.8)';
      ring.style.background='rgba(168,85,247,.08)';
    });
    el.addEventListener('mouseleave',()=>{
      dot.style.width='6px';dot.style.height='6px';
      ring.style.width='36px';ring.style.height='36px';
      ring.style.borderColor='rgba(0,217,255,.5)';
      ring.style.background='transparent';
    });
  });
})();

/* Hero Name — 3D Letter Rise */
(function(){
  document.querySelectorAll('.hero-name .word').forEach(word=>{
    const t=word.dataset.letters;
    [...t].forEach((ch,i)=>{
      const s=document.createElement('span');
      if(ch===' '){s.className='space';s.innerHTML='&nbsp;';}
      else{s.className='letter';s.textContent=ch;}
      s.style.animationDelay=(0.4+i*0.05)+'s';
      word.appendChild(s);
    });
  });
})();

/* Hero Role Typing */
(function(){
  const el=document.getElementById('typingRole');
  const roles=['Web Designer','Web Developer','Problem Solver','Soil Science Student','Creative Thinker'];
  let i=0,j=0,del=false;
  function tick(){
    const c=roles[i];
    el.textContent=del?c.slice(0,--j):c.slice(0,++j);
    let sp=del?50:90;
    if(!del&&j===c.length){sp=1800;del=true;}
    else if(del&&j===0){del=false;i=(i+1)%roles.length;sp=400;}
    setTimeout(tick,sp);
  }
  tick();
})();

/* Scramble Section Titles */
(function(){
  const chars='!<>-_\\/[]{}—=+*^?#________';
  const els=document.querySelectorAll('.scramble');
  function scramble(el){
    const o=el.dataset.text,len=o.length;let f=0;const total=30;
    const iv=setInterval(()=>{
      f++;
      el.textContent=o.split('').map((c,i)=>{
        if(c===' ')return ' ';
        if(f>(i/len)*total)return c;
        return chars[Math.floor(Math.random()*chars.length)];
      }).join('');
      if(f>=total){clearInterval(iv);el.textContent=o;}
    },40);
  }
  const obs=new IntersectionObserver(en=>{
    en.forEach(e=>{if(e.isIntersecting){scramble(e.target);obs.unobserve(e.target);}});
  },{threshold:0.4});
  els.forEach(el=>obs.observe(el));
})();

/* Reveal + Skill Bars + Counters */
(function(){
  const reveals=document.querySelectorAll('.reveal');
  const animateCount=el=>{
    const t=+el.dataset.count,dur=1600,start=performance.now();
    function step(now){
      const p=Math.min((now-start)/dur,1);
      const e=1-Math.pow(1-p,3);
      el.textContent=Math.floor(e*t);
      if(p<1)requestAnimationFrame(step);else el.textContent=t;
    }
    requestAnimationFrame(step);
  };
  const obs=new IntersectionObserver(en=>{
    en.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('active');
      e.target.querySelectorAll('.skill-fill').forEach(f=>f.style.width=f.dataset.width+'%');
      e.target.querySelectorAll('.skill-count,.stat-num').forEach(c=>{
        if(!c.dataset.done){c.dataset.done='1';animateCount(c);}
      });
      obs.unobserve(e.target);
    });
  },{threshold:0.14});
  reveals.forEach(el=>obs.observe(el));
})();

/* Navbar + Progress + Back-to-top */
(function(){
  const nav=document.getElementById('navbar');
  const prog=document.getElementById('scrollProgress');
  const top=document.getElementById('topBtn');
  const ring=document.querySelector('#topBtn .ring-fg');
  function onScroll(){
    const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    const p=h>0?y/h:0;
    nav.classList.toggle('scrolled',y>40);
    prog.style.width=(p*100)+'%';
    top.classList.toggle('show',y>400);
    if(ring){const c=2*Math.PI*21;ring.style.strokeDashoffset=c-(c*p);}
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();

/* Mobile Menu */
(function(){
  const btn=document.getElementById('menuBtn');
  const links=document.getElementById('navLinks');
  btn.addEventListener('click',()=>{
    btn.classList.toggle('active');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      btn.classList.remove('active');
      links.classList.remove('open');
    });
  });
})();

/* Smooth Scroll */
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

/* Magnetic Buttons */
(function(){
  if(window.matchMedia('(max-width:900px)').matches)return;
  document.querySelectorAll('[data-magnetic]').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2;
      const y=e.clientY-r.top-r.height/2;
      btn.style.transform=`translate(${x*0.25}px,${y*0.35}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave',()=>btn.style.transform='');
  });
})();

/* 3D Tilt + Spotlight */
(function(){
  if(window.matchMedia('(max-width:900px)').matches)return;
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=e.clientX-r.left,y=e.clientY-r.top;
      const rx=((y-r.height/2)/r.height)*-10;
      const ry=((x-r.width/2)/r.width)*10;
      card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      card.style.setProperty('--mx',x+'px');
      card.style.setProperty('--my',y+'px');
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
})();

/* Particles */
(function(){
  const cv=document.getElementById('particles');
  const cx=cv.getContext('2d');
  let W=0,H=0,parts=[];
  function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
  resize();addEventListener('resize',resize);
  class P{
    constructor(){
      this.x=Math.random()*W;this.y=Math.random()*H;
      this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;
      this.r=Math.random()*1.8+.6;
      this.c=Math.random()>.5?'0,217,255':'168,85,247';
    }
    step(){
      this.x+=this.vx;this.y+=this.vy;
      if(this.x<0||this.x>W)this.vx*=-1;
      if(this.y<0||this.y>H)this.vy*=-1;
    }
    draw(){
      cx.fillStyle=`rgba(${this.c},0.6)`;
      cx.beginPath();cx.arc(this.x,this.y,this.r,0,Math.PI*2);cx.fill();
    }
  }
  function init(){parts=[];const n=Math.min(70,Math.floor(W/22));for(let i=0;i<n;i++)parts.push(new P());}
  init();addEventListener('resize',init);
  function loop(){
    cx.clearRect(0,0,W,H);
    for(let i=0;i<parts.length;i++){
      parts[i].step();parts[i].draw();
      for(let j=i+1;j<parts.length;j++){
        const dx=parts[i].x-parts[j].x,dy=parts[i].y-parts[j].y;
        const d=Math.hypot(dx,dy);
        if(d<130){
          cx.strokeStyle=`rgba(0,217,255,${.13*(1-d/130)})`;
          cx.lineWidth=1;
          cx.beginPath();
          cx.moveTo(parts[i].x,parts[i].y);
          cx.lineTo(parts[j].x,parts[j].y);
          cx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* Contact Form → WhatsApp */
(function(){
  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  const WA='8801610426493';
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const m=(new FormData(form).get('message')||'').trim();
    if(!m){status.textContent='Please write a message first.';status.className='form-status error';return;}
    status.textContent='Opening WhatsApp...';status.className='form-status';
    const text=`💬 *New Message from Portfolio*\n\n${m}`;
    const url=`https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
    window.open(url,'_blank');
    status.textContent='✅ WhatsApp opened! Just press Send.';
    status.className='form-status success';
    form.reset();
    setTimeout(()=>{status.textContent='';status.className='form-status';},5000);
  });
})();
