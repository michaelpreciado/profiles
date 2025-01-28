function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    // Toggle with animation
    sidebar.classList.toggle('active');
    body.classList.toggle('sidebar-open');
    
    // Add smooth transitions
    sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
    document.querySelector('.hamburger-menu').style.transition = 'opacity 0.3s ease';
}

// Proper event delegation
document.addEventListener('click', (e) => {
    if (e.target.closest('.hamburger-menu, .back-to-home')) {
        toggleSidebar();
    }
});

// Mobile touch support
document.addEventListener('touchstart', (e) => {
    const btn = e.target.closest('.hamburger-menu, .back-to-home');
    if (btn) {
        e.preventDefault();
        toggleSidebar();
    }
}, { passive: false });

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

// Update event listeners to separate home button and menu
document.querySelectorAll('.hamburger-menu').forEach(button => {
    button.addEventListener('click', toggleSidebar);
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleSidebar();
    }, { passive: false });
});

// Let the back-to-home link work normally
document.querySelectorAll('.back-to-home').forEach(link => {
    link.addEventListener('touchstart', (e) => {
        // Allow default link behavior
    }, { passive: true });
}); 