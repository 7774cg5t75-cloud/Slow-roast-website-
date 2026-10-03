const header=document.querySelector('.header');
const button=document.querySelector('.menu-button');
const nav=document.querySelector('#nav');
const setHeader=()=>header?.classList.toggle('scrolled',scrollY>24);
setHeader();
addEventListener('scroll',setHeader,{passive:true});

button?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-label',open?'Close menu':'Open menu');
});

document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded','false');
}));

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('show');
    obs.unobserve(e.target);
  }
}),{threshold:.13});
document.querySelectorAll('.rise').forEach(el=>obs.observe(el));

document.querySelector('#year').textContent=new Date().getFullYear();

const form=document.querySelector('#form');
const status=document.querySelector('#status');
const submitButton=form?.querySelector('button[type="submit"]');
const endpoint='https://rtqqnqbrqpjondvcyann.supabase.co/functions/v1/slow-roast-enquiry';

form?.addEventListener('submit',async e=>{
  e.preventDefault();
  status.textContent='Sending your enquiry…';
  submitButton.disabled=true;
  submitButton.textContent='Sending…';

  const payload=Object.fromEntries(new FormData(form).entries());

  try{
    const response=await fetch(endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });

    const result=await response.json().catch(()=>({}));

    if(!response.ok||!result.ok){
      throw new Error(result.error||'We couldn\'t send your enquiry.');
    }

    form.reset();
    status.textContent='Thanks — your enquiry has been sent. We’ll get back to you as soon as we can.';
  }catch(error){
    console.error(error);
    status.textContent=error.message||'Something went wrong. Please try again.';
  }finally{
    submitButton.disabled=false;
    submitButton.textContent='Send an enquiry';
  }
});
