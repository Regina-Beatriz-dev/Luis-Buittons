// Funções de carrinho compartilhadas entre main.js, produtos.js e carrinho.js

function adicionarAoCarrinho(id, nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoBuittons')) || [];
    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }

    localStorage.setItem('carrinhoBuittons', JSON.stringify(carrinho));
    mostrarToast(nome + " foi adicionado ao seu carrinho!");
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarToast(mensagem) {
    const toastEl = document.getElementById('toast-carrinho');

    if (!toastEl) {
        // fallback caso a página ainda não tenha o toast no HTML
        alert(mensagem);
        return;
    }

    toastEl.querySelector('.toast-body').innerText = mensagem;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}