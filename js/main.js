// ===== 主分類切換（平面 / 動態）with fade =====
const mainTabs = document.querySelectorAll('.main-tab');
const photoSection = document.getElementById('photo-section');
const videoSection = document.getElementById('video-section');
const subVideo = document.getElementById('sub-video');

function fadeSwitch(hide, show) {
  hide.style.opacity = '0';
  setTimeout(() => {
    hide.classList.add('hidden');
    show.classList.remove('hidden');
    show.style.opacity = '0';
    requestAnimationFrame(() => { show.style.opacity = '1'; });
  }, 220);
}

mainTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mainTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (tab.dataset.main === 'photo') {
      fadeSwitch(videoSection, photoSection);
    } else {
      fadeSwitch(photoSection, videoSection);
      resetFilter(subVideo, videoCards);
    }
  });
});

// ===== 動態影片篩選 =====
const videoCards = document.querySelectorAll('#video-grid .video-card');

function setupFilter(subTabEl, items) {
  subTabEl.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      subTabEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });
}

function resetFilter(subTabEl, items) {
  subTabEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  subTabEl.querySelector('.filter-btn').classList.add('active');
  items.forEach(item => item.classList.remove('hidden'));
}

setupFilter(subVideo, videoCards);

// ===== Lightbox（案例圖片）=====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
let currentIndex = 0;
let allCaseImgs = [];

document.querySelectorAll('.case-grid img').forEach(img => {
  img.addEventListener('click', () => {
    allCaseImgs = [...document.querySelectorAll('.case-grid img')];
    currentIndex = allCaseImgs.indexOf(img);
    lbImg.src = allCaseImgs[currentIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
lbPrev.addEventListener('click', () => { currentIndex = (currentIndex - 1 + allCaseImgs.length) % allCaseImgs.length; lbImg.src = allCaseImgs[currentIndex].src; });
lbNext.addEventListener('click', () => { currentIndex = (currentIndex + 1) % allCaseImgs.length; lbImg.src = allCaseImgs[currentIndex].src; });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});
function closeLB() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }

// ===== Mobile nav：開啟 / 點連結後關閉 =====
const burger = document.querySelector('.nav-burger');
const navLinksEl = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    const open = navLinksEl.classList.contains('nav-open');
    navLinksEl.classList.toggle('nav-open', !open);
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinksEl.classList.remove('nav-open'));
  });
}

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.case-block, .about-inner, .contact-section, .section-title');
revealEls.forEach(el => el.classList.add('reveal-hidden'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('reveal-hidden');
      entry.target.classList.add('reveal-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Hero scroll arrow =====
const heroScroll = document.getElementById('hero-scroll');
if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== Back to top =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Nav Scroll Spy =====
const spySections = ['gallery', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
const spyLinks = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      spyLinks.forEach(a => a.classList.remove('spy-active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('spy-active');
    }
  });
}, { threshold: 0.3 });

spySections.forEach(s => spyObserver.observe(s));
