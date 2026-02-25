<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 64f5ea2 (update cms)
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
<<<<<<< HEAD
        const [menu, chef, philosophy, hero] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null),
            fetch('/content/hero.json').then(r => r.json()).catch(() => null)
=======
        const [menu, chef, philosophy] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null)
>>>>>>> 64f5ea2 (update cms)
        ]);

        if (menu?.items) {
            menu.items.forEach(item => {
<<<<<<< HEAD
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

                    let cmsData = {
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
                                            ingredients: item.category || '',
                                            description: item.description || '',
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
                                        img.src = chef.image || '/img/chef.jpg';
                                        img.alt = chef.name || 'Chef';
                                        img.loading = 'lazy';
                                        img.onerror = () => { img.onerror = null; img.src = '/img/chef.jpg'; };
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
                                    heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = '/img/hero.jpg'; };
                                    const heroEl = document.querySelector('.hero');
                                    if (heroEl) heroEl.classList.add('has-hero-image');
                                }
                            }

                        } catch (e) { /* swallow fetch errors */ }

                        return cmsData;
                    }

                    function getCurrentSeason() {
                        const month = new Date().getMonth();
                        if (month >= 2 && month <= 4) return 'spring';
                        if (month >= 5 && month <= 7) return 'summer';
                        if (month >= 8 && month <= 10) return 'autumn';
                        return 'winter';
                    }

                    window.cmsDataReady = loadCMSData();
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
=======
                if (cmsData.seasons[item.season]) {
                    cmsData.seasons[item.season].menu.push({
                        name: item.name,
                        ingredients: item.category,
                        description: item.description
                    });
                }
            });
        }

        if (chef) {
            cmsData.chef.name = chef.name || cmsData.chef.name;
            cmsData.chef.bio = chef.bio ? chef.bio.split('\n\n') : [];
            if (chef.image && chef.image.trim()) {
                document.getElementById('chefImage').style.backgroundImage = `url(${chef.image})`;
            }
        }

        if (philosophy?.text) cmsData.philosophy = philosophy.text;
        
        return true;
    } catch (e) {
        return false;
    }
}

function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}

<<<<<<< HEAD
loadCMSData();
>>>>>>> 64f5ea2 (update cms)
=======
>>>>>>> 430f4e0 (.)
