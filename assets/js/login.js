document.addEventListener('DOMContentLoaded', () => {

    const quadro = document.querySelector('.quadro-acesso');
    requestAnimationFrame(() => quadro.classList.add('mostrar'));

    // alterna a visibilidade da senha
    document.querySelectorAll('.botao-mostrar-senha').forEach(botao => {
        botao.addEventListener('click', () => {
            const campo = document.getElementById(botao.dataset.alvo);
            const icone = botao.querySelector('i');
            campo.type = campo.type === 'password' ? 'text' : 'password';
            icone.classList.toggle('fa-eye');
            icone.classList.toggle('fa-eye-slash');
        });
    });

    // validação e envio do formulário
    const formulario = document.getElementById('formulario-entrar');
    const botaoEntrar = formulario.querySelector('.botao-entrar');

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

        botaoEntrar.disabled = true;
        botaoEntrar.innerText = 'Entrando...';

        setTimeout(() => {
            mostrarAviso('Login realizado com sucesso! Redirecionando...');
            setTimeout(() => { window.location.href = '../index.html'; }, 1500);
        }, 900);
    });

});

function mostrarAviso(mensagem) {
    const caixa = document.getElementById('aviso-formulario');
    caixa.querySelector('.toast-body').innerText = mensagem;
    new bootstrap.Toast(caixa).show();
}