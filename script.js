/* Pip-Boy Particles Configuration */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00E6FF"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0.5,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 100,
      "color": "#00E6FF",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": window.matchMedia("(min-width: 768px)").matches,
        "mode": "grab"
      },
      "onclick": {
        "enable": window.matchMedia("(min-width: 768px)").matches,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});

// Carousel Configuration
const ANIMATION_DURATION = 400;
const TOUCH_CONFIG = {
    threshold: 20,
    velocityThreshold: 0.5,
    maxBounceOffset: 100,
    bounceDistance: 30
};

class ProjectCarousel {
    constructor() {
        this.track = document.querySelector('.projects-track');
        this.cards = Array.from(this.track.getElementsByClassName('project-card'));
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        
        this.state = {
            currentIndex: 0,
            isScrolling: false,
            touch: {
                startY: 0,
                lastY: 0,
                offset: 0,
                velocity: 0,
                lastTime: 0
            },
            animationFrame: null
        };
        
        this.initializeCarousel();
    }
    
    initializeCarousel() {
        this.updateCards();
        this.setupEventListeners();
    }
    
    updateCards(offset = 0) {
        this.cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'far-far-prev');
            
            const position = index - this.state.currentIndex;
            
            // Apply transform for touch movement
            const transform = offset !== 0 ? `translateY(${offset}px)` : '';
            card.style.transform = transform;
            card.style.transition = offset !== 0 ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            // Add position class
            if (position === 0) card.classList.add('active');
            else if (position === -1) card.classList.add('prev');
            else if (position === -2) card.classList.add('far-prev');
            else if (position <= -3) card.classList.add('far-far-prev');
            else if (position === 1) card.classList.add('next');
            else if (position >= 2) card.classList.add('far-next');
        });
        
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        const { currentIndex } = this.state;
        const isAtStart = currentIndex <= 0;
        const isAtEnd = currentIndex >= this.cards.length - 1;
        
        this.prevButton.style.opacity = isAtStart ? "0.5" : "1";
        this.nextButton.style.opacity = isAtEnd ? "0.5" : "1";
        this.prevButton.classList.toggle('active', !isAtStart);
        this.nextButton.classList.toggle('active', !isAtEnd);
    }
    
    async slide(direction, animate = true) {
        if (this.state.isScrolling) return;
        
        const isNext = direction === 'next';
        const canMove = isNext ? 
            this.state.currentIndex < this.cards.length - 1 : 
            this.state.currentIndex > 0;
        
        this.state.isScrolling = true;
        
        if (!canMove) {
            this.applyBounceEffect(direction);
            // Reset isScrolling after bounce animation
            setTimeout(() => {
                this.state.isScrolling = false;
            }, 200);
            return;
        }
        
        this.state.currentIndex += isNext ? 1 : -1;
        this.updateCards();
        
        if (animate) {
            const button = isNext ? this.nextButton : this.prevButton;
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        }
        
        // Ensure isScrolling is reset after animation or immediately if not animating
        setTimeout(() => {
            this.state.isScrolling = false;
        }, animate ? ANIMATION_DURATION : 0);
    }
    
    applyBounceEffect(direction) {
        const bounceOffset = direction === 'next' ? -TOUCH_CONFIG.bounceDistance : TOUCH_CONFIG.bounceDistance;
        this.updateCards(bounceOffset);
        setTimeout(() => this.updateCards(0), 200);
    }
    
    handleTouchStart(e) {
        if (this.state.animationFrame) {
            cancelAnimationFrame(this.state.animationFrame);
        }
        
        // Force reset isScrolling state on new touch
        this.state.isScrolling = false;
        
        const touch = e.touches[0];
        this.state.touch = {
            startY: touch.clientY,
            lastY: touch.clientY,
            lastTime: Date.now(),
            velocity: 0,
            offset: 0
        };
        
        this.cards.forEach(card => card.style.transition = 'none');
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const currentTime = Date.now();
        const deltaY = touch.clientY - this.state.touch.lastY;
        const deltaTime = currentTime - this.state.touch.lastTime;
        
        // Update velocity
        if (deltaTime > 0) {
            this.state.touch.velocity = deltaY / deltaTime;
        }
        
        // Update touch tracking
        this.state.touch.lastY = touch.clientY;
        this.state.touch.lastTime = currentTime;
        
        // Calculate offset with boundary resistance
        this.state.touch.offset = touch.clientY - this.state.touch.startY;
        
        // Apply resistance at boundaries
        if (this.state.currentIndex <= 0 && this.state.touch.offset > 0) {
            this.state.touch.offset = Math.sqrt(this.state.touch.offset) * 5;
        } else if (this.state.currentIndex >= this.cards.length - 1 && this.state.touch.offset < 0) {
            this.state.touch.offset = -Math.sqrt(-this.state.touch.offset) * 5;
        }
        
        this.updateCards(this.state.touch.offset);
    }
    
    handleTouchEnd() {
        const { velocity, offset } = this.state.touch;
        const absVelocity = Math.abs(velocity);
        
        if (absVelocity > TOUCH_CONFIG.velocityThreshold || Math.abs(offset) > TOUCH_CONFIG.threshold) {
            if (velocity < 0 || offset < -TOUCH_CONFIG.threshold) {
                this.slide('next', false);
            } else if (velocity > 0 || offset > TOUCH_CONFIG.threshold) {
                this.slide('prev', false);
            }
        } else {
            this.updateCards(0);
            // Reset isScrolling state if no slide occurs
            this.state.isScrolling = false;
        }
        
        // Reset touch state
        this.state.touch = {
            startY: 0,
            lastY: 0,
            offset: 0,
            velocity: 0,
            lastTime: 0
        };
        
        // Safety timeout to ensure isScrolling is eventually reset
        setTimeout(() => {
            this.state.isScrolling = false;
        }, ANIMATION_DURATION + 100);
    }
    
    setupEventListeners() {
        // Touch Events
        this.track.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', () => this.handleTouchEnd());
        
        // Mouse Wheel
        let wheelTimeout;
        this.track.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (wheelTimeout) clearTimeout(wheelTimeout);
            
            wheelTimeout = setTimeout(() => {
                this.slide(e.deltaY > 0 ? 'next' : 'prev');
            }, 50);
        }, { passive: false });
        
        // Button Clicks
        this.nextButton.addEventListener('click', () => this.slide('next'));
        this.prevButton.addEventListener('click', () => this.slide('prev'));
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new ProjectCarousel();
});

