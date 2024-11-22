document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = Array.from(track.getElementsByClassName('project-card'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;
    let scrollAccumulator = 0;
    const scrollThreshold = 50; // Adjust this value to change sensitivity
    
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'far-far-prev');
            
            const position = index - currentIndex;
            
            if (position === 0) {
                card.classList.add('active');
            } else if (position === -1) {
                card.classList.add('prev');
            } else if (position === -2) {
                card.classList.add('far-prev');
            } else if (position <= -3) {
                card.classList.add('far-far-prev');
            } else if (position === 1) {
                card.classList.add('next');
            } else if (position >= 2) {
                card.classList.add('far-next');
            }
        });
    }
    
    function nextSlide() {
        if (currentIndex < cards.length - 1 && !isScrolling) {
            isScrolling = true;
            currentIndex++;
            updateCards();
            setTimeout(() => {
                isScrolling = false;
            }, 600); // Match this with your CSS transition duration
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0 && !isScrolling) {
            isScrolling = true;
            currentIndex--;
            updateCards();
            setTimeout(() => {
                isScrolling = false;
            }, 600); // Match this with your CSS transition duration
        }
    }
    
    // Initialize first card as active
    updateCards();
    
    // Smooth scroll handling
    function handleScroll(e) {
        e.preventDefault();
        
        // Accumulate scroll values
        scrollAccumulator += e.deltaY;
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set new timeout for scroll end detection
        scrollTimeout = setTimeout(() => {
            scrollAccumulator = 0;
        }, 150);
        
        // Check if accumulated scroll passes threshold
        if (Math.abs(scrollAccumulator) >= scrollThreshold) {
            if (scrollAccumulator > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            scrollAccumulator = 0; // Reset accumulator after action
        }
    }
    
    // Add keyboard navigation with smooth scrolling prevention
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            nextSlide();
        }
    });
    
    // Button click handlers
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Smooth scroll wheel navigation
    track.addEventListener('wheel', handleScroll, { passive: false });
    
    // Touch handling for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    const touchThreshold = 50;
    
    track.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    track.addEventListener('touchend', () => {
        const touchDiff = touchStartY - touchEndY;
        if (Math.abs(touchDiff) >= touchThreshold) {
            if (touchDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
}); 