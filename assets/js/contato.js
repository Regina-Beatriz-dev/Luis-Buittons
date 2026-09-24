document.addEventListener('DOMContentLoaded', () => {

    // animação de entrada dos itens de informação, um a um
    document.querySelectorAll('.item-informacao').forEach((item, indice) => {
        setTimeout(() => item.classList.add('mostrar'), indice * 120);
    });

    requestAnimationFrame(() => {
        document.querySelector('.mapa-contato').classList.add('mostrar');
    });

    // contador de caracteres da mensagem
    const campoMensagem = document.getElementById('campo-mensagem');
    const contadorAtual = document.getElementById('contador-atual');
    campoMensagem.addEventListener('input', () => {
        contadorAtual.innerText = campoMensagem.value.length;
    });

    // validação e envio do formulário
    const formulario = document.getElementById('formulario-contato');
    const botaoEnviar = formulario.querySelector('.botao-enviar');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            formulario.querySelectorAll(':invalid').forEach(campo => {
                const container = campo.closest('.campo');
                container.classList.add('balancar');
                container.addEventListener('animationend', () => container.classList.remove('balancar'), { once: true });
            });
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

function mostrarAviso(mensagem) {
    const caixa = document.getElementById('aviso-formulario');
    caixa.querySelector('.toast-body').innerText = mensagem;
    new bootstrap.Toast(caixa).show();
}