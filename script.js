const form = document.getElementById('service-form');
const whatsappNumber = '1234567890';
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('client-name').value.trim();
  const service = document.getElementById('service-topic').value.trim();
  const description = document.getElementById('service-description').value.trim();

  if (!name || !service || !description) {
    return;
  }

  const text = `Hello, my name is ${name}. I need help with: ${service}.\n\nDetails: ${description}`;
  const url = `https://wa.me/${encodeURIComponent(whatsappNumber)}?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank');
});

const galleryLinks = document.querySelectorAll('.gallery-link');

galleryLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const imageUrl = this.getAttribute('href');
    const imageTitle = this.dataset.title || this.querySelector('img').alt;

    lightboxImage.src = imageUrl;
    lightboxImage.alt = imageTitle;
    lightboxCaption.textContent = imageTitle;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});
