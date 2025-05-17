// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('keyup', () => {
        const searchTerm = searchBox.value.toLowerCase();
        
        portfolioItems.forEach(item => {
            const tags = item.getAttribute('data-tags').toLowerCase();
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (tags.includes(searchTerm) || title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // LightGallery initialization for video popups
    lightGallery(document.getElementById('portfolio-grid'), {
        selector: '.video-popup',
        plugins: [lgVideo],
        download: false,
        youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0
        },
        vimeoPlayerParams: {
            byline: 0,
            portrait: 0,
            title: 0
        }
    });
    
    // Load more projects
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more projects via AJAX
            this.textContent = 'No More Projects';
            this.disabled = true;
        });
    }
    
    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    
    scrollReveal.reveal('.testimonial-card', {
        interval: 100
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});