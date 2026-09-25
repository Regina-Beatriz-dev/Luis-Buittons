document.addEventListener('DOMContentLoaded', () => {

    const usuario = obterUsuarioLogado();

    // guarda de rota: sem sessão, não entra no perfil
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoTelefone = document.getElementById('campo-telefone');
    const avatar = document.getElementById('avatar-cliente');
    const saudacaoNome = document.getElementById('saudacao-nome');
    const textoClienteDesde = document.getElementById('texto-cliente-desde');

    const formulario = document.getElementById('formulario-perfil');
    const botaoEditar = document.getElementById('botao-editar');
    const botaoCancelar = document.getElementById('botao-cancelar');
    const acoesFormulario = document.getElementById('acoes-formulario');

    let valoresOriginais = {};

    function preencherTela(dadosUsuario) {
        campoNome.value = dadosUsuario.nome;
        campoEmail.value = dadosUsuario.email;
        campoTelefone.value = dadosUsuario.telefone || '';

        saudacaoNome.innerText = `Olá, ${dadosUsuario.nome.split(' ')[0]}`;
        avatar.innerText = gerarIniciais(dadosUsuario.nome);

        if (dadosUsuario.dataCadastro) {
            const data = new Date(dadosUsuario.dataCadastro).toLocaleDateString('pt-BR');
            textoClienteDesde.innerText = `Cliente desde ${data}`;
        }

        valoresOriginais = { nome: dadosUsuario.nome, telefone: dadosUsuario.telefone || '' };
    }

    function gerarIniciais(nomeCompleto) {
        const partes = nomeCompleto.trim().split(' ').filter(Boolean);
        const primeira = partes[0]?.[0] || '';
        const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
        return (primeira + ultima).toUpperCase();
    }

    preencherTela(usuario);

    // animação de entrada
    requestAnimationFrame(() => {
        document.querySelector('.cabecalho-perfil').classList.add('mostrar');
        document.querySelector('.cartao-dados').classList.add('mostrar');
        document.querySelector('.cartao-lateral').classList.add('mostrar');
    });

    // entra em modo de edição
    botaoEditar.addEventListener('click', () => {
        campoNome.disabled = false;
        campoTelefone.disabled = false;
        acoesFormulario.classList.remove('oculto');
        botaoEditar.classList.add('d-none');
        campoNome.focus();
    });

    // sai do modo de edição sem salvar
    botaoCancelar.addEventListener('click', () => {
        campoNome.value = valoresOriginais.nome;
        campoTelefone.value = valoresOriginais.telefone;
        sairDoModoEdicao();
    });

    function sairDoModoEdicao() {
        campoNome.disabled = true;
        campoTelefone.disabled = true;
        acoesFormulario.classList.add('oculto');
        botaoEditar.classList.remove('d-none');
        formulario.classList.remove('was-validated');
    }

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            balancarCamposInvalidos(formulario);
            return;
        }

        const usuarioAtualizado = atualizarUsuarioLogado({
            nome: campoNome.value.trim(),
            telefone: campoTelefone.value.trim()
        });

        preencherTela(usuarioAtualizado);
        sairDoModoEdicao();
        mostrarAviso('Dados atualizados com sucesso!');
    });

    // logout
    document.getElementById('botao-sair').addEventListener('click', () => {
        encerrarSessao();
        window.location.href = '../index.html';
    });

});
