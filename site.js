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
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    
    const irisColors = ['#0d1b2a', '#1b263b', '#415a77', '#778da9'];
    const colorRand = Math.random();
    if (colorRand > 0.15) {
      this.color = irisColors[Math.floor(Math.random() * irisColors.length)];
    } else {
      this.color = '#415a77';
    }

    this.baseOpacity = Math.random() * 0.4 + 0.3;
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
  for (let i = 0; i < 350; i++) {
    stars.push(new Star());
  }
  animate();
}, 100);

let startTime = Date.now();

function animate() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const time = (Date.now() - startTime) / 1000;
  
  stars.forEach(s => {
    s.update(width, height, time);
  });
  requestAnimationFrame(animate);
}

const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));