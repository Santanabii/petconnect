

const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');


if (btn && menu && icon) {
    btn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');

        if (isHidden) {
            icon.classList.replace('fa-times', 'fa-bars');
        } else {
            icon.classList.replace('fa-bars', 'fa-times');
        }
    });
}



function setActiveNavLink() {
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop() || 'index.html';

    document.querySelectorAll('nav a').forEach(link => {
        
        if (link.querySelector('i.fas.fa-paw') || link.href.includes('#application')) {
            return;
        }

        const linkPath = new URL(link.href, window.location.href).pathname.toLowerCase();
        const linkPage = linkPath.split('/').pop() || 'index.html';

        if (linkPage === currentPage) {
           
            link.classList.remove('text-[#7D5A44]', 'border-transparent');
            link.classList.add('text-[#5C3E2E]', 'font-semibold', 'border-b-2', 'border-[#A67C52]', 'bg-[#FCF8F1]');
        } else {
            
            link.classList.remove('text-[#5C3E2E]', 'font-semibold', 'border-b-2', 'border-[#A67C52]', 'bg-[#FCF8F1]');
            link.classList.add('text-[#7D5A44]', 'border-transparent');
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('start-adopting')?.addEventListener('click', () => {
        window.location.href = 'adopt.html';
    });

    document.getElementById('how-it-works')?.addEventListener('click', () => {
        const target = document.querySelector('.bg-white');
        if (target) {
            const offset = 80; 
            const topPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    });

    document.getElementById('thankyou')?.addEventListener('click', () => {
        window.location.href = 'thankyou.html';
    });

    
    const form = document.getElementById('application');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            window.location.href = 'thankyou.html';
        });
    }

    

    const searchInput = document.getElementById('petsearch');
    const searchBtn = document.getElementById('searchbtn');
    const petCards = document.querySelectorAll('.petcard');
    const filterBadges = document.querySelectorAll('.filter-badge');

    const shortlistCountPill = document.getElementById('shortlist-count-pill');
    const shortlistPill = document.getElementById('show-shortlisted-only');
    const sidebar = document.getElementById('shortlist-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');
    const shortlistItemsContainer = document.getElementById('shortlist-items-container');
    const emptyMsg = document.getElementById('empty-shortlist-msg');

    let shortlistedPets = [];

    
    const filterPets = () => {
        const query = searchInput?.value.toLowerCase().trim() || '';

        petCards.forEach(card => {
            const name = card.getAttribute('data-name')?.toLowerCase() || '';
            const breed = card.getAttribute('data-breed')?.toLowerCase() || '';
            const type = card.getAttribute('data-type')?.toLowerCase() || '';

            const matchesSearch = name.includes(query) || breed.includes(query) || type.includes(query);
            card.style.display = matchesSearch ? 'block' : 'none';
        });
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', filterPets);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filterPets();
        });
    }

    
    filterBadges.forEach(badge => {
        badge.addEventListener('click', () => {
           
            if (badge.id === 'show-shortlisted-only') return;

            filterBadges.forEach(b => b.classList.remove('active'));
            badge.classList.add('active');

            const type = badge.getAttribute('data-filter-type');

            petCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                card.style.display = (type === 'all' || cardType === type) ? 'block' : 'none';
            });
        });
    });

    const updateShortlistUI = () => {
        if (!shortlistCountPill) return;

        shortlistCountPill.textContent = shortlistedPets.length;

       
        shortlistItemsContainer?.querySelectorAll('.shortlist-item').forEach(item => item.remove());

        if (shortlistedPets.length === 0) {
            emptyMsg?.classList.remove('hidden');
        } else {
            emptyMsg?.classList.add('hidden');

            shortlistedPets.forEach(pet => {
                const itemDiv = document.createElement('div');
                itemDiv.className = "shortlist-item flex items-center gap-4 bg-white p-3 rounded-xl border border-[#E5D3BC]";
                itemDiv.innerHTML = `
                    <img src="${pet.image}" alt="${pet.name}" class="w-16 h-16 rounded-lg object-cover">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm truncate">${pet.name}</h4>
                        <p class="text-xs text-[#A67C52]">${pet.breed}</p>
                    </div>
                `;
                shortlistItemsContainer?.appendChild(itemDiv);
            });
        }
    };

  
    document.querySelectorAll('.likebtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.petcard');
            if (!card) return;

            const petData = {
                name: card.getAttribute('data-name'),
                breed: card.getAttribute('data-breed'),
                image: card.querySelector('img')?.src || ''
            };

            const icon = this.querySelector('i');
            if (!icon) return;

            const isNowLiked = icon.classList.toggle('fas');
            icon.classList.toggle('far');
            this.classList.toggle('text-red-500');

            if (isNowLiked) {
                
                shortlistedPets.push(petData);
                showToast(`${petData.name} added to favorites!`);
            } else {
                
                shortlistedPets = shortlistedPets.filter(p => p.name !== petData.name);
                showToast(`${petData.name} removed from favorites`);
            }

            updateShortlistUI();
        });
    });

    
    const toggleSidebar = (show) => {
        if (!sidebar || !sidebarOverlay) return;

        if (show) {
            sidebarOverlay.classList.remove('hidden');
            
            requestAnimationFrame(() => {
                sidebarOverlay.classList.remove('opacity-0');
                sidebar.classList.remove('translate-x-full');
            });
        } else {
            sidebar.classList.add('translate-x-full');
            sidebarOverlay.classList.add('opacity-0');
            setTimeout(() => {
                sidebarOverlay.classList.add('hidden');
            }, 300);
        }
    };

    shortlistPill?.addEventListener('click', () => toggleSidebar(true));
    closeSidebar?.addEventListener('click', () => toggleSidebar(false));
    sidebarOverlay?.addEventListener('click', () => toggleSidebar(false));

   
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = `
            fixed bottom-5 left-1/2 -translate-x-1/2 
            bg-[#5C3E2E] text-white px-8 py-3 rounded-full 
            shadow-2xl z-[100] font-bold text-sm
            transition-all duration-500
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 2200);
    }

   
    updateShortlistUI();
});


setActiveNavLink();