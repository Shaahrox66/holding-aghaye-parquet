'use strict';

// فقط این مقادیر را با اطلاعات واقعی خودتان جایگزین کنید.
const contactLinks = {
  instagram: 'https://www.instagram.com/shahrokh.khanli/',
  telegram: 'https://t.me/shahrokhkhanli_studio',
  email: 'mailto:info@shahrokhanli.com',
  whatsapp: 'https://wa.me/989142222871',
  phone: 'tel:+989142222871'
};

document.querySelectorAll('[data-link]').forEach((element) => {
  const key = element.dataset.link;
  const url = contactLinks[key];
  if (!url) return;
  element.setAttribute('href', url);
});
