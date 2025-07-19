// 100 loving reasons
const reasons = [
  "you make every day brighter.",
  "your smile melts my heart.",
  "you believe in me when I doubt myself.",
  "your laughter is my favorite sound.",
  "you are my safe place.",
  "you inspire me to be better.",
  "your kindness is endless.",
  "you understand me like no one else.",
  "you make even ordinary moments magical.",
  "your hugs feel like home.",
  "you see the best in me.",
  "you make my heart race.",
  "you are my best friend.",
  "you make me feel loved every day.",
  "your eyes tell a thousand stories.",
  "you are my adventure.",
  "you make me laugh when I want to cry.",
  "you are my muse.",
  "you are my calm in the storm.",
  "you make me believe in love.",
  "you are my dream come true.",
  "you are my sunshine on rainy days.",
  "you make me feel special.",
  "you are my everything.",
  "you are my reason to smile.",
  "you are my heart's desire.",
  "you are my forever.",
  "you are my soulmate.",
  "you are my light in the dark.",
  "you are my hope.",
  "you are my wish come true.",
  "you are my favorite hello and hardest goodbye.",
  "you are my inspiration.",
  "you are my happiness.",
  "you are my peace.",
  "you are my joy.",
  "you are my love.",
  "you are my world.",
  "you are my heart.",
  "you are my home.",
  "you are my destiny.",
  "you are my miracle.",
  "you are my treasure.",
  "you are my angel.",
  "you are my blessing.",
  "you are my star.",
  "you are my moon.",
  "you are my sun.",
  "you are my universe.",
  "you are my poetry.",
  "you are my song.",
  "you are my dance.",
  "you are my wish.",
  "you are my prayer.",
  "you are my strength.",
  "you are my courage.",
  "you are my faith.",
  "you are my hope.",
  "you are my reason.",
  "you are my purpose.",
  "you are my passion.",
  "you are my heart's beat.",
  "you are my forever and always.",
  "you are my once in a lifetime.",
  "you are my fairy tale.",
  "you are my happy ending.",
  "you are my best decision.",
  "you are my favorite memory.",
  "you are my sweetest dream.",
  "you are my greatest adventure.",
  "you are my destiny.",
  "you are my soulmate.",
  "you are my heart's song.",
  "you are my guiding light.",
  "you are my comfort.",
  "you are my laughter.",
  "you are my smile.",
  "you are my hope.",
  "you are my wish.",
  "you are my miracle.",
  "you are my blessing.",
  "you are my angel.",
  "you are my star.",
  "you are my moon.",
  "you are my sun.",
  "you are my universe.",
  "you are my poetry.",
  "you are my song.",
  "you are my dance.",
  "you are my wish.",
  "you are my prayer.",
  "you are my strength.",
  "you are my courage.",
  "you are my faith.",
  "you are my hope.",
  "you are my reason.",
  "you are my purpose.",
  "you are my passion.",
  "you are my heart's beat.",
  "you are my forever and always."
];

const startBtn = document.getElementById('start-btn');
const heartContainer = document.getElementById('heart-container');
const messageContainer = document.getElementById('message-container');
const loveMessage = document.getElementById('love-message');
const nextBtn = document.getElementById('next-btn');
const finalMessage = document.getElementById('final-message');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const bgMusic = document.getElementById('bg-music');

let current = 0;
let musicOn = false;

// Pen sound for handwritten effect
let penAudio = null;
if (!penAudio) {
  penAudio = document.createElement('audio');
  penAudio.src = 'assets/pen.mp3';
  penAudio.preload = 'auto';
}

function animateLoveMeter() {
  const bar = document.getElementById('love-meter-bar');
  const label = document.getElementById('love-meter-label');
  let percent = 0;
  function step() {
    if (bar) bar.style.width = percent + '%';
    if (label) label.textContent = percent + '%';
    if (percent < 100) {
      percent++;
      setTimeout(step, 18);
    }
  }
  step();
}

