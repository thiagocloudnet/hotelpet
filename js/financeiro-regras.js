/* Regras de valores em centavos, ocupação e fechamento demonstrativo. */
(() => {
  // Converte reais em centavos inteiros para reduzir diferenças de arredondamento.
  const cents = (value) => {
    if (value === null || value === "" || typeof value === "boolean")
      return null;
    const n = Number(value);
    return Number.isFinite(n) &&
      n >= 0 &&
      Number.isSafeInteger(Math.round(n * 100))
      ? Math.round(n * 100)
      : null;
  };
  // Aceita somente uma data real no formato ano-mês-dia.
  const day = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
    const n = Date.parse(value + "T00:00:00Z");
    return Number.isFinite(n) &&
      new Date(n).toISOString().slice(0, 10) === value
      ? n
      : null;
  };
  // Conta a diferença entre as datas; períodos inválidos não geram diárias.
  const nights = (r) => {
    const a = day(r.checkin),
      b = day(r.checkout);
    return a !== null && b !== null && b > a ? (b - a) / 86400000 : 0;
  };
  // Prioriza a diária contratada. A tabela atual só preenche valores ausentes.
  const total = (r, pets = [], settings = {}) => {
    const pet = pets.find((p) => p.id === r.petId),
      weight = Number(r.weight || pet?.weight || 5),
      rate = cents(
        r.dailyRate ??
          (weight <= 10
            ? (settings.smallRate ?? 50)
            : weight <= 25
              ? (settings.mediumRate ?? 65)
              : (settings.largeRate ?? 80)),
      );
    return rate === null ? 0 : nights(r) * rate;
  };
  // Usa Brasília e o horário de saída; o mesmo animal ocupa uma vaga.
  const occupied = (records, now = new Date()) => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
    const today = p.year + "-" + p.month + "-" + p.day,
      time = p.hour + ":" + p.minute,
      seen = new Set();
    return (records.reservas || []).filter((r) => {
      const key = r.petId || r.id,
        hour = /^([01]\d|2[0-3]):[0-5]\d$/.test(r.checkoutTime || "")
          ? r.checkoutTime
          : "12:00";
      if (
        r.status !== "Em andamento" ||
        !nights(r) ||
        r.checkin > today ||
        r.checkout < today ||
        (r.checkout === today && time >= hour) ||
        seen.has(key)
      )
        return false;
      seen.add(key);
      return true;
    });
  };
  // Separa previsão de recebimentos e calcula saldo e crédito por reserva.
  const report = (records, operations, date, settings = {}) => {
    if (day(date) === null) throw Error("Data inválida.");
    let received = 0,
      forecast = 0,
      outstanding = 0,
      credit = 0;
    const entries = [];
    for (const r of records.reservas || []) {
      const due = total(r, records.pets, settings),
        payment = operations.stays?.[r.id]?.payment,
        amount = cents(payment?.amount),
        valid =
          amount !== null &&
          amount > 0 &&
          day(payment?.date) !== null &&
          Boolean(payment?.method?.trim());
      if (r.status !== "Cancelada") {
        forecast += due;
        outstanding += Math.max(0, due - (valid ? amount : 0));
        credit += Math.max(0, (valid ? amount : 0) - due);
      }
      if (valid && payment.date === date) {
        received += amount;
        entries.push({
          reservationId: r.id,
          ownerId: r.ownerId,
          amount,
          method: payment.method.trim(),
        });
      }
    }
    return { date, received, forecast, outstanding, credit, entries };
  };
  // Cria uma cópia do fechamento sem alterar os recebimentos originais.
  const close = (summary, counted, existing = [], today) => {
    if (summary.date > today)
      throw Error("Não é possível fechar uma data futura.");
    if (existing.some((x) => x.date === summary.date))
      throw Error("Esta data já tem fechamento registrado.");
    const amount = cents(counted);
    if (amount === null) throw Error("Informe um valor conferido válido.");
    return {
      ...summary,
      counted: amount,
      difference: amount - summary.received,
      closedAt: new Date().toISOString(),
    };
  };
  window.HotelPetFinance = {
    cents,
    day,
    nights,
    total,
    occupied,
    report,
    close,
  };
})();
