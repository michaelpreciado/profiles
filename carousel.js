document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = Array.from(track.getElementsByClassName('project-card'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;
    let lastTouchY = 0;
    let touchVelocity = 0;
    let lastTouchTime = 0;
    let touchOffset = 0;
    let animationFrame = null;
    const touchThreshold = 20; // Reduced threshold for more responsive touch
    const velocityThreshold = 0.5;
    const maxBounceOffset = 100;
    
    function updateCards(offset = 0) {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'far-far-prev');
            
            const position = index - currentIndex;
            let transform = '';
            
            // Apply touch offset for real-time movement
            if (offset !== 0) {
                transform = `translateY(${offset}px)`;
            }
            
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
            
            // Apply transform with easing
            card.style.transform = transform;
            card.style.transition = offset !== 0 ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        updateButtonStates();
    }
    
    function updateButtonStates() {
        prevButton.style.opacity = currentIndex > 0 ? "1" : "0.5";
        nextButton.style.opacity = currentIndex < cards.length - 1 ? "1" : "0.5";
        prevButton.classList.toggle('active', currentIndex > 0);
        nextButton.classList.toggle('active', currentIndex < cards.length - 1);
    }

    function nextSlide(animate = true) {
        if (currentIndex < cards.length - 1 && !isScrolling) {
            isScrolling = true;
            currentIndex++;
            updateCards();
            if (animate) {
                nextButton.classList.add('clicked');
                setTimeout(() => {
                    nextButton.classList.remove('clicked');
                    isScrolling = false;
                }, 400);
            } else {
                setTimeout(() => isScrolling = false, 400);
            }
        } else if (currentIndex >= cards.length - 1) {
            // Bounce effect at end
            applyBounceEffect('next');
        }
    }
    
    function prevSlide(animate = true) {
        if (currentIndex > 0 && !isScrolling) {
            isScrolling = true;
            currentIndex--;
            updateCards();
            if (animate) {
                prevButton.classList.add('clicked');
                setTimeout(() => {
                    prevButton.classList.remove('clicked');
                    isScrolling = false;
                }, 400);
            } else {
                setTimeout(() => isScrolling = false, 400);
            }
        } else if (currentIndex <= 0) {
            // Bounce effect at start
            applyBounceEffect('prev');
        }
    }
    
    function applyBounceEffect(direction) {
        const bounceDistance = direction === 'next' ? -30 : 30;
        updateCards(bounceDistance);
        setTimeout(() => updateCards(0), 200);
    }
    
    // Initialize
    updateCards();
    
    // Enhanced touch handling
    track.addEventListener('touchstart', (e) => {
        // Cancel any ongoing animation
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        lastTouchTime = Date.now();
        touchVelocity = 0;
        touchOffset = 0;
        isScrolling = false;
        
        // Remove any existing transitions
        cards.forEach(card => {
            card.style.transition = 'none';
        });
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const currentTouchY = e.touches[0].clientY;
        const currentTime = Date.now();
        const deltaY = currentTouchY - lastTouchY;
        const deltaTime = currentTime - lastTouchTime;
        
        // Calculate velocity
        if (deltaTime > 0) {
            touchVelocity = deltaY / deltaTime;
        }
        
        // Update touch tracking
        lastTouchY = currentTouchY;
        lastTouchTime = currentTime;
        
        // Calculate offset with resistance at boundaries
        touchOffset = currentTouchY - touchStartY;
        if (currentIndex <= 0 && touchOffset > 0) {
            touchOffset = Math.sqrt(touchOffset) * 5; // Resistance at start
        } else if (currentIndex >= cards.length - 1 && touchOffset < 0) {
            touchOffset = -Math.sqrt(-touchOffset) * 5; // Resistance at end
        }
        
        // Apply real-time transform
        updateCards(touchOffset);
    }, { passive: false });
    
    track.addEventListener('touchend', () => {
        const touchDuration = Date.now() - lastTouchTime;
        const absVelocity = Math.abs(touchVelocity);
        
        // Determine if swipe should occur based on velocity or distance
        if (absVelocity > velocityThreshold || Math.abs(touchOffset) > touchThreshold) {
            if (touchVelocity < 0 || touchOffset < -touchThreshold) {
                nextSlide(false);
            } else if (touchVelocity > 0 || touchOffset > touchThreshold) {
                prevSlide(false);
            }
        } else {
            // If no swipe, animate back to current position
            updateCards(0);
        }
        
        // Reset touch tracking
        touchOffset = 0;
        touchVelocity = 0;
    });
    
    // Mouse wheel handling with smoother animation
    let wheelTimeout;
    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (wheelTimeout) {
            clearTimeout(wheelTimeout);
        }
        
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }, 50); // Small delay for smoother wheel scrolling
    }, { passive: false });
    
    // Button clicks
    nextButton.addEventListener('click', () => nextSlide(true));
    prevButton.addEventListener('click', () => prevSlide(true));
    
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