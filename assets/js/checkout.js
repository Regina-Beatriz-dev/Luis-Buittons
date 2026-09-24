        // 
        
        const form = document.getElementById('formCheckout');
        const dadosCartao = document.getElementById('dadosCartao');
        const camposCartao = dadosCartao.querySelectorAll('input');

        const CHAVE_CARRINHO = 'carrinhoBuittons';
        const FRETE_GRATIS_A_PARTIR_DE = 299;
        const VALOR_FRETE = 15;


        /* ---------- 1. Máscaras (CPF, telefone, CEP, cartão...) ---------- */

        function aplicarMascara(valor, modelo) {
            const numeros = valor.replace(/\D/g, '');
            let i = 0;
            return modelo.replace(/0/g, () => numeros[i++] ?? '').replace(/\D+$/, '');
        }

        const mascaras = {
            cpf:      v => aplicarMascara(v, '000.000.000-00'),
            telefone: v => aplicarMascara(v, v.replace(/\D/g, '').length > 10 ? '(00) 00000-0000' : '(00) 0000-0000'),
            cep:      v => aplicarMascara(v, '00000-000'),
            cartao:   v => aplicarMascara(v, '0000 0000 0000 0000'),
            validade: v => aplicarMascara(v, '00/00'),
            cvv:      v => aplicarMascara(v, '0000')
        };

        document.querySelectorAll('[data-mascara]').forEach(campo => {
            campo.addEventListener('input', () => {
                campo.value = mascaras[campo.dataset.mascara](campo.value);
            });
        });


        /* ---------- 2. Mostrar/esconder os dados do cartão ---------- */

        document.querySelectorAll('input[name="pagamento"]').forEach(opcao => {
            opcao.addEventListener('change', () => {
                const usaCartao = opcao.value === 'cartao';
                dadosCartao.classList.toggle('d-none', !usaCartao);
                camposCartao.forEach(campo => campo.required = usaCartao);
            });
        });


        /* ---------- 3. Ligação com o carrinho (localStorage) ---------- */

        const formatarMoeda = valor => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        function lerCarrinho() {
            const salvo = localStorage.getItem(CHAVE_CARRINHO);
            return salvo ? JSON.parse(salvo) : [];
        }

        function renderizarResumo() {
            const carrinho = lerCarrinho();
            const containerProdutos = document.getElementById('resumoProdutos');
            const avisoVazio = document.getElementById('avisoCarrinhoVazio');
            const btnFinalizar = document.getElementById('btnFinalizarPedido');

            containerProdutos.innerHTML = '';
            let subtotal = 0;

            if (carrinho.length === 0) {
                avisoVazio.classList.remove('d-none');
                btnFinalizar.disabled = true;
            } else {
                avisoVazio.classList.add('d-none');
                btnFinalizar.disabled = false;

                carrinho.forEach(produto => {
                    const subtotalProduto = produto.preco * produto.quantidade;
                    subtotal += subtotalProduto;

                    containerProdutos.innerHTML += `
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <img src="${produto.imagem}" alt="${produto.nome}" width="64" height="64"
                                class="rounded object-fit-cover">
                            <div class="flex-grow-1">
                                <strong class="d-block">${produto.nome}</strong>
                                <small class="text-body-secondary">Quantidade: ${produto.quantidade}</small>
                            </div>
                            <strong>${formatarMoeda(subtotalProduto)}</strong>
                        </div>
                    `;
                });
            }

            const frete = (subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR_DE) ? 0 : VALOR_FRETE;
            const total = subtotal + frete;

            document.getElementById('resumoSubtotal').innerText = formatarMoeda(subtotal);
            document.getElementById('resumoFrete').innerText = frete === 0 ? 'Grátis' : formatarMoeda(frete);
            document.getElementById('resumoTotal').innerText = formatarMoeda(total);
        }

        renderizarResumo();


        /* ---------- 4. Validação e envio ---------- */

        form.addEventListener('submit', evento => {
            evento.preventDefault();

            if (lerCarrinho().length === 0) {
                return; // não deixa finalizar com carrinho vazio
            }

            if (form.checkValidity()) {
                // Aqui entra o envio real para o servidor / gateway de pagamento
                localStorage.removeItem(CHAVE_CARRINHO); // esvazia o carrinho após o pedido
                alert('Pedido finalizado com sucesso!');
                window.location.href = 'index.html';
            }

            form.classList.add('was-validated');
        });