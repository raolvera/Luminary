/* Centralized CMS data loader used by app.js */
let cmsData = {
    seasons: {
        spring: { name: 'Spring', tagline: 'Celebrating renewal', colors: { primary: '#6b9080', accent: '#f4a259' }, menu: [] },
        summer: { name: 'Summer', tagline: 'Abundance at its peak', colors: { primary: '#e07a5f', accent: '#f2cc8f' }, menu: [] },
        autumn: { name: 'Autumn', tagline: 'Harvest richness', colors: { primary: '#8b4513', accent: '#d4a574' }, menu: [] },
        winter: { name: 'Winter', tagline: 'Comfort and contemplation', colors: { primary: '#2c5f4f', accent: '#a8dadc' }, menu: [] }
    },
    chef: { name: "Chef's Story", bio: [] },
    philosophy: 'At Luminary, we believe food should reflect the rhythm of nature.'
};

async function loadCMSData() {
    try {
        const [menu, chef, philosophy, hero] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null),
            fetch('/content/hero.json').then(r => r.json()).catch(() => null)
        ]);

        if (menu && (menu.items || menu.length)) {
            const items = menu.items || menu;
            items.forEach(item => {
                const seasonKey = (item.season === 'fall' ? 'autumn' : item.season) || 'winter';
                if (!cmsData.seasons[seasonKey]) return;
                cmsData.seasons[seasonKey].menu.push({
                    name: item.name || '',
                    ingredients: item.category || '',
                    description: item.description || '',
                    image: item.image || '',
                    price: item.price || ''
                });
            });
        }

        if (chef) {
            cmsData.chef.name = chef.name || cmsData.chef.name;
<<<<<<< HEAD
            cmsData.chef.bio = Array.isArray(chef.bio) ? chef.bio : (chef.bio ? chef.bio.split('\n\n').map(p => p.trim()).filter(Boolean) : []);
            if (chef.image) {
                const chefImgEl = document.getElementById('chefImage');
                if (chefImgEl) {
                    const img = chefImgEl.querySelector('img') || document.createElement('img');
                    img.src = chef.image;
                    img.alt = chef.name || 'Chef';
                    img.loading = 'lazy';
                    img.onerror = () => { img.onerror = null; img.src = '/img/chef.jpg'; };
                    if (!chefImgEl.contains(img)) chefImgEl.appendChild(img);
                }
=======
            cmsData.chef.bio = chef.bio ? chef.bio.split('\n\n') : [];
            if (chef.image && chef.image.trim()) {
                const chefImg = document.getElementById('chefImage');
                chefImg.style.background = `url(${chef.image}) center/contain no-repeat`;
                chefImg.style.backgroundColor = 'var(--light)';
>>>>>>> 60777ad (.)
            }
        }

        if (philosophy) {
            cmsData.philosophy = philosophy.text || philosophy;
        }

        if (hero && hero.image) {
            const heroImg = document.getElementById('heroBgImage');
            if (heroImg) {
                heroImg.src = hero.image;
                heroImg.alt = hero.alt || 'Luminary restaurant';
                heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = '/img/hero.jpg'; };
                const heroEl = document.querySelector('.hero');
                if (heroEl) heroEl.classList.add('has-hero-image');
            }
        }
    } catch (e) {
        // swallow fetch errors to keep site resilient
    }
    return cmsData;
}

// Expose a readiness promise for other scripts to await
window.cmsDataReady = loadCMSData();

function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}

window.cmsDataReady.then(() => console.log('CMS Data loaded:', cmsData)).catch(() => {});
