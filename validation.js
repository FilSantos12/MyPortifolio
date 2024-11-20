 
 
 
 // JavaScript Validar campo de contato, não deixar enviar sem o preechimento.
 /*
 (function() {
    'use strict';
    window.addEventListener('load', function() {
        // Busque todos os formulários aos quais queremos aplicar estilos de validação personalizados do Bootstrap
        var forms = document.getElementsByClassName('needs-validation');
        // Passe por cima deles e evite o envio
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
*/

//comando do efeito magnetico
const myObserver = new IntersectionObserver( (entries) => {
    entries.forEach( (entry) => {
    if(entry.isIntersecting){
        entry.target.classList.add('show')

    } else {
        entry.target.classList.remove('show')
    }    
    } )
})

const elements = document.querySelectorAll('.efect')

elements.forEach((elements) => myObserver.observe(elements))

//script para direcionamento a pagina de obrigado.
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "obrigado.html"; // Redireciona manualmente 
        } else {
            alert("Houve um erro ao enviar o formulário. Tente novamente.");
        }
    })
    .catch(error => {
        alert("Erro ao enviar o formulário: " + error.message);
    });
});




