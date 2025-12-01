// Genera 50 partículas (destellos) de forma aleatoria en la página,
// agregándolas al contenedor de la intro para que se vean sobre el fondo azul.

const NUM_SPARKLES = 50; 
// 🟢 CLAVE: Obtenemos el contenedor de la animación de entrada
const introContainer = document.getElementById('intro-animation'); 

if (introContainer) {
    for (let i = 0; i < NUM_SPARKLES; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Posicionamiento aleatorio respecto a la ventana de visualización (Viewport)
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        
        // Duración y retraso aleatorios para el parpadeo
        const duration = Math.random() * 3 + 1; // Entre 1 y 4 segundos
        const delay = Math.random() * 4; // Hasta 4 segundos de retraso

        sparkle.style.animationDuration = duration + 's';
        sparkle.style.animationDelay = delay + 's';

        // 🟢 CLAVE: Agregamos la partícula DENTRO del contenedor de la intro
        introContainer.appendChild(sparkle); 
    }
}