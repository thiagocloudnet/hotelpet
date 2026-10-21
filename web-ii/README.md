<!--
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
-->
# Hotel Pet — pacote das três etapas

Entrega organizada para Programação Web II (2026.2), UESB. Cada pasta é um projeto autônomo, abre pelo seu próprio `index.html` e acompanha um ZIP homônimo.

## Versões

| Pasta/ZIP | Etapa acadêmica | Recursos |
| --- | --- | --- |
| `hotelpet-01` | Navegação | Identidade visual, perfil local do gerente, painel e caminhos entre listagens, cadastro, edição, detalhes e configurações. Os formulários são demonstrativos. |
| `hotelpet-02` | Buscas | Tudo da etapa 01 e filtros nas tabelas de pets, usuários e reservas. A pesquisa usa apenas os dados estáticos da página. |
| `hotelpet-final` | Tabelas/CRM local | Cadastro, edição, detalhes e remoção de pets, usuários e reservas; busca combinada; perfil; configurações; tarifas por peso; ocupação e orçamento. |

## Executar

Abra `index.html` na pasta escolhida. Não exige servidor, instalação ou internet. A página inicial deste pacote oferece os três atalhos.

## Escopo acadêmico e créditos

O enunciado prevê navegação, buscas e edição de tabelas com HTML, CSS e JavaScript, sem frameworks ou bibliotecas, sob a visão do gerente. Marcos informados: 21/10/2026 (navegação), 28/10/2026 (buscas) e 04/11/2026 (tabelas); vencimento geral em 04/11/2026 às 23:59.

Autoria acadêmica indicada: **Thiago Ferreira Prates Neves**. Gerente demonstrativo: **Thiago Ferreira Prates Neves**. Foto, ícones e logomarca são arquivos locais. Dados de equipe, clientes e contatos são demonstrativos.

## Raças, peso e preços

A versão final oferece raças em combobox por espécie, peso em quilogramas e porte calculado: pequeno até 10 kg, médio de 10,1 a 25 kg e grande acima de 25 kg. A diária é configurável por faixa, com valores iniciais de R$ 50, R$ 65 e R$ 80. A reserva calcula o número de noites pelo check-in/check-out e aplica a tarifa correspondente ao peso do pet. São valores de demonstração, ajustáveis nas configurações.

## Limites do protótipo

Não há backend, autenticação segura, sessão, sincronização ou recuperação de senha. Na versão final, cadastros e preços ficam no `localStorage` do navegador; são apagados ao limpar os dados do site. A foto do perfil vem do projeto. Os arquivos e a senha de demonstração não são enviados a um servidor. Não utilize dados reais ou sensíveis.

O pacote `Painel_AdminLTE4_Thiago_Cloud.zip` foi avaliado como referência, mas o AdminLTE não foi incorporado: o enunciado proíbe frameworks. Os componentes e estilos desta entrega são HTML semântico, CSS autoral e JavaScript puro. Nenhum prompt ou PDF de estudo foi incluído nos pacotes.

## Publicação no GitHub

Depois de revisar os arquivos no repositório, configure seu nome e e-mail Git e publique as três pastas: `git add hotelpet-01 hotelpet-02 hotelpet-final`, `git commit -m "Entrega Hotel Pet em três etapas"` e `git push`. Depois, compartilhe o link aberto conforme as orientações da turma.
