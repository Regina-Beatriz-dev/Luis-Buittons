document.addEventListener('DOMContentLoaded', () => {

    const quadro = document.querySelector('.quadro-acesso');
    requestAnimationFrame(() => quadro.classList.add('mostrar'));

    if (obterUsuarioLogado()) {
        window.location.href = 'perfil.html';
        return;
    }

    // alterna a visibilidade das senhas
    document.querySelectorAll('.botao-mostrar-senha').forEach(botao => {
        botao.addEventListener('click', () => {
            const campo = document.getElementById(botao.dataset.alvo);
            const icone = botao.querySelector('i');
            campo.type = campo.type === 'password' ? 'text' : 'password';
            icone.classList.toggle('fa-eye');
            icone.classList.toggle('fa-eye-slash');
        });
    });

    const formulario = document.getElementById('formulario-cadastro');
    const botaoCriar = formulario.querySelector('.botao-entrar');
    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoTelefone = document.getElementById('campo-telefone');
    const campoSenha = document.getElementById('campo-senha');
    const campoConfirmarSenha = document.getElementById('campo-confirmar-senha');

    // verifica se as senhas coincidem em tempo real
    function validarSenhasIguais() {
        campoConfirmarSenha.setCustomValidity(
            campoSenha.value !== campoConfirmarSenha.value ? 'As senhas não coincidem.' : ''
        );
    }
    campoSenha.addEventListener('input', validarSenhasIguais);
    campoConfirmarSenha.addEventListener('input', validarSenhasIguais);

    // limpa erro de "e-mail já existe" assim que o usuário volta a digitar
    campoEmail.addEventListener('input', () => campoEmail.setCustomValidity(''));

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        validarSenhasIguais();

        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            balancarCamposInvalidos(formulario);
            return;
        }

        const resultado = cadastrarUsuario({
            nome: campoNome.value.trim(),
            email: campoEmail.value.trim(),
            telefone: campoTelefone.value.trim(),
            senha: campoSenha.value
        });

        if (!resultado.sucesso) {
            campoEmail.setCustomValidity(resultado.mensagem);
            formulario.classList.add('was-validated');
            balancarCamposInvalidos(formulario);
            mostrarAviso(resultado.mensagem, 'erro');
            return;
        }

        botaoCriar.disabled = true;
        botaoCriar.innerText = 'Criando conta...';

        mostrarAviso('Conta criada com sucesso! Redirecionando para o seu perfil...', 'sucesso');
        setTimeout(() => { window.location.href = 'perfil.html'; }, 1200);
    });

});
