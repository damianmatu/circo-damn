document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaPortafolio = document.getElementById('pantalla-portafolio');
    const pantallaRepositorio = document.getElementById('pantalla-repositorio');
    const pantallaTexto = document.getElementById('pantalla-texto');
    const pantallaExperimentos = document.getElementById('pantalla-experimentos');
    const pantallaContacto = document.getElementById('pantalla-contacto');
    const pantallaJuegosPendientes = document.getElementById('pantalla-juegos-pendientes');
    const pantallaEjercicio = document.getElementById('pantalla-ejercicio');
    
    const tarjetaMenu = pantallaPortafolio.querySelector('.contenedor-tarjeta');
    const tarjetaRepo = pantallaRepositorio.querySelector('.contenedor-tarjeta');
    const tarjetaTexto = pantallaTexto.querySelector('.contenedor-tarjeta');
    const tarjetaExperimentos = pantallaExperimentos.querySelector('.contenedor-tarjeta');
    const tarjetaContacto = pantallaContacto.querySelector('.contenedor-tarjeta');
    const tarjetaJuegosPendientes = pantallaJuegosPendientes.querySelector('.contenedor-tarjeta');

    const linkSobreMi = document.getElementById('link-sobre-mi');
    const linkEdiciones = document.getElementById('link-ediciones');
    const linkExperimentos = document.getElementById('link-experimentos');
    const linkContacto = document.getElementById('link-contacto');
    const linkIrEjercicio = document.getElementById('link-ir-ejercicio');
    
    const botonesVolver = document.querySelectorAll('.btn-volver-menu');
    const botonesJuegosPendientes = document.querySelectorAll('#btn-juegos-pendientes');
    
    // Control de la baraja en experimentos
    const cartasExperimento = document.querySelectorAll('.carta-experimento');
    const btnSiguiente = document.getElementById('btn-carta-siguiente');
    const btnAnteriorReal = document.getElementById('btn-carta-anterior');
    let indiceCartaActual = 0;

    // Referencia al elemento de audio de fondo
    const musicaFondo = document.getElementById('musica-fondo');

    // 1. Entrada inicial: de la portada al menú + Reproducción de la música
    btnEntrar.addEventListener('click', () => {
        // [LÍNEA DE PRUEBA DE VOLUMEN]: Ajusta el volumen (0.0 a 1.0)
        musicaFondo.volume = 0.6; 

        musicaFondo.play().then(() => {
            console.log("La música está sonando correctamente.");
        }).catch(error => {
            console.warn("El navegador bloqueó o no encontró el archivo de audio: ", error);
        });

        pantallaInicio.classList.add('desvanecer');
        setTimeout(() => {
            pantallaInicio.style.display = 'none';
            pantallaPortafolio.style.display = 'flex';
        }, 1000);
    });

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
    linkSobreMi.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaTexto, tarjetaTexto);
    });

    linkEdiciones.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaRepositorio, tarjetaRepo);
    });

    linkExperimentos.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaExperimentos, tarjetaExperimentos);
    });

    linkContacto.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla(tarjetaMenu, pantallaPortafolio, pantallaContacto, tarjetaContacto);
    });

    // Enlace desde el Experimento I hacia el ejercicio aislado
    if (linkIrEjercicio) {
        linkIrEjercicio.addEventListener('click', (e) => {
            e.preventDefault();
            pantallaExperimentos.style.display = 'none';
            pantallaEjercicio.style.display = 'flex';
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
            
            if (seccionOrigen === pantallaEjercicio) {
                pantallaEjercicio.style.display = 'none';
                pantallaPortafolio.style.display = 'flex';
            } else if (tarjetaOrigen) {
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
            
            if (seccionOrigen !== pantallaJuegosPendientes) {
                if (seccionOrigen === pantallaEjercicio) {
                    pantallaEjercicio.style.display = 'none';
                    pantallaJuegosPendientes.style.display = 'flex';
                } else if (tarjetaOrigen) {
                    cambiarPantalla(tarjetaOrigen, seccionOrigen, pantallaJuegosPendientes, tarjetaJuegosPendientes);
                }
            }
        });
    });
});