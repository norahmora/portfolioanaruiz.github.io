document.addEventListener('DOMContentLoaded', () => {
    
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
       LÓGICA 1: SCROLLYTELLING CON DISTORSIÓN PRO
       ========================================= */
    const gruposIconos = document.querySelectorAll('.grupo-icono');
    const anilloElastico = document.getElementById('anilloElastico'); 

    if (gruposIconos.length > 0 && anilloElastico) {
        console.log("Sistema de scroll iniciado correctamente.");
        
        window.addEventListener('scroll', () => {
            // Usamos documentElement para mayor compatibilidad
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            const maxScroll = scrollHeight - clientHeight;
            
            if (maxScroll <= 0) return;
            
            const porcentajeScroll = scrollTop / maxScroll;

            // 1. Limpieza inicial
            gruposIconos.forEach(icono => icono.classList.remove('activo-scroll'));
            anilloElastico.classList.remove('distorsion-0', 'distorsion-1', 'distorsion-2', 'distorsion-3');

            // 2. Lógica de activación
            if (porcentajeScroll < 0.05) {
                 return; 
            } 
            
            // 0. Arriba Izquierda
            else if (porcentajeScroll >= 0.05 && porcentajeScroll < 0.25) {
                gruposIconos[0].classList.add('activo-scroll');
                anilloElastico.classList.add('distorsion-0');
            } 
            // 1. Arriba Derecha
            else if (porcentajeScroll >= 0.25 && porcentajeScroll < 0.50) {
                gruposIconos[1].classList.add('activo-scroll');
                anilloElastico.classList.add('distorsion-1');
            } 
            // 2. Abajo Izquierda
            else if (porcentajeScroll >= 0.50 && porcentajeScroll < 0.75) {
                gruposIconos[2].classList.add('activo-scroll');
                anilloElastico.classList.add('distorsion-2');
            } 
            // 3. Abajo Derecha
            else if (porcentajeScroll >= 0.75) {
                gruposIconos[3].classList.add('activo-scroll');
                anilloElastico.classList.add('distorsion-3');
            }
        });
        
        // Disparar evento al cargar
        window.dispatchEvent(new Event('scroll'));
    } else {
        console.error("No se encontraron los elementos del anillo o iconos.");
    }

    /* =========================================
       LÓGICA 2: ZOOM Y CAPAS (SOLO PLANES DE IGUALDAD)
       ========================================= */
    const textoZoom = document.getElementById('textoZoom');
    if (textoZoom) {
        const capaPortada = document.getElementById('capaPortada'); 
        const capaOferta = document.getElementById('capaOferta');   
        const capaFases = document.getElementById('capaFases');     

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const maxScroll = document.body.scrollHeight - windowHeight;

            if (maxScroll <= 0) return;

            // FASE 1
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

            // FASE 2
            let opacityOferta = 1;
            const startFade2 = maxScroll * 0.25; 
            const endFade2 = maxScroll * 0.45;
            if (scrollY > startFade2) opacityOferta = 1 - (scrollY - startFade2) / (endFade2 - startFade2);
            opacityOferta = Math.max(0, Math.min(1, opacityOferta));
            capaOferta.style.opacity = opacityOferta;
            if (opacityOferta < 0.05) capaOferta.style.pointerEvents = 'none';
            else capaOferta.style.pointerEvents = 'auto';

            // FASE 3
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
});