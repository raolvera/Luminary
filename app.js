// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
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
    document.getElementById('currentSeason').textContent = `${seasonData.name} Menu`;
    document.getElementById('seasonalTagline').textContent = seasonData.tagline;
    
    // Update menu season indicator
    document.getElementById('menuSeasonIndicator').textContent = `${seasonData.name} 2024`;
}

// Load content from CMS data
function loadContent(season) {
    const seasonData = cmsData.seasons[season];
    
    // Build menu items
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = seasonData.menu.map(item => `
        <div class="menu-item">
            <h3>${item.name}</h3>
            <div class="ingredients">${item.ingredients}</div>
            <p>${item.description}</p>
        </div>
    `).join('');
    
    // Load chef info
    document.getElementById('chefName').textContent = cmsData.chef.name;
    document.getElementById('chefBio').innerHTML = cmsData.chef.bio.map(p => `<p>${p}</p>`).join('');
    
    // Load philosophy text
    document.getElementById('philosophyPreview').textContent = cmsData.philosophy;
}

// Handle reservation form submission
function initReservationSystem() {
    const form = document.getElementById('reservationForm');
    const confirmation = document.getElementById('confirmationMessage');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            phone: document.getElementById('phone').value,
            notes: document.getElementById('notes').value,
            season: getCurrentSeason()
        };
        
        try {
            // Send to Formspree (replace with your form ID)
            const response = await fetch('https://formspree.io/f/xwvnnqqk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Show confirmation message
                confirmation.innerHTML = `
                    <h3>Reservation Confirmed!</h3>
                    <p>Thank you, ${formData.name}. We've reserved a table for ${formData.guests} guests on ${formatDate(formData.date)} at ${formatTime(formData.time)}.</p>
                    <p>A confirmation email has been sent to ${formData.email}.</p>
                `;
                confirmation.classList.add('show');
                
                // Also save to localStorage as backup
                const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
                reservations.push({
                    ...formData,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('reservations', JSON.stringify(reservations));
                
                // Reset form
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            confirmation.innerHTML = `
                <h3 style="color: #721c24;">Submission Error</h3>
                <p>We couldn't process your reservation. Please call us at (555) 123-4567.</p>
            `;
            confirmation.style.background = '#f8d7da';
            confirmation.classList.add('show');
        }
        
        // Hide confirmation after 10 seconds
        setTimeout(() => {
            confirmation.classList.remove('show');
        }, 10000);
    });
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
    const ampm = hour >= 12 ? 'PM' : 'AM';
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
