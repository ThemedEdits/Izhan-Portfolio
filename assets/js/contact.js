document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.classList.add('loading');
                
                // Simulate form submission (in a real implementation, this would be AJAX)
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    submitButton.classList.remove('loading');
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const error = group.querySelector('.error-message');
            
            // Reset error state
            error.textContent = '';
            
            // Check required fields
            if (input.required && !input.value.trim()) {
                error.textContent = 'This field is required';
                isValid = false;
            }
            
            // Validate email format
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    error.textContent = 'Please enter a valid email address';
                    isValid = false;
                }
            }
            
            // Validate checkbox
            if (input.type === 'checkbox' && !input.checked) {
                error.textContent = 'You must agree to continue';
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Smooth scroll for anchor links
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
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.contact-form-container, .contact-info-card, .map-container, .contact-cta', {
        interval: 100
    });
});