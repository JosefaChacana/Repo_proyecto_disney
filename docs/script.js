// =======================================================
// FUNCIONES DE UTILIDAD (loadCSVData)
// =======================================================

/**
 * Carga y parsea un archivo CSV de manera asíncrona.
 * @param {string} filePath - La ruta del archivo CSV.
 * @param {string} delimiter - El delimitador de las columnas (ej: ";").
 * @returns {Promise<{data: Array<Object>}>} Objeto con el array de datos.
 */
async function loadCSVData(filePath, delimiter) {
    const response = await fetch(filePath);
    
    if (!response.ok) {
        throw new Error(`Error al obtener el archivo: ${filePath} (Estado: ${response.status})`);
    }
    
    const text = await response.text();
    
    const rows = text.trim().split(/\r\n|\n/).filter(line => line.length > 0);
    if (rows.length === 0) return { data: [] };

    
    const headers = rows[0].split(delimiter).map(header => header.trim());
    const data = [];
    
    
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(delimiter);

        const rowObject = {};
        headers.forEach((header, index) => {
      
            rowObject[header] = values[index] ? values[index].trim() : ''; 
        });
        
        
        if (rowObject['TÍTULO'] && rowObject['AÑO'] && rowObject['TÍTULO'].length > 0) {
            data.push(rowObject);
        } else {
            console.warn(`Saltando fila ${i}: datos clave (Título/Año) faltantes o vacíos.`);
        }
    }
    
    return { data: data }; 
}



document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de la Animación Inicial (Sparkles y Fade-out) ---
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
    
    
    const inputField = document.getElementById('datoInput');
    const actionButton = document.getElementById('miBoton');
    const resultText = document.getElementById('resultado');

    if (actionButton) {
        actionButton.addEventListener('click', function() {
            const valorIngresado = inputField ? inputField.value.trim() : '';

            if (valorIngresado === "") {
                if (resultText) {
                    resultText.textContent = "¡Por favor, ingresa algún dato en el campo!";
                    resultText.style.color = "red";
                }
            } else {
                // Lógica de respuesta:
                if (resultText) {
                    resultText.textContent = `¡Tu dato, "${valorIngresado}", fue procesado con éxito!`;
                    resultText.style.color = "#28a745"; // Color verde para éxito
                }
                if (inputField) {
                     inputField.value = ''; 
                }
            }
        });
    }

    
    
    const timelineContainer = document.querySelector('.timeline');
    
    
    async function cargarPeliculas() {
        
    
        const CSV_FILE_NAME = "Base marvel starwars.csv"; 
        
        try {
            
            const peliculasData = await loadCSVData(CSV_FILE_NAME, ";");
            
            
            if (!timelineContainer) return;
            
            timelineContainer.innerHTML = '';
            
            const peliculas = peliculasData.data;


        
            peliculas.sort((a, b) => parseInt(a['AÑO']) - parseInt(b['AÑO']));

            peliculas.forEach(pelicula => {
                const titulo = pelicula['TÍTULO'];
                const tipo = pelicula['CONTENIDO']; 
                const anio = pelicula['AÑO'];
                const tipo_contenido = pelicula['TIPO']; 
                
                
                const eventLi = document.createElement('li');
                eventLi.classList.add('timeline-event');
                
                
                eventLi.innerHTML = `
                    <div class="timeline-date">${anio}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-summary">${titulo} (Clic para detalles)</h3>
                        <div class="timeline-details hidden">
                            <p><strong>Clasificación:</strong> ${tipo} (${tipo_contenido})</p>
                        </div>
                    </div>
                `;
                
                
                timelineContainer.appendChild(eventLi);
            });

            
            adjuntarInteractividadClic();

        } catch (error) {
            console.error("Error al cargar la base de datos de películas:", error);
            
            if (timelineContainer) {
                
                timelineContainer.innerHTML = `<p style="color:red; text-align:center;">Error al cargar la base de datos: ${error.message}. Asegúrate de que el archivo CSV se llame **${CSV_FILE_NAME}** y esté en la misma carpeta.</p>`;
            }
        }
    }

  
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

    
    cargarPeliculas();

});