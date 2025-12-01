const NUM_SPARKLES = 2000; 

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