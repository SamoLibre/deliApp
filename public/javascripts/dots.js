const canvas = document.querySelector('.canvas');
const dots = [];
const lines = [];

// Ekrana tıklandığında yeni nokta oluştur
canvas.addEventListener('click', (e) => {
  createDot(e.clientX, e.clientY);
});

// Rastgele pozisyonda nokta oluştur
function createDot(x, y) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  canvas.appendChild(dot);
  
  // Hareket için rastgele hız
  const speedX = (Math.random() - 0.5) * 2;
  const speedY = (Math.random() - 0.5) * 2;
  
  dots.push({
    element: dot,
    x, y,
    speedX, speedY
  });
  
  // Eğer en az 2 nokta varsa, çizgileri oluştur
  if (dots.length >= 2) {
    connectDots();
  }
}

// Noktaları birbirine bağla
function connectDots() {
  // Önceki çizgileri temizle
  lines.forEach(line => canvas.removeChild(line));
  lines.length = 0;
  
  // Tüm nokta çiftleri arasında çizgi oluştur
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dot1 = dots[i];
      const dot2 = dots[j];
      
      // Mesafe hesapla (çizgi çizmek için)
      const distance = Math.sqrt(
        Math.pow(dot2.x - dot1.x, 2) + 
        Math.pow(dot2.y - dot1.y, 2)
      );
      
      // Eğer noktalar birbirine yakınsa çizgi çiz
      if (distance < 200) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.width = `${distance}px`;
        line.style.left = `${dot1.x}px`;
        line.style.top = `${dot1.y}px`;
        
        // Çizginin açısını hesapla
        const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x);
        line.style.transform = `rotate(${angle}rad)`;
        
        canvas.appendChild(line);
        lines.push(line);
      }
    }
  }
}

// Animasyon döngüsü
function animate() {
  dots.forEach(dot => {
    // Noktaları hareket ettir
    dot.x += dot.speedX;
    dot.y += dot.speedY;
    
    // Ekran sınırlarında sekme
    if (dot.x <= 0 || dot.x >= window.innerWidth) dot.speedX *= -1;
    if (dot.y <= 0 || dot.y >= window.innerHeight) dot.speedY *= -1;
    
    // Pozisyonu güncelle
    dot.element.style.left = `${dot.x}px`;
    dot.element.style.top = `${dot.y}px`;
  });
  
  // Çizgileri güncelle
  connectDots();
  
  requestAnimationFrame(animate);
}

animate();