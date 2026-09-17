/* Loader */
(function(){
  const l=document.getElementById('loader');
  window.addEventListener('load',()=>setTimeout(()=>l.classList.add('hide'),1400));
  setTimeout(()=>l.classList.add('hide'),2000);
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

/* Hero typing */
(function(){
  const el=document.getElementById('type');
  const roles=['Web Designer','Web Developer','Problem Solver','Soil Science Student','Creative Thinker','SAIDUR R. SAIMOON'];
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

/* About typing */
(function(){
  const el=document.getElementById('aboutType');
  if(!el)return;
  const lines=[
    "Turning curiosity into code 💻",
    "Learning something new every day 🌱",
    "Designing clean & functional websites ✨",
    "Passionate about tech and problem solving 🚀",
    "Always open to collaborate and grow 🤝"
  ];
  let i=0,j=0,del=false;
  function t(){
    const c=lines[i];
    el.textContent=del?c.slice(0,--j):c.slice(0,++j);
    let sp=del?30:60;
    if(!del&&j===c.length){sp=2200;del=true;}
    else if(del&&j===0){del=false;i=(i+1)%lines.length;sp=400;}
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

/* Navbar + Progress + Top */
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

/* Smooth scroll */
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

/* Sparkles background */
(function(){
  const s=document.getElementById('sparkles');
  if(!s)return;
  const icons=['✨','✧','⋆','✦','♡','☆'];
  for(let i=0;i<18;i++){
    const sp=document.createElement('span');
    sp.className='sparkle';
    sp.textContent=icons[Math.floor(Math.random()*icons.length)];
    sp.style.left=Math.random()*100+'%';
    sp.style.top=Math.random()*70+'%';
    sp.style.fontSize=(Math.random()*0.9+0.6)+'rem';
    sp.style.animationDuration=(3+Math.random()*4)+'s';
    sp.style.animationDelay=(Math.random()*3)+'s';
    s.appendChild(sp);
  }
})();

/* Confetti */
function party(e){
  const colors=['#ff4fa0','#d62d87','#ff9ec9','#ffd166','#ffb3d9'];
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
  const em=['✨','💫','⭐','🌟','💡','🚀','🎯','💖'];
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

/* SKILL DATA */
const SKILLS = {
  webdesign:{icon:'🎨',title:'Web Designing',
    body:`I design clean, modern and user-friendly website layouts. My focus is on creating visually appealing interfaces that feel natural to navigate — combining color theory, typography, spacing and hierarchy.<br><br>I pay close attention to how a user moves through a page — from the first glance to the final click. Great design isn't just about looks, it's about clarity and feeling.`,
    tags:['Layout','Color','Typography','UX']},
  webdev:{icon:'⚙️',title:'Web Development',
    body:`I build functional websites from scratch — turning design into real, working code. From simple landing pages to interactive personal portfolios, I love bringing ideas to life on the browser.<br><br>My approach: <b>clean structure, fast load, smooth interactions.</b> I test on multiple screen sizes to make sure everything works perfectly.`,
    tags:['HTML','CSS','JavaScript','Responsive']},
  html:{icon:'📄',title:'HTML5',
    body:`HTML is the backbone of every website I build. I write semantic, clean and accessible markup that search engines and screen readers love.<br><br>I focus on using the right tags for the right purpose — <b>header, nav, section, article, footer</b> — so the structure is meaningful and maintainable.`,
    tags:['Semantic','Accessible','SEO-friendly']},
  css:{icon:'🎨',title:'CSS3',
    body:`CSS is where my designs come alive. I use modern techniques like <b>Flexbox, Grid, animations, transitions and custom properties</b> to build beautiful responsive layouts.<br><br>I love experimenting with gradients, glassmorphism and subtle motion effects to make pages feel premium and alive.`,
    tags:['Flexbox','Grid','Animation','Responsive']},
  js:{icon:'⚡',title:'JavaScript',
    body:`JavaScript adds interactivity and life to my websites. I use it to handle user events, create animations, build form logic, and make every interaction feel smooth.<br><br>From typing effects to modal windows and scroll-triggered animations — <b>JS is my creative playground.</b>`,
    tags:['DOM','Events','Animation','Logic']},
  word:{icon:'📝',title:'Microsoft Word',
    body:`I'm comfortable using Microsoft Word for professional documentation — creating clean reports, letters, assignments, and formatted documents.<br><br>I know how to work with <b>styles, tables, headers/footers, page layouts</b> and print-ready formatting.`,
    tags:['Documentation','Formatting','Reports']},
  excel:{icon:'📊',title:'Microsoft Excel',
    body:`I use Excel for organizing data, creating tables, and doing basic-to-intermediate calculations.<br><br>I know how to work with <b>formulas, sorting, filtering, and simple charts</b> — helpful for academic tasks and small data projects.`,
    tags:['Data','Formulas','Charts']},
  ppt:{icon:'📽️',title:'PowerPoint',
    body:`I create engaging presentations using PowerPoint — with clean slide design, consistent color scheme, and organized content.<br><br>I focus on making presentations <b>easy to read and visually appealing</b> — because good slides help ideas land better.`,
    tags:['Slides','Design','Presentation']},
  computer:{icon:'🖥️',title:'Computer Operation',
    body:`I have solid day-to-day computer skills — file management, software installation, browsing, printing, and using common applications efficiently.<br><br>I'm comfortable switching between Windows tools and web-based apps to get things done.`,
    tags:['Windows','Files','Apps']},
  typing:{icon:'⌨️',title:'Typing — 30 WPM',
    body:`I can type at around <b>30 words per minute</b> in both English and Bangla. This helps me work faster when writing documents, emails, or code.<br><br>Speed is important, but accuracy matters more — I always proofread my work.`,
    tags:['English','Bangla','30 WPM']},
  problem:{icon:'🧠',title:'Problem Solving',
    body:`I enjoy breaking down complex problems into small, manageable parts. Whether it's debugging code, fixing a layout issue, or figuring out a school assignment — <b>I stay calm and think step-by-step.</b><br><br>My approach: understand → plan → test → refine.`,
    tags:['Logic','Debugging','Analysis']},
  comm:{icon:'💬',title:'Communication',
    body:`I communicate clearly and respectfully with teachers, classmates and peers. I can explain ideas in simple words and I'm always open to listening and learning.<br><br>Good communication makes teamwork stronger and projects smoother.`,
    tags:['Speaking','Listening','Writing']},
  team:{icon:'🤝',title:'Teamwork',
    body:`I work well in groups — sharing ideas, respecting different opinions, and making sure everyone contributes.<br><br>I believe great things are built together. Whether it's a class project or a group assignment, I bring <b>energy and cooperation</b> to the table.`,
    tags:['Collaboration','Respect','Support']},
  time:{icon:'⏰',title:'Time Management',
    body:`I plan my day to balance study, coding, and personal time. I use to-do lists and prioritize tasks by importance.<br><br>Meeting deadlines isn't just about speed — it's about <b>consistency and focus.</b> I try to give every task the time it deserves.`,
    tags:['Planning','Focus','Deadlines']},
  internet:{icon:'🌐',title:'Internet Research',
    body:`I'm good at finding accurate information online — using search engines effectively, checking reliable sources, and pulling out the most useful parts.<br><br>Research helps me learn faster and solve problems more creatively.`,
    tags:['Search','Sources','Learning']},
  email:{icon:'📧',title:'Email Communication',
    body:`I can write clear, polite and professional emails — whether it's reaching out to a teacher, applying for something, or staying in touch.<br><br>I understand the importance of <b>subject lines, tone, and clear structure.</b>`,
    tags:['Writing','Etiquette','Professional']},
  adapt:{icon:'🦎',title:'Adaptability',
    body:`I adjust quickly to new situations, tools, and challenges. When something changes, I focus on what I can learn from it instead of getting stuck.<br><br>I believe adaptability is one of the most important skills — in tech and in life.`,
    tags:['Flexible','Quick Learner','Open-mind']},
  doc:{icon:'📑',title:'Documentation',
    body:`I can organize information into clean, readable documents — with proper headings, bullet points, and formatting.<br><br>Good documentation makes work easier to review and reuse, whether it's a project report or study notes.`,
    tags:['Organized','Clear','Readable']},
  present:{icon:'🎤',title:'Presentation',
    body:`I can present ideas confidently — using clear slides, logical flow, and a calm voice.<br><br>I focus on <b>making the message simple and memorable</b>, so the audience walks away understanding the main point.`,
    tags:['Slides','Speaking','Confidence']},
  analytical:{icon:'🔍',title:'Analytical Thinking',
    body:`I like to look at problems carefully — finding patterns, asking "why", and testing different approaches.<br><br>Analytical thinking helps me in coding, in studies, and in everyday decisions. I don't just find answers — I try to understand the reasoning behind them.`,
    tags:['Logic','Patterns','Reasoning']}
};

/* HOBBY DATA */
const HOBBIES = {
  swim:{icon:'🏊‍♂️',title:'Swimming',
    body:`Swimming is my way to switch off from screens and reset my mind. The feeling of water, the rhythm of breathing, the calm — it all helps me relax and come back with fresh energy.<br><br>It's also great exercise: <b>full body workout, low impact, high refresh.</b> Whenever I feel stuck or tired, a good swim usually fixes it.`,
    tags:['Relaxing','Exercise','Fresh Mind']},
  coding:{icon:'💻',title:'Coding',
    body:`Coding is both my hobby and my passion. I love the feeling of watching an idea slowly turn into something real on the screen — a button, an animation, a whole website.<br><br>I spend time learning new tricks, building small projects, and fixing bugs (which honestly teaches more than success does). <b>Coding is my creative outlet.</b>`,
    tags:['Creative','Learning','Building']},
  games:{icon:'🎮',title:'Video Games',
    body:`I enjoy strategy games — the kind that make me think, plan, and react quickly. Games are not just fun; they improve <b>focus, decision-making, and problem-solving under pressure.</b><br><br>After a long day, a good game session is the perfect way to unwind while keeping my brain active.`,
    tags:['Strategy','Fun','Sharp Mind']},
  drive:{icon:'🚗',title:'Long Drive',
    body:`Long drives give me peace. The open road, the wind, my favorite music — it's a simple kind of happiness that clears my head.<br><br>Whether it's a short evening drive or a long trip, I always come back feeling lighter, more focused, and grateful. <b>Sometimes the best ideas come on the road.</b>`,
    tags:['Peaceful','Relaxing','Freedom']}
};

/* INFO MODAL */
(function(){
  const modal=document.getElementById('infoModal');
  const icon=document.getElementById('infoIcon');
  const title=document.getElementById('infoTitle');
  const body=document.getElementById('infoBody');
  const close=document.getElementById('infoClose');
  if(!modal)return;

  function open(data){
    icon.textContent=data.icon;
    title.textContent=data.title;
    body.innerHTML=data.body+(data.tags?`<div class="tag-row">${data.tags.map(t=>`<span>${t}</span>`).join('')}</div>`:'');
    modal.classList.add('show');
  }
  function closeModal(){modal.classList.remove('show');}

  document.querySelectorAll('.chip[data-skill]').forEach(c=>{
    c.addEventListener('click',()=>{
      const key=c.dataset.skill;
      if(SKILLS[key])open(SKILLS[key]);
    });
  });
  document.querySelectorAll('.hobby[data-hobby]').forEach(h=>{
    h.addEventListener('click',()=>{
      const key=h.dataset.hobby;
      const anim=h.dataset.anim;
      const card=h;
      /* simple animation on click */
      card.classList.remove('anim-bounce','anim-spin','anim-shake','anim-drive');
      void card.offsetWidth;
      card.classList.add('anim-'+anim);
      setTimeout(()=>card.classList.remove('anim-'+anim),1000);
      /* open modal */
      setTimeout(()=>{
        if(HOBBIES[key])open(HOBBIES[key]);
      },400);
    });
  });
  close.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
})();

/* CV Password Modal */
(function(){
  const modal=document.getElementById('pwdModal');
  const input=document.getElementById('pwdInput');
  const err=document.getElementById('pwdErr');
  const box=modal?.querySelector('.pwd-box');
  const cvLink=document.getElementById('cvLink');
  const cancel=document.getElementById('pwdCancel');
  const ok=document.getElementById('pwdOk');
  const PASSWORD='Saimoon1234';
  if(!modal)return;

  function open(){modal.classList.add('show');setTimeout(()=>input.focus(),300);}
  function close(){modal.classList.remove('show');input.value='';err.textContent='';}
  function tryUnlock(){
    if(input.value===PASSWORD){
      sessionStorage.setItem('cvUnlocked','true');
      window.location.href='cv.html';
    } else {
      err.textContent='❌ Wrong password. Try again.';
      box.classList.add('shake');
      setTimeout(()=>box.classList.remove('shake'),400);
      input.value='';input.focus();
    }
  }
  cvLink?.addEventListener('click',e=>{
    e.preventDefault();
    if(sessionStorage.getItem('cvUnlocked')==='true'){
      window.location.href='cv.html';
      return;
    }
    open();
  });
  cancel?.addEventListener('click',close);
  ok?.addEventListener('click',tryUnlock);
  input?.addEventListener('keypress',e=>{if(e.key==='Enter')tryUnlock();});
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
})();
