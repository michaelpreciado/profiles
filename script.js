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

// Unified typing effect function
function typeText(element, text, speed = 5) {
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

    // Debounced scroll handler for performance
    let scrollTimeout;
    const scrollHandler = () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const opacity = Math.max(0.2, 1 - (scrolled / maxScroll));
            document.getElementById('particles-js').style.opacity = opacity;
        });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Touch-friendly navigation
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        window.touchStartY = touch.clientY;
    };

    const handleTouchMove = (e) => {
        if (!window.touchStartY) return;
        
        const touch = e.touches[0];
        const deltaY = window.touchStartY - touch.clientY;
        
        if (Math.abs(deltaY) > 30) {
            window.requestAnimationFrame(() => {
                window.scrollBy({
                    top: deltaY,
                    behavior: 'smooth'
                });
            });
        }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', () => {
        window.touchStartY = null;
    }, { passive: true });

    // Responsive hover effects
    if (window.matchMedia('(hover: hover)').matches) {
        const cards = document.querySelectorAll('.profile-card, .bio-card, .project-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                requestAnimationFrame(() => {
                    card.style.transform = 'translateY(-4px)';
                    card.style.boxShadow = 'var(--term-glow-strong)';
                });
            });

            card.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            });
        });
    }

    // Start typing effects
    initializeTypingEffects();

    // Simplified touch interaction optimization for iOS
    let touchStartY = 0;
    let isTouching = false;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        isTouching = true;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isTouching = false;
    }, { passive: true });

    // Remove custom scroll behavior and momentum scrolling
    // Let iOS handle native scrolling
    document.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        // Only prevent default for extreme overscroll cases
        const currentY = e.touches[0].clientY;
        if ((window.scrollY <= 0 && currentY > touchStartY) || 
            (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && currentY < touchStartY)) {
            e.preventDefault();
        }
    }, { passive: false });

    // Remove momentum scrolling and custom scroll handlers
    // let velocity = 0;
    // let rafId = null;
    
    // function momentumScroll() {
    //     if (Math.abs(velocity) > 0.1) {
    //         window.scrollBy(0, velocity);
    //         velocity *= 0.95;
    //         rafId = requestAnimationFrame(momentumScroll);
    //     } else {
    //         cancelAnimationFrame(rafId);
    //     }
    // }

    // document.addEventListener('wheel', (e) => {
    //     velocity = e.deltaY * 0.1;
    //     if (!rafId) {
    //         rafId = requestAnimationFrame(momentumScroll);
    //     }
    // }, { passive: true });

    // Optimize card touch interactions
    const cards = document.querySelectorAll('.project-card, .bio-card');
    cards.forEach(card => {
        let touchStartTime;
        let touchStartX;
        let touchStartY;
        
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            
            // Subtle scale effect on touch
            card.style.transform = 'scale(0.99)';
            card.style.transition = 'transform 0.2s ease';
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
            if (touchDuration < 200 && deltaX < 5 && deltaY < 5) {
                const link = card.querySelector('a');
                if (link) link.click();
            }
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            card.style.transform = '';
        }, { passive: true });
    });
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

