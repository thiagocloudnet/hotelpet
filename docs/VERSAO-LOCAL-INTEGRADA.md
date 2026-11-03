# Hotel Pet — versão local integrada

Esta versão mantém o layout, as cores, os menus e os cadastros de `web-ii/hotelpet-final/`, com HTML, CSS e JavaScript puro. Não usa banco de dados nem backend.

## Recursos reunidos

| Referência de produto | Ideia aproveitada nesta versão |
| --- | --- |
| [PetHub](https://pethub.app.br/hospedagem) | Checklist de entrada e saída e informações de cuidados |
| [HostelPets](https://hostelpets.com.br/) | Organização dos documentos e valores da hospedagem |
| [Spartus Pet](https://www.spartuspet.com.br/sistema-para-hotel-pet) | Diário de alimentação, medicação informada, passeios e ocorrências |

São referências de funcionalidades anunciadas pelos fornecedores, sem copiar código ou interface. Pagamentos integrados, câmeras, WhatsApp, portal de clientes e sincronização não fazem parte desta implementação.

## Onde acessar

- **Painel:** atalhos para cuidados e documentos.
- **Pets → Detalhes:** ficha de saúde e cuidados editável, incluindo alimentação, alergias, instruções de medicamentos, comportamento, carteira de vacinação, veterinário e emergência.
- **Reservas → Detalhes:** resumo dos cuidados, checklist de entrada e saída, diário com responsável e horário e documentos da hospedagem.
- **Documentos:** orçamento, recibo demonstrativo, contrato demonstrativo com condições preenchidas pelo operador e ficha de cuidados. Clique em **Salvar e visualizar documento**, confira a prévia e depois em **Imprimir / salvar PDF**.

O recibo exige valor recebido positivo, data sem antecipação e forma de pagamento. Registra um valor de recebimento informado por reserva; não é um livro financeiro de múltiplos pagamentos. O contrato exige o preenchimento das condições combinadas e oferece espaços para assinatura, sem assinatura eletrônica ou validação jurídica.

A saúde do animal é registrada conforme informações do responsável. Campos ausentes aparecem como “Não informado”. O sistema não define tratamentos nem calendários de vacinação.

## Armazenamento e uso

- Cadastros existentes: `hotelPetShop.final.records`.
- Fichas de cuidados, checklists, diário e documentos: `hotelPetShop.final.operations`.
- Use sempre o mesmo navegador e endereço de acesso para encontrar os dados locais. `file://`, `localhost` e `127.0.0.1`, assim como portas diferentes, podem usar armazenamentos distintos.
- Limpar os dados do navegador remove os registros locais. Não há cópia automática em servidor.
- A versão integrada está em `hotelpet-final/`; `hotelpet-01/` e `hotelpet-02/` preservam as entregas acadêmicas anteriores.

## Verificação desta alteração

- Auditoria estática de páginas, recursos e sintaxe JavaScript.
- Prévia de orçamento testada no navegador com três diárias de R$ 50 e total de R$ 150.
- Bloqueio do recibo sem dados de recebimento verificado.
- ID de reserva inexistente apresenta erro, sem selecionar outro cliente.
- Ficha de cuidados testada com gravação e recarga; texto temporário de teste removido em seguida.
- Impressão usa uma classe específica para documentos; imprimir uma página comum não ativa esse modo.

A geração final de PDF no diálogo do navegador ainda precisa de conferência visual. O teste automatizado antigo de recibo TXT foi atualizado para verificar prévia, validação do recebimento, persistência e ID inexistente; a suíte completa ainda depende de Playwright disponível no ambiente.
