function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.main-header');
    
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    header.classList.toggle('sidebar-active');
}

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.main-header');
    
    if (!sidebar.contains(e.target) && 
        !hamburgerMenu.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        header.classList.remove('sidebar-active');
    }
}); 