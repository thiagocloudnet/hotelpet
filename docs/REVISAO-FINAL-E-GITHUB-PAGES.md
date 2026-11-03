# Versão selecionada e preparação da entrega

Revisão em 03/11/2026. Trabalho individual de Programação Web II, UESB. Prazo informado no enunciado: 04/11/2026, às 23h59, horário de Brasília.

## Qual versão usar

A base selecionada é **`web-ii/hotelpet-final` do repositório atual**. Entre as cópias locais examinadas, é a que integra os requisitos de navegação, buscas, edição por ID, usuários e funções, configurações, além de cuidados, diário e documentos de hospedagem.

A comparação registrou 22 raízes de comparação, incluindo o projeto atual e sua cópia preservada. Uma das raízes é um pacote que contém outras versões, portanto a contagem não representa 22 aplicações independentes. Foram examinados também os índices de 31 ZIPs. O ZIP maior contém várias versões; quantidade de páginas ou scripts, por si só, não significa maior completude. Os resultados detalhados estão em `relatorios/comparacao-versoes.json` e `relatorios/comparacao-zips.json`.

As cópias antigas foram preservadas. Arquivos em pastas de outras pessoas não foram incorporados à versão individual do aluno.

## Revisão do responsável e dos animais com nomes iguais

O cadastro do responsável é o ponto principal de consulta: mostra seu código, seus animais e suas reservas. Os atalhos de cadastro levam o código do responsável para selecionar os vínculos corretos. A consulta e os documentos usam os códigos dos registros; nomes iguais não identificam um registro de forma única.

Foi retirada a troca automática de nomes antigos. Dois animais chamados **Toto**, da mesma raça e com donos diferentes, permanecem separados. O teste 36 confirma nomes preservados e reservas vinculadas aos donos corretos. A seleção da reserva apresenta o nome completo e o e-mail do dono para facilitar a distinção.

A revisão adicional tem **50 casos funcionais independentes**, com resultado em `relatorios/50-testes-responsavel.md`. Os testes usam sessões isoladas, sem alterar os cadastros do navegador do aluno. Também houve três rodadas de edição, duas rodadas completas de apresentação e três rodadas específicas de usabilidade. As capturas do caso dos dois Totos ficam em `relatorios/dois-totos-donos-diferentes.png`.

Os rótulos de entrada, saída e situação foram colocados em português. Os nomes cadastrados de pessoas e animais são preservados. A página do responsável pode ser consultada no servidor local em `http://127.0.0.1:8090/usuario_visualizar.html?id=u3` enquanto ele estiver ativo.

## Correções desta revisão

- Diária digitada na edição passa a atualizar total, registro e documento. Valor zero é preservado, inclusive após mudança das tarifas gerais.
- A edição de reservas finalizadas mantém o valor contratado quando o pet não é trocado. Trocar o pet reaplica a tarifa do respectivo porte.
- Fotos de usuários e do gerente são gravadas e exibidas; upload usa JPG/PNG/WebP até 1,5 MB, como o cadastro de pets.
- Ações em lote tratam falha de armazenamento e preservam o estado anterior. A proteção especial se refere ao gerente principal `u1`; os demais gerentes podem ser administrados.
- O gerente principal permanece ativo, com função Gerente; as funções dos demais usuários continuam editáveis.
- Campos de anotações, imagens e recibo fixos na edição da reserva foram substituídos por um link para os detalhes da reserva correta, onde diário e documentos realmente funcionam.
- Reserva com ID inválido deixa de exibir um botão de salvar sem função.
- O nome do registro passa a identificar também o caminho da tela de edição.
- Busca por similaridade prioriza o nome do pet/usuário pesquisado sobre registros apenas relacionados.
- Seletor de documentos foi ajustado para não exceder a largura do celular.
- Estrutura inválida do armazenamento é tratada na inicialização.

## Testes

As ferramentas de teste ficam fora do código publicado. Playwright não integra a aplicação e não cria dependência de biblioteca no trabalho acadêmico.

