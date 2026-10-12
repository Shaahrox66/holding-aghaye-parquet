(() => {
  const zones = [...document.querySelectorAll('.zone')];
  const card = document.querySelector('.hover-card');
  const cardTitle = card?.querySelector('h1');
  const cardText = card?.querySelector('p');
  const quickLinks = [...document.querySelectorAll('.quick-access [data-category]')];
  const quick = document.querySelector('.quick-access');
  const desktopToggle = document.querySelector('.menu-toggle');
  const mobileToggle = document.querySelector('.mobile-menu-hit');

  function categoryFromClass(zone){const match=[...zone.classList].find(c=>c.startsWith('zone-')&&c!=='zone');return match?match.replace('zone-',''):''}
  function activate(zone){if(!zone||!card)return;cardTitle.textContent=zone.dataset.title||'فروشگاه متریال';cardText.textContent=zone.dataset.subtitle||'برای مشاهده محصولات وارد این بخش شوید.';card.classList.add('visible');const key=categoryFromClass(zone);quickLinks.forEach(a=>a.classList.toggle('active',a.dataset.category===key))}
  function reset(){card?.classList.remove('visible');quickLinks.forEach(a=>a.classList.remove('active'))}
  zones.forEach(zone=>{zone.addEventListener('mouseenter',()=>activate(zone));zone.addEventListener('focus',()=>activate(zone));zone.addEventListener('mouseleave',reset);zone.addEventListener('blur',reset)})
  function toggleQuick(){const open=quick?.classList.toggle('open');desktopToggle?.setAttribute('aria-expanded',String(open))}
  desktopToggle?.addEventListener('click',toggleQuick);mobileToggle?.addEventListener('click',toggleQuick)
  quick?.addEventListener('click',e=>{if(e.target.closest('a')){quick.classList.remove('open');desktopToggle?.setAttribute('aria-expanded','false')}})
  document.addEventListener('click',e=>{if(window.innerWidth<=900&&quick?.classList.contains('open')&&!quick.contains(e.target)&&e.target!==mobileToggle){quick.classList.remove('open');desktopToggle?.setAttribute('aria-expanded','false')}})
})();
