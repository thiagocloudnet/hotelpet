# Mapa do código fonte — Hotel Pet

Entrada recomendada: web-ii/hotelpet-final/index.html. Na prévia local, o servidor de desenvolvimento abre o painel.

## Pastas

| Pasta | Responsabilidade |
| --- | --- |
| web-ii/hotelpet-final | Aplicação a entregar |
| web-ii/hotelpet-01 | Etapa de navegação |
| web-ii/hotelpet-02 | Etapa de buscas |
| projeto | Versão de Web I |
| docs | Explicações e conferência dos requisitos |
| tests | Verificações de desenvolvimento, fora do site público |
| relatorios | Evidências e resultados dos testes |
| scripts | Preparação do pacote de publicação |
| .dist-pages | Resultado gerado; editar o código da versão final, não esta pasta |

## Páginas da versão final

- index.html e login.html: entrada demonstrativa.
- painel.html: resumo, ocupação, atalhos e fechamento de caixa.
- usuarios.html, usuario_cadastrar.html, usuario_editar.html, usuario_visualizar.html: responsáveis e equipe.
- pets.html, pet_cadastrar.html, pet_editar.html, pet_visualizar.html: animais, vínculos e histórico.
- reservas.html, reserva_cadastrar.html, reserva_editar.html, reserva_visualizar.html: hospedagens, cuidados, diário e documentos.
- perfil.html: dados do gerente.
- configuracoes.html: diárias, capacidade e horário de saída.

## JavaScript

| Arquivo em js/ | O que faz |
| --- | --- |
| financeiro-regras.js | Funções de centavos, datas, diárias, valores, ocupação e fechamento |
| dados-exemplo.js | Exemplos fictícios, migração e numeração de reservas |
| hotel-app.js | Coordena registros, tabelas, filtros, paginação, formulários, vínculos e detalhes |
| hotel-config.js | Lê e salva preços, capacidade e horário configurado |
| hospedagem-local.js | Saúde, diário da estadia, documentos e impressão |
| fechamento-caixa.js | Interface de conferência e fechamento no painel |
| pesquisa-global.js | Sugestões de busca, similaridade e navegação por código |
| catalogo-racas.js | Dados do catálogo de espécies e raças |
| filtro-racas.js | Opções dos filtros de raça |
| formulario-racas.js | Opções de raça nos formulários |
| interface.js | Relógio, menu e seleção entre clientes e equipe |
| tema-perfil.js | Tema visual e menu do perfil |
| recibo-perfil.js | Interações demonstrativas do perfil |
| login-demo.js | Validação e entrada demonstrativa |
| navegacao-demo.js | Arquivo herdado da navegação demonstrativa; não é o responsável por salvar cadastros da versão final |

## Armazenamento local

| Chave | Conteúdo |
| --- | --- |
| hotelPetShop.final.records | Usuários, animais e reservas |
| hotelPetShop.final.settings | Diárias, capacidade e horário de saída |
| hotelPetShop.final.operations | Cuidados, diário e recebimento informado por reserva |
| hotelPetShop.final.closings | Cópias dos fechamentos por data |

O nome das chaves foi mantido para não perder compatibilidade com cadastros existentes. Essas chaves não são um banco de dados de servidor. Limpar os dados do navegador remove os registros. A aplicação não sincroniza computadores.

## Fluxo principal

Os scripts são carregados com defer, depois da leitura do HTML. As regras financeiras são disponibilizadas antes dos exemplos e da aplicação. hotel-app.js recupera os registros, preserva códigos, monta as tabelas ou formulários e permite consultar uma cópia dos dados aos módulos de busca e hospedagem. Salvar edição atualiza o mesmo código. O nome completo permanece armazenado; a identificação resumida usa primeiro nome e último sobrenome.

HTML define os elementos; css/estilo.css define o visual; JavaScript dá comportamento. Comece por uma tela e acompanhe o mesmo código de registro do link até o formulário e a gravação. Os testes não fazem parte da aplicação publicada.


## Arquivos persistentes e relatórios

`web-ii/hotelpet-final/js/arquivos-relatorios.js` acrescenta à página Configurações a exportação JSON, a restauração validada e três relatórios CSV. O módulo usa os quatro conjuntos locais existentes, sem alterar os códigos dos vínculos. Consulte `docs/PROPRIETARIOS-ARQUIVOS-E-RELATORIOS.md`.

## Catálogo e movimentos reais

racas.html apresenta grupos, filtros e mapa ilustrado. js/catalogo-racas.js contém as referências estáticas; js/racas-imagens.js monta cartões, paginação e prévia no cadastro. scripts/atualizar-racas-imagens.py prepara arquivos no desenvolvimento e não é executado no site. O porte usa peso individual, com precisão de gramas.

js/hospedagem-local.js registra entrada e saída reais na reserva com horário de Brasília. O planejamento da diária permanece separado dos movimentos realizados. Consulte docs/CATALOGO-E-GRUPOS-DE-HOSPEDAGEM.md.

Conferência de 03/11/2026: 521 referências, 403 fotos com crédito/licença, 118 sem foto aprovada e 61 verificações específicas aprovadas nesta rodada.
