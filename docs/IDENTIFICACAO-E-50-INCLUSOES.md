# Identificação e 50 inclusões

O e-mail do cadastro de clientes é opcional. Quando não informado, a tabela, os detalhes e a seleção do proprietário exibem uma identificação formada pelo primeiro nome e último sobrenome, separados por ponto e em minúsculas, sem acentos. Exemplo: Ana Maria Santos → ana.santos. O endereço de e-mail continua vazio; não foi inventado um domínio ou endereço para contato.

Nomes iguais podem produzir a mesma identificação de exibição. Ela não é uma credencial de acesso. Os vínculos continuam usando códigos internos únicos. A autenticação individual pertence à próxima versão e precisará resolver credenciais únicas e permissões.

Os IDs deixam de aparecer nos detalhes do usuário, sugestões de pesquisa, dicas do proprietário, filtro visível da lista e documentos da hospedagem. Permanecem nos endereços, atributos internos e cópias técnicas para navegação e integridade. Ocultar um código na tela não é controle de acesso. O número comercial da reserva permanece visível.

Conforme confirmação do usuário, o gerente/desenvolvedor permanece identificado no cabeçalho como exceção. A lista de usuários permanece disponível para a visão do gerente exigida pelo trabalho.

O teste tests/verificar-50-inclusoes.cjs cria, pela interface e em armazenamento isolado: 10 proprietários (cinco sem e-mail), 10 animais homônimos vinculados a pessoas distintas e 10 reservas. Em seguida executa 10 edições e 10 reaberturas, conferindo persistência, identificação e ausência de IDs visíveis nos detalhes. Total: 50 verificações, com conferência adicional do gerente preservado. Resultado: relatorios/verificacao-50-inclusoes.json.

Nenhuma publicação foi realizada nesta revisão.
