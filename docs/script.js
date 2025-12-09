document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================================
    // 1. LÓGICA DE ANIMACIÓN DE INTRODUCCIÓN Y CHISPAS
    // ===============================================
    
    const intro = document.getElementById('intro-animation');
    const durationFadeOut = 1000; // Duración para el inicio del fade-out
    
    const NUM_SPARKLES = 50; 
    const introContainer = document.getElementById('intro-animation'); 

    // Crea las chispas (sparkles) para la animación de inicio
    if (introContainer) {
        for (let i = 0; i < NUM_SPARKLES; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            // Posiciona las chispas de forma aleatoria en la pantalla
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            
            // Asigna duraciones y retrasos aleatorios para el efecto 'flicker'
            const duration = Math.random() * 3 + 1; 
            const delay = Math.random() * 4; 

            sparkle.style.animationDuration = duration + 's';
            sparkle.style.animationDelay = delay + 's';

            introContainer.appendChild(sparkle); 
        }
    }
    
    // Aplica el efecto fade-out a la pantalla de introducción y luego la oculta
    if (intro) {
        // Añade la clase 'fade-out' después de 1 segundo (durationFadeOut)
        setTimeout(function() {
            intro.classList.add('fade-out');
            // Oculta el elemento completamente después de que termine la transición (1000ms en el CSS)
            setTimeout(function() {
                intro.style.display = 'none';
            }, 1000); 
        }, durationFadeOut);
    }
    
    
    // ===============================================
    // 2. LÓGICA DE CARGA Y RENDERIZADO DE LA LÍNEA DE TIEMPO
    // ===============================================
    
    const timelineContainer = document.querySelector('.timeline');
    
    
    async function cargarPeliculas() {
        // *** RUTA CORREGIDA ***
        const CSV_FILE_NAME = "Base_marvel_starwars.csv";
        
        try {
            
            // Intenta cargar los datos del CSV. Se asume que get_tabular_data está disponible.
            const peliculasData = await get_tabular_data({"file_name": CSV_FILE_NAME, "delimiter": ";"});
            
            
            if (!timelineContainer) return;
            
            // Limpiamos el contenedor antes de añadir los elementos
            timelineContainer.innerHTML = '';
            
            const peliculas = peliculasData.data;

            
            // Ordenamos las películas por el año (columna 'AÑO') de forma ascendente
            peliculas.sort((a, b) => parseInt(a['AÑO']) - parseInt(b['AÑO']));

            peliculas.forEach(pelicula => {
                const titulo = pelicula['TÍTULO'];
                const tipo = pelicula['CONTENIDO']; // Original, Secuela, Spin-Off, etc.
                const anio = pelicula['AÑO'];
                const tipo_contenido = pelicula['TIPO']; // Animada, Imagen real, Documental, etc.
                
                // Creamos el elemento de la línea de tiempo (<li>)
                const eventLi = document.createElement('li');
                eventLi.classList.add('timeline-event');
                
                // Generamos el HTML del evento, incluyendo la estructura para el clic
                eventLi.innerHTML = `
                    <div class="timeline-date">${anio}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-summary">${titulo} (Clic para detalles)</h3>
                        <div class="timeline-details hidden">
                            <p><strong>Clasificación:</strong> ${tipo} (${tipo_contenido})</p>
                        </div>
                    </div>
                `;
                
                // Añadimos el evento al contenedor de la línea de tiempo
                timelineContainer.appendChild(eventLi);
            });

            // Una vez cargados todos los elementos, adjuntamos la función de clic
            adjuntarInteractividadClic();

        } catch (error) {
            console.error("Error al cargar la base de datos de películas:", error);
            // Muestra un mensaje de error visible al usuario si falla la carga
            if (timelineContainer) {
                timelineContainer.innerHTML = '<p style="color:red; text-align:center;">Error al cargar la base de datos. Asegúrate de que el archivo CSV sea accesible.</p>';
            }
        }
    }

    // ===============================================
    // 3. FUNCIÓN DE INTERACTIVIDAD DE CLIC
    // ===============================================

    // Función que adjunta el evento de clic a todos los títulos de los eventos
    function adjuntarInteractividadClic() {
        const summaries = document.querySelectorAll('.timeline-summary');

        summaries.forEach(summary => {
            summary.addEventListener('click', () => {
                // Seleccionamos el div de detalles que está justo después del título
                const details = summary.nextElementSibling;
                // Alternamos la clase 'hidden' para mostrar/ocultar los detalles
                details.classList.toggle('hidden');

                // Actualizamos el texto del resumen para indicar la acción (mostrar/ocultar)
                const currentText = summary.textContent;
                if (details.classList.contains('hidden')) {
                    // Si se oculta
                    summary.textContent = currentText.replace('(Ocultar)', '(Clic para detalles)');
                } else {
                    // Si se muestra
                    summary.textContent = currentText.replace('(Clic para detalles)', '(Ocultar)');
                }
            });
        });
    }

    // Inicia el proceso de carga de datos y creación de la línea de tiempo
    cargarPeliculas();

});