function showMessage(idx) {
  loveMessage.classList.remove('fadeOut');
  loveMessage.classList.add('fadeIn');
  loveMessage.innerHTML = `<span style='font-weight:bold;'>I love you because...</span><br><span id='handwritten-text' class='handwritten'></span>`;
  nextBtn.style.display = idx < reasons.length - 1 ? 'inline-block' : 'none';
  const text = reasons[idx];
  const handwritten = document.getElementById('handwritten-text');
  handwritten.textContent = '';
  let i = 0;
  penAudio.currentTime = 0;
  penAudio.play();
  function typeChar() {
    if (i <= text.length) {
      handwritten.textContent = text.slice(0, i);
      i++;
      setTimeout(typeChar, 38);
    } else {
      penAudio.pause();
    }
  }
  typeChar();
  // Animate love meter only for the first message
  if (idx === 0) animateLoveMeter();
}

function nextMessage() {
  loveMessage.classList.remove('fadeIn');
  loveMessage.classList.add('fadeOut');
  setTimeout(() => {
    current++;
    if (current < reasons.length) {
      showMessage(current);
    } else {
      showFinalMessage();
    }
  }, 600);
}

function showFinalMessage() {
  messageContainer.classList.add('hidden');
  finalMessage.classList.add('show');
}

const PARTICLE_COUNT = 48;

function createHeartParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'heart-particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  const angle = Math.random() * 2 * Math.PI;
  const distance = 60 + Math.random() * 60;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  particle.style.setProperty('--dx', dx + 'px');
  particle.style.setProperty('--dy', dy + 'px');
  heartContainer.appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 1200);
}

function heartExplosion() {
  const rect = heartContainer.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createHeartParticle(rect.width / 2, rect.height / 2);
  }
}

startBtn.addEventListener('click', () => {
  heartExplosion();
  heartContainer.style.transition = 'opacity 0.7s';
  startBtn.style.transition = 'opacity 0.7s';
  setTimeout(() => {
    heartContainer.style.opacity = 0;
    startBtn.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    heartContainer.classList.add('hidden');
    startBtn.classList.add('hidden');
    messageContainer.classList.remove('hidden');
    showMessage(0);
  }, 1100);
});

nextBtn.addEventListener('click', nextMessage);

// Music toggle
musicToggle.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    bgMusic.volume = 0.25;
    bgMusic.play();
    musicToggle.classList.add('active');
    musicIcon.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('active');
    musicIcon.textContent = '🎵';
  }
});

// Soft animated background (stars/sparkles/petals)
const bg = document.getElementById('background-animation');
const petals = [];
const PETAL_COUNT = 32;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = randomBetween(0, 100) + 'vw';
  petal.style.animationDuration = randomBetween(8, 18) + 's';
  petal.style.opacity = randomBetween(0.5, 1);
  petal.style.transform = `scale(${randomBetween(0.5, 1.2)}) rotate(${randomBetween(0, 360)}deg)`;
  bg.appendChild(petal);
  petals.push(petal);
}

for (let i = 0; i < PETAL_COUNT; i++) createPetal();

// Animate petals
setInterval(() => {
  petals.forEach((petal, i) => {
    if (parseFloat(petal.style.top) > 100 || !petal.style.top) {
      petal.style.top = randomBetween(-10, 0) + 'vh';
      petal.style.left = randomBetween(0, 100) + 'vw';
      petal.style.opacity = randomBetween(0.5, 1);
      petal.style.transform = `scale(${randomBetween(0.5, 1.2)}) rotate(${randomBetween(0, 360)}deg)`;
    } else {
      petal.style.top = (parseFloat(petal.style.top) + randomBetween(0.1, 0.4)) + 'vh';
      petal.style.left = (parseFloat(petal.style.left) + Math.sin(Date.now()/1000 + i) * 0.05) + 'vw';
    }
  });
}, 40);

