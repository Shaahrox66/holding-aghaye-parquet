(() => {
  const base='../../assets/images/store/plaster/projects/';
  const rows=[
    ['01-sepidar','سپیدار','قاب‌بندی کلاسیک پذیرایی','classic',5,'گچ‌بری دستی|قاب دیواری|گل گوشه','قاب‌بندی پیوسته دیوارها با گل‌های کلاسیک و ابزار سقفی هماهنگ.'],
    ['02-taj-sefid','تاج سپید','گچ‌بری کلاسیک سقف و دیوار','classic',5,'نقش برجسته|ابزار سقف|سرستون','اجرای پرجزئیات سقف، ستون و دیوار با نقوش برجسته کلاسیک.'],
    ['03-khat-aram','خط آرام','جزئیات گچ‌بری مدرن','modern',2,'ابزار خطی|قاب ساده|اجرای سفید','طراحی ساده و روشن با خطوط کنترل‌شده برای فضای معاصر.'],
    ['08-zarrin-ghab','زرین‌قاب','قاب‌بندی طلایی کلاسیک','classic',5,'قاب دیواری|ورق طلایی|نور مخفی','قاب‌بندی دیوار و سقف با تاکید طلایی و نورپردازی پیرامونی.'],
    ['09-naghshe-aftab','نقش آفتاب','دیوارهای کلاسیک با پتینه','classic',5,'پتینه روشن|ابزار طلایی|قاب برجسته','ترکیب پتینه روشن، قاب‌های برجسته و جزئیات طلایی در فضای پذیرایی.'],
    ['10-hendese-sefid','هندسه سپید','قاب‌بندی سفید مینیمال','modern',5,'قاب خطی|ستون شیاردار|سفید یکدست','اجرای قاب‌های ساده و ستون‌های شیاردار با زبان مدرن و یکدست.'],
    ['11-golbarg','گلبرگ','گل سقفی و حاشیه کلاسیک','classic',4,'گل سقفی|حاشیه برجسته|جزئیات طلایی','هماهنگی گل‌های مرکزی و ابزار حاشیه با تاکیدهای ظریف طلایی.'],
    ['12-ritme-amoodi','ریتم عمودی','قاب‌بندی مدرن دیوار','modern',5,'قاب ساده|ابزار خطی|ستون عمودی','خطوط عمودی و قاب‌های کم‌عمق برای نظم‌دادن به دیوارهای داخلی.'],
    ['13-sotoune-roshan','ستون روشن','اجرای سقف و ستون','modern',5,'زیرسازی سقف|ستون گچی|اجرای یکپارچه','مراحل اجرای سقف کاذب، ستون‌ها و قاب‌بندی پیش از پرداخت نهایی.'],
    ['15-shokouh','شکوه','پذیرایی کلاسیک لوکس','classic',4,'قاب سلطنتی|گل برجسته|جزئیات طلایی','گچ‌بری پرکار دیوار و ورودی‌ها با قاب‌های کلاسیک و پرداخت طلایی.'],
    ['16-hashie-noor','حاشیه نور','گچ‌بری سقف و کنج','classic',5,'ابزار سقفی|گل کنج|قاب مرکزی','ترکیب ابزارهای حاشیه، گل کنج و قاب مرکزی در سقف پذیرایی.'],
    ['17-marja-classic','مرجع کلاسیک','طرح‌های کلاسیک بین‌المللی','international',5,'طرح مرجع|قاب کلاسیک|دکور لوکس','مجموعه طرح‌های مرجع برای انتخاب سبک قاب‌بندی و جزئیات کلاسیک.'],
    ['19-talare-roshan','تالار روشن','طراحی کلاسیک روشن','international',4,'طرح سه‌بعدی|قاب دیوار|ابزار سقف','تصاویر طراحی یک فضای پذیرایی روشن با قاب‌بندی کلاسیک و سقف ساده.'],
    ['21-khat-e-sefid','خط سپید','اجرای قاب‌های خطی و سقفی','modern',30,'قاب خطی|ابزار سقف|اجرای سفید','مجموعه‌ای از قاب‌بندی‌های منظم و جزئیات اجرایی سفید برای فضاهای داخلی معاصر.'],
    ['22-ghab-e-khamoosh','قاب خاموش','قاب‌بندی آرام دیوار','modern',22,'قاب دیواری|خطوط ساده|پرداخت یکدست','قاب‌های کم‌عمق و ابزارهای ساده با ترکیب‌بندی آرام و یکدست.'],
    ['23-noor-e-divar','نور دیوار','گچ‌بری دیوار و نورپردازی','modern',71,'نور مخفی|قاب دیوار|جزئیات اجرایی','اجرای قاب‌ها و ابزارهای دیواری با تاکید بر نور مخفی و پیوستگی خطوط.'],
    ['24-naghshe-aram','نقش آرام','نقوش ظریف سقف و دیوار','classic',45,'نقش برجسته|حاشیه سقف|قاب کلاسیک','ترکیب نقوش ظریف، حاشیه‌های سقفی و قاب‌های کلاسیک در یک مجموعه هماهنگ.'],
    ['25-zarrin-saye','سایه زرین','جزئیات کلاسیک طلایی','classic',33,'جزئیات طلایی|گل برجسته|قاب تزئینی','قاب‌ها و گل‌های برجسته کلاسیک با تاکیدهای طلایی و پرداخت دکوراتیو.'],
    ['26-tagh-e-noor','طاق نور','اجرای طاق و ابزار سقفی','classic',12,'طاق گچی|ابزار سقف|قاب برجسته','جزئیات اجرایی طاق، حاشیه سقف و قاب‌های برجسته در فضای کلاسیک.'],
    ['27-sepid-e-sadeh','سپید ساده','گچ‌بری مینیمال داخلی','modern',42,'خطوط مینیمال|سفید یکدست|قاب ساده','اجرای تمیز و مینیمال قاب‌های گچی با خطوط ساده و سطح سفید یکدست.'],
    ['28-naghshe-zarrin','نقش زرین','گچ‌بری پرجزئیات کلاسیک','classic',77,'نقش کلاسیک|گل سقفی|حاشیه تزئینی','مجموعه‌ای گسترده از نقش‌های کلاسیک، گل‌های سقفی و حاشیه‌های پرجزئیات.'],
    ['29-hashie-sepid','حاشیه سپید','ابزار و حاشیه‌های سفید','modern',11,'حاشیه گچی|ابزار خطی|اجرای داخلی','اجرای ابزارهای خطی و حاشیه‌های سفید برای تکمیل سقف و دیوار.'],
    ['20-products-workshop','آرشیو ابزار','محصولات و قطعات کارگاهی','workshop',27,'ابزار سقفی|گل دکوراتیو|قطعه پیش‌ساخته','تمام تصاویر محصولات، پروفیل‌ها، گل‌های دکوراتیو و مراحل ساخت کارگاهی در این مجموعه یکپارچه شده‌اند.']
  ];
  const projects=rows.map((r,i)=>({folder:r[0],name:r[1],title:r[2],category:r[3],count:r[4],tags:r[5].split('|'),description:r[6],number:i+1}));
  const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);const path=(p,i)=>`${base}${p.folder}/image-${String(i).padStart(2,'0')}.webp`;
  const grid=document.querySelector('#projects'),dialog=document.querySelector('.project-dialog'),lightbox=document.querySelector('.lightbox');let gallery=[],index=0;
  grid.innerHTML=projects.map(p=>`<button class="project-card" type="button" data-project="${p.number}" data-category="${p.category}"><span class="project-image"><img src="${path(p,1)}" alt="${p.title}" loading="lazy"><i>${fa(p.count)} تصویر</i></span><span class="project-body"><small>${p.category==='workshop'?'مجموعه محصولات و کارگاه':'پروژه منتخب گچ‌بری'}</small><strong>${p.name}</strong><em>${p.title}</em><b>مشاهده مجموعه ←</b></span></button>`).join('');
  function openProject(p){document.querySelector('#dialog-project').textContent=p.category==='workshop'?'محصولات و تصاویر کارگاهی':`پروژه ${p.name}`;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-tags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');document.querySelector('#dialog-description').textContent=p.description;gallery=Array.from({length:p.count},(_,i)=>({src:path(p,i+1),alt:`${p.title}، تصویر ${fa(i+1)}`}));document.querySelector('#dialog-gallery').innerHTML=gallery.map((x,i)=>`<button data-image="${i}" type="button"><img src="${x.src}" alt="${x.alt}" loading="lazy"></button>`).join('');dialog.showModal()}
  grid.addEventListener('click',e=>{const c=e.target.closest('.project-card');if(c)openProject(projects[+c.dataset.project-1])});document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));grid.querySelectorAll('.project-card').forEach(c=>c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter)}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const b=e.target.closest('[data-image]');if(b){index=+b.dataset.image;show()}});function show(){const x=gallery[index];lightbox.querySelector('img').src=x.src;lightbox.querySelector('img').alt=x.alt;lightbox.querySelector('figcaption').textContent=x.alt;if(!lightbox.open)lightbox.showModal()}function step(n){index=(index+n+gallery.length)%gallery.length;show()}lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('.lightbox-next').addEventListener('click',()=>step(1));lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>step(-1));document.addEventListener('keydown',e=>{if(lightbox.open&&e.key==='ArrowLeft')step(1);if(lightbox.open&&e.key==='ArrowRight')step(-1)});
})();
