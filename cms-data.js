/* Centralized CMS data loader used by app.js */
let cmsData = {
    seasons: {
<<<<<<< HEAD
        spring: { name: 'Spring', tagline: 'Celebrating renewal', colors: { primary: '#6b9080', accent: '#f4a259' }, menu: [] },
        summer: { name: 'Summer', tagline: 'Abundance at its peak', colors: { primary: '#e07a5f', accent: '#f2cc8f' }, menu: [] },
        autumn: { name: 'Autumn', tagline: 'Harvest richness', colors: { primary: '#8b4513', accent: '#d4a574' }, menu: [] },
        winter: { name: 'Winter', tagline: 'Comfort and contemplation', colors: { primary: '#2c5f4f', accent: '#a8dadc' }, menu: [] }
    },
    chef: { name: "Chef's Story", bio: [] },
    philosophy: 'At Luminary, we believe food should reflect the rhythm of nature.'
=======
        spring: { name: "Spring", tagline: "Celebrating renewal", colors: { primary: "#6b9080", accent: "#f4a259" }, menu: [
            {name: "Spring Pea Velouté", ingredients: "English peas, mint, crème fraîche", description: "Silky soup celebrating the first harvest of spring peas, finished with garden mint"}
        ] },
        summer: { name: "Summer", tagline: "Abundance at its peak", colors: { primary: "#e07a5f", accent: "#f2cc8f" }, menu: [
            {name: "Heirloom Tomato", ingredients: "Heirloom tomatoes, burrata, basil oil", description: "Peak-season tomatoes in vibrant colors, paired with creamy burrata and aromatic basil"}
        ] },
        autumn: { name: "Autumn", tagline: "Harvest richness", colors: { primary: "#8b4513", accent: "#d4a574" }, menu: [
            {name: "Roasted Squash", ingredients: "Kabocha squash, sage, hazelnuts", description: "Caramelized squash with crispy sage and toasted hazelnuts from local orchards"}
        ] },
        winter: { name: "Winter", tagline: "Comfort and contemplation", colors: { primary: "#2c5f4f", accent: "#a8dadc" }, menu: [
            {name: "Celery Root Soup", ingredients: "Celery root, truffle, chives", description: "Velvety soup of roasted celery root, elevated with black truffle essence"}
        ] }
    },
    chef: { 
        name: "Chef Elena Moreau", 
        bio: [
            "Every dish tells a story of the season. My approach is simple: let ingredients speak for themselves.",
            "Trained across three continents, I've learned that the best cuisine honors time and place. At Luminary, we work directly with local farmers and foragers to bring you flavors that can only exist right now, in this moment."
        ]
    },
    philosophy: "At Luminary, we believe food should reflect the rhythm of nature. Our menu transforms with each season, celebrating ingredients at their peak."
>>>>>>> b70ef51 (.)
};

async function loadCMSData() {
    try {
<<<<<<< HEAD
        const [menu, chef, philosophy, hero] = await Promise.all([
            fetch('/content/menu.json').then(r => r.json()).catch(() => null),
            fetch('/content/chef.json').then(r => r.json()).catch(() => null),
            fetch('/content/philosophy.json').then(r => r.json()).catch(() => null),
            fetch('/content/hero.json').then(r => r.json()).catch(() => null)
        ]);

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
})();
