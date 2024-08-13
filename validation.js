 // JavaScript Validar campo de contato, não deixar enviar sem o preechimento.
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


//Esse código é para a rolagem automatica da pagina



