// Page Transition Animation
document.addEventListener('DOMContentLoaded', function() {
    // Remove transition overlay after page loads
    setTimeout(() => {
        document.querySelector('.transition-overlay').classList.remove('active');
    }, 100);
    
    // Add transition when clicking links
    document.querySelectorAll('a').forEach(link => {
        if (link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:') && link.target !== '_blank') {
            link.addEventListener('click', function(e) {
                if (this.href === window.location.href) {
                    e.preventDefault();
                    return;
                }
                
                // Don't apply transition for same-page anchors
                if (this.getAttribute('href').startsWith('#')) return;
                
                e.preventDefault();
                const transitionOverlay = document.querySelector('.transition-overlay');
                const href = this.href;
                
                document.body.classList.add('fade-out');
                transitionOverlay.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            });
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar) && !bar.style.width) {
                bar.style.width = width + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on load
    
    // Animate fun facts counting
    const factNumbers = document.querySelectorAll('.fact-number');
    
    function animateNumbers() {
        factNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Only animate when facts section is in view
    const factsSection = document.querySelector('.fun-facts');
    
    function checkFactsVisibility() {
        const rect = factsSection.getBoundingClientRect();
        const isVisible = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
        
        if (isVisible) {
            animateNumbers();
            window.removeEventListener('scroll', checkFactsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkFactsVisibility);
    checkFactsVisibility(); // Run once on load
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});


