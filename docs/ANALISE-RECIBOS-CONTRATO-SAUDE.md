# Análise da versão final — documentos e saúde dos animais

Escopo: revisão do código em `web-ii/hotelpet-final`, em 29/10/2026. Não inclui homologação da impressão no diálogo do navegador nem revisão jurídica ou veterinária.

## Situação atual

| Área | Implementação encontrada | Lacuna |
| --- | --- | --- |
| Recibo | Exportação TXT, impressão/PDF, dados da reserva e autorização | Não registra pagamentos; apresenta total previsto |
| Contrato | Autorização com nome, data, observações e assinaturas em branco | Não existe contrato de hospedagem separado |
| Saúde do pet | Observações livres na reserva | Não existe ficha estruturada nem acompanhamento de cuidados |
| Armazenamento | localStorage no navegador | Sem sincronização, controle de acesso ou histórico confiável |

## Problemas encontrados

1. **Reserva inexistente pode gerar documento de outro cliente.** `js/recibo-perfil.js` procura o ID e, se não encontrar, escolhe a primeira reserva. O documento deve ser bloqueado quando o ID estiver ausente ou inválido. O mesmo padrão aparece nos fluxos de edição em `js/hotel-app.js`.
2. **Recibo e orçamento estão misturados.** O documento contém “Total previsto” e não há campos de valor pago, forma e data do pagamento ou saldo. É necessário separar orçamento, registro demonstrativo de pagamento e autorização.
3. **Regra de finalização divergente.** `reserva_editar.html` informa que o recibo estará disponível ao finalizar; `js/recibo-perfil.js` oferece a emissão independentemente do status. A regra deve ser definida e aplicada tanto à interface quanto à geração.
4. **Imprimir páginas comuns pode produzir folha vazia.** A regra global `@media print` esconde todos os elementos diretos do body e mostra somente `#receipt-print`. Esse elemento só é criado pelo botão de impressão do recibo. Restringir o modo de documento a uma classe específica e preservar a impressão normal nas outras páginas.
5. **Documento sem diagramação própria.** A impressão usa um elemento `pre` com texto simples. Não há cabeçalho documental, tabela de valores, controle de quebras ou apresentação separada para contrato e ficha de saúde.
6. **Campos de saúde não existem.** Cadastro e edição de pet guardam identificação, espécie, raça, peso, responsável e foto. A reserva possui somente `note`. Não há dados estruturados de vacinação informada, alergias, restrições, medicamentos prescritos, veterinário ou contato de emergência.
7. **Autorização sem histórico.** Nome, data, observações e confirmação são persistidos na própria reserva, sem histórico das alterações. O recibo é reconstruído a cada emissão; dados atualizados do pet e do responsável podem mudar sua apresentação.

## Escopo proposto para implementação

### Ficha de saúde e cuidados

- Campos no cadastro, edição e consulta do pet para alergias, condições informadas, restrições alimentares, cuidados e contato veterinário/emergencial.
- Situação de vacinação informada pelo responsável, data de conferência e observações, distinguindo “não informado” de “conferido”. Requisitos concretos devem ser definidos pelo estabelecimento com orientação profissional.
- Medicamentos: nome, instrução prescrita informada, horários, período, responsável pela informação e observações. O sistema registra orientações fornecidas; não calcula prescrições.
- Registro de cuidados por estadia com data, hora, funcionário e observação; medicação prevista e administração registrada devem ser eventos distintos.
- Exibição de alertas de cuidados na reserva e impressão de ficha própria com apenas os dados necessários à equipe.
- Compatibilidade com pets antigos: novos campos opcionais com estado inicial “não informado”, sem inventar condições ou confirmação de saúde.

### Documentos separados

- **Orçamento da hospedagem:** período, pet, responsável, diárias e valor previsto.
- **Recibo demonstrativo de pagamento:** valor recebido, data, forma e saldo, quando esses dados existirem.
- **Contrato de hospedagem:** identificação das partes e do pet, período, serviços, valores, condições aprovadas pelo estabelecimento, instruções de cuidados, retirada, contatos e espaços de assinatura. A redação contratual precisa ser definida antes de tratá-lo como documento operacional.
- **Ficha de saúde e cuidados:** dados informados e registros da estadia; documento independente do recibo financeiro.

### Ordem de execução

1. Corrigir seleção por ID e impressão global.
2. Implementar ficha de saúde com persistência, edição e consulta.
3. Separar orçamento, recibo e contrato, com prévia de impressão.
4. Integrar cuidados da estadia aos documentos pertinentes.
5. Verificar desktop e celular, dados antigos, ausência de campos, IDs inválidos, textos longos e impressão/PDF com várias páginas.

## Critérios de conclusão

- Nenhum documento pode usar silenciosamente outra reserva.
- Impressão normal das páginas continua disponível.
- Dados de saúde sobrevivem à edição e recarga da página.
- Ausência de informação não aparece como saúde ou vacinação confirmada.
- Documento financeiro diferencia previsão de valor recebido.
- Prévia e PDF preservam identificação da reserva e legibilidade.
- Cancelar impressão não é apresentado como confirmação de impressão ou de pagamento.
