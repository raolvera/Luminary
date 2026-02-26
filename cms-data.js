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
        const [menu, chef, philosophy] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null)
        ]);

        if (menu?.items) {
            menu.items.forEach(item => {
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
            cmsData.chef.bio = chef.bio ? chef.bio.split('\n\n').map(p => p.trim()).filter(p => p) : [];
            if (chef.image) {
                const chefImg = document.getElementById('chefImage');
                const img = document.createElement('img');
                img.src = chef.image;
                img.alt = chef.name || 'Chef';
                chefImg.innerHTML = '';
                chefImg.appendChild(img);
            }
        }

        if (philosophy?.text) cmsData.philosophy = philosophy.text;

        // Re-render content now that CMS data is loaded
        if (typeof loadContent === 'function') {
            loadContent(getCurrentSeason());
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

loadCMSData();
