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
    if (menuInd) menuInd.textContent = 'Full Seasonal Menu';
}

function loadContent(season) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid || !window.cmsData) return;

    const allSeasons = ['spring', 'summer', 'autumn', 'winter'];
    menuGrid.innerHTML = allSeasons.map(s => {
        const data = cmsData.seasons && cmsData.seasons[s];
        if (!data || !data.menu || !data.menu.length) return '';
        return `
            <div class="menu-season-group">
                <h3 class="menu-season-title">${data.name}</h3>
                <div class="menu-season-items">
                    ${data.menu.map(item => `
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
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join('');

    const chefNameEl = document.getElementById('chefName');
    const chefBioEl = document.getElementById('chefBio');
    if (chefNameEl && cmsData.chef && cmsData.chef.name) chefNameEl.textContent = cmsData.chef.name;
    if (chefBioEl && cmsData.chef && Array.isArray(cmsData.chef.bio)) chefBioEl.innerHTML = cmsData.chef.bio.map(p => `<p>${p}</p>`).join('');
    const philEl = document.getElementById('philosophyPreview');
    if (philEl && cmsData.philosophy) philEl.textContent = cmsData.philosophy;
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
    const seasonData = cmsData.seasons[season];
    document.getElementById('currentSeason').textContent = `${seasonData.name} Menu`;
    document.getElementById('seasonalTagline').textContent = seasonData.tagline;
    document.getElementById('menuSeasonIndicator').textContent = 'Full Seasonal Menu';
}

function loadContent() {
    // Display all seasons
    const menuGrid = document.getElementById('menuGrid');
    let allMenuHTML = '';
    
    ['spring', 'summer', 'autumn', 'winter'].forEach(season => {
        const seasonData = cmsData.seasons[season];
        if (seasonData.menu.length > 0) {
            allMenuHTML += `
                <div class="season-section">
                    <h3 class="season-title">${seasonData.name}</h3>
                    <div class="season-menu-grid">
                        ${seasonData.menu.map(item => `
                            <div class="menu-item">
                                <h4>${item.name}</h4>
                                <div class="ingredients">${item.ingredients}</div>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    menuGrid.innerHTML = allMenuHTML;
    
    if (cmsData.chef.name && cmsData.chef.name !== "Chef's Story") {
        document.getElementById('chefName').textContent = cmsData.chef.name;
    }
    if (cmsData.chef.bio.length > 0) {
        const bioArray = cmsData.chef.bio.map(p => p.trim()).filter(p => p);
        document.getElementById('chefBio').innerHTML = bioArray.map(p => `<p>${p}</p>`).join('');
    }
    
    document.getElementById('philosophyPreview').textContent = cmsData.philosophy;
>>>>>>> 38bbcab (.)
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

function exportReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    console.log('Current Reservations:', reservations);
    return reservations;
}

window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
});
