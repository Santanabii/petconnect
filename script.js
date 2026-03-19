const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

function setActiveNavLink() {
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  document.querySelectorAll('nav a').forEach((link) => {
    if (link.querySelector('i.fas.fa-paw')) return;
    if (link.href.includes('adopt.html#application')) return;

    const linkPage = (new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html').toLowerCase();

    if (linkPage === currentPage) {
      link.classList.remove('text-[#7D5A44]', 'border-transparent');
      link.classList.add('text-[#5C3E2E]', 'font-semibold', 'border-b-2', 'border-[#A67C52]');

      link.classList.remove('text-[#7D5A44]');
      link.classList.add('text-[#5C3E2E]', 'font-semibold', 'bg-[#FCF8F1]');
    }
  });
}

if (btn && menu && icon) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');

    if (menu.classList.contains('hidden')) {
      icon.classList.replace('fa-times', 'fa-bars');
    } else {
      icon.classList.replace('fa-bars', 'fa-times');
    }
  });
}
document.getElementById('start-adopting')?.addEventListener('click', () => {
    window.location.href = 'adopt.html';})
document.getElementById('how-it-works')?.addEventListener('click', () => {
    window.location.href = 'howitworks.html';})

document.getElementById('thankyou')?.addEventListener('click', () => {
    window.location.href = 'thankyou.html';})

setActiveNavLink();
