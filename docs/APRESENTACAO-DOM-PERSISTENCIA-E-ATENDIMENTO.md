# Hotel Pet — roteiro de apresentação

Revisão de 03/11/2026. Versão principal: web-ii/hotelpet-final.

## 1. Como apresentar o projeto

“O Hotel Pet é uma aplicação web de demonstração na visão do gerente. HTML estrutura as páginas, CSS define a apresentação e JavaScript implementa navegação de registros, busca, paginação, formulários, regras e persistência local. Não usamos frameworks na aplicação, servidor de aplicação ou banco de dados. Conseguimos demonstrar um fluxo de atendimento integrado porque os registros têm identificadores e vínculos consistentes.”

O enunciado prioriza navegação, buscas e edição das tabelas. O gerente também altera funções de usuários, configura diárias e vagas e edita reservas finalizadas. Cuidados, documentos, caixa, catálogo e cópia de segurança são complementos demonstrativos.

## 2. O que é a árvore DOM

DOM significa Modelo de Objeto de Documento. O navegador lê o HTML e o representa como uma árvore de objetos. É uma árvore hierárquica e ordenada, com número variável de filhos por nó; não é uma árvore binária de busca. A ordem dos irmãos acompanha a ordem do documento. Há nós de documento, elementos, texto e comentários. CSS altera a apresentação; JavaScript acessa os objetos dessa árvore para consultar e modificar a interface.

Exemplo simplificado da lista de usuários:

```text
document
└── html
    ├── head
    │   ├── title
    │   ├── link (CSS)
    │   └── script (JavaScript)
    └── body
        ├── aside (menu)
        ├── header (relógio e perfil)
        └── main (conteúdo principal)
            ├── h1
            ├── formulário de filtros
            └── table
                ├── thead
                └── tbody
                    └── tr
                        ├── td (nome)
                        ├── td (função)
                        └── td (ações)
```

O elemento HTML main delimita o conteúdo principal da página. Não é o mesmo conceito de uma função main de outras linguagens. O ponto de entrada dos módulos JavaScript é sua execução depois de o HTML ser analisado, usando scripts com defer. A ordem dos scripts permite que as regras e os dados estejam disponíveis antes de montar a interface.

Referência: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model.

## 3. Como o JavaScript manipula essa árvore

No arquivo js/hotel-app.js, querySelector localiza tabelas e formulários. createElement cria linhas, células, campos e imagens. textContent coloca texto nas células. append conecta os novos nós aos seus pais. replaceChildren substitui os filhos de um contêiner quando a tabela precisa ser reconstruída.

Os eventos ligam a ação do usuário ao código: input e change atualizam filtros e seleções; click executa ações; submit inicia a validação e o salvamento. preventDefault impede o envio convencional de formulários quando a aplicação processa os dados localmente. O navegador atualiza a apresentação a partir do DOM alterado; não precisamos de um framework para isso.

Onde apontar no código durante a explicação:

| Trecho de hotel-app.js | Papel no fluxo real |
| --- | --- |
| readData() | Lê o JSON salvo e verifica se usuários, animais e reservas são listas válidas; usa os exemplos quando não há estrutura aproveitável |
| saveData() | Serializa o estado e grava localStorage; informa sucesso ou falha |
| commitChange(change) | Guarda uma cópia anterior, executa a alteração e restaura o estado em memória quando a gravação falha |
| document.querySelector(".data-table") | Localiza a tabela da página atual |
| body.replaceChildren() | Retira as linhas anteriores da apresentação antes de reconstruí-las |
| document.createElement("tr") | Cria o nó de uma nova linha |
| row.dataset.id = item.id | Associa a linha ao identificador interno do registro |
| form.addEventListener("submit", ...) | Liga a ação de salvar ao tratamento do formulário |

Na aba Elementos do navegador, expanda main → table → tbody. Depois faça uma busca ou salve uma edição e observe os nós e textos da tabela. Na aba Aplicativo/Armazenamento, abra Local Storage e a chave hotelPetShop.final.records. Mostre que a árvore DOM e o JSON armazenado são estruturas diferentes: a primeira representa a interface; o segundo mantém os dados para reconstruí-la.

Exemplo didático do mesmo padrão usado no projeto:

```js
const linha = document.createElement("tr");
const celula = document.createElement("td");
celula.textContent = usuario.name;
linha.append(celula);
corpoTabela.append(linha);
```

A tabela não é o armazenamento permanente. Ela é uma representação dos registros naquele momento. Filtros e paginação alteram o conjunto apresentado; não devem apagar os registros que ficaram fora da página. Texto fornecido pelo usuário deve ser inserido como texto, sem executá-lo como HTML.

A árvore da interface também não é o vínculo de dados proprietário → animal → reserva. Esses vínculos pertencem aos objetos armazenados por identificadores; eles podem ser representados por diferentes telas e, portanto, por diferentes árvores DOM.

## 4. Persistência sem banco de dados

O estado em memória contém objetos e listas. Para guardar essas estruturas, JSON.stringify converte os objetos em texto e localStorage.setItem grava esse texto no armazenamento do navegador. Ao abrir novamente a aplicação, localStorage.getItem recupera o texto e JSON.parse reconstrói os objetos. O código então monta novamente as tabelas e detalhes.

```text
Preencher formulário → validar → atualizar registro por ID
→ converter para JSON → gravar localStorage → atualizar a interface

Reabrir página → ler localStorage → converter JSON em objetos
→ localizar os vínculos → montar o DOM
```

