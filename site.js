const container = document.getElementById('container');

class Star {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'star';
    
    const rand = Math.random();
    if (rand > 0.95) {
      this.size = Math.random() * 2 + 2;
    } else if (rand > 0.8) {
      this.size = Math.random() * 1.5 + 1;
    } else {
      this.size = Math.random() * 1 + 0.5;
    }
    
    const width = screen.width;
    const height = screen.height;
    
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    
    const colorRand = Math.random();
    if (colorRand > 0.9) {
      this.color = '#aaccff';
    } else if (colorRand > 0.85) {
      this.color = '#ffffaa';
    } else if (colorRand > 0.82) {
      this.color = '#ffcccc';
    } else {
      this.color = '#ffffff';
    }
    
    this.baseOpacity = Math.random() * 0.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    
    this.element.style.width = this.size + 'px';
    this.element.style.height = this.size + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.background = this.color;
    
    container.appendChild(this.element);
  }
  
  update(width, height, time) {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x + this.size < 0) this.x = width;
    if (this.x > width) this.x = -this.size;
    if (this.y + this.size < 0) this.y = height;
    if (this.y > height) this.y = -this.size;
    
    const twinkle = Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.7;
    const opacity = this.baseOpacity * twinkle;
    
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.opacity = opacity;
  }
}

const stars = [];

setTimeout(() => {
  for (let i = 0; i < 200; i++) {
    stars.push(new Star());
  }
  animate();
}, 100);

let startTime = Date.now();

function animate() {
  const width = screen.width;
  const height = screen.height;
  const time = (Date.now() - startTime) / 1000;
  
  stars.forEach(s => {
    s.update(width, height, time);
  });
  requestAnimationFrame(animate);
}