// Petal styles (add to CSS dynamically)
const style = document.createElement('style');
style.innerHTML = `
.petal {
  position: fixed;
  top: -10vh;
  width: 22px;
  height: 22px;
  background: radial-gradient(circle at 60% 40%, #ffb6d5 60%, #e0c3fc 100%);
  border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%;
  pointer-events: none;
  z-index: 1;
  filter: blur(0.5px) drop-shadow(0 0 8px #ffb6d5aa);
  opacity: 0.7;
  animation: floatPetal linear infinite;
}
`;
document.head.appendChild(style);

// Floating 3D hearts and butterflies with parallax
const FLOATING_COUNT = 3;
const floatingTypes = ['heart', 'butterfly'];
const floatingContainer = document.createElement('div');
floatingContainer.id = 'floating-objects';
floatingContainer.style.position = 'fixed';
floatingContainer.style.top = '0';
floatingContainer.style.left = '0';
floatingContainer.style.width = '100vw';
floatingContainer.style.height = '100vh';
floatingContainer.style.pointerEvents = 'none';
floatingContainer.style.zIndex = '3';
document.body.appendChild(floatingContainer);

function createFloatingObject() {
  const type = floatingTypes[Math.floor(Math.random() * floatingTypes.length)];
  const el = document.createElement('div');
  el.className = 'floating-object ' + type;
  el.style.left = Math.random() * 90 + 'vw';
  el.style.top = (10 + Math.random() * 60) + 'vh';
  el.style.opacity = 0;
  floatingContainer.appendChild(el);
  setTimeout(() => {
    el.style.opacity = 1;
    el.style.transform = `translateY(-${30 + Math.random() * 40}vh) scale(${0.7 + Math.random() * 0.6})`;
  }, 50);
  setTimeout(() => {
    el.style.opacity = 0;
    setTimeout(() => el.remove(), 2000);
  }, 9000 + Math.random() * 2000);
}

setInterval(() => {
  if (document.hidden) return;
  if (Math.random() < 0.7) createFloatingObject();
}, 4000);

// Parallax effect for floating objects
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.floating-object').forEach(el => {
    el.style.transform += ` translateY(${scrollY * 0.04}px)`;
  });
});

window.addEventListener('deviceorientation', (e) => {
  const x = e.gamma || 0;
  const y = e.beta || 0;
  document.querySelectorAll('.floating-object').forEach(el => {
    el.style.transform += ` translate(${x * 0.5}px, ${y * 0.2}px)`;
  });
});

// Greeting card intro logic
window.addEventListener('DOMContentLoaded', function() {
  const greetingModal = document.getElementById('greeting-modal');
  const greetingContinue = document.getElementById('greeting-continue');
  const centerContainer = document.querySelector('.center-container');
  // Show greeting modal, hide main content until greeting is dismissed
  if (greetingModal) greetingModal.classList.remove('hidden');
  if (centerContainer) centerContainer.style.display = 'none';
  if (greetingContinue) {
    greetingContinue.addEventListener('click', function() {
      if (greetingModal) greetingModal.classList.add('hidden');
      if (centerContainer) centerContainer.style.display = '';
    });
  }
});

// Typewriter effect for greeting message
window.addEventListener('DOMContentLoaded', () => {
  const greetingMsg = document.querySelector('.greeting-message');
  if (greetingMsg) {
    const text = greetingMsg.innerHTML;
    greetingMsg.innerHTML = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        greetingMsg.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 35);
      }
    }
    typeWriter();
  }
});

// 3D Flip Animation for Greeting Card
const greetingModal = document.getElementById('greeting-modal');
const greetingContinue = document.getElementById('greeting-continue');
greetingContinue.addEventListener('click', () => {
  greetingModal.classList.add('hide');
});

