# Luminary 🍽️

A seasonal fine dining restaurant website with a built-in content management system. The menu automatically changes with the seasons, and restaurant owners can update content without touching code.

## ✨ Features

- **Automatic Seasonal Theming** - Menu and colors change based on the current season (Spring/Summer/Fall/Winter)
- **Content Management System** - Owners can edit menu items, chef bio, and philosophy through an admin panel
- **Reservation System** - Built-in form handling with email notifications
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Zero Backend** - No database or server required
- **Free Hosting** - Completely free to host and maintain

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **CMS:** Decap CMS (formerly Netlify CMS)
- **Hosting:** Netlify
- **Storage:** GitHub
- **Authentication:** Netlify Identity

## 📁 Project Structure

```
Luminary/
-admin/              # CMS admin interface
-content/            # JSON data files (menu, chef, philosophy)
-img/                # Images
-vid/                # Videos
-index.html          # Main website
-form.html           # Form
-style.css           # Styling
-app.js              # Interactivity
-cms-data.js         # Data loader
-netlify.toml        # Deployment config
-success.html        # Success 
```

## 🚀 How It Works

1. **Owner logs in** at `/admin/` using Netlify Identity
2. **Edits content** through the CMS dashboard (menu items, chef bio, etc.)
3. **Clicks publish** - changes save to JSON files in GitHub
4. **Site auto-deploys** - Netlify rebuilds the site (1-2 minutes)
5. **Visitors see updates** - JavaScript loads the new content dynamically

## 🎨 Seasonal System

The website automatically detects the current season based on the month:
- **Spring:** March - May (Green & Orange theme)
- **Summer:** June - August (Warm tones)
- **Fall:** September - November (Brown & Gold theme)
- **Winter:** December - February (Cool blues)

Menu items are filtered to show only dishes for the current season.

## 📝 Content Management

Owners can edit through the CMS:
- ✅ Menu items (name, description, ingredients, season)
- ✅ Chef biography and photo
- ✅ Restaurant philosophy text
- ✅ Upload images

## 📮 Reservations

Reservation form captures:
- Name, Email, Phone
- Date, Time, Number of Guests
- Special Requests

Submissions are stored in Netlify dashboard with email notifications.

## 🌐 Deployment

### Prerequisites
- GitHub account
- Netlify account (free)

### Setup Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin (https://raolvera.github.io/Luminary/)
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Build settings: Leave empty (no build needed)
   - Publish directory: `.` (root)
   - Click Deploy

3. **Enable Netlify Identity**
   - Site Settings → Identity → Enable Identity
   - Services → Git Gateway → Enable
   - Invite yourself as a user

4. **Access CMS**
   - Go to `yoursite.netlify.app/admin/`
   - Login with your Netlify Identity credentials
   - Start editing content!

## 💡 Key Benefits

**For Restaurant Owners:**
- Update menu anytime without a developer
- No monthly CMS fees
- Free hosting
- Professional, fast website

**For Developers:**
- No backend to maintain
- No database management
- Version-controlled content
- Modern JAMstack architecture

## 🔧 Local Development

1. Clone the repository
2. Open `index.html` in a browser
3. For CMS testing, use Netlify Dev:
   ```bash
   netlify dev
   ```

## 📱 Responsive Design

- Desktop: Full navigation menu
- Mobile (< 768px): Hamburger menu
- Touch-friendly buttons and forms
- Flexible grid layouts

## 🎯 Future Enhancements

- [ ] Online payment integration
- [ ] Real-time availability calendar
- [ ] Email confirmation system
- [ ] Multi-language support
- [ ] Customer reviews section
- [ ] Photo gallery with CMS control

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own restaurant or client!

---

**Built with ❤️ using JAMstack architecture**
