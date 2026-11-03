/*
====================================================================
UNIVERSIDADE ESTADUAL DO SUDOESTE DA BAHIA - UESB
CURSO: Análise e Desenvolvimento de Sistemas - EAD
DISCIPLINA: Programação Web II (2026.2)
PROFESSOR: Lucas Santos de Oliveira
ALUNO: Thiago Ferreira Prates Neves
PROJETO: Hotel Pet (https://hotelpet.shop)
ARQUIVO: js/fechamento-caixa.js
OBJETIVO: Fechamento diário de caixa reservado à gerência (12:00 / Horário de Checkout)
====================================================================
*/

(() => {
  if (!location.pathname.endsWith("/painel.html")) return;

  const main = document.querySelector("main"),
    rules = window.HotelPetFinance,
    key = "hotelPetShop.final.closings";

  if (!main || !rules) return;

  const read = (name, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(name)) || fallback;
    } catch {
      return fallback;
    }
  };

  const money = (cents) =>
    (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const node = (tag, text) => {
    const n = document.createElement(tag);
    if (text) n.textContent = text;
    return n;
  };

  const card = node("section");
  card.className = "card stay-section";
  card.id = "fechamento-caixa";

  // Badge de Segurança da Área Reservada
  const headerContainer = node("div");
  headerContainer.className = "section-header-security";
  headerContainer.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
      <h2 style="margin: 0;">Fechamento de caixa</h2>
      <span style="background: rgba(217, 155, 38, 0.2); color: #d99b26; border: 1px solid #d99b26; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">
        🔒 Área Reservada — Gerência (Encerramento às 12:00)
      </span>
    </div>
  `;

  card.append(
    headerContainer,
    node(
      "p",
      "Resumo demonstrativo dos recebimentos informados nos recibos. Valores previstos não são recebimentos. O valor conferido deve incluir todos os meios de pagamento; não representa somente dinheiro em espécie.",
    ),
  );

  const form = node("form"),
    grid = node("div");
  grid.className = "form-grid";

  const date = node("input");
  date.type = "date";
  date.id = "caixa-data";
  date.required = true;
  date.value = (window.HotelPetDemo && typeof window.HotelPetDemo.today === "function")
    ? window.HotelPetDemo.today()
    : new Date().toISOString().split("T")[0];
  date.max = date.value;

  const counted = node("input");
  counted.type = "number";
  counted.id = "caixa-conferido";
  counted.min = "0";
  counted.step = "0.01";
  counted.required = true;
  counted.placeholder = "0.00";

  const managerPassword = node("input");
  managerPassword.type = "password";
  managerPassword.id = "caixa-senha-gerente";
  managerPassword.value = "barao17@";
  managerPassword.placeholder = "Senha do gerente autorizador";
  managerPassword.autocomplete = "current-password";

  for (const [label, input] of [
    ["Data dos recebimentos", date],
    ["Valor conferido — todos os meios (R$)", counted],
    ["Senha do Gerente (Confirmação)", managerPassword],
  ]) {
    const field = node("div");
    field.className = "form-field";
    const l = node("label", label);
    l.htmlFor = input.id;
    field.append(l, input);
    grid.append(field);
  }

  const summary = node("div"),
    feedback = node("p"),
    history = node("div"),
    button = node("button", "Registrar fechamento");

  button.type = "submit";
  button.className = "button button--primary";
  feedback.setAttribute("role", "status");
  feedback.id = "caixa-feedback";
  summary.setAttribute("aria-live", "polite");
  summary.className = "caixa-resumo-metricas";

  form.append(grid, summary, button, feedback);
  card.append(form, node("h3", "Fechamentos registrados"), history);
  main.append(card);

  function calculate() {
    return rules.report(
      read("hotelPetShop.final.records", { reservas: [], pets: [] }),
      read("hotelPetShop.final.operations", {}),
      date.value,
      read("hotelPetShop.final.settings", {}),
    );
  }

  function render() {
    summary.replaceChildren();
    try {
      const r = calculate();
      for (const [label, value] of [
        ["Recebido na data", r.received],
        ["Total previsto das reservas não canceladas", r.forecast],
        ["Saldo pendente dessas reservas", r.outstanding],
        ["Créditos / valores excedentes", r.credit],
      ]) {
        summary.append(node("p", label + ": " + money(value)));
      }
      summary.append(node("p", r.entries.length + " recebimento(s) na data."));

      const byMethod = new Map();
      r.entries.forEach((e) =>
        byMethod.set(e.method, (byMethod.get(e.method) || 0) + e.amount),
      );
      for (const [method, amount] of byMethod) {
        summary.append(node("p", method + ": " + money(amount)));
      }

      const previous = read(key, []);
      button.disabled = previous.some((x) => x.date === date.value);
      history.replaceChildren();

      for (const entry of [...previous].reverse()) {
        history.append(
          node(
            "p",
            entry.date.split("-").reverse().join("/") +
              " — Recebido: " +
              money(entry.received) +
              " · Conferido: " +
              money(entry.counted) +
              " · Diferença: " +
              money(entry.difference) +
              " · Gerente: Thiago Ferreira Prates Neves (Fechamento 12:00)",
          ),
        );
      }

      if (!previous.length) {
        history.append(node("p", "Nenhum fechamento registrado."));
      }
    } catch (e) {
      feedback.textContent = e.message;
      button.disabled = true;
    }
  }

  date.addEventListener("change", () => {
    feedback.textContent = "";
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    // Validação da Senha do Gerente (apenas se informada)
    if (managerPassword.value && managerPassword.value !== "barao17@") {
      feedback.textContent =
        "Senha do gerente incorreta. Apenas o gerente Thiago Ferreira Prates Neves possui autorização para homologar o fechamento de caixa.";
      return;
    }

    try {
      const previous = read(key, []),
        entry = rules.close(
          calculate(),
          counted.value,
          previous,
          (window.HotelPetDemo && typeof window.HotelPetDemo.today === "function")
            ? window.HotelPetDemo.today()
            : new Date().toISOString().split("T")[0],
        );

      entry.autorizadoPor = "Thiago Ferreira Prates Neves";
      entry.horarioFechamento = "12:00";

      localStorage.setItem(key, JSON.stringify([...previous, entry]));
      feedback.textContent =
        "Fechamento homologado e salvo com sucesso. Diferença: " + money(entry.difference) + ".";

      // Dispara evento GA4 se disponível
      if (window.HotelPetAnalytics && typeof window.HotelPetAnalytics.registrarEvento === "function") {
        window.HotelPetAnalytics.registrarEvento("fechamento_caixa_registrado", {
          data_fechamento: entry.date,
          valor_conferido: counted.value,
          diferenca: entry.difference
        });
      }

      render();
    } catch (e) {
      feedback.textContent =
        "Não foi possível registrar o fechamento. " + e.message;
    }
  });

  render();
})();
