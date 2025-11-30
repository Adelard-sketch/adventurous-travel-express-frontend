document.addEventListener('DOMContentLoaded', () => {
  // -----------------------
  // Hero Slider
  // -----------------------
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');

  function changeSlide() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
      slide.style.transition = 'opacity 1s ease-in-out';
      if (index === currentSlide) {
        slide.classList.add('active');
        slide.style.opacity = '1';
      }
    });
    currentSlide = (currentSlide + 1) % slides.length;
  }

  // Initial display
  slides.forEach((slide, index) => {
    slide.style.opacity = index === 0 ? '1' : '0';
  });

  setInterval(changeSlide, 5000);

  // -----------------------
  // Scroll Reveal Animations
  // -----------------------
  const cards = document.querySelectorAll('.destination-card, .package-card, .team-card');

  function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.85;
    cards.forEach(card => {
      if (!card.classList.contains('visible')) {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerPoint) {
          card.classList.add('visible');
          card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
        }
      }
    });
  }

  // Set initial state for animation
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
  });

  window.addEventListener('scroll', revealOnScroll);
  // Reveal on load in case some cards are already in view
  revealOnScroll();
});
