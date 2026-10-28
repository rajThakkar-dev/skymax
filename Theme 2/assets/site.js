(()=>{
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav){
    const label=toggle.querySelector('.mt-label');
    const set=open=>{nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));if(label)label.textContent=open?'Close':'Menu'};
    toggle.addEventListener('click',()=>set(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
  }

  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

  // scroll reveal (content stays visible if JS or IntersectionObserver is unavailable)
  const items=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    items.forEach(el=>{
      const sib=[...el.parentElement.children].filter(c=>c.classList.contains('reveal'));
      el.style.setProperty('--d',(Math.max(0,sib.indexOf(el))*0.08)+'s');
      io.observe(el);
    });
  }else items.forEach(el=>el.classList.add('in'));

  // preselect contact topic from ?topic=
  const topic=new URLSearchParams(location.search).get('topic');
  const sel=document.querySelector('select[name="topic"]');
  if(topic&&sel&&[...sel.options].some(o=>o.value===topic))sel.value=topic;

  // demo form: never sends anything
  document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const s=form.querySelector('[role="status"]');
    if(s){s.hidden=false;s.textContent='Thanks for preparing your enquiry. This is a demonstration form and no details were sent. Connect the site to a secure email or form service before launch.'}
  }));
})();
