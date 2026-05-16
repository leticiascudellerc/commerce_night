
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