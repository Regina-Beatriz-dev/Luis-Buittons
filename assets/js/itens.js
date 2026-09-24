document.addEventListener('DOMContentLoaded', () => {
            
            // --- 1. LÓGICA DO CARRINHO ---
            const botoesAdicionar = document.querySelectorAll('.btn-add-carrinho');
            botoesAdicionar.forEach(botao => {
                botao.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const nome = this.getAttribute('data-nome');
                    const preco = parseFloat(this.getAttribute('data-preco'));
                    const imagem = this.getAttribute('data-imagem');
                    
                    adicionarAoCarrinho(id, nome, preco, imagem);
                });
            });

            // --- 2. LÓGICA DOS FILTROS DE CATEGORIA ---
            const checkboxes = document.querySelectorAll('.filtro-categoria');
            const gridProdutos = document.getElementById('grid-produtos');
            const produtos = Array.from(document.querySelectorAll('.produto-item'));
            const contador = document.getElementById('contador-produtos');

            function atualizarFiltros() {
                // Pega quais categorias estão marcadas
                const selecionados = Array.from(checkboxes)
                    .filter(chk => chk.checked)
                    .map(chk => chk.value);
                
                let visiveis = 0;

                produtos.forEach(produto => {
                    const categoria = produto.getAttribute('data-categoria');
                    
                    // Se nada estiver marcado ou a categoria do produto estiver marcada, mostramos
                    if (selecionados.length === 0 || selecionados.includes(categoria)) {
                        produto.style.display = 'block';
                        visiveis++;
                    } else {
                        // Caso contrário, ocultamos
                        produto.style.display = 'none';
                    }
                });

                contador.innerText = `Mostrando ${visiveis} produtos`;
            }

            // Ativa o filtro sempre que clicar em um checkbox
            checkboxes.forEach(chk => {
                chk.addEventListener('change', atualizarFiltros);
            });

            // --- 3. LÓGICA DE ORDENAÇÃO POR PREÇO ---
            const selectOrdem = document.getElementById('ordenar-precos');
            
            selectOrdem.addEventListener('change', function() {
                const valor = this.value; // 0, 1 ou 2
                
                if (valor === '1') {
                    // Menor preço
                    produtos.sort((a, b) => parseFloat(a.getAttribute('data-preco')) - parseFloat(b.getAttribute('data-preco')));
                } else if (valor === '2') {
                    // Maior preço
                    produtos.sort((a, b) => parseFloat(b.getAttribute('data-preco')) - parseFloat(a.getAttribute('data-preco')));
                } else {
                    // Mais recentes (Ordem original)
                    produtos.sort((a, b) => parseInt(a.getAttribute('data-ordem')) - parseInt(b.getAttribute('data-ordem')));
                }

                // Reorganiza no HTML
                produtos.forEach(produto => gridProdutos.appendChild(produto));
            });

        });