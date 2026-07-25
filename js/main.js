// ===== 主分類切換（平面 / 動態）=====
const mainTabs = document.querySelectorAll('.main-tab');
const photoSection = document.getElementById('photo-section');
const videoSection = document.getElementById('video-section');
const subVideo = document.getElementById('sub-video');

mainTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mainTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const type = tab.dataset.main;
    if (type === 'photo') {
      photoSection.classList.remove('hidden');
      videoSection.classList.add('hidden');
    } else {
      photoSection.classList.add('hidden');
      videoSection.classList.remove('hidden');
      resetFilter(subVideo, videoCards);
    }
  });
});

// ===== 動態影片篩選 =====
const videoCards = document.querySelectorAll('#video-grid .video-card');

function setupFilter(subTabEl, items) {
  const btns = subTabEl.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

function resetFilter(subTabEl, items) {
  const btns = subTabEl.querySelectorAll('.filter-btn');
  btns.forEach(b => b.classList.remove('active'));
  btns[0].classList.add('active');
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

function buildImgList() {
  allCaseImgs = [...document.querySelectorAll('.case-grid img')];
}

document.querySelectorAll('.case-grid img').forEach(img => {
  img.addEventListener('click', () => {
    buildImgList();
    currentIndex = allCaseImgs.indexOf(img);
    lbImg.src = allCaseImgs[currentIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + allCaseImgs.length) % allCaseImgs.length;
  lbImg.src = allCaseImgs[currentIndex].src;
});

lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % allCaseImgs.length;
  lbImg.src = allCaseImgs[currentIndex].src;
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

function closeLB() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== Mobile nav =====
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    if (!open) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '60px';
      navLinks.style.right = '1.5rem';
      navLinks.style.background = '#111';
      navLinks.style.padding = '1rem 2rem';
      navLinks.style.gap = '1.2rem';
    }
  });
}
