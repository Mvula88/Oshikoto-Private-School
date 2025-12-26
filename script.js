// ========================================
// Oshikoto Private School - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll + Back to Top button visibility
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }

        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top button click handler
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Registration Form Submission via WhatsApp
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const childName = document.getElementById('childName').value.trim();
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const parentName = document.getElementById('parentName').value.trim();
        const idNumber = document.getElementById('idNumber').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const program = document.getElementById('program').value;
        const previousSchool = document.getElementById('previousSchool').value.trim();
        const hostel = document.getElementById('hostel').checked;
        const additionalInfo = document.getElementById('additionalInfo').value.trim();

        // Format date of birth
        const dobFormatted = dob ? formatDate(dob) : 'Not provided';

        // Build WhatsApp message
        let message = `*ONLINE REGISTRATION*
Oshikoto Private School
==============================

*CHILD'S INFORMATION*
Full Name: ${childName}
Date of Birth: ${dobFormatted}
Gender: ${gender}

*PARENT/GUARDIAN DETAILS*
Full Name: ${parentName}
ID Number: ${idNumber || 'Not provided'}
Phone: ${phone}
Email: ${email || 'Not provided'}

*PROGRAM DETAILS*
Program Applying For: ${program}
Previous School: ${previousSchool || 'None / First time'}

*ADDITIONAL OPTIONS*
Hostel Accommodation: ${hostel ? 'Yes - Required' : 'No - Not required'}

*ADDITIONAL INFORMATION*
${additionalInfo || 'No additional information provided'}

==============================
Submitted via Website
Date: ${getCurrentDate()}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp phone number (without + or spaces)
        const whatsappNumber = '264814335644';

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Show success message
        showNotification('Registration form prepared! WhatsApp will open with your details.', 'success');
    });

    // Helper function to format date (simple text pass-through)
    function formatDate(dateString) {
        return dateString.trim() || 'Not provided';
    }

    // Helper function to get current date
    function getCurrentDate() {
        const now = new Date();
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return now.toLocaleDateString('en-GB', options);
    }

    // Notification function
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Form validation enhancement
    const formInputs = document.querySelectorAll('.registration-form input, .registration-form select, .registration-form textarea');

    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#e91e8c';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .program-card, .gallery-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation link highlight
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Console welcome message
console.log('%c Oshikoto Private School Website ', 'background: #e91e8c; color: white; font-size: 16px; padding: 10px;');
console.log('%c Excellence, Quality & Dedication Everyday ', 'color: #f9a825; font-style: italic;');
