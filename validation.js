// Scroll reveal animation usando Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Envio do formulário de contato
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    fetch(this.action, { method: this.method, body: new FormData(this) })
      .then(res => {
        if (res.ok) {
          window.location.href = 'obrigado.html';
        } else {
          alert('Houve um erro ao enviar. Tente novamente.');
          btn.disabled = false;
          btn.innerHTML = 'Enviar mensagem <i class="bx bx-send"></i>';
        }
      })
      .catch(() => {
        alert('Erro de conexão. Tente novamente.');
        btn.disabled = false;
        btn.innerHTML = 'Enviar mensagem <i class="bx bx-send"></i>';
      });
  });
}
