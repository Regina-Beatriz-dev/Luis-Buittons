document.addEventListener('DOMContentLoaded', () => {

    const quadro = document.querySelector('.quadro-acesso');
    requestAnimationFrame(() => quadro.classList.add('mostrar'));

    // se já tem alguém logado, não faz sentido ficar na tela de login
    if (obterUsuarioLogado()) {
        window.location.href = 'perfil.html';
        return;
    }

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

    const formulario = document.getElementById('formulario-entrar');
    const botaoEntrar = formulario.querySelector('.botao-entrar');
    const campoEmail = document.getElementById('campo-email');
    const campoSenha = document.getElementById('campo-senha');
    const lembrarAcesso = document.getElementById('lembrar-acesso');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            balancarCamposInvalidos(formulario);
            return;
        }

        const resultado = autenticarUsuario(campoEmail.value, campoSenha.value, lembrarAcesso.checked);

        if (!resultado.sucesso) {
            mostrarAviso(resultado.mensagem, 'erro');
            balancarCamposInvalidos(formulario, true);
            return;
        }

        botaoEntrar.disabled = true;
        botaoEntrar.innerText = 'Entrando...';

        mostrarAviso(`Bem-vindo(a) de volta, ${resultado.usuario.nome.split(' ')[0]}!`, 'sucesso');
        setTimeout(() => { window.location.href = 'perfil.html'; }, 1200);
    });

});
