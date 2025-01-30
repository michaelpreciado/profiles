function initTypeEffect() {
  new TypeIt('.type-effect', {
    strings: 'Your text here',
    speed: 50,
    lifeLike: true,
    afterComplete: function () {
      // Mobile position correction
      if (window.innerWidth <= 768) {
        const element = document.querySelector('.type-effect');
        element?.classList.add('mobile-complete');
      }
    }
  });
}

// Add resize observer for dynamic adjustments
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (entry.contentRect.width <= 768) {
      // Add mobile-specific positioning logic
    }
  });
});

resizeObserver.observe(document.body); 