document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.btn-add-carrinho');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));
            const imagem = this.getAttribute('data-imagem');

            adicionarAoCarrinho(id, nome, preco, imagem);
        });
    });
});