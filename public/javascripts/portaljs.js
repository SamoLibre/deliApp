document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#00fffc', '#ff00f7', '#00ff9d', '#001aff'];
    
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        document.body.appendChild(particle);
        animateParticle(particle);
    }

    function animateParticle(particle) {
        let posX = parseFloat(particle.style.left);
        let posY = parseFloat(particle.style.top);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        let opacity = 0.7;
        let growing = false;
        
        function move() {
            posX += Math.cos(angle) * speed;
            posY += Math.sin(angle) * speed;
            
            if (growing) {
                opacity += 0.01;
                if (opacity >= 0.7) growing = false;
            } else {
                opacity -= 0.01;
                if (opacity <= 0.2) growing = true;
            }
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (posX < -50 || posX > window.innerWidth + 50 || 
                posY < -50 || posY > window.innerHeight + 50) {
                posX = Math.random() * window.innerWidth;
                posY = Math.random() * window.innerHeight;
            }
            
            requestAnimationFrame(move);
        }
        
        move();
    }
});
