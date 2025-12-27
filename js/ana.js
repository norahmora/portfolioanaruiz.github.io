/* =========================================
   LÓGICA DEL MENÚ DESPLEGABLE (GLOBAL)
   ========================================= */
const abrirMenu = document.getElementById('btnAbrirMenu');
const cerrarMenu = document.getElementById('btnCerrarMenu');
const navOverlay = document.getElementById('navOverlay');
const menuTrigger = document.querySelector('.menu-trigger');
const btnHome = document.querySelector('.fixed-home-btn'); 

if(abrirMenu) {
    abrirMenu.addEventListener('click', () => {
        navOverlay.classList.add('activo');
        if(menuTrigger) menuTrigger.classList.add('oculto');
        if(btnHome) btnHome.classList.add('oculto'); 
    });
}
if(cerrarMenu) {
    cerrarMenu.addEventListener('click', () => {
        navOverlay.classList.remove('activo');
        if(menuTrigger) menuTrigger.classList.remove('oculto');
        if(btnHome) btnHome.classList.remove('oculto'); 
    });
}
const enlacesMenu = document.querySelectorAll('.menu-links-body a');
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        navOverlay.classList.remove('activo');
        if(menuTrigger) menuTrigger.classList.remove('oculto');
        if(btnHome) btnHome.classList.remove('oculto');
    });
});

/* =========================================
   LÓGICA 1: SCROLLYTELLING (GOTAS ESTÁTICAS)
   ========================================= */
const gruposIconos = document.querySelectorAll('.grupo-icono');
// Seleccionamos las 4 gotas individuales
const blob0 = document.getElementById('blob0');
const blob1 = document.getElementById('blob1');
const blob2 = document.getElementById('blob2');
const blob3 = document.getElementById('blob3');
const blobs = [blob0, blob1, blob2, blob3];

if (gruposIconos.length > 0 && blob0) {
    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        const porcentajeScroll = window.scrollY / maxScroll;

        // 1. Limpieza: Apagamos todos los iconos y gotas
        gruposIconos.forEach(i => i.classList.remove('activo-scroll'));
        blobs.forEach(b => b.classList.remove('activo'));

        // 2. Lógica de activación
        
        // < 5%: Todo apagado
        if (porcentajeScroll < 0.05) return; 
        
        // 05% - 25%: Arriba Izquierda
        else if (porcentajeScroll >= 0.05 && porcentajeScroll < 0.25) {
            gruposIconos[0].classList.add('activo-scroll');
            blob0.classList.add('activo');
        } 
        
        // 25% - 50%: Arriba Derecha
        else if (porcentajeScroll >= 0.25 && porcentajeScroll < 0.50) {
            gruposIconos[1].classList.add('activo-scroll');
            blob1.classList.add('activo');
        } 
        
        // 50% - 75%: Abajo Izquierda
        else if (porcentajeScroll >= 0.50 && porcentajeScroll < 0.75) {
            gruposIconos[2].classList.add('activo-scroll');
            blob2.classList.add('activo');
        } 
        
        // +75%: Abajo Derecha
        else if (porcentajeScroll >= 0.75) {
            gruposIconos[3].classList.add('activo-scroll');
            blob3.classList.add('activo');
        }
    });
    
    window.dispatchEvent(new Event('scroll'));
}

/* =========================================
   LÓGICA 2: ZOOM Y CAPAS (SOLO PLANES DE IGUALDAD)
   ========================================= */
const textoZoom = document.getElementById('textoZoom');
const capaPortada = document.getElementById('capaPortada'); 
const capaOferta = document.getElementById('capaOferta');   
const capaFases = document.getElementById('capaFases');     

if (textoZoom && capaPortada && capaOferta && capaFases) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const maxScroll = document.body.scrollHeight - windowHeight;

        if (maxScroll <= 0) return;

        // FASE 1: PORTADA
        const zoomLimit = windowHeight * 0.5;
        let scale = 1;
        if (scrollY < zoomLimit) scale = 1 + (scrollY / windowHeight) * 60;
        else scale = 60;
        textoZoom.style.transform = `scale(${Math.max(1, scale)})`;

        let opacityPortada = 1;
        const startFade1 = windowHeight * 0.1;
        const endFade1 = windowHeight * 0.5;
        if (scrollY > startFade1) opacityPortada = 1 - (scrollY - startFade1) / (endFade1 - startFade1);
        opacityPortada = Math.max(0, Math.min(1, opacityPortada));
        capaPortada.style.opacity = opacityPortada;
        if (opacityPortada < 0.05) capaPortada.style.pointerEvents = 'none';
        else capaPortada.style.pointerEvents = 'auto';

        // FASE 2: QUÉ OFREZCO
        let opacityOferta = 1;
        const startFade2 = maxScroll * 0.25; 
        const endFade2 = maxScroll * 0.45;
        if (scrollY > startFade2) opacityOferta = 1 - (scrollY - startFade2) / (endFade2 - startFade2);
        opacityOferta = Math.max(0, Math.min(1, opacityOferta));
        capaOferta.style.opacity = opacityOferta;
        if (opacityOferta < 0.05) capaOferta.style.pointerEvents = 'none';
        else capaOferta.style.pointerEvents = 'auto';

        // FASE 3: LAS 5 FASES
        let opacityFases = 1;
        const startFade3 = maxScroll * 0.60; 
        const endFade3 = maxScroll * 0.80;   
        if (scrollY > startFade3) opacityFases = 1 - (scrollY - startFade3) / (endFade3 - startFade3);
        opacityFases = Math.max(0, Math.min(1, opacityFases));
        capaFases.style.opacity = opacityFases;
        if (opacityFases < 0.05) capaFases.style.pointerEvents = 'none';
        else capaFases.style.pointerEvents = 'auto';
    });
    
    window.dispatchEvent(new Event('scroll'));
}