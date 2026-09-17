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
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

function setMenu(open) {
  if (!menuToggle || !siteNav) return;
  menuToggle.classList.toggle('is-open', open);
  siteNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

menuToggle?.addEventListener('click', () => {
  setMenu(!siteNav.classList.contains('is-open'));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

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

document.querySelectorAll('.service-cta[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const projectTopic = document.getElementById('project-topic');
    if (projectTopic) projectTopic.value = link.dataset.service;
  });
});

const requestedService = new URLSearchParams(window.location.search).get('service');
if (requestedService) {
  const projectTopic = document.getElementById('project-topic');
  if (projectTopic && [...projectTopic.options].some((option) => option.value === requestedService)) {
    projectTopic.value = requestedService;
  }
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
    ecommerce: 'E-commerce store',
    business: 'Business website',
    realestate: 'Real estate website',
    healthcare: 'Healthcare website',
    consulting: 'Consulting website',
    event: 'Event website',
    blog: 'Blog / personal brand website'
  };

  const baseCosts = {
    portfolio: 3200,
    school: 4200,
    restaurant: 4500,
    ecommerce: 6200,
    business: 3800,
    realestate: 5000,
    healthcare: 5600,
    consulting: 4200,
    event: 3600,
    blog: 2800
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

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && lightbox?.classList.contains('active')) {
    closeLightbox();
  }
});

const projectModal = document.getElementById('projectModal');
const projectModalImage = document.getElementById('projectModalImage');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalPurpose = document.getElementById('projectModalPurpose');
const projectModalLink = document.getElementById('projectModalLink');
const openPayment = document.getElementById('openPayment');
const paymentModal = document.getElementById('paymentModal');
const paymentModalTitle = document.getElementById('paymentModalTitle');
const paymentContinue = document.getElementById('paymentContinue');
const paymentMethods = document.querySelectorAll('.payment-method');
let selectedProject = '';
let selectedPaymentMethod = '';

function closeProjectModal() {
  projectModal?.classList.remove('active');
  projectModal?.setAttribute('aria-hidden', 'true');
}

function closePaymentModal() {
  paymentModal?.classList.remove('active');
  paymentModal?.setAttribute('aria-hidden', 'true');
}

function openProjectModal(card) {
  const image = card.querySelector('img');
  const title = card.querySelector('h3');
  const description = card.querySelector('.project-info > p:not(.project-kicker)');
  const firstLink = card.querySelector('.project-links a');
  if (!image || !title || !description || !projectModal) return;

  selectedProject = title.textContent.trim();
  projectModalImage.src = image.currentSrc || image.src;
  projectModalImage.alt = image.alt;
  projectModalTitle.textContent = selectedProject;
  projectModalPurpose.textContent = description.textContent.trim();
  projectModalLink.href = firstLink?.href || '#inquiry';
  projectModalLink.target = projectModalLink.href.includes('#') ? '_self' : '_blank';
  projectModalLink.textContent = firstLink?.textContent.trim() || 'Discuss this project ↗';
  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.portfolio-grid .project-card').forEach((card) => {
  card.classList.add('is-project-trigger');
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View details for ${card.querySelector('h3')?.textContent.trim() || 'project'}`);

  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    openProjectModal(card);
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(card);
    }
  });
});

document.querySelectorAll('[data-close-project-modal]').forEach((button) => button.addEventListener('click', closeProjectModal));
document.querySelectorAll('[data-close-payment-modal]').forEach((button) => button.addEventListener('click', closePaymentModal));

openPayment?.addEventListener('click', () => {
  closeProjectModal();
  selectedPaymentMethod = '';
  paymentContinue.disabled = true;
  paymentMethods.forEach((method) => {
    method.classList.remove('selected');
    method.setAttribute('aria-checked', 'false');
  });
  paymentModalTitle.textContent = `Pay for ${selectedProject}`;
  paymentModal.classList.add('active');
  paymentModal.setAttribute('aria-hidden', 'false');
});

document.querySelectorAll('.buy-teacher-bot').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const card = button.closest('.project-card');
    if (!card) return;
    openProjectModal(card);
    openPayment?.click();
  });
});

paymentMethods.forEach((method) => {
  method.addEventListener('click', () => {
    selectedPaymentMethod = method.dataset.paymentMethod;
    paymentMethods.forEach((item) => {
      const isSelected = item === method;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-checked', String(isSelected));
    });
    paymentContinue.disabled = false;
  });
});

paymentContinue?.addEventListener('click', () => {
  if (!selectedProject || !selectedPaymentMethod) return;
  const message = `Hello Y_Cohde, I want to purchase ${selectedProject}.\nPayment method: ${selectedPaymentMethod}.\nPlease send me the secure payment link and next steps.`;
  openWhatsApp(message);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProjectModal();
    closePaymentModal();
  }
});
