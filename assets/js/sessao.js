/*
    Roda em toda página que tem o header padrão do grupo.
    1) Ajusta o ícone de usuário: se tiver alguém logado, leva pro perfil;
       se não, leva pro login. Depende do banco-usuarios.js estar incluído antes.
    2) Concentra funções de interface reaproveitadas por login.js, cadastro.js,
       perfil.js e contato.js — mostrarAviso() e balancarCamposInvalidos() —
       pra não duplicar a mesma lógica em cada arquivo.
*/
document.addEventListener('DOMContentLoaded', () => {
    const linkUsuario = document.getElementById('link-usuario');
    if (!linkUsuario) return;

    const usuario = obterUsuarioLogado();

    if (usuario) {
        linkUsuario.setAttribute('href', linkUsuario.dataset.perfil);
        linkUsuario.setAttribute('title', usuario.nome);
    } else {
        linkUsuario.setAttribute('href', linkUsuario.dataset.login);
        linkUsuario.removeAttribute('title');
    }
});

function mostrarAviso(mensagem, tipo = 'sucesso') {
    const caixa = document.getElementById('aviso-formulario');
    if (!caixa) return;

    caixa.querySelector('.toast-body').innerText = mensagem;
    caixa.classList.remove('bg-dark', 'bg-danger');
    caixa.classList.add(tipo === 'erro' ? 'bg-danger' : 'bg-dark');
    new bootstrap.Toast(caixa).show();
}

function balancarCamposInvalidos(formulario, forcarTodos = false) {
    const campos = forcarTodos
        ? formulario.querySelectorAll('.campo, .campo-aceite')
        : formulario.querySelectorAll(':invalid');

    campos.forEach(campo => {
        const container = campo.closest('.campo') || campo.closest('.campo-aceite') || campo;
        container.classList.add('balancar');
        container.addEventListener('animationend', () => container.classList.remove('balancar'), { once: true });
    });
}
