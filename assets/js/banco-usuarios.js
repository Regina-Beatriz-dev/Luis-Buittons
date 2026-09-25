/*
    SIMULAÇÃO DE BANCO DE DADOS DE USUÁRIOS (localStorage)
    ---------------------------------------------------------
    ATENÇÃO: isto é apenas uma simulação para fins acadêmicos.
    As senhas ficam salvas em texto puro no navegador e são visíveis
    pelo DevTools.
*/

const CHAVE_USUARIOS = 'usuariosBuittons';
const CHAVE_SESSAO = 'usuarioLogadoBuittons';

function listarUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function buscarUsuarioPorEmail(email) {
    return listarUsuarios().find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
}

function cadastrarUsuario({ nome, email, telefone, senha }) {
    if (buscarUsuarioPorEmail(email)) {
        return { sucesso: false, mensagem: 'Já existe uma conta com este e-mail.' };
    }

    const usuarios = listarUsuarios();
    const novoUsuario = { id: Date.now().toString(), nome, email, telefone, senha, dataCadastro: new Date().toISOString() };
    usuarios.push(novoUsuario);
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

    iniciarSessao(novoUsuario, true);
    return { sucesso: true, usuario: novoUsuario };
}

function autenticarUsuario(email, senha, manterConectado) {
    const usuario = buscarUsuarioPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
        return { sucesso: false, mensagem: 'E-mail ou senha incorretos.' };
    }

    iniciarSessao(usuario, manterConectado);
    return { sucesso: true, usuario };
}

function iniciarSessao(usuario, manterConectado) {
    const dadosSessao = JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        dataCadastro: usuario.dataCadastro
    });

    // "Lembrar de mim" marcado -> localStorage (sobrevive ao fechar o navegador)
    // Não marcado -> sessionStorage (dura só a aba/sessão atual)
    if (manterConectado) {
        localStorage.setItem(CHAVE_SESSAO, dadosSessao);
    } else {
        sessionStorage.setItem(CHAVE_SESSAO, dadosSessao);
    }
}

function obterUsuarioLogado() {
    const dados = localStorage.getItem(CHAVE_SESSAO) || sessionStorage.getItem(CHAVE_SESSAO);
    return dados ? JSON.parse(dados) : null;
}

function atualizarUsuarioLogado(dadosAtualizados) {
    const usuarioAtual = obterUsuarioLogado();
    if (!usuarioAtual) return null;

    const usuarios = listarUsuarios();
    const indice = usuarios.findIndex(usuario => usuario.id === usuarioAtual.id);
    if (indice === -1) return null;

    usuarios[indice] = { ...usuarios[indice], ...dadosAtualizados };
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

    const persistente = !!localStorage.getItem(CHAVE_SESSAO);
    iniciarSessao(usuarios[indice], persistente);

    return usuarios[indice];
}

function encerrarSessao() {
    localStorage.removeItem(CHAVE_SESSAO);
    sessionStorage.removeItem(CHAVE_SESSAO);
}
