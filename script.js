// Particle background
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.7 + 0.2,
    phase: Math.random() * Math.PI * 2   // ← add this for twinkle
  };
}

const stars = Array.from({ length: 150 }, createStar);

let t = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  t += 0.016;

  for (const star of stars) {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    const tw = star.opacity * (0.6 + 0.4 * Math.sin(t * 3 + star.phase));

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${tw.toFixed(2)})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const dock = document.getElementById('dock');
  const items = Array.from(dock.querySelectorAll('.dock-item'));

  dock.addEventListener('mousemove', (e) => {
    items.forEach(item => {
      const icon = item.querySelector('.dock-icon');
      const rect = icon.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
      const maxDist = 90;
      if (dist < maxDist) {
        const scale = 1 + (1 - dist / maxDist) * 0.55;
        const ty = (1 - dist / maxDist) * 12;
        icon.style.transform = `scale(${scale}) translateY(${ty}px)`;
      } else {
        icon.style.transform = '';
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => item.querySelector('.dock-icon').style.transform = '');
  });


  