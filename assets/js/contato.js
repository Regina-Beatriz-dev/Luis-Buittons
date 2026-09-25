document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.item-informacao').forEach((item, indice) => {
        setTimeout(() => item.classList.add('mostrar'), indice * 120);
    });

    requestAnimationFrame(() => {
        document.querySelector('.mapa-contato').classList.add('mostrar');
    });

    const campoMensagem = document.getElementById('campo-mensagem');
    const contadorAtual = document.getElementById('contador-atual');
    campoMensagem.addEventListener('input', () => {
        contadorAtual.innerText = campoMensagem.value.length;
    });

    const formulario = document.getElementById('formulario-contato');
    const botaoEnviar = formulario.querySelector('.botao-enviar');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            balancarCamposInvalidos(formulario);
            return;
        }

        botaoEnviar.disabled = true;
        botaoEnviar.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
            mostrarAviso('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            formulario.reset();
            formulario.classList.remove('was-validated');
            contadorAtual.innerText = '0';
            botaoEnviar.disabled = false;
            botaoEnviar.innerHTML = 'Enviar mensagem <i class="fa-solid fa-paper-plane"></i>';
        }, 900);
    });

});
