/* Thiago Ferreira Prates Neves — Professor Lucas Santos de Oliveira.
   Saúde, operação e documentos demonstrativos, sem banco de dados. */
(() => {
  const main = document.querySelector("main");
  if (!main) return;
  const file = location.pathname.split("/").pop(),
    id = new URLSearchParams(location.search).get("id");
  const records = window.HotelPetSearchRecords?.();
  if (!records) return;
  const key = "hotelPetShop.final.operations";
  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};
    } catch {
      return {};
    }
  };
  const state = read();
  state.health ||= {};
  state.stays ||= {};
  const save = (feedback) => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      feedback.textContent = "Informações salvas neste navegador.";
      return true;
    } catch {
      feedback.textContent =
        "Não foi possível salvar. Verifique o espaço disponível no navegador.";
      return false;
    }
  };
  const node = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (text) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  };
  const money = (value) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  const dateText = (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value || "")
      ? value.split("-").reverse().join("/")
      : "Não informado";
  const healthFields = [
    ["allergies", "Alergias e condições informadas"],
    ["food", "Alimentação e restrições"],
    ["medication", "Medicamentos e instruções prescritas informadas"],
    ["behavior", "Comportamento e cuidados especiais"],
    ["vaccines", "Vacinas: informações e datas da carteira"],
    ["vet", "Veterinário / clínica e telefone"],
    ["emergency", "Contato de emergência e telefone"],
  ];
  function healthForm(pet) {
    const section = node("section", null, "card stay-section");
    section.append(
      node("h2", "Saúde e cuidados de " + pet.name),
      node(
        "p",
        "Registre as informações fornecidas pelo responsável. Campo vazio significa não informado.",
        "settings-value",
      ),
    );
    const form = node("form"),
      grid = node("div", null, "form-grid"),
      current = state.health[pet.id] || {};
    for (const [key, label] of healthFields) {
      const field = node("div", null, "form-field"),
        caption = node("label", label),
        input = node("textarea");
      input.id = "health-" + key;
      input.name = key;
      input.maxLength = 2000;
      input.rows = 2;
      input.value = current[key] || "";
      caption.htmlFor = input.id;
      field.append(caption, input);
      grid.append(field);
    }
    const field = node("div", null, "form-field"),
      label = node("label", "Conferência da carteira de vacinação"),
      select = node("select");
    select.name = "vaccineStatus";
    select.id = "health-vaccine-status";
    label.htmlFor = select.id;
    for (const value of [
      "Não informado",
      "Pendente de conferência",
      "Carteira conferida",
    ])
      select.add(new Option(value, value));
    select.value = current.vaccineStatus || "Não informado";
    field.append(label, select);
    grid.append(field);
    const button = node(
      "button",
      "Salvar ficha de cuidados",
      "button button--primary",
    );
    button.type = "submit";
    const feedback = node("p");
    feedback.setAttribute("role", "status");
    form.append(grid, button, feedback);
    section.append(form);
    main.append(section);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const entry = Object.fromEntries(new FormData(form));
      entry.updatedAt = new Date().toISOString();
      state.health[pet.id] = entry;
      save(feedback);
    });
  }
  if (file === "pet_visualizar.html") {
    const pet = records.pets.find((p) => p.id === id);
    if (pet) healthForm(pet);
    return;
  }
  if (file === "painel.html") {
    const card = node("section", null, "card stay-section");
    card.append(
      node("h2", "Cuidados e documentos"),
      node(
        "p",
        "Abra os detalhes de um pet para preencher sua ficha de cuidados. Nos detalhes da reserva, acompanhe a estadia e prepare os documentos.",
        "settings-value",
      ),
    );
    const actions = node("div", null, "page-actions");
    for (const [label, href] of [
      ["Fichas dos pets", "pets.html"],
      ["Estadias e documentos", "reservas.html"],
    ]) {
      const a = node("a", label, "button button--secondary");
      a.href = href;
      actions.append(a);
    }
    card.append(actions);
    main.append(card);
    return;
  }
  if (file !== "reserva_visualizar.html") return;
  const reservation = records.reservas.find((r) => r.id === id);
  if (!reservation) return;
  const namedPets = records.pets.filter((p) => p.name === reservation.pet);
  const pet = reservation.petId
    ? records.pets.find((p) => p.id === reservation.petId)
    : namedPets.length === 1
      ? namedPets[0]
      : null;
  const namedOwners = records.users.filter((u) => u.name === reservation.owner);
  const owner = reservation.ownerId
    ? records.users.find((u) => u.id === reservation.ownerId)
    : namedOwners.length === 1
      ? namedOwners[0]
      : null;
  const code = window.HotelPetDemo.reservationCode(reservation.number);
  const stay = (state.stays[id] ||= {
    checks: {},
    log: [],
    payment: {},
    conditions: "",
  });
  stay.checks ||= {};
  stay.log ||= [];
  stay.payment ||= {};
  const nights = Math.round(
    (Date.parse(reservation.checkout + "T12:00:00Z") -
      Date.parse(reservation.checkin + "T12:00:00Z")) /
      86400000,
  );
  let settings = {};
  try {
    settings =
      JSON.parse(localStorage.getItem("hotelPetShop.final.settings")) || {};
  } catch {}
  const weight = Number(reservation.weight || pet?.weight || 5),
    rate = Number(
      reservation.dailyRate ??
        (weight <= 10
          ? (settings.smallRate ?? 50)
          : weight <= 25
            ? (settings.mediumRate ?? 65)
            : (settings.largeRate ?? 80)),
    );
  const total =
    window.HotelPetFinance.total(reservation, records.pets, settings) / 100;
  const checkoutTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(
    reservation.checkoutTime || "",
  )
    ? reservation.checkoutTime
    : "12:00";
  const care = node("section", null, "card stay-section");
  care.append(node("h2", "Ficha de cuidados do hóspede"));
  function healthLines() {
    const h = state.health[pet?.id] || {};
    return [
      ...healthFields.map(
        ([key, label]) => label + ": " + (h[key] || "Não informado"),
      ),
      "Carteira de vacinação: " + (h.vaccineStatus || "Não informado"),
    ];
  }
  const healthDetails = node("dl", null, "care-details"),
    health = state.health[pet?.id] || {};
  for (const [key, label] of [
    ...healthFields,
    ["vaccineStatus", "Carteira de vacinação"],
  ]) {
    const row = node("div", null, "care-details__row"),
      term = node("dt"),
      value = node("dd", health[key]?.trim() || "Não informado");
    term.append(node("strong", label));
    if (!health[key]?.trim()) value.className = "care-details__empty";
    row.append(term, value);
    healthDetails.append(row);
  }
  care.append(healthDetails);
  if (pet) {
    const link = node(
      "a",
      "Editar ficha de cuidados",
      "button button--secondary",
    );
    link.href = "pet_visualizar.html?id=" + encodeURIComponent(pet.id);
    care.append(link);
  }
  main.append(care);
  const operation = node("section", null, "card stay-section");
  operation.append(node("h2", "Entrada e saída da hospedagem"));
  const checklist = node("div", null, "stay-checklist"),
    checkFeedback = node("p");
  checkFeedback.setAttribute("role", "status");
  for (const [key, label] of [
    ["health", "Entrada: informações de saúde conferidas"],
    ["belongings", "Entrada: alimentação e pertences recebidos"],
    ["instructions", "Entrada: instruções do responsável registradas"],
    ["return", "Saída: pertences devolvidos"],
    ["handover", "Saída: pet entregue à pessoa autorizada"],
  ]) {
    const row = node("label", null, "authorization-check"),
      input = node("input");
    input.type = "checkbox";
    input.checked = stay.checks[key]?.done === true;
    input.addEventListener("change", () => {
      const previous = stay.checks[key];
      stay.checks[key] = { done: input.checked, at: new Date().toISOString() };
      if (!save(checkFeedback)) {
        stay.checks[key] = previous;
        input.checked = previous?.done === true;
      }
    });
    row.append(input, node("span", label));
    checklist.append(row);
  }
  operation.append(checklist, checkFeedback);
  const arrivalSummary = node("p"),
    departureSummary = node("p");
  const localTime = (value) =>
    new Date(value).toLocaleString("pt-BR", {
      timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
      hourCycle: "h23",
    });
  arrivalSummary.textContent = stay.arrival?.at
    ? "Entrada registrada: " +
      localTime(stay.arrival.at) +
      " · " +
      (window.HotelPetFuso?.label() || "Brasília")
    : "Entrada real ainda não registrada.";
  departureSummary.textContent = stay.departure?.at
    ? "Saída registrada: " +
      localTime(stay.departure.at) +
      " · " +
      (window.HotelPetFuso?.label() || "Brasília")
    : "Saída real ainda não registrada.";
  const movementActions = node("div", null, "page-actions");
  const arrivalButton = node(
    "button",
    "Registrar entrada",
    "button button--primary",
  );
  const departureButton = node(
    "button",
    "Registrar saída",
    "button button--secondary",
  );
  arrivalButton.type = departureButton.type = "button";
  arrivalButton.id = "registrar-entrada";
  departureButton.id = "registrar-saida";
  arrivalButton.disabled = Boolean(
    stay.arrival?.at ||
    stay.departure?.at ||
    reservation.status === "Cancelada",
  );
  departureButton.disabled = !stay.arrival?.at || Boolean(stay.departure?.at);
  const movement = (direction) => {
    const entering = direction === "arrival";
    if (
      stay.departure?.at ||
      (entering && stay.arrival?.at) ||
      (!entering && !stay.arrival?.at) ||
      reservation.status === "Cancelada"
    )
      return;
    const required = entering
      ? ["health", "belongings", "instructions"]
      : ["return", "handover"];
    if (required.some((key) => !stay.checks[key]?.done)) {
      checkFeedback.textContent = entering
        ? "Confira os três itens de entrada antes de receber o animal."
        : "Confira a devolução dos pertences e a entrega à pessoa autorizada antes de registrar a saída.";
      return;
    }
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const currentClock = new Intl.DateTimeFormat("pt-BR", {
      timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date());
    if (
      entering &&
      (today < reservation.checkin ||
        today > reservation.checkout ||
        (today === reservation.checkout && currentClock >= checkoutTime))
    ) {
      checkFeedback.textContent =
        "A entrada deve ocorrer no período da reserva. Confira as datas antes de continuar.";
      return;
    }
    const recordsKey = "hotelPetShop.final.records";
    let previousRecords,
      previousMovement = stay[direction];
    try {
      previousRecords = localStorage.getItem(recordsKey);
      const current = JSON.parse(previousRecords);
      const target = current.reservas.find(
        (item) => item.id === reservation.id,
      );
      if (
        !target ||
        target.petId !== reservation.petId ||
        target.ownerId !== reservation.ownerId
      )
        throw Error(
          "Reserva alterada. Reabra a página antes de registrar a movimentação.",
        );
      target.status = entering ? "Em andamento" : "Finalizada";
      stay[direction] = { at: new Date().toISOString() };
      localStorage.setItem(recordsKey, JSON.stringify(current));
      if (!save(checkFeedback)) {
        stay[direction] = previousMovement;
        localStorage.setItem(recordsKey, previousRecords);
        return;
      }
      location.reload();
    } catch (error) {
      stay[direction] = previousMovement;
      checkFeedback.textContent =
        "Não foi possível registrar a movimentação. " + error.message;
    }
  };
  arrivalButton.onclick = () => movement("arrival");
  departureButton.onclick = () => movement("departure");
  movementActions.append(arrivalButton, departureButton);
  operation.append(
    arrivalSummary,
    departureSummary,
    node(
      "p",
      "As datas da reserva são previstas. Os botões registram o momento real, em fuso configurado do hotel, sem alterar a diária contratada.",
    ),
    movementActions,
  );
  main.append(operation);
  const diary = node("section", null, "card stay-section");
  diary.append(node("h2", "Diário da estadia"));
  const logForm = node("form"),
    logGrid = node("div", null, "form-grid");
  const type = node("select");
  type.name = "type";
  type.setAttribute("aria-label", "Tipo de cuidado");
  for (const value of [
    "Alimentação",
    "Medicação administrada conforme orientação",
    "Passeio",
    "Ocorrência",
    "Observação",
  ])
    type.add(new Option(value));
  const operator = node("input");
  operator.name = "operator";
  operator.required = true;
  operator.maxLength = 160;
  operator.placeholder = "Nome de quem registra";
  operator.setAttribute("aria-label", "Nome de quem registra");
  const note = node("textarea");
  note.name = "note";
  note.required = true;
  note.maxLength = 2000;
  note.placeholder = "Descreva o cuidado realizado ou a ocorrência";
  note.setAttribute("aria-label", "Registro da estadia");
  for (const control of [type, operator, note]) {
    const field = node("div", null, "form-field");
    field.append(control);
    logGrid.append(field);
  }
  const add = node("button", "Adicionar ao diário", "button button--primary");
  add.type = "submit";
  const diaryFeedback = node("p");
  diaryFeedback.setAttribute("role", "status");
  const history = node("div", null, "stay-history");
  function renderLog() {
    history.replaceChildren();
    if (!stay.log.length)
      history.append(node("p", "Nenhum cuidado registrado nesta estadia."));
    for (const entry of [...stay.log].reverse()) {
      const article = node("article", null, "stay-note");
      article.append(
        node("strong", entry.type),
        node("p", entry.note),
        node(
          "small",
          entry.operator + " · " + new Date(entry.at).toLocaleString("pt-BR"),
        ),
      );
      history.append(article);
    }
  }
  logForm.append(logGrid, add, diaryFeedback);
  diary.append(logForm, history);
  main.append(diary);
  renderLog();
  logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!logForm.reportValidity()) return;
    if (!operator.value.trim() || !note.value.trim()) {
      diaryFeedback.textContent =
        "Informe o responsável pelo registro e uma descrição.";
      return;
    }
    const entry = {
      type: type.value,
      operator: operator.value.trim(),
      note: note.value.trim(),
      at: new Date().toISOString(),
    };
    stay.log.push(entry);
    if (save(diaryFeedback)) {
      note.value = "";
      renderLog();
    } else stay.log.pop();
  });
  const docs = node("section", null, "card stay-section");
  docs.append(
    node("h2", "Documentos da hospedagem"),
    node(
      "p",
      "Prepare e confira o documento antes de imprimir. Recibo e contrato são modelos demonstrativos.",
      "settings-value",
    ),
  );
  const form = node("form"),
    grid = node("div", null, "form-grid");
  const fields = [
    ["amount", "Valor recebido (R$)", "number"],
    ["date", "Data do recebimento", "date"],
    ["method", "Forma de pagamento", "text"],
    ["authorized", "Pessoa autorizada a retirar o pet", "text"],
  ];
  const inputs = {};
  for (const [key, labelText, type] of fields) {
    const field = node("div", null, "form-field"),
      label = node("label", labelText),
      input = node("input");
    input.type = type;
    input.id = "doc-" + key;
    label.htmlFor = input.id;
    input.maxLength = 160;
    if (key === "amount") {
      input.min = "0";
      input.step = "0.01";
    }
    input.value = stay.payment[key] ?? "";
    inputs[key] = input;
    field.append(label, input);
    grid.append(field);
  }
  const conditionField = node("div", null, "form-field form-field--full"),
    conditionLabel = node("label", "Condições combinadas para a hospedagem"),
    conditions = node("textarea");
  conditions.id = "stay-conditions";
  conditions.maxLength = 5000;
  conditions.rows = 4;
  conditions.value = stay.conditions || "";
  conditionLabel.htmlFor = conditions.id;
  conditionField.append(conditionLabel, conditions);
  grid.append(conditionField);
  const documentType = node("select");
  documentType.setAttribute("aria-label", "Tipo de documento");
  for (const [value, label] of [
    ["budget", "Orçamento"],
    ["receipt", "Recibo demonstrativo"],
    ["contract", "Contrato demonstrativo de hospedagem"],
    ["health", "Ficha de cuidados"],
  ])
    documentType.add(new Option(label, value));
  const typeField = node("div", null, "form-field form-field--full"),
    typeLabel = node("label", "Tipo de documento");
  documentType.id = "doc-type";
  typeLabel.htmlFor = documentType.id;
  typeField.append(typeLabel, documentType);
  grid.append(typeField);
  const actions = node("div", null, "page-actions"),
    previewButton = node(
      "button",
      "Salvar e visualizar documento",
      "button button--primary",
    );
  previewButton.type = "submit";
  const printButton = node(
    "button",
    "Imprimir / salvar PDF",
    "button button--secondary",
  );
  printButton.type = "button";
  printButton.disabled = true;
  actions.append(previewButton, printButton);
  const feedback = node("p");
  feedback.setAttribute("role", "status");
  const preview = node("article", null, "stay-document");
  preview.hidden = true;
  form.append(grid, actions, feedback);
  docs.append(form, preview);
  main.append(docs);
  const summary = main.querySelector(".detail-summary");
  const sections = [
    ["stay-summary", "Dados", summary],
    ["stay-health", "Cuidados", care],
    ["stay-checkin", "Entrada e saída", operation],
    ["stay-diary", "Diário", diary],
    ["stay-documents", "Documentos", docs],
  ];
  const shortcuts = node("nav", null, "stay-shortcuts");
  shortcuts.setAttribute("aria-label", "Seções da estadia");
  for (const [id, label, section] of sections) {
    if (!section) continue;
    section.id = id;
    section.classList.add("stay-anchor");
    const link = node("a", label);
    link.href = "#" + id;
    shortcuts.append(link);
  }
  if (summary) main.insertBefore(shortcuts, summary);
  function build() {
    if (!form.reportValidity()) return null;
    if (!Number.isFinite(total) || nights <= 0 || rate < 0) {
      feedback.textContent = "Revise as datas e o valor da diária da reserva.";
      return null;
    }
    const amount = Number(inputs.amount.value),
      date = inputs.date.value;
    if (
      documentType.value === "receipt" &&
      (!inputs.amount.value ||
        amount <= 0 ||
        !date ||
        !inputs.method.value.trim())
    ) {
      feedback.textContent =
        "Para o recibo, informe valor recebido, data e forma de pagamento.";
      return null;
    }
    if (date && date > window.HotelPetDemo.today()) {
      feedback.textContent = "O recebimento não pode ter data futura.";
      return null;
    }
    if (documentType.value === "contract" && !conditions.value.trim()) {
      feedback.textContent =
        "Informe as condições combinadas antes de preparar o contrato.";
      return null;
    }
    const previousPayment = stay.payment,
      previousConditions = stay.conditions;
    if (documentType.value === "receipt") {
      const payment = Object.fromEntries(
        Object.entries(inputs).map(([key, input]) => [key, input.value.trim()]),
      );
      let closings = [];
      try {
        closings =
          JSON.parse(localStorage.getItem("hotelPetShop.final.closings")) || [];
      } catch {}
      if (
        closings.some(
          (entry) => entry.date === date || entry.date === previousPayment.date,
        ) &&
        JSON.stringify(payment) !== JSON.stringify(previousPayment)
      ) {
        feedback.textContent =
          "O recebimento pertence a uma data com caixa fechado e não pode ser alterado.";
        return null;
      }
      stay.payment = payment;
    }
    stay.conditions = conditions.value.trim();
    if (!save(feedback)) {
      stay.payment = previousPayment;
      stay.conditions = previousConditions;
      return null;
    }
    const names = {
      budget: "ORÇAMENTO DE HOSPEDAGEM",
      receipt: "RECIBO DEMONSTRATIVO",
      contract: "CONTRATO DEMONSTRATIVO DE HOSPEDAGEM",
      health: "FICHA DE CUIDADOS",
    };
    const lines = [
      "HOTEL PET",
      names[documentType.value],
      "Reserva: " + code,
      "Emitido em: " +
        new Date().toLocaleString("pt-BR", {
          timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
        }) +
        " · " +
        (window.HotelPetFuso?.label() || "Brasília"),
      "Responsável: " + (owner?.name || reservation.owner),
      "Contato: " + [owner?.email, owner?.phone].filter(Boolean).join(" · "),
      "Animal: " + (pet?.name || reservation.pet),
      "Período: " +
        dateText(reservation.checkin) +
        " a " +
        dateText(reservation.checkout),
      "Encerramento da diária: " +
        checkoutTime +
        " da data de saída · fuso configurado (24 horas)",
    ];
    lines.push();
    if (documentType.value !== "health")
      lines.push(
        "Diárias: " + nights + " × " + money(rate),
        "Total previsto: " + money(total),
      );
    if (documentType.value === "receipt")
      lines.push(
        "Valor recebido informado: " + money(amount),
        "Data do recebimento: " + dateText(date),
        "Forma: " + inputs.method.value,
        "Saldo previsto: " + money(Math.max(0, total - amount)),
        "Crédito / excedente: " + money(Math.max(0, amount - total)),
      );
    if (documentType.value === "contract")
      lines.push(
        "Serviço: hospedagem do animal identificado, durante o período acima.",
        "CONDIÇÕES INFORMADAS",
        stay.conditions,
        "Retirada autorizada: " + (inputs.authorized.value || "Não informada"),
        "INSTRUÇÕES DE CUIDADOS",
        ...healthLines(),
        "Assinatura do responsável: __________________________",
        "Assinatura do estabelecimento: ______________________",
      );
    if (documentType.value === "health")
      lines.push(
        ...healthLines(),
        "CUIDADOS REGISTRADOS",
        ...stay.log.map(
          (e) =>
            new Date(e.at).toLocaleString("pt-BR") +
            " · " +
            e.type +
            " · " +
            e.operator +
            "\n" +
            e.note,
        ),
      );
    lines.push(
      "Atividade acadêmica — Thiago Ferreira Prates Neves",
      "Modelo demonstrativo. Não comprova pagamento bancário, assinatura ou validade fiscal.",
    );
    return lines;
  }
  function display(lines, target) {
    target.replaceChildren();
    const labels = [
      "Reserva",
      "Emitido em",
      "Responsável",
      "Contato",
      "Animal",
      "Período",
      "Encerramento da diária",
      "ID do responsável",
      "ID do animal",
      "Diárias",
      "Total previsto",
      "Valor recebido informado",
      "Data do recebimento",
      "Forma",
      "Saldo previsto",
      "Crédito / excedente",
      "Serviço",
      "Retirada autorizada",
      "Assinatura do responsável",
      "Assinatura do estabelecimento",
      ...healthFields.map(([, label]) => label),
      "Carteira de vacinação",
    ];
    lines.forEach((line, i) => {
      if (i < 2) {
        target.append(node("h2", line));
        return;
      }
      const paragraph = node("p"),
        label = labels.find((label) => line.startsWith(label + ": "));
      if (label) {
        paragraph.append(
          node("strong", label + ": "),
          document.createTextNode(line.slice(label.length + 2)),
        );
      } else if (
        [
          "CONDIÇÕES INFORMADAS",
          "INSTRUÇÕES DE CUIDADOS",
          "CUIDADOS REGISTRADOS",
        ].includes(line)
      ) {
        paragraph.className = "document-section-title";
        paragraph.append(node("strong", line));
      } else paragraph.textContent = line;
      target.append(paragraph);
    });
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const lines = build();
    if (!lines) {
      preview.hidden = true;
      printButton.disabled = true;
      return;
    }
    display(lines, preview);
    preview.hidden = false;
    printButton.disabled = false;
    feedback.textContent =
      "Documento preparado. Confira os dados antes de imprimir.";
  });
  form.addEventListener("input", () => {
    printButton.disabled = true;
    preview.hidden = true;
  });
  printButton.addEventListener("click", () => {
    const lines = build();
    if (!lines) return;
    document.getElementById("receipt-print")?.remove();
    const sheet = node("article");
    sheet.id = "receipt-print";
    display(lines, sheet);
    document.body.append(sheet);
    document.body.classList.add("printing-document");
    window.print();
  });
  window.addEventListener("afterprint", () =>
    document.body.classList.remove("printing-document"),
  );
})();
