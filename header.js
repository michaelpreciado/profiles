function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.main-header');
    const body = document.body;
    
    // Add transition class before toggling for smooth animation
    sidebar.classList.add('sidebar-transition');
    hamburger.classList.add('hamburger-transition');
    
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    header.classList.toggle('sidebar-active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('active')) {
        body.style.overflow = 'hidden';
        // Add touch event handling for mobile
        sidebar.addEventListener('touchstart', handleTouchStart, false);
        sidebar.addEventListener('touchmove', handleTouchMove, false);
    } else {
        body.style.overflow = '';
        // Remove touch events when sidebar is closed
        sidebar.removeEventListener('touchstart', handleTouchStart);
        sidebar.removeEventListener('touchmove', handleTouchMove);
    }
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    if (!sidebar.contains(e.target) && 
        !hamburgerMenu.contains(e.target) && 
        sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// Handle escape key to close sidebar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    }
});

// Smooth scroll to top for back-to-home button
document.querySelector('.back-to-home')?.addEventListener('click', (e) => {
    if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}); 