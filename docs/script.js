// ===============================================
// FUNCIÓN PARA CARGAR Y ANALIZAR EL CSV
// ===============================================

async function loadCSVData(filePath, delimiter) {
    const response = await fetch(filePath);
    
    // Si la respuesta no es exitosa (ej. 404 Not Found), lanzamos un error
    if (!response.ok) {
        throw new Error(`Error al obtener el archivo: ${filePath} (Estado: ${response.status})`);
    }
    
    const text = await response.text();
    
    // Simple parser manual para CSV con punto y coma
    // Utilizamos una expresión regular para manejar saltos de línea tanto \r\n como \n
    const rows = text.trim().split(/\r\n|\n/);
    if (rows.length === 0) return { data: [] };

    // La primera fila son los encabezados
    const headers = rows[0].split(delimiter).map(header => header.trim());
    const data = [];
    
    // Procesar el resto de las filas
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(delimiter);
        
        // Ignoramos filas incompletas o vacías
        if (values.length !== headers.length) {
            continue;
        }
        
        const rowObject = {};
        headers.forEach((header, index) => {
            // Guardamos el valor en el objeto, usando el encabezado como clave
            rowObject[header] = values[index].trim();
        });
        data.push(rowObject);
    }
    
    // Retornamos los datos en el formato que espera el resto de tu código
    return { data: data }; 
}


// ===============================================
// CÓDIGO PRINCIPAL DEL PROYECTO
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de la Animación de Introducción y Chispas ---
    const intro = document.getElementById('intro-animation');
    const durationFadeOut = 1000; 
    
    const NUM_SPARKLES = 50; 
    const introContainer = document.getElementById('intro-animation'); 

    if (introContainer) {
        for (let i = 0; i < NUM_SPARKLES; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            
            const duration = Math.random() * 3 + 1; 
            const delay = Math.random() * 4; 

            sparkle.style.animationDuration = duration + 's';
            sparkle.style.animationDelay = delay + 's';

            introContainer.appendChild(sparkle); 
        }
    }
    
    if (intro) {
        setTimeout(function() {
            intro.classList.add('fade-out');
            setTimeout(function() {
                intro.style.display = 'none';
            }, 1000); 
        }, durationFadeOut);
    }
    
    
    
    const timelineContainer = document.querySelector('.timeline');
    
    
    async function cargarPeliculas() {
        // *** CORRECCIÓN CRÍTICA: Nombre del archivo CSV con ESPACIO ***
        const CSV_FILE_NAME = "Base_marvel_starwars.csv"; 
        // -----------------------------------------------------------------
        
        try {
            
            // Usamos la función loadCSVData para leer el archivo CSV
            const peliculasData = await loadCSVData(CSV_FILE_NAME, ";");
            
            
            if (!timelineContainer) return;
            
            timelineContainer.innerHTML = '';
            
            const peliculas = peliculasData.data;

            
            // Aseguramos que 'AÑO' sea tratado como número para ordenar
            peliculas.sort((a, b) => parseInt(a['AÑO']) - parseInt(b['AÑO']));

            peliculas.forEach(pelicula => {
                const titulo = pelicula['TÍTULO'];
                const tipo = pelicula['CONTENIDO']; 
                const anio = pelicula['AÑO'];
                const tipo_contenido = pelicula['TIPO']; 
                
                // Creamos el elemento de la línea de tiempo
                const eventLi = document.createElement('li');
                eventLi.classList.add('timeline-event');
                
                // Creamos el contenido
                eventLi.innerHTML = `
                    <div class="timeline-date">${anio}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-summary">${titulo} (Clic para detalles)</h3>
                        <div class="timeline-details hidden">
                            <p><strong>Clasificación:</strong> ${tipo} (${tipo_contenido})</p>
                        </div>
                    </div>
                `;
                
                // Añadimos el evento al contenedor
                timelineContainer.appendChild(eventLi);
            });

            // Una vez cargados los elementos, adjuntamos la interactividad (clic)
            adjuntarInteractividadClic();

        } catch (error) {
            console.error("Error al cargar la base de datos de películas:", error);
            // Mostrar un mensaje de error más específico
            if (timelineContainer) {
                timelineContainer.innerHTML = `<p style="color:red; text-align:center;">Error al cargar la base de datos: ${error.message}. Asegúrate de que el archivo CSV esté en la misma carpeta.</p>`;
            }
        }
    }

    // Función que adjunta la interactividad a los elementos recién creados
    function adjuntarInteractividadClic() {
        const summaries = document.querySelectorAll('.timeline-summary');

        summaries.forEach(summary => {
            summary.addEventListener('click', () => {
                const details = summary.nextElementSibling;
                details.classList.toggle('hidden');

                const currentText = summary.textContent;
                if (details.classList.contains('hidden')) {
                    summary.textContent = currentText.replace('(Ocultar)', '(Clic para detalles)');
                } else {
                    summary.textContent = currentText.replace('(Clic para detalles)', '(Ocultar)');
                }
            });
        });
    }

    // Llama a la función principal para iniciar la carga de datos
    cargarPeliculas();

});