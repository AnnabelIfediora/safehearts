// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1500);
});

// ========================================
// MOBILE NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
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

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// STORIES SLIDER
// ========================================
const sliderContainer = document.getElementById('storiesSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
const storyCards = document.querySelectorAll('.story-card');

let currentIndex = 0;
let cardsPerView = 3;
let totalSlides = 0;

// Calculate cards per view based on screen size
function updateCardsPerView() {
  const width = window.innerWidth;
  if (width <= 768) {
    cardsPerView = 1;
  } else if (width <= 1024) {
    cardsPerView = 2;
  } else {
    cardsPerView = 3;
  }
  totalSlides = Math.ceil(storyCards.length / cardsPerView);
  if (currentIndex >= totalSlides) {
    currentIndex = totalSlides - 1;
  }
  updateSlider();
  createDots();
}

// Create slider dots
function createDots() {
  sliderDots.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
    });
    sliderDots.appendChild(dot);
  }
}

// Update slider position
function updateSlider() {
  const cardWidth = storyCards[0].offsetWidth;
  const gap = 24; // 1.5rem
  const offset = currentIndex * (cardWidth + gap) * cardsPerView;
  sliderContainer.style.transform = `translateX(-${offset}px)`;
  
  // Update dots
  document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Next slide
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
});

// Previous slide
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Auto slide
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}, 6000);

// Pause auto slide on hover
sliderContainer.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

sliderContainer.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 6000);
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(autoSlide);
});

sliderContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next
      currentIndex = (currentIndex + 1) % totalSlides;
    } else {
      // Swipe right - previous
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    updateSlider();
  }
}

// Initialize slider
window.addEventListener('load', updateCardsPerView);
window.addEventListener('resize', updateCardsPerView);

// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// CRISIS BANNER
// ========================================
const crisisBanner = document.getElementById('crisisBanner');
const crisisClose = document.getElementById('crisisClose');

// Show crisis banner after 10 seconds
setTimeout(() => {
  if (!sessionStorage.getItem('crisisBannerClosed')) {
    crisisBanner.classList.add('show');
  }
}, 10000);

// Close crisis banner
crisisClose.addEventListener('click', () => {
  crisisBanner.classList.remove('show');
  sessionStorage.setItem('crisisBannerClosed', 'true');
});

// ========================================
// REACTION BUTTONS
// ========================================
const reactionBtns = document.querySelectorAll('.reaction-btn');

reactionBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const icon = this.querySelector('i');
    const count = this.querySelector('span');
    
    if (icon.classList.contains('fa-heart')) {
      // Toggle heart reaction
      if (this.classList.contains('reacted')) {
        this.classList.remove('reacted');
        this.style.background = '';
        this.style.color = '';
        count.textContent = parseInt(count.textContent) - 1;
      } else {
        this.classList.add('reacted');
        this.style.background = 'var(--coral)';
        this.style.color = 'var(--white)';
        count.textContent = parseInt(count.textContent) + 1;
        
        // Add animation
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      }
    } else if (icon.classList.contains('fa-hands-helping')) {
      // Support button
      this.style.background = 'var(--green)';
      this.style.color = 'var(--white)';
      count.textContent = 'Supported!';
      
      setTimeout(() => {
        this.style.background = '';
        this.style.color = '';
        count.textContent = 'Support';
      }, 2000);
    }
  });
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    anonymous: document.getElementById('anonymous').checked
  };

  // Show success message
  alert('Thank you for reaching out! We will get back to you soon. Remember, you are not alone on this journey. 💚');
  
  // Reset form
  contactForm.reset();
  
  console.log('Form submitted:', formData);
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .story-card, .quote-card, .resource-card, .contact-card, .value-item');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initial setup for scroll animations
document.querySelectorAll('.service-card, .story-card, .quote-card, .resource-card, .contact-card, .value-item').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========================================
// KEYBOARD NAVIGATION FOR SLIDER
// ========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }
});

// ========================================
// SHARE STORY BUTTON
// ========================================
const shareStoryBtns = document.querySelectorAll('.stories-cta .btn');

shareStoryBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thank you for wanting to share your story! In a full implementation, this would open a secure, anonymous story submission form. 💚');
  });
});

// ========================================
// EMERGENCY BUTTON
// ========================================
const emergencyBtn = document.querySelector('.emergency-btn');

if (emergencyBtn) {
  emergencyBtn.addEventListener('click', (e) => {
    const confirmed = confirm('Are you sure you want to call emergency services? If you are in immediate danger, please call your local emergency number.');
    if (!confirmed) {
      e.preventDefault();
    }
  });
}

// ========================================
// RESOURCE LINKS
// ========================================
const resourceLinks = document.querySelectorAll('.resource-link');

resourceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert('This resource guide would open in a full implementation. Stay tuned for more mental health resources! 💚');
  });
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c💚 SafeHearts - Mental Health Awareness Platform', 'color: #2DD4BF; font-size: 20px; font-weight: bold;');
console.log('%cYou are not alone. Help is available.', 'color: #14B8A6; font-size: 14px;');
console.log('%cIf you are in crisis, please reach out to a mental health professional or call your local emergency services.', 'color: #FB7185; font-size: 12px;');
