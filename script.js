const form = document.getElementById('service-form');
const whatsappNumber = '1234567890';

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
