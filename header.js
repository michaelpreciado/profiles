function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.main-header');
    const body = document.body;
    
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    header.classList.toggle('sidebar-active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
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