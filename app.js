const TELEGRAM_BOT_URL = 'https://t.me/droneX_Pay_bot';

const productLinks = {
  whoop: `${TELEGRAM_BOT_URL}?start=whoop`,
  '5inch': `${TELEGRAM_BOT_URL}?start=5inch`,
  dronex: `${TELEGRAM_BOT_URL}?start=dronex`,
  build: `${TELEGRAM_BOT_URL}?start=build`
};

document.querySelectorAll('[data-tg-link]').forEach((el) => {
  const product = el.dataset.product;
  const build = el.hasAttribute('data-build-link');
  el.href = product ? (productLinks[product] || TELEGRAM_BOT_URL) : (build ? productLinks.build : TELEGRAM_BOT_URL);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const assembly = document.querySelector('.assembly');
const progressBar = document.querySelector('#progressBar');
const stepNumber = document.querySelector('#stepNumber');
const stepTitle = document.querySelector('#stepTitle');
const stepText = document.querySelector('#stepText');
const complete = document.querySelector('.assembly-complete');
const components = [...document.querySelectorAll('.component')];

const steps = [
  ['01','Рама','Сначала рождается основа конструкции.'],
  ['02','Полётный контроллер','Система управления — мозг дрона.'],
  ['03','Силовая установка','Моторы, ESC и тяга.'],
  ['04','Энергия','Распределение питания и аккумулятор.'],
  ['05','Навигация','Позиционирование и телеметрия.'],
  ['06','Камера','FPV-камера и оптика.'],
  ['07','Система','Все элементы соединяются в единое целое.']
];

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function updateAssembly() {
  if (!assembly) return;
  const rect = assembly.getBoundingClientRect();
  const total = assembly.offsetHeight - window.innerHeight;
  const p = clamp((-rect.top) / Math.max(total, 1), 0, 1);
  const stage = p * steps.length;
  const activeIndex = Math.min(steps.length - 1, Math.floor(stage));
  const local = stage - activeIndex;
  const s = steps[activeIndex];

  stepNumber.textContent = s[0];
  stepTitle.textContent = s[1];
  stepText.textContent = s[2];
  progressBar.style.width = `${p * 100}%`;

  components.forEach((el, i) => {
    const step = Number(el.dataset.step);
    const relative = p * steps.length - (step - 1);
    const enter = clamp(relative / 0.9, 0, 1);
    const settle = clamp(1 - Math.max(relative - 1, 0) / 1.2, 0, 1);
    const visible = Math.min(enter, settle);
    const finalScale = step <= activeIndex + 1 ? 1 : 0.72;
    let x = 0, y = 0, r = 0;
    if (step > activeIndex + 1) { x = (step % 2 ? -50 : 50); y = 30 * (step % 3); r = step % 2 ? -12 : 12; }
    if (step <= activeIndex) { x = 0; y = 0; r = 0; }
    el.style.opacity = String(clamp(visible, .05, 1));
    el.style.filter = `blur(${(1 - visible) * 1.5}px)`;
    el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${Math.max(.72, visible * finalScale)}) rotate(${r * (1-visible)}deg)`;
  });

  if (p > .88) {
    complete.style.opacity = String(clamp((p-.88)/.08,0,1));
    complete.style.transform = `translate(-50%,-50%) scale(${0.7 + clamp((p-.88)/.08,0,1)*.3})`;
  } else {
    complete.style.opacity = '0';
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => { updateAssembly(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateAssembly);
updateAssembly();

const topbar = document.querySelector('#topbar');
let previousY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > previousY && y > 80) topbar.style.transform = 'translate(-50%, -120%)';
  else topbar.style.transform = 'translate(-50%, 0)';
  previousY = y;
}, { passive: true });
