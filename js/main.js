/**
 * AINODE DEVBASE - Main JavaScript
 * Cyberpunk Animations & Interactions
 */

// ========================================
// PARTICLE SYSTEM
// ========================================
class ParticleSystem {
  constructor(container, count = 50) {
    this.container = container;
    this.count = count;
    this.particles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    
    // Random color from palette
    const colors = ['#00f5ff', '#7c3aed', '#f472b6', '#3b82f6', '#10b981'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    this.threshold = 0.1;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.threshold,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(el => observer.observe(el));
  }
}

// ========================================
// NAVIGATION
// ========================================
class Navigation {
  constructor() {
    this.mobileToggle = document.querySelector('.mobile-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.header = document.querySelector('.header');
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
      });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.mobileToggle.classList.remove('active');
      });
    });

    // Header scroll behavior
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      this.lastScrollY = currentScrollY;
    });

    // Active link highlighting
    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
}

// ========================================
// CURSOR TRACKER
// ========================================
class CursorTracker {
  constructor() {
    this.cursor = document.querySelector('.cursor-tracker');
    this.init();
  }

  init() {
    if (!this.cursor) return;

    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    // Add glow effect on interactive elements
    document.querySelectorAll('a, button, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
  }
}

// ========================================
// SMOOTH SCROLL
// ========================================
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ========================================
// COUNTER ANIMATION
// ========================================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.counter');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
class Typewriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.init();
  }

  init() {
    let index = 0;
    this.element.textContent = '';

    const type = () => {
      if (index < this.text.length) {
        this.element.textContent += this.text.charAt(index);
        index++;
        setTimeout(type, this.speed);
      }
    };

    type();
  }
}

// ========================================
// GLITCH EFFECT
// ========================================
class GlitchEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    setInterval(() => {
      this.element.classList.add('glitch');
      setTimeout(() => {
        this.element.classList.remove('glitch');
      }, 200);
    }, 3000);
  }
}

// ========================================
// FORM HANDLING
// ========================================
class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Input animations
    this.form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }

  handleSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Validate
    if (!data.name || !data.email || !data.message) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Simulate submission
    this.showNotification('Message sent successfully! We will contact you soon.', 'success');
    this.form.reset();
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }
}

// ========================================
// PARALLAX EFFECT
// ========================================
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      this.elements.forEach(el => {
        const speed = el.getAttribute('data-parallax') || 0.5;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle system
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles) {
    new ParticleSystem(heroParticles, 50);
  }

  // Initialize other components
  new ScrollAnimator();
  new Navigation();
  new SmoothScroll();
  new CursorTracker();
  new CounterAnimation();
  new MagneticButtons();
  new ParallaxEffect();

  // Initialize form handler
  new FormHandler();

  // Typewriter effect for hero
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const text = typewriterElement.getAttribute('data-text');
    new Typewriter(typewriterElement, text, 100);
  }

  // Glitch effect
  const glitchElement = document.querySelector('.glitch-text');
  if (glitchElement) {
    new GlitchEffect(glitchElement);
  }

  // Add loading animation
  document.body.classList.add('loaded');
  
  // Remove loading screen after animation
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }
  }, 1000);
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Random number between min and max
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Random color from palette
function randomColor() {
  const colors = ['#00f5ff', '#7c3aed', '#f472b6', '#3b82f6', '#10b981'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// EXPORT FOR USE
// ========================================
window.AINODE = {
  ParticleSystem,
  ScrollAnimator,
  Navigation,
  SmoothScroll,
  CounterAnimation,
  FormHandler,
  MagneticButtons,
  ParallaxEffect,
  Typewriter,
  GlitchEffect,
  debounce,
  throttle,
  random,
  randomColor
};
