// Mobile Navigation Toggle
console.log('working')
document.addEventListener('DOMContentLoaded', function() {
  console.log('content loaded')
  const body = document.querySelector('body');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    console.log('first')
    navToggle.addEventListener('click', function() {
      body.classList.toggle('no-scroll');
      console.log('second')
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('nav-active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('nav-active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('nav-active');
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll effect to header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
      }
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.feature-card, .service-card, .team-card, .stat-item, .process-step, .value-card');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Show success message
      showToast('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      
      // Reset form
      this.reset();
    });
  }

  const resultsForm = document.getElementById('resultsForm');
  if (resultsForm) {
    resultsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simulate results lookup
      showToast('🚧 Esta funcionalidad aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀');
    });
  }

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    countObserver.observe(stat);
  });

  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const suffix = element.textContent.includes('+') ? '+' : '';
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // En el HTML usa data-src en lugar de src:
// <img data-src="imagen.jpg" alt="...">

const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = function() {
            console.log('pau');
            img.style.opacity = '1';
        };
        
        // Ahora sí comenzar la carga
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        
        imageObserver.unobserve(img);
      }
  });
});

images.forEach(img => {
    imageObserver.observe(img);
});

  // Add loading states to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.type === 'submit') {
        const originalText = this.innerHTML;
        this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Enviando...';
        this.disabled = true;
        
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 2000);
      }
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.feature-card, .service-card, .team-card, .value-card, .cert-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Form validation
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo es obligatorio';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Ingresa un email válido';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        isValid = false;
        errorMessage = 'Ingresa un teléfono válido';
      }
    }

    if (!isValid) {
      field.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      errorDiv.style.color = '#dc3545';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '0.25rem';
      field.parentNode.appendChild(errorDiv);
    }

    return isValid;
  }

  // Add CSS for error states
  const style = document.createElement('style');
  style.textContent = `
    .form-input.error,
    .form-textarea.error {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

// Toast notification function
function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  // Add to page
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 5000);
}

// Utility functions
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance optimizations
const debouncedResize = debounce(() => {
  // Handle resize events
  const cards = document.querySelectorAll('.feature-card, .service-card');
  cards.forEach(card => {
    card.style.height = 'auto';
  });
}, 250);

window.addEventListener('resize', debouncedResize);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
  
  // Tab navigation for custom elements
  if (e.key === 'Tab') {
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(el => {
      el.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
      });
      
      el.addEventListener('blur', function() {
        this.style.outline = 'none';
      });
    });
  }
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Service worker would be registered here in a production environment
    console.log('Service Worker support detected');
  });
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // Analytics tracking would be implemented here
  console.log('Event tracked:', eventName, eventData);
}

// Track page views
trackEvent('page_view', {
  page: window.location.pathname,
  title: document.title
});

// Track button clicks
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn')) {
    trackEvent('button_click', {
      button_text: e.target.textContent.trim(),
      page: window.location.pathname
    });
  }
});

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  // Error reporting would be implemented here
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  // Error reporting would be implemented here
});

const header = document.getElementById('header');
const topBar = document.getElementById('top-bar');
const mainNav = document.getElementById('main-nav');
let isNavFixed = false;
let topBarHeight = topBar.offsetHeight;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY <= 0) {
        // Volver al estado inicial - mostrar top bar y nav relativo
        if (isNavFixed) {
            topBar.classList.remove('top-bar-hidden');
            topBar.classList.add('py-2');
            topBar.classList.add('top-bar-visible');
            header.classList.remove('nav-fixed');
            document.body.style.paddingTop = '0';
            isNavFixed = false;
        }
    } else if (currentScrollY > topBarHeight) {
        // Scroll suficiente - ocultar top bar y fijar nav
        if (!isNavFixed) {
            topBar.classList.add('top-bar-hidden');
            topBar.classList.remove('py-2');
            topBar.classList.remove('top-bar-visible');
            header.classList.add('nav-fixed');
            // Agregar padding para evitar saltos de contenido
            document.body.style.paddingTop = (mainNav.offsetHeight) + 'px';
            isNavFixed = true;
        }
    }
});

// Recalcular altura del top bar en caso de cambio de tamaño de ventana
window.addEventListener('resize', () => {
    if (!isNavFixed) {
        topBarHeight = topBar.offsetHeight;
    }
});

// Activar los link dependiendo en que pagina este nav
const currentPage = location.pathname.split("/").pop(); // ejemplo: "index.html"
  const links = document.querySelectorAll("a.nav-link");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.setAttribute("data-active", "true");
    } else {
      link.removeAttribute("data-active");
    }
  });