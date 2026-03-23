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
document.getElementById('how-it-works').addEventListener('click', function() {
    window.scrollTo({
        top: document.querySelector('.bg-white').offsetTop - 80, // Adjusts for sticky nav
        behavior: 'smooth'
    });
});

document.getElementById('thankyou')?.addEventListener('click', () => {
    window.location.href = 'thankyou.html';})

const form = document.getElementById('application');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'thankyou.html';
});
const petSearchInput = document.getElementById('pet-search');
const petCards = document.querySelectorAll('.grid .group');

if (petSearchInput && petCards.length) {
    const noResults = document.createElement('p');
    noResults.id = 'no-pet-results';
    noResults.className = 'text-center text-black mt-6';
    noResults.textContent = 'No pets found matching your search.';

    const cardsContainer = document.querySelector('.grid');
    cardsContainer?.parentNode?.appendChild(noResults);
    noResults.style.display = 'none';

    petSearchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        const breedMatches = [];
        const nameMatches = [];
        const otherMatches = [];

        petCards.forEach((card) => {
            const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            const breedInfo = card.querySelectorAll('p')[0]?.textContent?.toLowerCase() || '';
            const description = card.querySelectorAll('p')[1]?.textContent?.toLowerCase() || '';
            const typeLabel = card.querySelector('span')?.textContent?.toLowerCase() || '';

            card.style.border = '';

            if (!query) {
                card.style.display = '';
                return;
            }

            const isBreedMatch = breedInfo.includes(query);
            const isNameMatch = name.includes(query);
            const isTypeMatch = typeLabel.includes(query);
            const isOtherMatch = description.includes(query);

            if (isBreedMatch) {
                breedMatches.push(card);
                card.style.border = '3px solid #A67C52';
            } else if (isNameMatch) {
                nameMatches.push(card);
            } else if (isTypeMatch || isOtherMatch) {
                otherMatches.push(card);
            } else {
                card.style.display = 'none';
            }
        });

        if (query) {
            petCards.forEach((card) => { if (card.style.display !== 'none') card.style.display = 'none'; });

            [...breedMatches, ...nameMatches, ...otherMatches].forEach((card) => {
                card.style.display = '';
            });

            const totalVisible = breedMatches.length + nameMatches.length + otherMatches.length;
            noResults.style.display = totalVisible ? 'none' : '';
        } else {
            petCards.forEach((card) => { card.style.display = ''; });
            noResults.style.display = 'none';
        }
    });
}

setActiveNavLink();
