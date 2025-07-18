// Navbar.js
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});

function loadNavbar() {
    fetch('./Base/Navbar/Navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            bindNavbarEvents();
            showHome();
        })
        .catch(error => {
            console.error('Failed to load navbar.html:', error);
        });
}

function bindNavbarEvents() {
    document.querySelectorAll('.second-bar-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.getAttribute('data-target');
            document.querySelectorAll('.page-content').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(target).style.display = 'block';
        });
    });
}

function showHome() {
    document.querySelectorAll('.page-content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('home').style.display = 'block';
}