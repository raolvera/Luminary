// CMS Data - Edit this file to update the website content
const cmsData = {
    seasons: {
        spring: {
            name: "Spring",
            tagline: "Celebrating renewal and fresh beginnings",
            colors: {
                primary: "#6b9080",
                accent: "#f4a259"
            },
            menu: [
                {
                    name: "Spring Pea Velouté",
                    ingredients: "English peas, mint, crème fraîche",
                    description: "Silky soup celebrating the first harvest of spring peas, finished with garden mint"
                },
                {
                    name: "Asparagus & Morel",
                    ingredients: "White asparagus, wild morels, brown butter",
                    description: "Tender asparagus paired with foraged morels in a delicate brown butter emulsion"
                },
                {
                    name: "Lamb & Fava Beans",
                    ingredients: "Local lamb, fava beans, spring garlic",
                    description: "Herb-crusted lamb with bright fava beans and young garlic from nearby farms"
                }
            ]
        },
        summer: {
            name: "Summer",
            tagline: "Abundance at its peak",
            colors: {
                primary: "#e07a5f",
                accent: "#f2cc8f"
            },
            menu: [
                {
                    name: "Heirloom Tomato",
                    ingredients: "Heirloom tomatoes, burrata, basil oil",
                    description: "Peak-season tomatoes in vibrant colors, paired with creamy burrata and aromatic basil"
                },
                {
                    name: "Grilled Octopus",
                    ingredients: "Spanish octopus, summer squash, romesco",
                    description: "Tender octopus with charred summer vegetables and smoky romesco sauce"
                },
                {
                    name: "Stone Fruit Tart",
                    ingredients: "Peaches, apricots, almond cream",
                    description: "Rustic tart showcasing the season's sweetest stone fruits on almond frangipane"
                }
            ]
        },
        autumn: {
            name: "Autumn",
            tagline: "Harvest richness and warmth",
            colors: {
                primary: "#8b4513",
                accent: "#d4a574"
            },
            menu: [
                {
                    name: "Roasted Squash",
                    ingredients: "Kabocha squash, sage, hazelnuts",
                    description: "Caramelized squash with crispy sage and toasted hazelnuts from local orchards"
                },
                {
                    name: "Wild Mushroom Risotto",
                    ingredients: "Porcini, chanterelles, aged parmesan",
                    description: "Creamy risotto studded with foraged mushrooms and finished with aged cheese"
                },
                {
                    name: "Duck & Root Vegetables",
                    ingredients: "Duck breast, parsnips, blackberry gastrique",
                    description: "Perfectly seared duck with earthy roots and a tart-sweet blackberry reduction"
                }
            ]
        },
        winter: {
            name: "Winter",
            tagline: "Comfort and contemplation",
            colors: {
                primary: "#2c5f4f",
                accent: "#a8dadc"
            },
            menu: [
                {
                    name: "Celery Root Soup",
                    ingredients: "Celery root, truffle, chives",
                    description: "Velvety soup of roasted celery root, elevated with black truffle essence"
                },
                {
                    name: "Braised Short Rib",
                    ingredients: "Beef short rib, winter greens, bone marrow",
                    description: "Slow-braised beef with hearty greens and rich bone marrow butter"
                },
                {
                    name: "Citrus & Olive Oil Cake",
                    ingredients: "Blood orange, Meyer lemon, olive oil",
                    description: "Moist cake brightened with winter citrus and premium olive oil"
                }
            ]
        }
    },
    chef: {
        name: "Chef Elena Moreau",
        bio: [
            "Every dish tells a story of the season. My approach is simple: let ingredients speak for themselves.",
            "Trained across three continents, I've learned that the best cuisine honors time and place. At Luminary, we work directly with local farmers and foragers to bring you flavors that can only exist right now, in this moment.",
            "Our menu changes completely four times a year, with weekly adjustments based on what's available. This isn't just cooking—it's a conversation with nature."
        ]
    },
    philosophy: "At Luminary, we believe food should reflect the rhythm of nature. Our menu transforms with each season, celebrating ingredients at their peak."
};

// Figure out what season we're in based on the current month
function getCurrentSeason() {
    const month = new Date().getMonth(); // 0-11
    
    if (month >= 2 && month <= 4) return 'spring';  // Mar, Apr, May
    if (month >= 5 && month <= 7) return 'summer';  // Jun, Jul, Aug
    if (month >= 8 && month <= 10) return 'autumn'; // Sep, Oct, Nov
    
    return 'winter'; // Dec, Jan, Feb
}
