const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let autoSlide;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

// nextBtn.addEventListener('click', () => {
//   nextSlide();
//   resetAutoplay();
// });

// prevBtn.addEventListener('click', () => {
//   prevSlide();
//   resetAutoplay();
// });

function startAutoplay() {
  autoSlide = setInterval(nextSlide, 3000);
}

function resetAutoplay() {
  clearInterval(autoSlide);
  startAutoplay();
}

// Inicializar
showSlide(currentIndex);
startAutoplay();