// Unified typing effect function
function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        if (!element || !text) {
            resolve();
            return;
        }
        let index = 0;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Unified function to initialize all typing animations
async function initializeTypingEffects() {
    // Collect all elements that need typing effect
    const elementsToType = [
        // Profile section
        { element: document.querySelector('.profile-card h1'), text: 'Michael Preciado' },
        { element: document.querySelector('.profile-card h2'), text: 'Software & AI Solutions' },
        { element: document.querySelector('.job-ready-description p'), 
          text: 'Passionate about leveraging technology to solve real-world problems. Seeking opportunities to contribute to innovative projects and grow within a dynamic team.' },
        
        // Projects section
        { element: document.querySelector('.projects-header h1'), text: 'Projects' },
        ...Array.from(document.querySelectorAll('.project-card p')).map(el => ({
            element: el,
            text: el.textContent
        })),
        
        // Bio cards
        ...Array.from(document.querySelectorAll('.bio-card h3, .bio-card p')).map(el => ({
            element: el,
            text: el.textContent
        }))
    ];

    // Clear all elements first
    elementsToType.forEach(item => {
        if (item.element) {
            item.element.textContent = '';
            item.element.style.visibility = 'visible';
        }
    });

    // Type all elements simultaneously with very fast speed
    await Promise.all(
        elementsToType.map(item => typeText(item.element, item.text, 5)) // Set speed to 5ms
    );

    // After text is typed, fade in all tags immediately
    const tags = document.querySelectorAll('.profile-tag');
    tags.forEach(tag => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
        tag.style.transition = 'all 0.1s ease'; // Faster transition
        tag.style.display = 'flex';
    });
}

