(() => {
  const raw = window.DESIGN_STUDIO_PROJECTS || window.designStudioProjects || window.studioProjects || [];
  const projects = Array.isArray(raw) ? raw : (raw.projects || raw.items || []);
  if (!projects.length) return;

  const value = (project, keys, fallback = '') => {
    for (const key of keys) if (project[key]) return project[key];
    return fallback;
  };
  const imageSrc = image => typeof image === 'string' ? image : (image?.src || image?.url || image?.path || '');
  const photosOf = project => (project.images || project.photos || project.gallery || []).map(imageSrc).filter(Boolean);

  const section = document.createElement('section');
  section.className = 'latest-studio-projects';
  section.setAttribute('aria-labelledby', 'latest-studio-title');
  section.innerHTML = `
    <div class="latest-studio-projects__head">
      <div><h2 id="latest-studio-title">جدیدترین پروژه‌ها</h2><p>طراحی و اجرای کابینت، کمد و فضاهای داخلی</p></div>
    </div>
    <div class="latest-studio-projects__grid"></div>`;

  const grid = section.querySelector('.latest-studio-projects__grid');
  projects.forEach((project, index) => {
    const photos = photosOf(project);
    if (!photos.length) return;
    const title = value(project, ['title', 'name'], `پروژه ${index + 1}`);
    const location = value(project, ['location', 'address', 'area'], 'تبریز');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'latest-studio-card';
    button.innerHTML = `<img src="${photos[0]}" alt="${title}" loading="lazy"><span class="latest-studio-card__body"><h3>${title}</h3><p>${location} · ${photos.length} عکس</p></span>`;
    button.addEventListener('click', () => openGallery(project));
    grid.append(button);
  });

  const main = document.querySelector('main');
  if (main) main.prepend(section); else document.body.insertBefore(section, document.body.firstChild);

  const dialog = document.createElement('dialog');
  dialog.className = 'latest-studio-dialog';
  dialog.innerHTML = `
    <div class="latest-studio-dialog__bar"><h3></h3><button class="latest-studio-dialog__close" type="button" aria-label="بستن">×</button></div>
    <div class="latest-studio-dialog__stage"><img alt=""><button class="latest-studio-dialog__nav latest-studio-dialog__nav--prev" type="button" aria-label="عکس قبلی">›</button><button class="latest-studio-dialog__nav latest-studio-dialog__nav--next" type="button" aria-label="عکس بعدی">‹</button></div>
    <div class="latest-studio-dialog__foot"><span class="latest-studio-dialog__meta"></span><div class="latest-studio-dialog__thumbs"></div></div>`;
  document.body.append(dialog);

  let activePhotos = [];
  let activeIndex = 0;
  const stageImage = dialog.querySelector('.latest-studio-dialog__stage img');
  const counter = dialog.querySelector('.latest-studio-dialog__meta');
  const thumbs = dialog.querySelector('.latest-studio-dialog__thumbs');

  function render() {
    stageImage.src = activePhotos[activeIndex];
    counter.textContent = `${activeIndex + 1} از ${activePhotos.length}`;
    [...thumbs.children].forEach((item, index) => item.classList.toggle('is-active', index === activeIndex));
  }
  function move(step) { activeIndex = (activeIndex + step + activePhotos.length) % activePhotos.length; render(); }
  function openGallery(project) {
    activePhotos = photosOf(project);
    activeIndex = 0;
    dialog.querySelector('h3').textContent = value(project, ['title', 'name'], 'پروژه');
    thumbs.replaceChildren(...activePhotos.map((src, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `<img src="${src}" alt="تصویر ${index + 1}" loading="lazy">`;
      button.addEventListener('click', () => { activeIndex = index; render(); });
      return button;
    }));
    render();
    dialog.showModal();
  }
  dialog.querySelector('.latest-studio-dialog__close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.latest-studio-dialog__nav--prev').addEventListener('click', () => move(-1));
  dialog.querySelector('.latest-studio-dialog__nav--next').addEventListener('click', () => move(1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowRight') move(-1);
    if (event.key === 'ArrowLeft') move(1);
  });
})();
