// JavaScript Document
const abrirMenu = document.getElementById('btnAbrirMenu');
const cerrarMenu = document.getElementById('btnCerrarMenu');
const navOverlay = document.getElementById('navOverlay');
const menuTrigger = document.querySelector('.menu-trigger');

abrirMenu.addEventListener('click', () => {
    navOverlay.classList.add('activo');
    menuTrigger.classList.add('oculto');
});

cerrarMenu.addEventListener('click', () => {
    navOverlay.classList.remove('activo');
    menuTrigger.classList.remove('oculto');
});

const enlacesMenu = document.querySelectorAll('.menu-links-body a');
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        navOverlay.classList.remove('activo');
        menuTrigger.classList.remove('oculto');
    });
});