// 3D Floating Heart Particles
function createHeartParticle() {
  const container = document.getElementById('background-animation');
  const heart = document.createElement('div');
  heart.className = 'heart-particle';
  heart.innerHTML = `<svg viewBox="0 0 32 28" width="32" height="28"><path d="M4,10 A8,8 0 0,1 16,10 A8,8 0 0,1 28,10 Q28,20 16,27 Q4,20 4,10 Z" fill="#ff69b4"/></svg>`;
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (6 + Math.random() * 4) + 's';
  heart.style.opacity = 0.6 + Math.random() * 0.4;
  container.appendChild(heart);
  setTimeout(() => container.removeChild(heart), 9000);
}
setInterval(createHeartParticle, 600); 

// Secret Message Reveal Logic
const heart = document.getElementById('heart');
const secretMsg = document.getElementById('secret-message');
let heartClicks = 0;
heart.addEventListener('click', () => {
  heartClicks++;
  if (heartClicks === 7) {
    secretMsg.classList.remove('hidden');
    setTimeout(() => secretMsg.classList.add('revealed'), 10);
  }
}); 

// Heart trail cursor effect
window.addEventListener('mousemove', (e) => {
  const heart = document.createElement('div');
  heart.className = 'cursor-heart';
  heart.style.left = e.pageX + 'px';
  heart.style.top = e.pageY + 'px';
  heart.innerHTML = `<svg viewBox="0 0 16 14" width="16" height="14"><path d="M2,5 A3,3 0 0,1 8,5 A3,3 0 0,1 14,5 Q14,10 8,13 Q2,10 2,5 Z" fill="#e75480"/></svg>`;
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.style.opacity = 0;
    heart.style.transform = 'scale(1.5)';
  }, 10);
  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, 700);
}); 

// Confetti burst effect
function confettiBurst() {
  const colors = ['#ffb6c1', '#e75480', '#fbc2eb', '#b2fefa', '#fcb69f', '#e0c3fc'];
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '50vh';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2500);
  }
}
// Trigger confetti when greeting card is opened
if (greetingContinue) {
  greetingContinue.addEventListener('click', () => {
    confettiBurst();
  });
} 

// Floating balloons effect
function createBalloon() {
  const colors = ['#ffb6c1', '#e75480', '#fbc2eb', '#b2fefa', '#fcb69f', '#e0c3fc'];
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * 90 + 'vw';
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.animationDuration = (4 + Math.random() * 3) + 's';
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}
setInterval(createBalloon, 1200); 

// Sparkle trail effect on click
window.addEventListener('click', (e) => {
  for (let i = 0; i < 7; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (e.pageX + (Math.random() - 0.5) * 40) + 'px';
    sparkle.style.top = (e.pageY + (Math.random() - 0.5) * 40) + 'px';
    sparkle.style.animationDuration = (0.7 + Math.random() * 0.5) + 's';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }
}); 

// Fireworks animation when final message is shown
function launchFireworks() {
  let canvas = document.getElementById('fireworks-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 99999;
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function randomColor() {
    const colors = ['#ffb6c1', '#e75480', '#fbc2eb', '#b2fefa', '#fcb69f', '#e0c3fc', '#fffbe6'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function createFirework() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
    const count = 32 + Math.floor(Math.random() * 16);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 2.5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: randomColor(),
        size: 2 + Math.random() * 2
      });
    }
  }
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.vy += 0.02;
      p.alpha -= 0.012;
    });
    particles = particles.filter((p) => p.alpha > 0);
    if (frame % 20 === 0 && frame < 80) createFirework();
    if (particles.length > 0 || frame < 100) {
      frame++;
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => { if (canvas.parentNode) canvas.parentNode.removeChild(canvas); }, 1200);
    }
  }
  animate();
}
// Show fireworks when final message is revealed
const finalMsg = document.getElementById('final-message');
if (finalMsg) {
  const observer = new MutationObserver(() => {
    if (!finalMsg.classList.contains('hidden')) {
      launchFireworks();
    }
  });
  observer.observe(finalMsg, { attributes: true, attributeFilter: ['class'] });
} 