// Optimized animation handling with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate cards on scroll
    const animatedElements = document.querySelectorAll('.profile-card, .bio-card, .project-card');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('animate-in');
                });
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    animatedElements.forEach(el => {
        el.classList.add('animate-prepare');
        animationObserver.observe(el);
    });

    // Simplified scroll handler for particles only
    let scrollTimeout;
    const scrollHandler = () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const opacity = Math.max(0.2, 1 - (scrolled / maxScroll));
            const particles = document.getElementById('particles-js');
            if (particles) {
                particles.style.opacity = opacity;
            }
        });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Simplified card touch interactions - only for tap detection
    const cards = document.querySelectorAll('.project-card, .bio-card');
    cards.forEach(card => {
        let touchStartTime;
        let touchStartX;
        let touchStartY;
        
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            
            // Very subtle scale effect
            card.style.transform = 'scale(0.995)';
            card.style.transition = 'transform 0.1s ease';
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);

            // Remove scale effect
            card.style.transform = '';
            
            // Only trigger tap if it's a quick, small movement
            if (touchDuration < 150 && deltaX < 10 && deltaY < 10) {
                const link = card.querySelector('a');
                if (link) link.click();
            }
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            card.style.transform = '';
        }, { passive: true });
    });

    // Start typing effects
    initializeTypingEffects();
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Responsive navigation
const initResponsiveNav = () => {
    const nav = document.querySelector('.profile-social-links');
    if (!nav) return;

    const handleResize = () => {
        requestAnimationFrame(() => {
            nav.style.display = window.innerWidth < 768 ? 'grid' : 'flex';
        });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
};

// Terminal Typing Animation
function typeText(element, text, speed = 50, startDelay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            let index = 0;
            element.textContent = '';
            element.style.visibility = 'visible';
            
            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        }, startDelay);
    });
}

async function initTerminalAnimation() {
    // Add terminal scan effect
    const scanLine = document.createElement('div');
    scanLine.className = 'terminal-scan';
    document.body.appendChild(scanLine);

    // Get all text elements
    const textElements = [
        document.querySelector('.profile-card h1'),
        document.querySelector('.profile-card h2'),
        ...document.querySelectorAll('.bio-card h3'),
        ...document.querySelectorAll('.bio-card p')
    ];
    
    // Store original text and prepare elements
    const originalTexts = textElements.map(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.visibility = 'visible';
        el.classList.add('terminal-text');
        el.setAttribute('data-text', text);
        return text;
    });
    
    // Add typing class to bio cards
    document.querySelectorAll('.bio-card').forEach(card => {
        card.classList.add('typing');
    });
    
    // Type all text simultaneously with increased speed
    await Promise.all(textElements.map((element, index) => 
        typeText(element, originalTexts[index], 10, Math.random() * 500) // Random start delay between 0-500ms
    ));
    
    // Function to apply random glitch effect with larger delay
    function applyRandomGlitch(element) {
        const delay = Math.random() * 20000 + 10000; // Random delay between 10-30 seconds
        setTimeout(() => {
            element.classList.add('flicker');
        }, delay);
    }
    
    // Randomly trigger glitch effects
    function startRandomGlitches() {
        textElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.2) { // 20% chance of glitch per interval
                    applyRandomGlitch(element);
                }
            }, Math.random() * 8000 + 4000); // Random interval between 4-12 seconds
        });
    }
    
    // Start random glitches after initial animation
    startRandomGlitches();
    
    // Remove scan line faster
    setTimeout(() => {
        scanLine.style.opacity = '0';
        setTimeout(() => scanLine.remove(), 300);
    }, 800);
}

// Function to apply random flicker effect with larger delay
function applyRandomFlicker(element) {
    const delay = Math.random() * 10000; // Random delay up to 10 seconds
    setTimeout(() => {
        element.classList.add('flicker');
    }, delay);
}

// Apply random flicker to each bio card
const bioCards = document.querySelectorAll('.bio-card');
bioCards.forEach(card => applyRandomFlicker(card));

// Apply random flicker to each project card
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => applyRandomFlicker(card));

// Add flicker class in CSS
// .flicker { animation: terminalFlicker 10s infinite; }

document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.profile-header-text h1');
    const fullName = 'Michael Preciado';
    let currentIndex = 0;

    function typeLetter() {
        if (currentIndex < fullName.length) {
            nameElement.textContent = fullName.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeLetter, 500 / fullName.length);
        } else {
            nameElement.classList.add('glitch');
        }
    }

    nameElement.textContent = '';
    typeLetter();
});

