const cmsData = {
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
                    img.src = chef.image;
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
