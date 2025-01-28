const particleDensity = window.innerWidth < 768 ? 30 : 80;

particlesJS("particles-js", {
  particles: {
    number: {
      value: window.innerWidth < 768 ? 30 : 60,
      density: {
        enable: true,
        value_area: window.innerWidth < 768 ? 800 : 1200
      }
    },
    color: {
      value: "#00FFFF"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00FFFF",
      opacity: 0.4,
      width: 1.2
    },
    move: {
      speed: window.innerWidth < 768 ? 0 : 1.2,
      enable: !window.matchMedia("(max-width: 768px)").matches
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
}); 