Principais conjuntos armazenados:

| Chave | Conteúdo |
| --- | --- |
| hotelPetShop.final.records | Usuários, animais e reservas |
| hotelPetShop.final.settings | Diárias, vagas, saída, país e fuso |
| hotelPetShop.final.operations | Cuidados e operações da hospedagem |
| hotelPetShop.final.closings | Fechamentos de caixa demonstrativos |

Não é um banco de dados relacional nem gravação automática de arquivos no servidor. A API pertence à origem do site: protocolo, endereço e porta. localhost, 127.0.0.1 e o endereço publicado podem ter armazenamentos distintos. O GitHub Pages hospeda os arquivos do programa, mas não recebe os cadastros feitos pelo visitante.

Para levar os dados ao computador da apresentação ou ao endereço publicado, exporte a cópia JSON em Configurações e restaure-a no navegador de destino. A restauração valida estrutura, identificadores, vínculos e configurações. O usuário escolhe o arquivo; a aplicação não acessa livremente pastas do computador. Os CSV são relatórios; não substituem a cópia completa em JSON.

Limites: limpar os dados do site pode apagar os cadastros; navegação privada não oferece persistência duradoura; há limite de espaço; computadores e navegadores não sincronizam; edições simultâneas em abas diferentes ainda podem conflitar. Não há transação de banco envolvendo todos os conjuntos; existem verificações e tratamentos locais de falhas, mas não uma garantia de concorrência de servidor.

Referência: https://html.spec.whatwg.org/dev/webstorage.html.

## 5. Vínculos que sustentam o atendimento

Um usuário responsável pode ter muitos animais. Cada animal deve apontar para seu proprietário por ownerId. Uma reserva aponta para o animal por petId e mantém o responsável coerente com esse vínculo. O nome é usado para apresentação; o identificador é usado para encontrar e editar o registro correto.

```text
Proprietário (id)
    ├── Animal A (id, ownerId)
    │      └── Reserva (id, petId, ownerId)
    │             └── Cuidados, entrada, saída e documentos
    └── Animal B (outro id, mesmo ownerId)
```

Dois animais chamados Toto podem existir, inclusive com raças iguais. São registros diferentes porque possuem IDs distintos e proprietários identificados. Editar não deve criar outro ID: altera o registro existente. Os IDs ficam fora dos rótulos principais da interface, mas continuam em vínculos, URLs e cópias JSON. Ocultar um ID não é uma medida de autenticação ou autorização.

## 6. Demonstração prática em aproximadamente oito minutos

1. Entre pelo acesso demonstrativo. Explique que é validação local e pública, sem autenticação real.
2. Cadastre ou escolha um proprietário. Mostre nome completo e identificação resumida com primeiro nome e último sobrenome.
3. Cadastre dois animais vinculados ao responsável. Mostre espécie, raça ou variedade, peso, porte, foto individual e cuidados. A imagem do catálogo é apenas referência.
4. Crie uma reserva para um desses animais. Confira responsável, datas, diária contratada e horário de saída. Não digite novamente o dono como um texto sem vínculo.
5. Pesquise a reserva e edite um dado. Recarregue a página e mostre que a edição persistiu. Mostre também uma reserva finalizada editável na visão do gerente.
6. Na reserva, preencha as conferências e registre a entrada. Mostre o horário efetivo e a alteração da situação. Cuidados e diário acompanham a estadia.
7. Mostre recibo/documentos e caixa: previsão de valor não é igual a pagamento recebido. Na saída, confira pertences e entrega autorizada antes de registrar o encerramento.
8. Em Configurações, apresente diárias, vagas, saída às 12:00, país/fuso e exportação JSON. Mostre alteração de função de um usuário para cumprir o requisito específico do gerente.

Os horários reais são instantes ISO/UTC apresentados no fuso do hotel. As datas de reserva são datas de calendário. A faixa de peso é uma regra comercial do projeto, não um padrão veterinário universal. A alimentação efetiva segue a ficha individual, não uma prescrição automática por raça.

## 7. O que podemos afirmar e o que permanece pendente

Podemos demonstrar um fluxo organizado de atendimento, com vínculos, regras, manipulação de DOM, persistência e relatórios. Não devemos apresentar o protótipo como sistema comercial completo ou como controle seguro de contas individuais.

Continuam pendentes a validação completa de sobreposição/capacidade para todos os períodos, fotos por lançamento do diário, concorrência entre abas e a cobertura fotográfica integral do catálogo. Licenças ambientais não são emitidas ou validadas pelo sistema; a lista de espécies não autoriza o hotel a hospedá-las. A comparação visual integral com o Figma e o histórico de entregas da disciplina são conferências separadas.

## 8. Preparação para publicação

scripts/preparar-pages.cjs gera .dist-pages com HTML, CSS, JavaScript e imagens. A versão final ocupa a raiz do pacote; as etapas anteriores ficam em suas próprias pastas. Ferramentas Python, testes e arquivos de trabalho não viram dependências da aplicação publicada. O workflow .github/workflows/deploy.yml verifica os arquivos e publica o artefato estático no Pages quando executado.

Prepare a cópia JSON antes de trocar de endereço ou de navegador. Teste o endereço publicado em uma janela separada e restaure somente os dados demonstrativos que deseja usar. Não publique a cópia de dados pessoais junto ao site. A preparação local do pacote não significa que o deploy já foi realizado.
