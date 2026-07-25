// Lightbox for gallery pages
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
const allImgs = [...document.querySelectorAll('.photo-masonry-item img')];
let currentIndex = 0;

allImgs.forEach((img, i) => {
  img.addEventListener('click', () => {
    currentIndex = i;
    lbImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length;
  lbImg.src = allImgs[currentIndex].src;
});

lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % allImgs.length;
  lbImg.src = allImgs[currentIndex].src;
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
