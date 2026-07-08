// Initialize app when DOM is ready, awaiting CMS data if available
document.addEventListener('DOMContentLoaded', async () => {
    if (window.cmsDataReady) await window.cmsDataReady;
    const currentSeason = getCurrentSeason();
    applySeason(currentSeason);
    loadContent(currentSeason);
    initReservationSystem();
    initSmoothScroll();
    initHamburgerMenu();
    setMinDate();
});

function applySeason(season) {
    document.body.className = season;
    const seasonData = (window.cmsData && cmsData.seasons && cmsData.seasons[season]) || {};
    const currentSeasonEl = document.getElementById('currentSeason');
    if (currentSeasonEl && seasonData.name) currentSeasonEl.textContent = `${seasonData.name} Menu`;
    const taglineEl = document.getElementById('seasonalTagline');
    if (taglineEl && seasonData.tagline) taglineEl.textContent = seasonData.tagline;
    const menuInd = document.getElementById('menuSeasonIndicator');
    if (menuInd && seasonData.name) menuInd.textContent = `${seasonData.name} Seasonal Menu`;
}

function loadContent(season) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid || !window.cmsData) return;

    const currentSeasonData = cmsData.seasons && cmsData.seasons[season];
    const menuItems = currentSeasonData && Array.isArray(currentSeasonData.menu) ? currentSeasonData.menu : [];

    menuGrid.innerHTML = menuItems.length
        ? menuItems.map(renderMenuItem).join('')
        : '<p class="menu-empty">The seasonal menu is being finalized. Please check back soon.</p>';

    const chefNameEl = document.getElementById('chefName');
    const chefBioEl = document.getElementById('chefBio');
    if (chefNameEl && cmsData.chef && cmsData.chef.name) chefNameEl.textContent = cmsData.chef.name;
    if (chefBioEl && cmsData.chef && Array.isArray(cmsData.chef.bio)) chefBioEl.innerHTML = cmsData.chef.bio.map(p => `<p>${p}</p>`).join('');
    const philEl = document.getElementById('philosophyPreview');
    if (philEl && cmsData.philosophy) philEl.textContent = cmsData.philosophy;
}

function renderMenuItem(item) {
    return `
        <div class="menu-item${item.image ? ' has-image' : ''}">
            ${item.image ? `<div class="menu-item-image"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='/img/chef.jpg';"></div>` : ''}
            <div class="menu-item-body">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ''}
                </div>
                <div class="ingredients">${item.ingredients || ''}</div>
                <p>${item.description || ''}</p>
            </div>
        </div>`;
}

function initReservationSystem() {
    const form = document.getElementById('reservationForm');
    const confirmation = document.getElementById('confirmationMessage');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!confirmation) return;
        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                const name = formData.get('name') || '';
                const email = formData.get('email') || '';
                const date = formData.get('date') || '';
                const time = formData.get('time') || '';
                const guests = formData.get('guests') || '';
                confirmation.innerHTML = `\n                    <h3>Reservation Confirmed!</h3>\n                    <p>Thank you, ${name}. We've reserved a table for ${guests} guests on ${formatDate(date)} at ${formatTime(time)}.</p>\n                    <p>A confirmation email has been sent to ${email}.</p>\n                `;
                confirmation.classList.add('show');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            console.error('Reservation error:', err);
            confirmation.innerHTML = `\n                <h3 style="color: #721c24;">Submission Error</h3>\n                <p>We couldn't process your reservation. Please call us at (555) 123-4567.</p>\n            `;
            confirmation.style.background = '#f8d7da';
            confirmation.classList.add('show');
        }

        setTimeout(() => confirmation.classList.remove('show'), 10000);
    });
}

function setMinDate() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
}

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
});
