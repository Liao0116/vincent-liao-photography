// ===== 主分類切換（平面 / 動態）=====
const mainTabs = document.querySelectorAll('.main-tab');
const subPhoto = document.getElementById('sub-photo');
const subVideo = document.getElementById('sub-video');
const photoGrid = document.getElementById('photo-grid');
const videoGrid = document.getElementById('video-grid');
const videoNote = document.getElementById('video-note');

mainTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mainTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const type = tab.dataset.main;
    if (type === 'photo') {
      subPhoto.classList.remove('hidden');
      subVideo.classList.add('hidden');
      photoGrid.classList.remove('hidden');
      videoGrid.classList.add('hidden');
      videoNote.classList.add('hidden');
      // 重設平面子分類
      resetFilter(subPhoto, photoItems);
    } else {
      subPhoto.classList.add('hidden');
      subVideo.classList.remove('hidden');
      photoGrid.classList.add('hidden');
      videoGrid.classList.remove('hidden');
      videoNote.classList.remove('hidden');
      // 重設動態子分類
      resetFilter(subVideo, videoCards);
    }
  });
});

// ===== 子分類篩選 =====
const photoItems = document.querySelectorAll('#photo-grid .grid-item');
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

setupFilter(subPhoto, photoItems);
setupFilter(subVideo, videoCards);

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
let currentIndex = 0;

function getVisible() {
  return [...photoItems].filter(i => !i.classList.contains('hidden'));
}

photoItems.forEach(item => {
  item.addEventListener('click', () => {
    const visible = getVisible();
    currentIndex = visible.indexOf(item);
    lbImg.src = visible[currentIndex].querySelector('img').src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

lbPrev.addEventListener('click', () => {
  const visible = getVisible();
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  lbImg.src = visible[currentIndex].querySelector('img').src;
});

lbNext.addEventListener('click', () => {
  const visible = getVisible();
  currentIndex = (currentIndex + 1) % visible.length;
  lbImg.src = visible[currentIndex].querySelector('img').src;
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
