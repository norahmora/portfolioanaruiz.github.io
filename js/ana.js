/* =========================================
   LÓGICA DEL MENÚ DESPLEGABLE
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
   LÓGICA 1: SCROLLYTELLING (SOLO HOMEPAGE)
   ========================================= */
const gruposIconos = document.querySelectorAll('.grupo-icono');
if (gruposIconos.length > 0) {
    window.addEventListener('scroll', () => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll === 0) return;
        const porcentajeScroll = window.scrollY / maxScroll;

        gruposIconos.forEach(icono => { icono.classList.remove('activo-scroll'); });

        if (porcentajeScroll < 0.25) gruposIconos[0].classList.add('activo-scroll');
        else if (porcentajeScroll >= 0.25 && porcentajeScroll < 0.50) gruposIconos[1].classList.add('activo-scroll');
        else if (porcentajeScroll >= 0.50 && porcentajeScroll < 0.75) gruposIconos[2].classList.add('activo-scroll');
        else gruposIconos[3].classList.add('activo-scroll');
    });
    window.dispatchEvent(new Event('scroll'));
}

/* =========================================
   LÓGICA 2: ZOOM PORTADA (SOLO PLANES DE IGUALDAD)
   ========================================= */
const textoZoom = document.getElementById('textoZoom');
const capaPortada = document.getElementById('capaPortada'); 

if (textoZoom && capaPortada) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Ajustamos la sensibilidad:
        // Trigger height es el total de scroll disponible.
        // Restamos una pantalla para que el cálculo sea preciso.
        const triggerHeight = (windowHeight * 3) - windowHeight; // Basado en 300vh del CSS

        // 1. ZOOM:
        // Hacemos que el zoom empiece suave y acelere
        const scale = 1 + (scrollY / windowHeight) * 50;
        
        // Aplicamos el scale asegurando que no baje de 1
        textoZoom.style.transform = `scale(${Math.max(1, scale)})`;

        // 2. OPACIDAD:
        // Queremos que la capa superior (Negra) se desvanezca poco a poco.
        // Empezamos a desvanecer al 10% del scroll para dar tiempo a ver el zoom inicial
        const startFade = windowHeight * 0.1;
        
        let opacity = 1;
        
        if (scrollY > startFade) {
            // Calculamos opacidad de 1 a 0
            opacity = 1 - (scrollY - startFade) / (triggerHeight * 0.7);
        }
        
        // Clamp (limites) entre 0 y 1 para evitar errores
        opacity = Math.max(0, Math.min(1, opacity));
        
        capaPortada.style.opacity = opacity;

        // 3. INTERACCIÓN (Pointer Events en lugar de Visibility)
        // Si la capa es casi invisible (< 5%), desactivamos sus clics para poder tocar lo de abajo.
        // Si subimos y vuelve a ser visible (> 5%), reactivamos los clics.
        if (opacity < 0.05) {
            capaPortada.style.pointerEvents = 'none';
        } else {
            capaPortada.style.pointerEvents = 'auto';
        }
    });
}