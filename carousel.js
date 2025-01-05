document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = Array.from(track.getElementsByClassName('project-card'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;
    const touchThreshold = 30;
    
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

        // Update button states
        updateButtonStates();
    }
    
    function updateButtonStates() {
        // Update visual state of buttons
        prevButton.style.opacity = currentIndex > 0 ? "1" : "0.5";
        nextButton.style.opacity = currentIndex < cards.length - 1 ? "1" : "0.5";
        
        // Add/remove active class for animation
        prevButton.classList.toggle('active', currentIndex > 0);
        nextButton.classList.toggle('active', currentIndex < cards.length - 1);
    }

    function nextSlide() {
        if (currentIndex < cards.length - 1 && !isScrolling) {
            isScrolling = true;
            currentIndex++;
            updateCards();
            // Animate next button
            nextButton.classList.add('clicked');
            setTimeout(() => {
                nextButton.classList.remove('clicked');
                isScrolling = false;
            }, 400);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0 && !isScrolling) {
            isScrolling = true;
            currentIndex--;
            updateCards();
            // Animate prev button
            prevButton.classList.add('clicked');
            setTimeout(() => {
                prevButton.classList.remove('clicked');
                isScrolling = false;
            }, 400);
        }
    }
    
    // Initialize
    updateCards();
    
    // Touch handling
    track.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        e.preventDefault();
        touchEndY = e.touches[0].clientY;
    }, { passive: false });
    
    track.addEventListener('touchend', () => {
        const touchDiff = touchStartY - touchEndY;
        if (Math.abs(touchDiff) >= touchThreshold) {
            if (touchDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Mouse wheel handling
    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }, { passive: false });
    
    // Button clicks
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            nextSlide();
        }
    });
}); 