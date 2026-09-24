document.addEventListener('DOMContentLoaded', () => {
    // PRODUTO MOCK (Apenas para você conseguir visualizar a página funcionando)
    if (!localStorage.getItem('carrinhoBuittons') || JSON.parse(localStorage.getItem('carrinhoBuittons')).length === 0) {
        const produtoTeste = [{
            id: '1',
            nome: 'Vestido Midi em Seda',
            preco: 890.00,
            quantidade: 1,
            imagem: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }];
        localStorage.setItem('carrinhoBuittons', JSON.stringify(produtoTeste));
    }

    renderizarCarrinho();
});

function renderizarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinhoBuittons');
    let carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

    const containerProdutos = document.getElementById('lista-produtos');
    const containerVazio = document.getElementById('carrinho-vazio');
    const btnFinalizar = document.getElementById('btn-finalizar');

    containerProdutos.innerHTML = '';
    let valorTotal = 0;

    if (carrinho.length === 0) {
        containerVazio.classList.remove('d-none');
        btnFinalizar.classList.add('disabled');
    } else {
        containerVazio.classList.add('d-none');
        btnFinalizar.classList.remove('disabled');

        carrinho.forEach((produto, index) => {
            const subtotalProduto = produto.preco * produto.quantidade;
            valorTotal += subtotalProduto;

            containerProdutos.innerHTML += `
                <div class="row align-items-center mb-4 border-bottom pb-3">
                    <div class="col-3 col-md-2">
                        <img src="${produto.imagem}" alt="${produto.nome}" class="img-fluid rounded">
                    </div>
                    <div class="col-9 col-md-4 mb-2 mb-md-0">
                        <h6 class="mb-1">${produto.nome}</h6>
                        <span class="text-muted small">Ref: LB-${produto.id}00${index}</span>
                    </div>
                    <div class="col-6 col-md-3 text-center">
                        <div class="input-group input-group-sm w-75 mx-auto">
                            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, -1)">-</button>
                            <input type="text" class="form-control text-center bg-light" value="${produto.quantidade}" readonly>
                            <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-6 col-md-2 text-end fw-bold">
                        ${formatarMoeda(subtotalProduto)}
                    </div>
                    <div class="col-12 col-md-1 text-end text-md-center mt-2 mt-md-0">
                        <button class="btn btn-link text-danger p-0" onclick="removerItem(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('resumo-subtotal').innerText = formatarMoeda(valorTotal);
    document.getElementById('resumo-total').innerText = formatarMoeda(valorTotal);
}

function alterarQuantidade(index, alteracao) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoBuittons'));
    carrinho[index].quantidade += alteracao;
    if (carrinho[index].quantidade < 1) {
        carrinho[index].quantidade = 1;
    }
    localStorage.setItem('carrinhoBuittons', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoBuittons'));
    carrinho.splice(index, 1);
    localStorage.setItem('carrinhoBuittons', JSON.stringify(carrinho));
    renderizarCarrinho();
}