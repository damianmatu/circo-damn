document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaPortafolio = document.getElementById('pantalla-portafolio');
    const pantallaRepositorio = document.getElementById('pantalla-repositorio');
    const pantallaTexto = document.getElementById('pantalla-texto');
    const pantallaExperimentos = document.getElementById('pantalla-experimentos');
    const pantallaExperimento2 = document.getElementById('pantalla-experimento2');
    const pantallaNetflix = document.getElementById('pantalla-netflix');
    const pantallaVinadelmar = document.getElementById('pantalla-vinadelmar');
    const pantallaContacto = document.getElementById('pantalla-contacto');
    const pantallaJuegosPendientes = document.getElementById('pantalla-juegos-pendientes');
    
    const tarjetaMenu = pantallaPortafolio.querySelector('.contenedor-tarjeta');
    const tarjetaRepo = pantallaRepositorio.querySelector('.contenedor-tarjeta');
    const tarjetaTexto = pantallaTexto.querySelector('.contenedor-tarjeta');
    const tarjetaExperimentos = pantallaExperimentos.querySelector('.contenedor-tarjeta');
    const tarjetaExperimento2 = pantallaExperimento2.querySelector('.contenedor-tarjeta');
    const tarjetaNetflix = pantallaNetflix.querySelector('.contenedor-tarjeta');
    const tarjetaVinadelmar = pantallaVinadelmar.querySelector('.contenedor-tarjeta');
    const tarjetaContacto = pantallaContacto.querySelector('.contenedor-tarjeta');
    const tarjetaJuegosPendientes = pantallaJuegosPendientes.querySelector('.contenedor-tarjeta');

    const linkSobreMi = document.getElementById('link-sobre-mi');
    const linkEdiciones = document.getElementById('link-ediciones');
    const linkExperimentos = document.getElementById('link-experimentos');
    const linkIrExperimento2 = document.getElementById('link-ir-experimento2');
    const linkContacto = document.getElementById('link-contacto');
    
    const botonesVolver = document.querySelectorAll('.btn-volver-menu');
    const botonesJuegosPendientes = document.querySelectorAll('#btn-juegos-pendientes');
    const btnVolverExperimentos = document.getElementById('btn-volver-experimentos');
    
    const btnRedirNetflix = document.getElementById('btn-redir-netflix');
    const btnRedirVinadelmar = document.getElementById('btn-redir-vinadelmar');
    const btnVolverNetflix = document.getElementById('btn-volver-netflix');
    const btnVolverVinadelmar = document.getElementById('btn-volver-vinadelmar');
    
    const cartasExperimento = document.querySelectorAll('.carta-experimento');
    const btnSiguiente = document.getElementById('btn-carta-siguiente');
    const btnAnteriorReal = document.getElementById('btn-carta-anterior');
    let indiceCartaActual = 0;

    const musicaFondo = document.getElementById('musica-fondo');

    // 1. Entrada inicial: control optimizado para el botón de la vela
    if (btnEntrar && pantallaInicio) {
        btnEntrar.addEventListener('click', () => {
            if (musicaFondo) {
                musicaFondo.volume = 0.6; 
                musicaFondo.play().then(() => {
                    console.log("La música está sonando correctamente.");
                }).catch(error => {
                    console.warn("El navegador bloqueó el audio o no se encontró: ", error);
                });
            }

            pantallaInicio.classList.add('desvanecer');
            setTimeout(() => {
                pantallaInicio.style.display = 'none';
                if (pantallaPortafolio) {
                    pantallaPortafolio.style.display = 'flex';
                }
            }, 800);
        });
    }

    // Función auxiliar para realizar el giro de carta hacia cualquier pantalla destino
    function cambiarPantalla(pantallaActualTarjeta, pantallaActualSeccion, pantallaDestinoSeccion, pantallaDestinoTarjeta) {
        if (pantallaActualTarjeta) {
            pantallaActualTarjeta.classList.add('girar-carta');
        }

        setTimeout(() => {
            pantallaActualSeccion.style.display = 'none';
            if (pantallaActualTarjeta) {
                pantallaActualTarjeta.classList.remove('girar-carta');
            }
            
            pantallaDestinoSeccion.style.display = 'flex';
            if (pantallaDestinoTarjeta) {
                pantallaDestinoTarjeta.classList.add('girar-carta');
                setTimeout(() => {
                    pantallaDestinoTarjeta.classList.remove('girar-carta');
                }, 50);
            }
        }, 400);
    }

    // 2. Transiciones del Menú a cada sección
    if (linkSobreMi) {
        linkSobreMi.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaTexto, tarjetaTexto);
        });
    }

    if (linkEdiciones) {
        linkEdiciones.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaRepositorio, tarjetaRepo);
        });
    }

    if (linkExperimentos) {
        linkExperimentos.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaExperimentos, tarjetaExperimentos);
        });
    }

    if (linkContacto) {
        linkContacto.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaContacto, tarjetaContacto);
        });
    }

    if (linkIrExperimento2) {
        linkIrExperimento2.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaExperimentos, pantallaExperimentos, pantallaExperimento2, tarjetaExperimento2);
        });
    }

    if (btnVolverExperimentos) {
        btnVolverExperimentos.addEventListener('click', () => {
            cambiarPantalla(tarjetaExperimento2, pantallaExperimento2, pantallaExperimentos, tarjetaExperimentos);
        });
    }

    // Redirecciones a las pantallas de Netflix y Viña del Mar
    if (btnRedirNetflix) {
        btnRedirNetflix.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaExperimento2, pantallaExperimento2, pantallaNetflix, tarjetaNetflix);
        });
    }

    if (btnRedirVinadelmar) {
        btnRedirVinadelmar.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarPantalla(tarjetaExperimento2, pantallaExperimento2, pantallaVinadelmar, tarjetaVinadelmar);
        });
    }

    // Botones de retorno desde Netflix y Viña del Mar hacia el Experimento II
    if (btnVolverNetflix) {
        btnVolverNetflix.addEventListener('click', () => {
            cambiarPantalla(tarjetaNetflix, pantallaNetflix, pantallaExperimento2, tarjetaExperimento2);
        });
    }

    if (btnVolverVinadelmar) {
        btnVolverVinadelmar.addEventListener('click', () => {
            cambiarPantalla(tarjetaVinadelmar, pantallaVinadelmar, pantallaExperimento2, tarjetaExperimento2);
        });
    }

    // 3. Lógica para cambiar entre las cartas de la baraja (Experimentos)
    function mostrarCarta(indice) {
        cartasExperimento.forEach((carta, idx) => {
            if (idx === indice) {
                carta.classList.add('activa');
            } else {
                carta.classList.remove('activa');
            }
        });
    }

    if (btnSiguiente && btnAnteriorReal) {
        btnSiguiente.addEventListener('click', () => {
            indiceCartaActual = (indiceCartaActual + 1) % cartasExperimento.length;
            mostrarCarta(indiceCartaActual);
        });

        btnAnteriorReal.addEventListener('click', () => {
            indiceCartaActual = (indiceCartaActual - 1 + cartasExperimento.length) % cartasExperimento.length;
            mostrarCarta(indiceCartaActual);
        });
    }

    // 4. Volver al menú desde cualquier pantalla usando la primera miniatura o botón de retorno
    botonesVolver.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const seccionOrigen = e.target.closest('.pantalla-portafolio');
            const tarjetaOrigen = seccionOrigen ? seccionOrigen.querySelector('.contenedor-tarjeta') : null;
            
            if (tarjetaOrigen) {
                cambiarPantalla(tarjetaOrigen, seccionOrigen, pantallaPortafolio, tarjetaMenu);
            }
        });
    });

    // 5. Redirección desde la segunda miniatura hacia la pantalla de "Juegos pendientes"
    botonesJuegosPendientes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const seccionOrigen = e.target.closest('.pantalla-portafolio');
            const tarjetaOrigen = seccionOrigen ? seccionOrigen.querySelector('.contenedor-tarjeta') : null;
            
            if (seccionOrigen !== pantallaJuegosPendientes && tarjetaOrigen) {
                cambiarPantalla(tarjetaOrigen, seccionOrigen, pantallaJuegosPendientes, tarjetaJuegosPendientes);
            }
        });
    });

    // 6. Detección automática si se regresa al menú desde el ejercicio externo (indexejercicio3.html)
    if (window.location.hash === '#menu') {
        if (pantallaInicio) pantallaInicio.style.display = 'none';
        if (pantallaPortafolio) pantallaPortafolio.style.display = 'flex';
    }

    // 7. Detección automática si se regresa desde la reconstrucción de Netflix (#netflix)
    if (window.location.hash === '#netflix') {
        if (pantallaInicio) pantallaInicio.style.display = 'none';
        if (pantallaPortafolio) pantallaPortafolio.style.display = 'none';
        if (pantallaNetflix) pantallaNetflix.style.display = 'flex';
    }

    // 8. Detección automática si se regresa desde la reconstrucción de Viña del Mar (#vinadelmar)
    if (window.location.hash === '#vinadelmar') {
        if (pantallaInicio) pantallaInicio.style.display = 'none';
        if (pantallaPortafolio) pantallaPortafolio.style.display = 'none';
        if (pantallaVinadelmar) pantallaVinadelmar.style.display = 'flex';
    }
});