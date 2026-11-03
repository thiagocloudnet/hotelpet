# Complemento ao relatório de auditoria recebido

Data: 03/11/2026. Documento recebido: Relatorio_Auditoria_Hotel_Pet_Web_II.pdf, nove páginas. O original foi preservado.

## Diferença entre as versões

O relatório identifica a análise do commit público a228051e6a5480b374e2e1fa341111dff49ef06d. A consulta de leitura à API do GitHub confirmou que esse ainda é o commit da main. O trabalho local contém alterações posteriores ainda sem publicação. Portanto, o texto do relatório não é evidência de defeito da versão local quando apenas declara que uma operação não foi executada naquela auditoria.

A conclusão de escopo permanece correta: não acrescentar banco de dados, autenticação de servidor, Python, PostgreSQL ou frameworks à entrega de Web II. Os requisitos centrais são navegação, pesquisas, edição das tabelas e as ações adicionais do gerente.

## Comparação dos achados com as evidências locais

| Achado do relatório | Evidência local | Interpretação |
| --- | --- | --- |
| Testes de navegador não executados naquela auditoria | relatorios/verificacao-final.json: 14 grupos, 96 telas e lista de erros vazia | Há execução documentada localmente; não significa teste da versão pública atual |
| Edição de reserva finalizada pendente de demonstração | Caso 40 de relatorios/verificacao-50.json e grupo de diária/finalizada em verificacao-final.json | Comportamento exercitado no ambiente local |
| Alteração de função pendente | Casos 31 e 32 de verificacao-50.json, além de tests/verificar-edicao.cjs | Proteção do gerente principal e alteração dos demais usuários testadas |
| Vínculos entre responsáveis, animais e reservas | 50 casos aprovados em verificacao-50.json | Inclui dois Totos de donos diferentes, códigos, propagação de edição e bloqueios de remoção |
| Auditoria estática anterior com 28 scripts | Auditoria local atual registra 52 páginas e 32 scripts, sem erros ou avisos | O total abrange etapas; não confundir com as 17 páginas da versão final |
| Meta description duplicada | Conferência direta de index.html da raiz e da versão final encontrou uma descrição em cada arquivo | Achado não reproduzido na versão local atual |
| Workflow publica o repositório inteiro | Workflow local prepara .dist-pages e publica somente essa pasta | Ajuste preparado localmente, ainda não demonstrado em uma nova publicação pública |
| Limite de fotos e quota | Verificações de fotos, falhas de armazenamento e restauração de estado em verificacao-final.json | LocalStorage continua sujeito a limite; a aplicação não oferece armazenamento ilimitado |
| Caixa e contratos fora dos requisitos centrais | Complementos mantidos separados dos critérios acadêmicos | Não exigir sistema contábil ou validação jurídica para considerar navegação e tabelas |
| Comparação visual integral com Figma | Não certificada | Continua pendente |
| Histórico de entregas, planilha e publicação | Não encerrados por esta revisão local | Continuam pendentes de conferência externa |

Os números representam conjuntos diferentes, com possíveis cenários em comum. Não devem ser somados para produzir uma porcentagem de aprovação do trabalho ou uma nota.

## Evidências para apresentar

1. Gerente edita uma reserva finalizada e o código permanece igual.
2. Gerente altera a função de outro usuário e a alteração permanece ao reabrir.
3. Configurações de diária e vagas são gravadas e reaparecem ao recarregar.
4. Busca encontra registros além da primeira página e limpar os filtros restaura a listagem.
5. Animais com o mesmo nome continuam ligados aos responsáveis corretos.
6. A aplicação continua funcionando sem banco e sem bibliotecas de execução.

A rodada específica desta revisão usa tests/verificar-edicao.cjs e grava a saída em relatorios/auditoria-requisitos-gerente.log. O resultado dessa rodada deve ser consultado no registro; a existência do script, isoladamente, não comprova aprovação.

## O que falta para fechar a entrega

- Conferir o protótipo e documentar diferenças visuais, especialmente imagens do acompanhamento da estadia.
- Publicar a versão local e seus resultados de testes; verificar a página realmente publicada.
- Conferir o endereço público e o domínio personalizado, sem presumir que um deploy bem-sucedido garante o domínio.
- Conferir nome e link na planilha e o histórico de entregas nas datas avaliadas.
- Atualizar o ZIP depois das últimas mudanças de logomarca e favicon antes de distribuí-lo.

Exportação de segurança e validação de conflitos/capacidade são melhorias úteis, possíveis em JavaScript local, mas não substituem os requisitos centrais nem justificam introduzir banco de dados. Nenhuma alteração remota foi feita ao analisar este relatório.

Resultado da rodada específica desta revisão: APROVADO. O registro confirmou edição, persistência, vínculos, identificação dos registros, situação, remoção, funções, reserva finalizada e configurações. Evidência: relatorios/auditoria-requisitos-gerente.log.

