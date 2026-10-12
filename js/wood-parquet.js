(() => {
  const base='../../assets/images/store/wood-parquet/projects/';
  const data=[
    ['01-farhadi-valiasr','فرهادی','ولیعصر، کوچه پروین','پارکت بلوط جناغی و پله','herringbone',6,'بلوط طبیعی|چیدمان جناغی|پوشش براق','اجرای یکپارچه کف و پله با قطعات بلوط طبیعی و پرداخت محافظ براق.'],
    ['02-ahmadi-roshdie','احمدی','رشدیه، کوچه سهند','بلوط روشن در فضای مسکونی','strip',5,'بلوط روشن|چیدمان شاخه‌ای|پوشش نیمه‌براق','پارکت روشن با رگه‌های طبیعی برای افزایش حس وسعت و روشنایی فضای داخلی.'],
    ['03-karimi-abresan','کریمی','آبرسان، کوچه گلبرگ','انتخاب الوار بلوط طبیعی','strip',4,'چوب بلوط|گرید طبیعی|رنگ روشن','انتخاب و آماده‌سازی قطعات بلوط با گره‌ها و رگه‌های طبیعی پیش از نصب پروژه.'],
    ['04-rostami-ferdos','رستمی','فردوس، کوچه ارغوان','پارکت بلوکی کلاسیک','mosaic',4,'چوب طبیعی|چیدمان بلوکی|پوشش براق','احیای الگوی بلوکی کلاسیک با ساب کامل و لایه محافظ براق.'],
    ['05-moradi-parvaz','مرادی','پرواز، کوچه آسمان','چوب گرم در فضای آفتاب‌گیر','strip',4,'چوب گرم|چیدمان شاخه‌ای|روغن محافظ','رگه‌های چندرنگ طبیعی زیر نور روز، کف را به عنصر اصلی فضای داخلی تبدیل کرده‌اند.'],
    ['06-hosseini-golshahr','حسینی','گلشهر، کوچه نسترن','پارکت شاخه‌ای سالن نشیمن','strip',5,'راش طبیعی|چیدمان شاخه‌ای|پوشش براق','اجرای منظم پارکت شاخه‌ای با پرداخت شفاف برای یک سالن خانوادگی پرتردد.'],
    ['07-jafari-pastor','جعفری','پاستور، کوچه زیتون','پارکت فینگر جوینت روشن','mosaic',5,'چوب فینگر|بافت چندرنگ|لاک محافظ','قطعات کوتاه چندرنگ با ریتم متراکم، سطحی زنده و مقاوم ایجاد کرده‌اند.'],
    ['08-rahimi-lalezar','رحیمی','لاله‌زار، کوچه بوستان','پارکت بلوط روشن مینیمال','strip',5,'بلوط روشن|چیدمان مستقیم|پوشش مات','سطح روشن و کم‌گره با پرداخت مات، مناسب فضای مینیمال و کابینت‌های سفید.'],
    ['09-akbari-valiasr','سالن ورزشی','ولیعصر، کوچه فرهنگ','کف چوبی سالن ورزشی','sport',5,'چوب ورزشی|لاک مقاوم|خط‌کشی تخصصی','اجرای کف چوبی مقاوم با پوشش چندلایه و خط‌کشی استاندارد سالن ورزشی.'],
    ['10-sadeghi-roshdie','صادقی','رشدیه، کوچه مهتاب','بلوط جناغی مات','herringbone',5,'بلوط طبیعی|چیدمان جناغی|پوشش مات','الگوی جناغی آرام با رنگ طبیعی و بازتاب کنترل‌شده برای فضای مسکونی مدرن.'],
    ['11-naderi-abresan','نادری','آبرسان، کوچه سروستان','پارکت بلوکی با بافت طبیعی','mosaic',5,'چوب طبیعی|چیدمان بلوکی|لاک براق','ترکیب قطعات کوچک با تغییرات رنگ طبیعی و پرداخت نهایی براق.'],
    ['12-tavakoli-ferdos','توکلی','فردوس، کوچه پامچال','پارکت و پله چوبی','strip',5,'چوب راش|پله چوبی|پوشش مقاوم','هماهنگی کف راهرو و پله‌ها با تونالیته گرم و پوشش مناسب رفت‌وآمد روزانه.'],
    ['13-yousefi-parvaz','یوسفی','پرواز، کوچه سپهر','پارکت جناغی گردویی','herringbone',5,'رنگ گردویی|چیدمان جناغی|پوشش براق','الگوی جناغی با تونالیته گردویی و بازتاب عمیق برای فضای کلاسیک معاصر.'],
    ['14-rezaei-golshahr','رضایی','گلشهر، کوچه لاله','پارکت شطرنجی صیقلی','mosaic',4,'چیدمان شطرنجی|رنگ عسلی|لاک براق','مربع‌های چوبی با جهت‌های متناوب و پرداخت صیقلی، هندسه کف را برجسته کرده‌اند.'],
    ['15-ansari-pastor','انصاری','پاستور، کوچه دانش','بلوط روشن جناغی','herringbone',3,'بلوط روشن|چیدمان جناغی|پوشش نیمه‌مات','اجرای روشن و ظریف جناغی برای هماهنگی با نور طبیعی و دیوارهای خنثی.']
  ];
  const projects=data.map((p,i)=>({folder:p[0],family:p[1],location:p[2],title:p[3],category:p[4],count:p[5],tags:p[6].split('|'),description:p[7],number:i+1}));
  const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
  const path=(p,i)=>`${base}${p.folder}/image-${String(i).padStart(2,'0')}.webp`;
  const grid=document.querySelector('#projects'),dialog=document.querySelector('.project-dialog'),lightbox=document.querySelector('.lightbox');let gallery=[],index=0;
  grid.innerHTML=projects.map(p=>`<button class="project-card" type="button" data-project="${p.number}" data-category="${p.category}"><span class="project-image"><img src="${path(p,1)}" alt="${p.title}" loading="lazy"><i>${fa(p.count)} تصویر</i></span><span class="project-body"><small>${p.location}</small><strong>پروژه آقای ${p.family}</strong><em>${p.title}</em><b>مشاهده پروژه ←</b></span></button>`).join('');
  function openProject(p){document.querySelector('#dialog-location').textContent=`${p.location} · آقای ${p.family}`;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-tags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');document.querySelector('#dialog-description').textContent=p.description;gallery=Array.from({length:p.count},(_,i)=>({src:path(p,i+1),alt:`${p.title}، تصویر ${fa(i+1)}`}));document.querySelector('#dialog-gallery').innerHTML=gallery.map((x,i)=>`<button data-image="${i}" type="button"><img src="${x.src}" alt="${x.alt}" loading="lazy"></button>`).join('');dialog.showModal()}
  grid.addEventListener('click',e=>{const c=e.target.closest('.project-card');if(c)openProject(projects[+c.dataset.project-1])});
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));grid.querySelectorAll('.project-card').forEach(c=>c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter)}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const b=e.target.closest('[data-image]');if(b){index=+b.dataset.image;show()}});
  function show(){const x=gallery[index];lightbox.querySelector('img').src=x.src;lightbox.querySelector('img').alt=x.alt;lightbox.querySelector('figcaption').textContent=x.alt;if(!lightbox.open)lightbox.showModal()}
  function step(n){index=(index+n+gallery.length)%gallery.length;show()}
  lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('.lightbox-next').addEventListener('click',()=>step(1));lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>step(-1));document.addEventListener('keydown',e=>{if(lightbox.open&&e.key==='ArrowLeft')step(1);if(lightbox.open&&e.key==='ArrowRight')step(-1)});
})();
