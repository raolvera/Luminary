// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const currentSeason = getCurrentSeason();
    applySeason(currentSeason);
    await cmsDataReady;
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
    document.getElementById('currentSeason').textContent = `${seasonData.name} Menu`;
    document.getElementById('seasonalTagline').textContent = seasonData.tagline;

    // Update menu season indicator
    document.getElementById('menuSeasonIndicator').textContent = 'Full Seasonal Menu';
}

// Load content from CMS data
function loadContent(season) {
    // Build menu items for all seasons
    const menuGrid = document.getElementById('menuGrid');
    const allSeasons = ['spring', 'summer', 'autumn', 'winter'];
    menuGrid.innerHTML = allSeasons.map(s => {
        const data = cmsData.seasons[s];
        if (!data.menu.length) return '';
        return `
            <div class="menu-season-group">
                <h3 class="menu-season-title">${data.name}</h3>
                <div class="menu-season-items">
                    ${data.menu.map(item => `
                        <div class="menu-item">
                            <h3>${item.name}</h3>
                            <div class="ingredients">${item.ingredients}</div>
                            <p>${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join('');

    // Load chef info
    document.getElementById('chefName').textContent = cmsData.chef.name;
    document.getElementById('chefBio').innerHTML = cmsData.chef.bio.map(p => `<p>${p}</p>`).join('');

    // Load philosophy text
    document.getElementById('philosophyPreview').textContent = cmsData.philosophy;
}

// Handle reservation form submission
function initReservationSystem() {
    // Netlify Forms handles submission automatically
    // No JavaScript needed - form submits naturally
}

// Don't let people book in the past
function setMinDate() {
    const dateInput = document.getElementById('date');
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
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM'; // cSpell:ignore ampm
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Mobile menu toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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
