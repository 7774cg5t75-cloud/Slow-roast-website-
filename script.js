const header=document.querySelector('.header');const button=document.querySelector('.menu-button');const nav=document.querySelector('#nav');const setHeader=()=>header?.classList.toggle('scrolled',scrollY>24);setHeader();addEventListener('scroll',setHeader,{passive:true});button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu')});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false')}));const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}}),{threshold:.13});document.querySelectorAll('.rise').forEach(el=>obs.observe(el));document.querySelector('#year').textContent=new Date().getFullYear();document.querySelector('#form')?.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#status').textContent='The form is ready — we’ll connect it to your chosen email before launch.'});

(async()=>{
  const hog=document.querySelector('#hog-feature-img');
  if(!hog)return;
  try{
    const paths=['assets/hog-feature-p1.txt','assets/hog-feature-p2.txt','assets/hog-feature-p3.txt','assets/hog-feature-p4.txt'];
    const parts=[];
    for(const path of paths){
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok)throw new Error('Unable to load hog image segment');
      parts.push(await response.text());
    }
    hog.src='data:image/webp;base64,'+parts.join('').replace(/\\s+/g,'');
  }catch(error){
    console.warn('Using fallback hog image.',error);
  }
})();
