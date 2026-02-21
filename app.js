// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', async () => {
    if (window.cmsDataReady) {
        await window.cmsDataReady;
    }
    const currentSeason = getCurrentSeason();
    applySeason(currentSeason);
    loadContent(currentSeason);
    initReservationSystem();
    initSmoothScroll();
    initHamburgerMenu();
    setMinDate();
});

// Apply the seasonal theme colors and text
function applySeason(season) {
    document.body.className = season;
    const seasonData = cmsData.seasons[season];

    // Update hero section
    const currentSeasonEl = document.getElementById('currentSeason');
    if (currentSeasonEl) currentSeasonEl.textContent = `${seasonData.name} Menu`;
    const taglineEl = document.getElementById('seasonalTagline');
    if (taglineEl) taglineEl.textContent = seasonData.tagline;

    // Update menu season indicator
    const menuInd = document.getElementById('menuSeasonIndicator');
    if (menuInd) menuInd.textContent = 'Full Seasonal Menu';
}

// Load content from CMS data
// Load content from CMS data
function loadContent(season) {
    // Build menu items for all seasons
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    const allSeasons = ['spring', 'summer', 'autumn', 'winter'];
    menuGrid.innerHTML = allSeasons.map(s => {
        const data = cmsData.seasons[s];
        if (!data || !data.menu || !data.menu.length) return '';
        return `
            <div class="menu-season-group">
                <h3 class="menu-season-title">${data.name}</h3>
                <div class="menu-season-items">
                    ${data.menu.map(item => `
                        <div class="menu-item${item.image ? ' has-image' : ''}">
                            ${item.image ? `<div class="menu-item-image"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='/img/ac2xx7.jpg';"></div>` : ''}
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

    // Load chef info
    const chefNameEl = document.getElementById('chefName');
    if (chefNameEl) chefNameEl.textContent = cmsData.chef.name || '';
    const chefBioEl = document.getElementById('chefBio');
    if (chefBioEl) chefBioEl.innerHTML = (cmsData.chef.bio || []).map(p => `<p>${p}</p>`).join('');

    // Load philosophy text
    const philEl = document.getElementById('philosophyPreview');
    if (philEl) philEl.textContent = cmsData.philosophy || '';
}

// Handle reservation form submission
// Handle reservation form submission
function initReservationSystem() {
    const form = document.getElementById('reservationForm');
    const confirmation = document.getElementById('confirmationMessage');
    if (!form) return; // nothing to do on pages without the form

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!confirmation) return;

        const formData = new FormData(form);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const date = formData.get('date') || '';
        const time = formData.get('time') || '';
        const guests = formData.get('guests') || '';

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
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

// Don't let people book in the past
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Format date nicely for confirmation
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time nicely
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
<<<<<<< HEAD
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
=======
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM'; // ignore ampm
>>>>>>> 666038c (Ready to commit changes.)
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Mobile menu toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
<<<<<<< HEAD

=======
    
>>>>>>> 0fcbfe3 (Add files via upload)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
<<<<<<< HEAD

=======
    
>>>>>>> 0fcbfe3 (Add files via upload)
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Helper function to see all reservations (for testing)
function exportReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    console.log('Current Reservations:', reservations);
    return reservations;
}

// Track page load performance
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
});