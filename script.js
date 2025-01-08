/* Pip-Boy Particles Configuration */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00E6FF"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#00E6FF"
      }
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#00E6FF",
      "opacity": 0.25,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.8,
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
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 180,
        "line_linked": {
          "opacity": 0.6
        }
      },
      "push": {
        "particles_nb": 6
      }
    }
  },
  "retina_detect": true
});

// Enhanced Intersection Observer for card animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.profile-card, .bio-card');
    
    // Set initial state
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.classList.add('card-hidden');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay based on card index
                setTimeout(() => {
                    entry.target.classList.remove('card-hidden');
                    entry.target.classList.add('card-visible');
                }, entry.target.style.getPropertyValue('--card-index') * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    cards.forEach(card => observer.observe(card));
});

// Enhanced hover effects for social links
document.querySelectorAll('.profile-social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px) scale(1.1)';
        link.style.boxShadow = '0 0 15px var(--term-cyan)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'none';
        link.style.boxShadow = 'none';
    });
});

// Adjust particles opacity on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const opacity = Math.max(0.3, 1 - (scrolled / maxScroll));
    document.getElementById('particles-js').style.opacity = opacity;
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

