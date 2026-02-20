<<<<<<< HEAD
let cmsData = {
    seasons: {
        spring: { name: "Spring", tagline: "Celebrating renewal", colors: { primary: "#6b9080", accent: "#f4a259" }, menu: [] },
        summer: { name: "Summer", tagline: "Abundance at its peak", colors: { primary: "#e07a5f", accent: "#f2cc8f" }, menu: [] },
        autumn: { name: "Autumn", tagline: "Harvest richness", colors: { primary: "#8b4513", accent: "#d4a574" }, menu: [] },
        winter: { name: "Winter", tagline: "Comfort and contemplation", colors: { primary: "#2c5f4f", accent: "#a8dadc" }, menu: [] }
    },
    chef: { name: "Chef's Story", bio: [] },
    philosophy: "At Luminary, we believe food should reflect the rhythm of nature."
};

async function loadCMSData() {
    try {
        const [menu, chef, philosophy, hero] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null),
            fetch('/content/hero.json').then(r => r.json()).catch(() => null)
        ]);

        if (menu?.items) {
            menu.items.forEach(item => {
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
                function initReservationSystem() {
                    // Netlify Forms handles submission automatically
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
                    const hour = parseInt(hours, 10);
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                    return `${displayHour}:${minutes} ${ampm}`;
                }

                // Mobile menu toggle
                function initHamburgerMenu() {
                    const hamburger = document.getElementById('hamburger');
                    const navMenu = document.getElementById('navMenu');
                    if (!hamburger || !navMenu) return;

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
                    if (window.performance && window.performance.timing) {
                        const perfData = window.performance.timing;
                        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                        console.log(`Page Load Time: ${pageLoadTime}ms`);
                    }
                });

                let cmsData = {
                    seasons: {
                        spring: { name: "Spring", tagline: "Celebrating renewal", colors: { primary: "#6b9080", accent: "#f4a259" }, menu: [] },
                        summer: { name: "Summer", tagline: "Abundance at its peak", colors: { primary: "#e07a5f", accent: "#f2cc8f" }, menu: [] },
                        autumn: { name: "Autumn", tagline: "Harvest richness", colors: { primary: "#8b4513", accent: "#d4a574" }, menu: [] },
                        winter: { name: "Winter", tagline: "Comfort and contemplation", colors: { primary: "#2c5f4f", accent: "#a8dadc" }, menu: [] }
                    },
                    chef: { name: "Chef's Story", bio: [] },
                    philosophy: "At Luminary, we believe food should reflect the rhythm of nature."
                };

                async function loadCMSData() {
                    try {
                        const [menu, chef, philosophy, hero] = await Promise.all([
                            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
                            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
                            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null),
                            fetch('/content/hero.json').then(r => r.json()).catch(() => null)
                        ]);

                        if (menu?.items) {
                            menu.items.forEach(item => {
                                if (cmsData.seasons[item.season]) {
                                    cmsData.seasons[item.season].menu.push({
                                        name: item.name,
                                        ingredients: item.category,
                                        description: item.description,
                                        image: item.image || '',
                                        price: item.price || ''
                                    });
                                }
                            });
                        }

                        if (chef) {
                            cmsData.chef.name = chef.name || cmsData.chef.name;
                            cmsData.chef.bio = chef.bio ? chef.bio.split('\n\n').map(p => p.trim()).filter(p => p) : [];
                            if (chef.image) {
                                const chefImg = document.getElementById('chefImage');
                                if (chefImg) {
                                    const img = chefImg.querySelector('img') || document.createElement('img');
                                    img.src = chef.image;
                                    img.alt = chef.name || 'Chef';
                                    img.loading = 'lazy';
                                    img.onerror = () => {
                                        img.onerror = null;
                                        img.src = '/img/chef.jpg';
                                    };
                                    if (!img.parentElement) chefImg.appendChild(img);
                                }
                            }
                        }

                        if (philosophy?.text) cmsData.philosophy = philosophy.text;

                        if (hero?.image) {
                            const heroImg = document.getElementById('heroBgImage');
                            if (heroImg) {
                                heroImg.src = hero.image;
                                heroImg.alt = 'Luminary restaurant';
                                heroImg.onerror = () => {
                                    heroImg.onerror = null;
                                    heroImg.src = '/img/hero.jpg';
                                };
                                const heroEl = document.querySelector('.hero');
                                if (heroEl) heroEl.classList.add('has-hero-image');
                            }
                        }

                    } catch (e) {}
                }

                function getCurrentSeason() {
                    const month = new Date().getMonth();
                    if (month >= 2 && month <= 4) return 'spring';
                    if (month >= 5 && month <= 7) return 'summer';
                    if (month >= 8 && month <= 10) return 'autumn';
                    return 'winter';
                }

                window.cmsDataReady = loadCMSData();
