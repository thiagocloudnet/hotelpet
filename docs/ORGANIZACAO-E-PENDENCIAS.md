# Organização e pendências da versão final

Revisão de 03/11/2026. Pasta principal de entrega: web-ii/hotelpet-final.

## O que o enunciado exige

Navegação, busca e edição das tabelas em HTML, CSS e JavaScript puro, sem bibliotecas na aplicação. A visão implementada é a do gerente. Não há necessidade de banco de dados nem de servidor de aplicação. O armazenamento local é uma extensão demonstrativa: cada navegador mantém seus próprios registros.

## Situação atual e prioridade

| Prioridade | Situação | Próxima ação |
| --- | --- | --- |
| Entrega | Navegação, filtros, paginação, cadastro e edição por código implementados | Apresentar usuários, animais, reservas e configurações |
| Entrega | Gerente altera funções e edita reservas finalizadas | Demonstrar um exemplo de cada operação |
| Entrega | Históricos por animal, responsável e reserva mantêm os códigos | Mostrar dois animais com mesmo nome e donos diferentes |
| Antes de publicar | Alterações recentes ainda locais; novo pacote organizado gerado | Publicar o pacote atual e conferir o endereço |
| Antes de entregar | Histórico de entregas e planilha da turma não foram certificados nesta revisão | Conferir nome, link público e histórico com os prazos |
| Implementado | Exportação e restauração JSON com validação, além de relatórios CSV | Exportar a cópia antes de mudar de navegador ou endereço |
| Melhoria importante | Não há validação completa de sobreposição e capacidade ao cadastrar reserva | Verificar períodos por código do animal e vagas de cada data; possível em JavaScript local |
| Conferir com protótipo | Diário permite texto, mas não possui fotos específicas de cada lançamento | Implementar imagem local com limite de tamanho, se necessário para a apresentação |
| Melhoria futura | Caixa mantém um recebimento informado por reserva | Parcelas, despesas e estornos exigem histórico adicional; não são requisitos expressos do professor |
| Melhoria futura | Alterações simultâneas em duas abas podem sobrescrever estado | Detectar mudanças pelo evento storage e pedir recarga antes de editar |
| Limite conhecido | Sem autenticação ou permissões reais de servidor | Apresentar como demonstração da visão do gerente; não anunciar controle seguro de acesso |

Não é necessário acrescentar banco, bibliotecas, criptografia ou um sistema comercial de contabilidade para cumprir a atividade. Priorizar os requisitos da disciplina antes dos complementos. A fidelidade visual integral ao Figma ainda depende de conferência específica.

## Logomarca recuperada

Imagem encontrada em F:/UPdev/hotelpet/imagens/hotel-pet-shop-logo.jpg. Cópia aplicada em web-ii/hotelpet-final/imagens/hotel-pet-shop-logo.jpg, sem edição do desenho. A identificação visual contém cão, gato, Hotel Pet e hotelpet.shop. A cópia é conferida por SHA-256 contra o arquivo de origem. O símbolo SVG anterior foi preservado na pasta. Outras imagens localizadas incluem a marca pessoal Thiago.Cloud, que não foi usada para substituir a marca do hotel.

## Organização do código

A versão final foi formatada com recuos de dois espaços, funções divididas em linhas e blocos legíveis. Foram acrescentados comentários nos pontos de leitura, gravação, filtros, edição, identidade dos registros e cálculo de valores. Os componentes compartilhados de menu e tema receberam a mesma formatação nas etapas anteriores, mantendo seu conteúdo igual entre as três versões.

O formatador foi executado fora do projeto como ferramenta de desenvolvimento. Não foi adicionado ao site nem incluído no pacote público. A aplicação continua com JavaScript puro. Comentários devem explicar a lógica que você estudou; não são prova de autoria manual nem substituem a compreensão do código.

## Caminho de estudo e apresentação

1. Abra a versão final e percorra painel, usuários, animais, reservas e configurações.
2. Explique os códigos de responsável, animal e reserva. Nomes podem se repetir.
3. Em hotel-app.js, siga leitura → tabela → filtro → formulário → gravação.
4. Em financeiro-regras.js, mostre centavos, diárias, ocupação e separação entre previsão e recebimento.
5. Em hospedagem-local.js, mostre cuidados, diário e documentos.
6. Demonstre recarregar a página após editar. Explique que os dados ficam somente naquele navegador.
7. Consulte MAPA-CODIGO-FONTE.md para localizar cada responsabilidade.

## Resultado da revisão

Após a formatação: auditoria estática de 52 páginas e 32 scripts sem erros ou avisos; 30 de 30 testes de caixa e ocupação aprovados; revisão ampla aprovada em 14 grupos e 96 telas; logomarca carregada na entrada e no painel, com tela de 320 pixels sem transbordamento. O teste amplo foi atualizado para reconhecer os rótulos e valores separados da ficha de cuidados. O pacote estático contém 258 arquivos e 92 páginas contando as versões históricas. O ZIP atualizado está identificado em relatorios/entrega-final.json. Ainda sem publicação no GitHub.

Atualização da identidade: o usuário forneceu a marca horizontal oficial e o ícone. A versão final usa imagens/logo-hotel-pet-horizontal.png e imagens/favicon-hotel-pet.png. O texto repetido ao lado da imagem foi removido do HTML. O ícone também aparece no menu recolhido. Testes de carregamento, ausência de texto duplicado, favicon e largura de 320 pixels aprovados. Pacote estático preparado com 264 arquivos; o ZIP anterior precisa ser regenerado antes de distribuir.

