/* Cópia portátil e relatórios locais. Não utiliza banco de dados ou servidor. */
(() => {
  const prefix = "hotelPetShop.final.";
  const names = ["records", "settings", "operations", "closings"];
  const object = (value) =>
    value && typeof value === "object" && !Array.isArray(value);
  const read = () =>
    Object.fromEntries(
      names.map((name) => [
        name,
        JSON.parse(localStorage.getItem(prefix + name) || "null"),
      ]),
    );
  const validate = (data) => {
    if (!object(data)) throw Error("Conteúdo da cópia inválido.");
    const records = data.records;
    if (!object(records)) throw Error("Cadastros ausentes.");
    const sets = {};
    for (const name of ["users", "pets", "reservas"]) {
      if (!Array.isArray(records[name]))
        throw Error("Lista de cadastros inválida.");
      sets[name] = new Set();
      for (const item of records[name]) {
        if (
          !object(item) ||
          typeof item.id !== "string" ||
          !item.id.trim() ||
          sets[name].has(item.id)
        )
          throw Error("Código ausente ou duplicado nos cadastros.");
        sets[name].add(item.id);
      }
    }
    if (
      !records.users.some(
        (user) =>
          user.id === "u1" &&
          user.role === "Gerente" &&
          user.status === "Ativo",
      )
    )
      throw Error("A cópia precisa preservar o gerente principal ativo.");
    for (const pet of records.pets)
      if (
        !sets.users.has(pet.ownerId) ||
        typeof pet.name !== "string" ||
        !pet.name.trim()
      )
        throw Error("Animal sem proprietário válido ou sem nome.");
    for (const reservation of records.reservas) {
      const pet = records.pets.find((item) => item.id === reservation.petId);
      if (!pet || pet.ownerId !== reservation.ownerId)
        throw Error(
          "Reserva com vínculo incorreto entre proprietário e animal.",
        );
      if (!window.HotelPetFinance.nights(reservation))
        throw Error("Período de reserva inválido.");
    }
    if (data.settings !== null) {
      const settings = data.settings;
      if (
        !object(settings) ||
        !["smallRate", "mediumRate", "largeRate"].every(
          (name) =>
            typeof settings[name] === "number" &&
            Number.isFinite(settings[name]) &&
            settings[name] >= 0,
        ) ||
        !Number.isInteger(settings.capacity) ||
        settings.capacity < 1 ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(settings.checkoutTime)
      )
        throw Error("Configurações inválidas.");
      if (
        (settings.country !== undefined || settings.timeZone !== undefined) &&
        !window.HotelPetFuso.valid(settings.country, settings.timeZone)
      )
        throw Error("País ou fuso horário inválido na cópia de segurança.");
    }
    if (data.operations !== null) {
      if (!object(data.operations)) throw Error("Ficha de cuidados inválida.");
      for (const [name, ids] of [
        ["health", sets.pets],
        ["stays", sets.reservas],
      ]) {
        const entries = data.operations[name] || {};
        if (
          !object(entries) ||
          Object.entries(entries).some(
            ([id, value]) => !ids.has(id) || !object(value),
          )
        )
          throw Error("Cuidados ou hospedagens sem cadastro correspondente.");
      }
    }
    if (
      data.closings !== null &&
      (!Array.isArray(data.closings) ||
        data.closings.some((item) => !object(item)))
    )
      throw Error("Fechamentos inválidos.");
    return data;
  };
  const parse = (text) => {
    const file = JSON.parse(text, (key, value) => {
      if (["__proto__", "constructor", "prototype"].includes(key))
        throw Error("Arquivo com estrutura não permitida.");
      return value;
    });
    if (file?.sistema !== "hotel-pet" || file.versao !== 1)
      throw Error("Arquivo incompatível com esta versão do Hotel Pet.");
    return validate(file.dados);
  };
  const restore = (data) => {
    validate(data);
    const previous = names.map((name) => localStorage.getItem(prefix + name));
    try {
      names.forEach((name) =>
        data[name] === null
          ? localStorage.removeItem(prefix + name)
          : localStorage.setItem(prefix + name, JSON.stringify(data[name])),
      );
    } catch (error) {
      names.forEach((name, index) => {
        if (localStorage.getItem(prefix + name) === previous[index]) return;
        if (previous[index] === null) localStorage.removeItem(prefix + name);
        else localStorage.setItem(prefix + name, previous[index]);
      });
      throw Error(
        "Não foi possível restaurar: verifique o espaço do navegador. A cópia anterior foi preservada.",
      );
    }
  };
  const download = (text, filename, type) => {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const section = document.createElement("section");
  section.className = "card stay-section";
  section.id = "arquivos-relatorios";
  section.innerHTML = `<h2>Arquivos e relatórios</h2>
    <p><strong>Proprietário → animais → reservas.</strong> Cada animal pertence a um proprietário cadastrado. Pessoas diferentes podem ter animais com o mesmo nome; o vínculo é feito pelo código do cadastro.</p>
    <p>O salvamento é automático neste navegador. Exporte uma cópia para guardar os cadastros, configurações, cuidados, recebimentos e fechamentos. O arquivo não sincroniza computadores.</p>
    <div class="page-actions"><button type="button" class="button button--primary" id="exportar-copia">Exportar cópia completa</button></div>
    <div class="form-field"><label for="arquivo-copia">Selecionar cópia do Hotel Pet (.json)</label><input type="file" id="arquivo-copia" accept=".json,application/json"></div>
    <p id="resumo-copia" role="status"></p>
    <p><strong>Restaurar substitui os dados deste navegador.</strong> Exporte a cópia atual antes de continuar.</p>
    <button type="button" class="button button--secondary" id="restaurar-copia" disabled>Restaurar arquivo selecionado</button>
    <h3>Relatórios para planilha</h3>
    <div class="form-field"><label for="tipo-relatorio">Tipo de relatório</label><select id="tipo-relatorio"><option value="proprietarios">Proprietários e quantidade de animais</option><option value="animais">Animais e seus proprietários</option><option value="reservas">Reservas e vínculos da hospedagem</option></select></div>
    <button type="button" class="button button--secondary" id="exportar-relatorio">Exportar relatório (.csv)</button>
    <p>Os relatórios incluem todos os cadastros. Recebimentos e ocupação prevista continuam disponíveis no painel; valores de reservas não comprovam pagamento.</p>`;
  document.querySelector("main").append(section);
  const feedback = section.querySelector("#resumo-copia");
  const restoreButton = section.querySelector("#restaurar-copia");
  let pending;
  section.querySelector("#exportar-copia").onclick = () => {
    try {
      download(
        JSON.stringify(
          {
            sistema: "hotel-pet",
            versao: 1,
            criadoEm: new Date().toISOString(),
            dados: read(),
          },
          null,
          2,
        ),
        "hotel-pet-copia-" + new Date().toISOString().slice(0, 10) + ".json",
        "application/json",
      );
      feedback.textContent =
        "Cópia enviada para download. Guarde o arquivo em local seguro.";
    } catch {
      feedback.textContent = "Não foi possível ler os dados para exportação.";
    }
  };
  section.querySelector("#arquivo-copia").onchange = async (event) => {
    pending = null;
    restoreButton.disabled = true;
    try {
      const file = event.target.files[0];
      if (!file) {
        feedback.textContent = "Nenhum arquivo selecionado.";
        return;
      }
      if (file.size > 20 * 1024 * 1024) throw Error("O arquivo excede 20 MB.");
      pending = parse(await file.text());
      const r = pending.records;
      feedback.textContent = `Cópia validada: ${r.users.length} usuários, ${r.pets.length} animais e ${r.reservas.length} reservas. Confira antes de restaurar.`;
      restoreButton.disabled = false;
    } catch (error) {
      feedback.textContent = error.message;
    }
  };
  restoreButton.onclick = () => {
    try {
      if (!pending) return;
      restore(pending);
      pending = null;
      restoreButton.disabled = true;
      location.reload();
    } catch (error) {
      feedback.textContent = error.message;
    }
  };
  const cell = (value) =>
    '"' +
    String(value ?? "")
      .replace(/^[=+@-]/, "'$&")
      .replaceAll('"', '""') +
    '"';
  section.querySelector("#exportar-relatorio").onclick = () => {
    try {
      const saved = read();
      const { users, pets, reservas } = saved.records;
      const actualTime = (value) =>
        value
          ? new Date(value).toLocaleString("pt-BR", {
              timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
              hourCycle: "h23",
            })
          : "Não registrado";
      const owner = (id) =>
        users.find((item) => item.id === id)?.name ||
        "Proprietário não encontrado";
      const kind = section.querySelector("#tipo-relatorio").value;
      let rows;
      if (kind === "proprietarios")
        rows = [
          [
            "Código do proprietário",
            "Nome completo",
            "E-mail",
            "Quantidade de animais",
          ],
          ...users
            .filter(
              (user) =>
                user.role === "Cliente" ||
                pets.some((pet) => pet.ownerId === user.id),
            )
            .map((user) => [
              user.id,
              user.name,
              user.email,
              pets.filter((pet) => pet.ownerId === user.id).length,
            ]),
        ];
      if (kind === "animais")
        rows = [
          [
            "Código do animal",
            "Nome do animal",
            "Espécie",
            "Raça",
            "Código do proprietário",
            "Proprietário",
          ],
          ...pets.map((pet) => [
            pet.id,
            pet.name,
            pet.type,
            pet.race,
            pet.ownerId,
            owner(pet.ownerId),
          ]),
        ];
      if (kind === "reservas")
        rows = [
          [
            "Código da reserva",
            "Código do animal",
            "Animal",
            "Código do proprietário",
            "Proprietário",
            "Entrada",
            "Saída",
            "Horário de saída previsto (24 h)",
            "Entrada real (" + window.HotelPetFuso.label() + ")",
            "Saída real (" + window.HotelPetFuso.label() + ")",
            "Situação",
          ],
          ...reservas.map((item) => [
            item.id,
            item.petId,
            pets.find((pet) => pet.id === item.petId)?.name,
            item.ownerId,
            owner(item.ownerId),
            item.checkin,
            item.checkout,
            item.checkoutTime || "12:00",
            actualTime(saved.operations?.stays?.[item.id]?.arrival?.at),
            actualTime(saved.operations?.stays?.[item.id]?.departure?.at),
            item.status,
          ]),
        ];
      download(
        "\ufeff" + rows.map((row) => row.map(cell).join(";")).join("\r\n"),
        "hotel-pet-relatorio-" + kind + ".csv",
        "text/csv;charset=utf-8",
      );
    } catch {
      feedback.textContent =
        "Não foi possível gerar o relatório. Verifique os cadastros.";
    }
  };
})();