- `node tests/auditar-fonte.cjs`: referências de HTML, IDs repetidos, estrutura e sintaxe dos scripts das etapas.
- `node tests/verificar-edicao.cjs`: edição, vínculos, persistência, funções, status, remoção, reserva finalizada e configurações.
- `node tests/verificar-web-ii.cjs`: fluxos entre módulos, buscas, cálculos, menus e 112 combinações de apresentação.
- `node tests/verificar-final.cjs`: casos de erro, upload, diária zero, cuidados, diário, contrato, impressão, armazenamento indisponível, IDs inválidos, busca pelo teclado, abertura local e telas nos dois temas em 320/768/1440 pixels. Resultado em `relatorios/verificacao-final.json`.
- `node scripts/preparar-pages.cjs` seguido de `node tests/verificar-pages.cjs`: pacote estático, arquivos e caminhos com distinção entre maiúsculas e minúsculas, como na hospedagem Linux.

Testes não provam ausência de todos os defeitos. A fidelidade visual completa ao Figma e o uso em todos os navegadores não foram certificados. Uma publicação real também requer conferência após o deploy.

Resultado final desta execução: auditoria de 52 páginas e 30 scripts sem erros ou avisos; teste de edição aprovado; 112 verificações de apresentação anteriores aprovadas; 14 grupos adicionais e 96 combinações de tela aprovados, sem erros JavaScript. Pacote público com 252 arquivos e 92 páginas, sem recursos ausentes. As 92 páginas incluem cópias de publicação das etapas e Web I, não 92 telas diferentes da versão final. As capturas `relatorios/final-painel-desktop.png` e `relatorios/final-reserva-celular.png` registram a revisão visual.

## Pode hospedar no GitHub?

**Sim.** HTML, CSS e JavaScript puro são compatíveis com [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Os dados continuam no `localStorage` de cada navegador; hospedagem não transforma a demonstração em banco compartilhado nem em autenticação real.

O repositório público `thiagocloudnet/hotelpet` já está configurado para Pages com GitHub Actions. Na consulta desta revisão, o último commit remoto era `a228051e6a5480b374e2e1fa341111dff49ef06d`, de 21/10/2026, com deploy concluído. Isso não inclui as alterações locais desta revisão.

**Problema de acesso encontrado:** o Pages usa o domínio personalizado `hotelpet.shop`. O endereço `https://thiagocloudnet.github.io/hotelpet/` redireciona para esse domínio, que falhou na resolução DNS. A consulta ao Google Public DNS retornou status 2 (SERVFAIL), com informação de recusa dos servidores de nome. Não foi alterada a configuração remota.

Há duas opções para a publicação:

1. Usar o endereço gratuito `github.io`: remover o domínio personalizado em Settings → Pages e conferir HTTPS e acesso. Não basta abrir o endereço padrão enquanto o redirecionamento estiver configurado.
2. Manter `hotelpet.shop`: corrigir a delegação/configuração DNS no provedor do domínio e depois conferir o certificado e HTTPS no Pages.

## Pacote preparado

O workflow `.github/workflows/deploy.yml` passa a verificar e publicar **somente `.dist-pages`**, em vez de enviar todo o repositório. O pacote contém:

- Versão final na raiz, com a tela de entrada em `/index.html`.
- Etapas acadêmicas em `/web-ii/`.
- Versão de Web I em `/projeto/`.
- Arquivos estáticos necessários, sem relatórios locais, inventários de discos, testes ou projetos paralelos.

Para gerar novamente:

```text
node tests/auditar-fonte.cjs
node scripts/preparar-pages.cjs
node tests/verificar-pages.cjs
```

A pasta `.dist-pages` é gerada e ignorada pelo Git. O workflow a prepara automaticamente. Para publicar, os arquivos de código, scripts de preparação e workflow precisam estar no commit enviado à `main`; o repositório já usa Source = GitHub Actions. Consulte a [documentação de workflows do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## É necessário aprofundar mais?

Para a entrega descrita, a prioridade é concluir a publicação acessível, conferir o link aberto e registrar nome/repositório na planilha da turma. O enunciado não exige backend, banco, integração de pagamento nem login real.

Uma evolução para uso real exigiria autenticação e autorização no servidor, banco compartilhado, cópias externas dos dados, proteção de dados pessoais e regras completas para conflitos de reserva e capacidade por período. Essas evoluções não devem ser confundidas com os critérios da entrega atual.

As entregas frequentes são avaliadas no GitHub. Não é possível recriar retroativamente o cumprimento dos prazos; mantenha o histórico real.
