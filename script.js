// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, this would be sent to a server)
        console.log('Booking Data:', data);
        
        // Validate form
        if (validateForm(data)) {
            // Show success modal
            showSuccessModal();
            
            // Reset form
            bookingForm.reset();
            
            // In production, you would send this data to your backend
            // Example:
            // sendBookingToServer(data).then(() => {
            //     showSuccessModal();
            //     bookingForm.reset();
            // }).catch(error => {
            //     console.error('Error:', error);
            // });
        }
    });
}

// Form Validation
function validateForm(data) {
    if (!data.name || data.name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    if (!data.phone || data.phone.trim() === '') {
        alert('Please enter your phone number');
        return false;
    }
    if (!data.service || data.service === '') {
        alert('Please select a service');
        return false;
    }
    if (!data.date || data.date === '') {
        alert('Please select a date');
        return false;
    }
    if (!data.time || data.time === '') {
        alert('Please select a time');
        return false;
    }
    if (!data.address || data.address.trim() === '') {
        alert('Please enter your service location');
        return false;
    }
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal Functions
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking the close button
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
}

// Service type descriptions
const serviceDescriptions = {
    cleaning: 'Professional cleaning services for your facility',
    repairs: 'Expert maintenance and repair services',
    landscaping: 'Beautiful outdoor space management',
    security: '24/7 professional security services',
    hvac: 'Heating, ventilation, and cooling system management',
    electrical: 'Complete electrical system services'
};

// Log service selection
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        if (this.value) {
            console.log('Selected Service:', serviceDescriptions[this.value]);
        }
    });
}
