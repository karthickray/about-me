document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  const links = document.querySelectorAll('a, button, .project-link');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Scroll header effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.classList.toggle('active', window.scrollY > 300);
  });
  
  // Back to top button
  document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Navigation dots
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === current) {
        dot.classList.add('active');
      }
    });
  });
  
  // Dot navigation click
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-section');
      const targetSection = document.getElementById(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  
  // Animate skills bars on scroll
  const skillItems = document.querySelectorAll('.skill-item');
  
  function animateSkills() {
    skillItems.forEach(item => {
      const percent = item.getAttribute('data-percent');
      const progressBar = item.querySelector('.skill-progress');
      
      if (isElementInViewport(item) && !progressBar.style.width) {
        progressBar.style.width = percent + '%';
      }
    });
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  window.addEventListener('scroll', animateSkills);
  animateSkills(); // Run once on load
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
  
  // Typing animation
  const typingElement = document.querySelector('.typing');
  const texts = ["Karthick A", "a Data Analyst", "a Problem Solver"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at end of typing
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before starting next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing animation after a delay
  setTimeout(type, 1000);
  
  // Animate elements on scroll
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  const slideUpProjects = document.querySelectorAll('.slide-up');
  
  function checkScroll() {
    fadeInSections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('visible');
      }
    });
    
    slideUpProjects.forEach(project => {
      if (isElementInViewport(project)) {
        project.classList.add('slide-visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on load
  
  // Update copyright year
  document.querySelector('.year').textContent = new Date().getFullYear();
  
  // Particle effect
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Add CSS for particles
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      pointer-events: none;
      animation: floatParticle linear infinite;
    }
    
    @keyframes floatParticle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100vh) translateX(100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});