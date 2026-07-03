const whatsappNumber = '0207918169';
const serviceForm = document.getElementById('service-form');
const bookingForm = document.getElementById('booking-form');
const estimatorForm = document.getElementById('estimator-form');
const estimatorType = document.getElementById('estimator-type');
const pageCount = document.getElementById('page-count');
const pageCountValue = document.getElementById('page-count-value');
const featureLevel = document.getElementById('feature-level');
const estimateTitle = document.getElementById('estimate-title');
const estimateCopy = document.getElementById('estimate-copy');
const estimatePrice = document.getElementById('estimate-price');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openWhatsApp(message) {
  const url = `https://wa.me/${encodeURIComponent(whatsappNumber)}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

if (serviceForm) {
  serviceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const business = document.getElementById('business-name').value.trim();
    const topic = document.getElementById('project-topic').value.trim();
    const budget = document.getElementById('budget').value.trim();
    const deadline = document.getElementById('deadline').value.trim();
    const description = document.getElementById('service-description').value.trim();

    if (!name || !email || !phone || !topic || !description) {
      return;
    }

    const text = `Hello Y_Cohde, I am ${name}.\nBusiness: ${business || 'Not provided'}\nEmail: ${email}\nPhone: ${phone}\nProject type: ${topic}\nBudget: ${budget || 'To be discussed'}\nDeadline: ${deadline || 'To be discussed'}\n\nProject details:\n${description}`;

    openWhatsApp(text);
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const type = document.getElementById('booking-type').value;
    const notes = document.getElementById('booking-notes').value.trim();

    if (!date || !time) {
      return;
    }

    const text = `Hello Y_Cohde, I would like to book a consultation for ${date} at ${time} (${type}).\n\nNotes: ${notes || 'No additional notes.'}`;

    openWhatsApp(text);
  });
}

function updateEstimate() {
  const type = estimatorType?.value || 'portfolio';
  const pages = Number(pageCount?.value || 5);
  const level = featureLevel?.value || 'basic';

  const typeLabels = {
    portfolio: 'Portfolio website',
    school: 'School website',
    restaurant: 'Restaurant website',
    ecommerce: 'E-commerce store'
  };

  const baseCosts = {
    portfolio: 3200,
    school: 4200,
    restaurant: 4500,
    ecommerce: 6200
  };

  const levelMultipliers = {
    basic: 1,
    advanced: 1.25,
    custom: 1.5
  };

  const total = Math.round(baseCosts[type] + (pages - 3) * 250 + (levelMultipliers[level] - 1) * 1200);

  estimateTitle.textContent = typeLabels[type];
  estimateCopy.textContent = `A ${level} ${typeLabels[type].toLowerCase()} with ${pages} pages and polished user experience.`;
  estimatePrice.textContent = `GH₵${total.toLocaleString()}`;
  pageCountValue.textContent = `${pages} pages`;
}

if (estimatorForm) {
  [estimatorType, pageCount, featureLevel].forEach((field) => {
    field?.addEventListener('input', updateEstimate);
    field?.addEventListener('change', updateEstimate);
  });

  estimatorForm.addEventListener('submit', function (event) {
    event.preventDefault();
    updateEstimate();
  });

  updateEstimate();
}

const galleryLinks = document.querySelectorAll('.gallery-link');

galleryLinks.forEach((link) => {
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
