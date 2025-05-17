// Header Scroll Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav ul');
const navLinks = document.querySelectorAll('.main-nav ul li');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Animate links with staggered delay ONLY when menu is active
    navLinks.forEach((link, index) => {
        if(navMenu.classList.contains('active')) {
            link.style.transitionDelay = `${index * 0.3}s`;
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        } else {
            // Reset styles when menu closes
            link.style.transitionDelay = '0s';
            link.style.opacity = '0';
            link.style.transform = 'translateX(50px)';
        }
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.main-nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Reset link styles on close
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(40px)';
            link.style.transitionDelay = '0s';
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target) || hamburger.contains(e.target);

    if (!isClickInsideMenu && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Reset link styles on close
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(40px)';
            link.style.transitionDelay = '2s';
        });
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

// Create dots dynamically
const sliderDotsContainer = document.querySelector('.slider-dots');
if (sliderDotsContainer) {
    sliderDotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index));
        sliderDotsContainer.appendChild(dot);
    });
}

// Now get the updated NodeList of dots (after they’re created)
let dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Navigation controls
document.querySelector('.slider-prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.slider-next')?.addEventListener('click', () => showSlide(currentSlide + 1));

// Auto slide change (optional)
// setInterval(() => showSlide(currentSlide + 1), 5000);

// Scroll reveal animation
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: true
});

scrollReveal.reveal('.section-header, .about-content, .service-card, .portfolio-itemm, .testimonial-slider, .contact-content, .footer-col , .cta-content, .philosophy-card,  .skills-text, .skills-chart, .process-item ', {
    interval: 200,
    viewFactor: 0.1
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission (frontend only - would need backend for actual functionality)
document.getElementById('mini-contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! In a real implementation, this would send the data to a server.');
    e.target.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// Page Transition for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Remove transition overlay after page loads
    setTimeout(() => {
        const overlay = document.querySelector('.transition-overlay');
        if (overlay) overlay.classList.remove('active');
    }, 100);

    // Add transition when clicking links
    document.querySelectorAll('a').forEach(link => {
        if (shouldAddTransition(link)) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.href;
                
                document.querySelector('.transition-overlay').classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            });
        }
    });
});

function shouldAddTransition(link) {
    return link.href && 
           !link.href.startsWith('javascript:') && 
           !link.href.startsWith('mailto:') && 
           !link.href.startsWith('tel:') && 
           link.target !== '_blank' &&
           !link.classList.contains('no-transition') &&
           !link.getAttribute('href').startsWith('#');
}