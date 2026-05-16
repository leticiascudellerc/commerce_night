
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

   const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || '');
    }
  }, 16);
}
  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat span');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) observer.observe(aboutStats);

function animateTimeline() {
  const timeline = document.querySelector('.timeline');
  const progress = document.querySelector('.timeline-progress');
  const items = document.querySelectorAll('.timeline-item');

  if (!timeline || !progress) return;

  const timelineTop = timeline.getBoundingClientRect().top + window.scrollY;
  const timelineHeight = timeline.offsetHeight;
  const scrolled = window.scrollY + window.innerHeight * 0.7;
  const percent = Math.min(Math.max((scrolled - timelineTop) / timelineHeight, 0), 1);

  progress.style.height = (percent * 100) + '%';

  items.forEach(item => {
    const itemTop = item.getBoundingClientRect().top + window.scrollY;
    if (scrolled > itemTop) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', animateTimeline);
animateTimeline();

const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let current = 0;
const total = document.querySelectorAll('.slide').length;

function goToSlide(index) {
  current = (index + total) % total;
  slides.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[current].classList.add('active');
}

prevBtn.addEventListener('click', () => goToSlide(current - 1));
nextBtn.addEventListener('click', () => goToSlide(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

setInterval(() => goToSlide(current + 1), 5000);