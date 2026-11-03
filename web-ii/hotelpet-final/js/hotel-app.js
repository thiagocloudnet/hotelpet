/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-final/js/hotel-app.js
*/
/* Pesquisa, navegação de registros e gravação local para a demonstração. */
(() => {
  const storageKey = "hotelPetShop.final.records";
  const initial = {
    users: [
      {
        id: "u1",
        photo: "imagens/avatar-gerente.jpeg",
        email: "thiagoprates@hotelpet.shop",
        name: "Thiago Ferreira Prates Neves",
        role: "Gerente",
        status: "Ativo",
        created: "16/10/2026",
        phone: "(77) 99903-0777",
      },
      {
        id: "u2",
        photo: "imagens/avatar-beatriz.svg",
        email: "beatriz.oliveira@hotelpet.shop",
        name: "Beatriz Oliveira",
        role: "Funcionário",
        status: "Ativo",
        created: "12/06/2026",
        phone: "(77) 98888-1200",
      },
      {
        id: "u3",
        photo: "imagens/avatar-rafael.svg",
        email: "rafael.costa@hotelpet.shop",
        name: "Rafael Costa",
        role: "Cliente",
        status: "Ativo",
        created: "04/07/2026",
        phone: "(77) 98888-2200",
      },
      {
        id: "u4",
        photo: "imagens/avatar-camila.svg",
        email: "camila.ferreira@hotelpet.shop",
        name: "Camila Ferreira",
        role: "Cliente",
        status: "Ativo",
        created: "09/08/2026",
        phone: "(77) 98888-3300",
      },
      {
        id: "u5",
        photo: "imagens/avatar-joao.svg",
        email: "joao.viana@hotelpet.shop",
        name: "João Viana",
        role: "Cliente",
        status: "Inativo",
        created: "15/09/2026",
        phone: "(77) 98888-4400",
      },
    ],
    pets: [
      {
        id: "p1",
        icon: "🐶",
        name: "Toto",
        type: "Cachorro",
        race: "Poodle",
        weight: 6.5,
        size: "Pequeno",
        owner: "Rafael Costa",
      },
      {
        id: "p2",
        icon: "🐱",
        name: "Mia",
        type: "Gato",
        race: "Siamês",
        weight: 4.8,
        size: "Pequeno",
        owner: "Camila Ferreira",
      },
      {
        id: "p3",
        icon: "🐰",
        name: "Bolinha",
        type: "Coelho",
        race: "Angorá",
        weight: 2.2,
        size: "Pequeno",
        owner: "João Viana",
      },
      {
        id: "p4",
        icon: "🐦",
        name: "Piu-Piu",
        type: "Ave",
        race: "Calopsita",
        weight: 0.1,
        size: "Pequeno",
        owner: "Rafael Costa",
      },
      {
        id: "p5",
        icon: "🐕",
        name: "Bob",
        type: "Cachorro",
        race: "Labrador",
        weight: 30.5,
        size: "Grande",
        owner: "Camila Ferreira",
      },
    ],
    reservas: [
      {
        id: "r1",
        number: 1,
        pet: "Toto",
        race: "Poodle",
        owner: "Rafael Costa",
        checkin: "2026-10-21",
        checkout: "2026-10-24",
        status: "Pendente",
        note: "Passeios pela manhã; ração fornecida pela família.",
      },
      {
        id: "r2",
        number: 2,
        pet: "Mia",
        race: "Siamês",
        owner: "Camila Ferreira",
        checkin: "2026-10-25",
        checkout: "2026-10-30",
        status: "Pendente",
        note: "Alimentação úmida à noite.",
      },
      {
        id: "r3",
        number: 3,
        pet: "Bolinha",
        race: "Angorá",
        owner: "João Viana",
        checkin: "2026-10-08",
        checkout: "2026-10-10",
        status: "Finalizada",
        note: "Estadia concluída.",
      },
      {
        id: "r4",
        number: 4,
        pet: "Piu-Piu",
        race: "Calopsita",
        owner: "Rafael Costa",
        checkin: "2026-10-17",
        checkout: "2026-10-20",
        status: "Em andamento",
        note: "Manter a gaiola em local tranquilo.",
      },
    ],
  };
  // Vincula os exemplos antes de migrar seus nomes de exibição.
  initial.reservas.forEach((reservation) => {
    reservation.petId =
      initial.pets.find((pet) => pet.name === reservation.pet)?.id || "";
  });
  window.HotelPetDemo.fill(initial, 30);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const newId = (prefix) =>
    prefix +
    "-" +
    (globalThis.crypto?.randomUUID?.() ||
      Date.now() + "-" + Math.random().toString(36).slice(2));
  // Recupera os cadastros locais e confere a estrutura antes de usar os dados.
  function readData() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved &&
        ["users", "pets", "reservas"].every(
          (key) =>
            Array.isArray(saved[key]) &&
            saved[key].every(
              (item) =>
                item && typeof item === "object" && typeof item.id === "string",
            ),
        )
        ? saved
        : clone(initial);
    } catch {
      return clone(initial);
    }
  }
  function abbreviated(name) {
    const words = String(name || "")
      .trim()
      .split(/\s+/);
    return words.length > 1 ? words[0] + " " + words.at(-1) : words[0];
  }
  let data = readData();
  window.HotelPetSearchRecords = () => clone(data);
  const reservationCode = (item) =>
    window.HotelPetDemo.reservationCode(item.number);
  const managerContact = data.users.find((user) => user.id === "u1");
  if (
    managerContact &&
    ["(77) 99123-4567", "77991234567"].includes(managerContact.phone)
  )
    managerContact.phone = "(77) 99903-0777";
  data.users.forEach((user) => {
    if (!user.displayName)
      user.displayName =
        user.id === "u1" ? "Thiago Prates" : abbreviated(user.name);
  });
  const displayOwner = (item) =>
    abbreviated(
      data.users.find((user) => user.id === item.ownerId)?.name || item.owner,
    );
  const raceTitle = (pet) =>
    ["Cachorro", "Gato", "Coelho"].includes(pet?.type)
      ? "Raça"
      : "Espécie ou variedade";
  const hasPayment = (id) => {
    try {
      const operations =
        JSON.parse(localStorage.getItem("hotelPetShop.final.operations")) || {};
      return (
        (window.HotelPetFinance.cents(
          operations.stays?.[id]?.payment?.amount,
        ) || 0) > 0
      );
    } catch {
      return false;
    }
  };
  const userIdentification = (user) => {
    const words = clean(user.name || "")
      .split(/\s+/)
      .filter(Boolean);
    return (
      user.email ||
      [words[0], words.length > 1 ? words.at(-1) : ""].filter(Boolean).join(".")
    );
  };
  const ownerIdentity = (item) => {
    const owner = data.users.find((user) => user.id === item.ownerId);
    return owner
      ? owner.name + " · " + userIdentification(owner)
      : item.owner || "Responsável não informado";
  };

  // Migra registros antigos sem apagar cadastros já existentes no navegador.
  data.pets.forEach((pet) => {
    const matches = data.users.filter((user) => user.name === pet.owner);
    const owner = pet.ownerId
      ? data.users.find((user) => user.id === pet.ownerId)
      : matches.length === 1
        ? matches[0]
        : null;
    if (owner) {
      pet.ownerId = owner.id;
      pet.owner = owner.name;
    }
  });
  data.reservas.forEach((reservation) => {
    const matches = data.pets.filter((pet) => pet.name === reservation.pet);
    const pet = reservation.petId
      ? data.pets.find((pet) => pet.id === reservation.petId)
      : matches.length === 1
        ? matches[0]
        : null;
    if (pet) {
      reservation.petId = pet.id;
      reservation.ownerId = pet.ownerId;
      reservation.owner = pet.owner;
    }
  });
  window.HotelPetDemo.migrate(data);
  const saveData = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  };
  // Mantém uma cópia do estado para restaurar os dados quando a gravação falhar.
  function commitChange(change) {
    const previous = clone(data);
    change();
    if (saveData()) return true;
    data = previous;
    window.alert(
      "Não foi possível salvar a alteração neste navegador. Tente novamente.",
    );
    return false;
  }
  async function readPhoto(form) {
    const upload = form.elements.namedItem("foto")?.files?.[0];
    if (!upload) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(upload.type) ||
      upload.size > 1500000
    )
      throw new Error("Use JPG, PNG ou WebP com até 1,5 MB.");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Não foi possível ler a foto."));
      reader.readAsDataURL(upload);
    });
  }
  const file = location.pathname.split("/").pop() || "painel.html";
  const kind = file.startsWith("pet")
    ? "pets"
    : file.startsWith("usuario")
      ? "users"
      : file.startsWith("reserva")
        ? "reservas"
        : "";
  const listing = ["pets.html", "usuarios.html", "reservas.html"].includes(
    file,
  );
  const detail = file.endsWith("_visualizar.html");
  const table = document.querySelector(".data-table");
  const $ = (query, root = document) => root.querySelector(query);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const clean = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR")
      .trim();
  const classifyWeight = (weight) =>
    Number(weight) <= 10
      ? "Pequeno"
      : Number(weight) <= 25
        ? "Médio"
        : "Grande";
  const reservationWeight = (item) =>
    Number(item.weight) > 0
      ? Number(item.weight)
      : Number(data.pets.find((pet) => pet.id === item.petId)?.weight) || 0;
  const readRates = () => {
    try {
      return {
        smallRate: 50,
        mediumRate: 65,
        largeRate: 80,
        ...JSON.parse(
          localStorage.getItem("hotelPetShop.final.settings") || "{}",
        ),
      };
    } catch {
      return { smallRate: 50, mediumRate: 65, largeRate: 80 };
    }
  };
  // O horário fica registrado na reserva; mudar a configuração não altera estadias antigas.
  const checkoutTime = (record) => {
    const value = record
      ? record.checkoutTime || "12:00"
      : readRates().checkoutTime || "12:00";
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? value : "12:00";
  };
  const rateForWeight = (weight) => {
    const rates = readRates();
    const size = classifyWeight(weight);
    return size === "Pequeno"
      ? Number(rates.smallRate)
      : size === "Médio"
        ? Number(rates.mediumRate)
        : Number(rates.largeRate);
  };
  const formatMoney = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) || 0);
  const dateText = (value) => {
    const p = String(value || "").split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : value || "";
  };
  const badgeClass = (value) =>
    ({
      ativo: "status-badge--active",
      finalizada: "status-badge--active",
      inativo: "status-badge--inactive",
      pendente: "status-badge--pending",
    })[clean(value)] || "status-badge--in-progress";
  function addCell(row, value) {
    const td = el("td");
    if (value instanceof Node) td.append(value);
    else td.textContent = String(value ?? "");
    row.append(td);
  }
  function petPortrait(pet) {
    const source =
      pet?.photo ||
      (["Cachorro", "Gato"].includes(pet?.type)
        ? "imagens/pet-" +
          (pet.type === "Gato" ? "gato" : "cao") +
          "-ilustrativo.png"
        : "");
    if (!source) return el("span", "pet-avatar", pet?.icon || "🐾");
    const image = el("img", "pet-photo");
    image.src = source;
    image.alt = pet?.photo
      ? "Foto de " + pet.name
      : "Imagem ilustrativa de " + (pet.type === "Gato" ? "gato" : "cão");
    image.title = pet?.photo
      ? pet.name
      : "Imagem ilustrativa gerada por IA; não representa a raça do cadastro";
    image.loading = "lazy";
    image.addEventListener(
      "error",
      () => image.replaceWith(el("span", "pet-avatar", pet?.icon || "🐾")),
      { once: true },
    );
    return image;
  }
  function actionLinks(entity, item) {
    const td = el("td", "table-actions");
    const paths =
      entity === "pets"
        ? ["pet_editar.html", "pet_visualizar.html"]
        : entity === "users"
          ? ["usuario_editar.html", "usuario_visualizar.html"]
          : ["reserva_editar.html", "reserva_visualizar.html"];
    [
      ["Editar", paths[0], "row-action row-action--edit", "edit.svg"],
      ["Detalhes", paths[1], "row-action row-action--view", "view.svg"],
    ].forEach(([label, path, cls, icon]) => {
      const a = el("a", cls);
      a.href = path + "?id=" + encodeURIComponent(item.id);
      const image = document.createElement("img");
      image.src = "imagens/icones/" + icon;
      image.alt = "";
      a.append(image, document.createTextNode(label));
      td.append(a);
    });
    return td;
  }
  // Monta a tabela a partir dos registros; os vínculos usam códigos, nunca o nome.
  function renderList() {
    if (!table || !kind) return;
    const head = table.tHead?.rows[0];
    if (head && !head.querySelector("[data-all]")) {
      const th = el("th");
      th.scope = "col";
      const all = document.createElement("input");
      all.type = "checkbox";
      all.dataset.all = "";
      all.setAttribute("aria-label", "Selecionar todos os registros");
      th.append(all);
      head.prepend(th);
    }
    const body = table.tBodies[0];
    body.replaceChildren();
    data[kind].forEach((item) => {
      const row = document.createElement("tr");
      row.dataset.id = item.id;
      const select = el("td", "selection-cell");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.value = item.id;
      box.dataset.rowSelect = "";
      box.setAttribute(
        "aria-label",
        "Selecionar " + (item.name || item.pet || item.number),
      );
      select.append(box);
      row.append(select);
      if (kind === "pets") {
        addCell(row, petPortrait(item));
        addCell(row, item.name);
        addCell(row, item.type);
        addCell(row, item.race);
        addCell(
          row,
          Number(item.weight || 0).toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
          }) + " kg",
        );
        addCell(row, item.size || classifyWeight(item.weight));
        const ownerLink = el("a", "", displayOwner(item));
        ownerLink.title = item.owner;
        ownerLink.href =
          "usuario_visualizar.html?id=" +
          encodeURIComponent(item.ownerId || "");
        addCell(row, ownerLink);
      } else if (kind === "users") {
        const img = document.createElement("img");
        img.src = item.photo || "imagens/avatar-beatriz.svg";
        img.alt = "Avatar de " + item.name;
        img.className = "avatar--small";
        const imageCell =
          item.id === "u1"
            ? (() => {
                const link = el("a", "avatar-link");
                link.href = "perfil.html";
                link.setAttribute(
                  "aria-label",
                  "Abrir perfil de Thiago Ferreira Prates Neves",
                );
                link.append(img);
                return link;
              })()
            : img;
        addCell(row, imageCell);
        addCell(row, userIdentification(item));
        const words = item.name.trim().split(/\s+/);
        const nameCell = el("span", "", words[0]);
        nameCell.title = item.name;
        addCell(row, nameCell);
        const surname = el("span", "", words.length > 1 ? words.at(-1) : "—");
        surname.title = item.name;
        addCell(row, surname);
        addCell(row, item.role);
        addCell(
          row,
          el("span", "status-badge " + badgeClass(item.status), item.status),
        );
        addCell(row, item.created);
      } else {
        addCell(row, el("span", "reservation-code", reservationCode(item)));
        const pet = el("div", "icon-list");
        pet.append(
          petPortrait(data.pets.find((record) => record.id === item.petId)),
        );
        const title = el("span", "", item.pet);
        pet.append(title);
        addCell(row, pet);
        addCell(row, item.race);
        addCell(row, displayOwner(item));
        addCell(row, dateText(item.checkin));
        addCell(row, dateText(item.checkout) + " até " + checkoutTime(item));
        addCell(
          row,
          Math.max(
            0,
            Math.round(
              (new Date(item.checkout + "T12:00:00") -
                new Date(item.checkin + "T12:00:00")) /
                86400000,
            ),
          ),
        );
        addCell(
          row,
          el("span", "status-badge " + badgeClass(item.status), item.status),
        );
        const nights = Math.max(
          0,
          Math.round(
            (new Date(item.checkout + "T12:00:00") -
              new Date(item.checkin + "T12:00:00")) /
              86400000,
          ),
        );
        const petRecord = data.pets.find(
          (pet) => pet.id === item.petId || clean(pet.name) === clean(item.pet),
        );
        addCell(
          row,
          formatMoney(
            window.HotelPetFinance.total(item, data.pets, readRates()) / 100,
          ),
        );
      }
      row.append(actionLinks(kind, item));
      body.append(row);
    });
    const card = table.closest(".card");
    let counter = $("#result-count");
    if (card && !counter) {
      counter = el("p", "result-count", "");
      counter.id = "result-count";
      counter.setAttribute("role", "status");
      card.prepend(counter);
    }
    const bar = $(".page-content .page-actions");
    if (bar && !$("[data-delete-selected]")) {
      const existing = bar.querySelector(".button--danger");
      if (existing) {
        existing.dataset.deleteSelected = "";
        existing.innerHTML =
          '<img src="imagens/icones/delete.svg" alt=""> Excluir selecionados';
      } else {
        const button = el(
          "button",
          "button button--danger",
          "Excluir selecionados",
        );
        button.type = "button";
        button.dataset.deleteSelected = "";
        button.innerHTML =
          '<img src="imagens/icones/delete.svg" alt=""> Excluir selecionados';
        bar.append(button);
      }
    }
    const status = $(".page-actions .button--success");
    if (status) status.dataset.toggleSelected = "";
    const rows = Array.from(body.rows);
    // A paginação limita a exibição, nunca a quantidade de cadastros salvos.
    let currentPage = 1;
    const pagination = el("nav", "table-pagination");
    pagination.setAttribute("aria-label", "Paginação dos registros");
    const limitLabel = el("label", "", "Registros por página "),
      limit = document.createElement("select");
    limit.id = "registros-por-pagina";
    [10, 25, 50].forEach((value) =>
      limit.add(new Option(String(value), String(value))),
    );
    limitLabel.append(limit);
    const previous = el("button", "button button--secondary", "Anterior"),
      next = el("button", "button button--secondary", "Próxima"),
      pageInfo = el("span", "");
    previous.type = next.type = "button";
    pageInfo.setAttribute("aria-live", "polite");
    pagination.append(limitLabel, previous, pageInfo, next);
    table.closest(".table-wrapper")?.after(pagination);
    if (!pagination.isConnected) card?.append(pagination);
    // Filtra todos os registros antes de recortar a página que será exibida.
    function filterRows(reset = true) {
      if (reset) currentPage = 1;
      const fields = Array.from(
        document.querySelectorAll(".filter-grid input,.filter-grid select"),
      );
      const shown = rows.filter((row) => {
        const item = data[kind].find((entry) => entry.id === row.dataset.id);
        return fields.every((field) => {
          const query = clean(field.value);
          if (!query || query === "todos" || query === "todas") return true;
          const values =
            kind === "pets"
              ? {
                  "f-nome": item.name,
                  "f-tipo": item.type,
                  "f-raca": item.race,
                  "f-peso": Number(item.weight || 0).toLocaleString("pt-BR", {
                    maximumFractionDigits: 3,
                  }),
                  "f-tamanho": item.size,
                  "f-proprietario": item.owner + " " + displayOwner(item),
                }
              : kind === "users"
                ? {
                    "f-id": item.id + " " + item.id.replace(/\D/g, ""),
                    "f-email": userIdentification(item),
                    "f-nome": item.name + " " + item.displayName,
                    "f-status": item.status,
                    "f-funcao": item.role,
                    "f-criado-de": item.created,
                    "f-criado-ate": item.created,
                  }
                : {
                    "f-id": reservationCode(item),
                    "f-cliente": item.owner + " " + displayOwner(item),
                    "f-pet": item.pet,
                    "f-status": item.status,
                    "f-entrada": item.checkin,
                    "f-saida": item.checkout,
                  };
          let value = String(values[field.id] || "");
          if (field.type === "date") {
            if (value.includes("/")) {
              const parts = value.split("/");
              value = parts[2] + "-" + parts[1] + "-" + parts[0];
            }
            return field.id.endsWith("-de") || field.id === "f-entrada"
              ? value >= field.value
              : value <= field.value;
          }
          return clean(value).includes(query);
        });
      });
      const group = table.dataset.userView;
      const matches = shown.filter(
        (row) =>
          !group ||
          (group === "clientes"
            ? row.dataset.userRole === "cliente"
            : row.dataset.userRole === "equipe"),
      );
      const size = Number(limit.value),
        pages = Math.max(1, Math.ceil(matches.length / size));
      currentPage = Math.min(currentPage, pages);
      const start = (currentPage - 1) * size,
        visible = matches.slice(start, start + size);
      rows.forEach((row) => {
        row.hidden = !visible.includes(row);
        if (row.hidden) row.querySelector("[data-row-select]").checked = false;
      });
      const all = table.querySelector("[data-all]");
      if (all) all.checked = false;
      if (counter)
        counter.textContent = matches.length
          ? "Exibindo " +
            (start + 1) +
            " a " +
            Math.min(start + size, matches.length) +
            " de " +
            matches.length +
            " registros"
          : "Nenhum registro encontrado";
      pageInfo.textContent = "Página " + currentPage + " de " + pages;
      previous.disabled = currentPage === 1;
      next.disabled = currentPage === pages;
    }
    previous.addEventListener("click", () => {
      currentPage--;
      filterRows(false);
    });
    next.addEventListener("click", () => {
      currentPage++;
      filterRows(false);
    });
    limit.addEventListener("change", () => filterRows());
    document
      .querySelectorAll("[data-user-view]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          queueMicrotask(() => filterRows()),
        ),
      );
    document
      .querySelectorAll(".filter-grid input,.filter-grid select")
      .forEach((field) => {
        field.addEventListener("input", () =>
          queueMicrotask(() => filterRows()),
        );
        field.addEventListener("change", () =>
          queueMicrotask(() => filterRows()),
        );
      });
    document
      .querySelectorAll(".filter-actions button")
      .forEach((button, index) =>
        button.addEventListener("click", () => {
          if (index === 1) {
            document
              .querySelectorAll(".filter-grid input")
              .forEach((field) => (field.value = ""));
            document
              .querySelectorAll(".filter-grid select")
              .forEach((field) => (field.selectedIndex = 0));
          }
          queueMicrotask(() => filterRows());
        }),
      );
    $("[data-all]", table)?.addEventListener("change", (event) =>
      table.querySelectorAll("[data-row-select]").forEach((box) => {
        if (box.closest("tr").getClientRects().length > 0)
          box.checked = event.target.checked;
      }),
    );
    $("[data-delete-selected]")?.addEventListener("click", () => {
      const ids = Array.from(
        document.querySelectorAll("[data-row-select]:checked"),
      ).map((box) => box.value);
      if (!ids.length) {
        window.alert("Selecione ao menos um registro.");
        return;
      }
      if (
        kind === "users" &&
        (data.pets.some((pet) => ids.includes(pet.ownerId)) ||
          data.reservas.some((reservation) =>
            ids.includes(reservation.ownerId),
          ))
      ) {
        window.alert(
          "Existe pet vinculado ou reserva vinculada a este responsável. Revise os vínculos antes de excluir o cadastro.",
        );
        return;
      }
      if (
        kind === "pets" &&
        data.reservas.some((reservation) => ids.includes(reservation.petId))
      ) {
        window.alert(
          "Existe reserva vinculada a este pet. Revise as reservas antes de excluir.",
        );
        return;
      }
      if (kind === "reservas" && ids.some(hasPayment)) {
        window.alert(
          "Uma reserva com recebimento registrado não pode ser excluída. Preserve o histórico financeiro.",
        );
        return;
      }
      if (
        !window.confirm(
          "Excluir os registros selecionados desta demonstração local?",
        )
      )
        return;
      if (
        commitChange(() => {
          data[kind] = data[kind].filter(
            (item) =>
              !ids.includes(item.id) || (kind === "users" && item.id === "u1"),
          );
        })
      )
        location.reload();
    });
    $("[data-toggle-selected]")?.addEventListener("click", () => {
      const ids = Array.from(
        document.querySelectorAll("[data-row-select]:checked"),
      ).map((box) => box.value);
      if (!ids.length) {
        window.alert("Selecione ao menos um registro.");
        return;
      }
      if (
        commitChange(() => {
          data[kind].forEach((item) => {
            if (
              ids.includes(item.id) &&
              !(kind === "users" && item.id === "u1")
            )
              item.status =
                clean(item.status) === "ativo"
                  ? "Inativo"
                  : clean(item.status) === "inativo"
                    ? "Ativo"
                    : clean(item.status) === "finalizada"
                      ? "Em andamento"
                      : "Finalizada";
          });
        })
      )
        location.reload();
    });
    queueMicrotask(() => filterRows());
    document.addEventListener("DOMContentLoaded", () => filterRows(), {
      once: true,
    });
  }
  // Preenche o formulário existente para editar o mesmo código, sem duplicar o cadastro.
  function populate(form, item) {
    if (!item) return;
    const values =
      kind === "users"
        ? {
            nome: item.name,
            "nome-exibicao": item.displayName,
            email: item.email,
            telefone: item.phone,
            funcao: item.role,
            status: item.status,
          }
        : kind === "pets"
          ? {
              nome: item.name,
              tipo: item.type,
              raca: item.race,
              peso: item.weight,
              tamanho: item.size,
              proprietario: item.ownerId,
            }
          : {
              cliente: displayOwner(item),
              checkin: item.checkin,
              checkout: item.checkout,
              status: item.status,
              obs: item.note,
              valor:
                item.dailyRate ?? rateForWeight(reservationWeight(item) || 5),
              tipo: item.stayType || "Hotel",
            };
    Object.entries(values).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field instanceof RadioNodeList)
        Array.from(field).forEach(
          (option) =>
            (option.checked = clean(option.value) === clean(item.size)),
        );
      else if (field.tagName === "SELECT") {
        const option = Array.from(field.options).find(
          (opt) =>
            clean(opt.textContent) === clean(value) ||
            clean(opt.value) === clean(value),
        );
        if (option) field.value = option.value;
      } else field.value = value ?? "";
    });
    if (kind === "reservas") {
      const field = form.elements.namedItem("pet");
      const pet = data.pets.find((entry) => entry.id === item.petId);
      if (field && pet) field.value = pet.id;
    }
  }
  // Atualiza a previsão usando datas, peso e a diária informada no formulário.
  function updateQuote() {
    if (!file.startsWith("reserva_") || detail) return;
    const form = $("form.card");
    const start = form?.elements.namedItem("checkin");
    const end = form?.elements.namedItem("checkout");
    const petSelect = form?.elements.namedItem("pet");
    const note = $(".stay-total span");
    const amount = $(".stay-total strong");
    if (!start || !end || !note || !amount) return;
    const pet = data.pets.find((entry) => entry.id === petSelect?.value);
    const manual = form.elements.namedItem("valor");
    const rate = manual
      ? Number(manual.value)
      : rateForWeight(pet?.weight || 5);
    const count =
      start.value && end.value
        ? Math.max(
            0,
            Math.round(
              (new Date(end.value + "T12:00:00") -
                new Date(start.value + "T12:00:00")) /
                86400000,
            ),
          )
        : 0;
    const rateLabel = $("#diaria-aplicada");
    if (rateLabel)
      rateLabel.textContent =
        formatMoney(rate) + " / dia · " + classifyWeight(pet?.weight || 5);
    note.textContent = count + " diária(s) × " + formatMoney(rate) + " =";
    amount.textContent = formatMoney(
      (count * (window.HotelPetFinance.cents(rate) ?? 0)) / 100,
    );
  }
  // Relaciona tipo, raça, peso, porte e responsável do animal.
  function setupPetControls(form, item) {
    const type = form.elements.namedItem("tipo"),
      race = form.elements.namedItem("raca"),
      weight = form.elements.namedItem("peso"),
      size = form.elements.namedItem("tamanho"),
      owner = form.elements.namedItem("proprietario");
    if (item && type) type.value = item.type;
    if (race && item?.race)
      race.replaceChildren(new Option(item.race, item.race));
    const updateSize = () => {
      if (weight && size)
        size.value =
          Number(weight.value) > 0 ? classifyWeight(weight.value) : "";
    };
    if (item && weight) weight.value = item.weight || "";
    updateSize();
    weight?.addEventListener("input", updateSize);
    if (owner) {
      const selected =
        item?.ownerId ||
        new URLSearchParams(location.search).get("responsavel") ||
        "";
      const customers = data.users.filter(
        (user) =>
          (user.role === "Cliente" && user.status === "Ativo") ||
          user.id === item?.ownerId,
      );
      owner.replaceChildren(
        new Option("Selecione o cliente", ""),
        ...customers.map(
          (user) =>
            new Option(
              abbreviated(user.name) + " — " + userIdentification(user),
              user.id,
            ),
        ),
      );
      owner.value = selected;
      const nextReservation =
        new URLSearchParams(location.search).get("retorno") === "reserva";
      const help = form.querySelector('a[href^="usuario_cadastrar.html"]');
      if (help && nextReservation)
        help.href = "usuario_cadastrar.html?retorno=pet&reserva=1";
      if (!customers.length) {
        const message = el(
          "p",
          "form-feedback",
          "Cadastre primeiro o responsável (proprietário). Depois vincule o animal a essa pessoa.",
        );
        message.id = "orientacao-responsavel";
        form.prepend(message);
      }
    }
  }
  function setupReservationPetOptions(form, item) {
    const field = form.elements.namedItem("pet");
    if (!field) return;
    const requested = item
      ? null
      : new URLSearchParams(location.search).get("responsavel");
    const principal = requested
      ? data.users.find((user) => user.id === requested)
      : null;
    const desired =
      item?.petId || new URLSearchParams(location.search).get("animal") || "";
    const candidates = requested
      ? data.pets.filter((pet) => principal && pet.ownerId === principal.id)
      : data.pets;
    const available = candidates.filter((pet) =>
      data.users.some((user) => user.id === pet.ownerId),
    );
    const current = available.some((pet) => pet.id === desired) ? desired : "";
    field.replaceChildren(
      new Option("Selecione o pet", ""),
      ...available.map(
        (pet) =>
          new Option(
            `${pet.name} (${pet.race}) — ${ownerIdentity(pet)}`,
            pet.id,
          ),
      ),
    );
    if (current) field.value = current;
    const owner = form.elements.namedItem("cliente");
    const pet = data.pets.find((entry) => entry.id === current);
    if (owner) {
      owner.readOnly = true;
      if (pet) owner.value = displayOwner(pet);
      else if (principal) owner.value = abbreviated(principal.name);
    }
    if (requested && !principal)
      form.prepend(
        el(
          "p",
          "form-feedback",
          "Responsável não encontrado. Volte aos usuários e selecione um cadastro válido.",
        ),
      );
    if (!item && (!requested || principal)) {
      const guide = el("section", "reservation-guide");
      guide.id = "orientacao-reserva";
      guide.append(el("strong", "", "Responsável → animal → reserva"));
      guide.append(
        el(
          "p",
          "",
          available.length
            ? "Selecione um animal já vinculado ao responsável. Para um novo animal, conclua seu cadastro e retorne à reserva."
            : "Não há animais disponíveis para esta reserva. Cadastre o responsável e vincule um animal antes de continuar.",
        ),
      );
      const customerExists = data.users.some(
        (user) => user.role === "Cliente" && user.status === "Ativo",
      );
      const link = el(
        "a",
        "button button--secondary",
        customerExists
          ? "Cadastrar animal e continuar reserva"
          : "Cadastrar responsável e continuar",
      );
      link.href = customerExists
        ? "pet_cadastrar.html?retorno=reserva" +
          (principal ? "&responsavel=" + encodeURIComponent(principal.id) : "")
        : "usuario_cadastrar.html?retorno=pet&reserva=1";
      guide.append(link);
      form.prepend(guide);
    }
    field.addEventListener("change", () => {
      const pet = data.pets.find((entry) => entry.id === field.value);
      const owner = form.elements.namedItem("cliente");
      if (owner) owner.value = pet ? displayOwner(pet) : "";
      const rate = form.elements.namedItem("valor");
      if (rate) rate.value = rateForWeight(pet?.weight || 5);
      updateQuote();
    });
  }
  // Valida o formulário e decide entre criar um registro ou atualizar o existente.
  function setupForm() {
    const form = $("form.card");
    if (
      !form ||
      !kind ||
      (!file.includes("_cadastrar") && !file.includes("_editar"))
    )
      return;
    if (
      kind === "users" &&
      new URLSearchParams(location.search).get("retorno") === "pet"
    ) {
      const role = form.elements.namedItem("funcao");
      if (role) {
        role.value = "Cliente";
        role.disabled = true;
      }
      const title = document.querySelector("h1");
      if (title) title.textContent = "Cadastrar responsável pelo pet";
    }
    const editing = file.includes("_editar");
    const id = new URLSearchParams(location.search).get("id");
    let item = editing ? data[kind].find((entry) => entry.id === id) : null;
    if (editing && !item) {
      const main = $(".page-content");
      const back = el("a", "button button--secondary", "Voltar à listagem");
      back.href =
        kind === "users"
          ? "usuarios.html"
          : kind === "pets"
            ? "pets.html"
            : "reservas.html";
      main.replaceChildren(
        el("h1", "", "Registro não encontrado"),
        el("p", "", "Volte à listagem para selecionar um cadastro válido."),
        back,
      );
      return;
    }
    if (kind === "pets") setupPetControls(form, item);
    if (kind === "reservas") setupReservationPetOptions(form, item);
    if (editing) populate(form, item);
    if (kind === "reservas") {
      const rule = el(
        "p",
        "settings-value",
        "A diária encerra às " +
          checkoutTime(item) +
          " da data de saída, no fuso configurado do hotel (formato de 24 horas).",
      );
      rule.id = "regra-diaria";
      form.append(rule);
    }
    if (kind === "users" && item?.id === "u1") {
      for (const name of ["funcao", "status"])
        form.elements.namedItem(name).disabled = true;
      form.append(
        el(
          "p",
          "settings-value",
          "O gerente responsável permanece ativo. Use outros cadastros para gerenciar funções da equipe.",
        ),
      );
    }
    if (editing) {
      const crumb = document.querySelector(".breadcrumb");
      if (crumb?.lastChild?.nodeType === Node.TEXT_NODE)
        crumb.lastChild.textContent =
          " / Editar " +
          (kind === "reservas"
            ? "reserva " + reservationCode(item)
            : item.name);
    }
    for (const name of kind === "users"
      ? ["nome"]
      : kind === "pets"
        ? ["nome", "tipo", "raca", "peso", "proprietario"]
        : ["pet", "checkin", "checkout"]) {
      const field = form.elements.namedItem(name);
      if (field) field.required = true;
    }
    if (kind === "users") {
      const emailField = form.elements.namedItem("email");
      if (emailField) emailField.required = false;
    }
    if (kind === "reservas") {
      const stayLink = document.getElementById("ver-estadia");
      if (stayLink && item)
        stayLink.href =
          "reserva_visualizar.html?id=" + encodeURIComponent(item.id);
      const field = el("div", "form-field reservation-identifier");
      const label = el("label", "", "Número da reserva");
      label.htmlFor = "codigo-reserva";
      const output = el(
        "output",
        "reservation-code",
        item
          ? reservationCode(item)
          : window.HotelPetDemo.reservationCode(data.nextReservationNumber),
      );
      output.id = "codigo-reserva";
      field.append(label, output);
      form.querySelector(".form-grid")?.prepend(field);
      const checkin = form.elements.namedItem("checkin"),
        checkout = form.elements.namedItem("checkout");
      checkin?.addEventListener("input", updateQuote);
      checkout?.addEventListener("input", updateQuote);
      updateQuote();
      const rate = form.elements.namedItem("valor");
      if (rate) {
        rate.min = "0";
        rate.required = true;
        rate.addEventListener("input", updateQuote);
      }
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const get = (name) => {
        const field = form.elements.namedItem(name);
        if (!field) return "";
        if (field instanceof RadioNodeList)
          return (
            Array.from(field).find((option) => option.checked)?.value || ""
          );
        return field.value;
      };
      let saved;
      if (kind === "users")
        saved = {
          ...(item || {}),
          id: item?.id || newId("u"),
          photo: item?.photo || "imagens/avatar-beatriz.svg",
          name: get("nome").trim(),
          displayName: get("nome-exibicao").trim() || abbreviated(get("nome")),
          email: get("email").trim(),
          phone: get("telefone").trim(),
          role: get("funcao") || "Cliente",
          status: get("status") || "Ativo",
          created:
            item?.created ||
            new Date().toLocaleDateString("pt-BR", {
              timeZone: window.HotelPetFuso?.zone() || "America/Sao_Paulo",
            }),
        };
      if (kind === "pets") {
        const type = get("tipo") || "Cachorro";
        const icon =
          {
            Cachorro: "🐶",
            Gato: "🐱",
            Coelho: "🐰",
            Ave: "🐦",
            Roedor: "🐹",
            Réptil: "🦎",
          }[type] || "🐾";
        const weight = Number(get("peso"));
        const size = classifyWeight(weight);
        saved = {
          ...(item || {}),
          id: item?.id || newId("p"),
          icon,
          name: get("nome").trim(),
          type,
          race:
            get("raca") === "Outra raça"
              ? get("outra-raca").trim()
              : get("raca"),
          weight,
          size,
          ownerId: get("proprietario"),
          owner:
            data.users.find((user) => user.id === get("proprietario"))?.name ||
            "",
        };
      }
      if (kind === "reservas") {
        const pet = data.pets.find((entry) => entry.id === get("pet"));
        const petName = pet?.name || get("pet");
        const weight = pet?.weight || 5;
        saved = {
          ...(item || {}),
          id: item?.id || newId("r"),
          number: item?.number || window.HotelPetDemo.nextReservation(data),
          petId: pet?.id || item?.petId || "",
          pet: petName,
          race: pet?.race || item?.race || "",
          weight,
          size: classifyWeight(weight),
          ownerId: pet?.ownerId || "",
          owner: pet?.owner || get("cliente"),
          checkin: get("checkin"),
          checkout: get("checkout"),
          checkoutTime: checkoutTime(item),
          status: get("status") || "Pendente",
          dailyRate: rateForWeight(weight),
          note: get("obs") || "",
        };
      }
      if (kind === "pets" || kind === "users") {
        try {
          const photo = await readPhoto(form);
          if (photo) saved.photo = photo;
        } catch (error) {
          window.alert(error.message);
          return;
        }
      }
      if (kind === "reservas") {
        const manual = form.elements.namedItem("valor");
        if (manual) saved.dailyRate = Number(manual.value);
        if (!Number.isFinite(saved.dailyRate) || saved.dailyRate < 0) {
          window.alert("Informe uma diária válida maior ou igual a zero.");
          return;
        }
        saved.stayType = get("tipo") || item?.stayType || "Hotel";
      }
      if (
        kind === "pets" &&
        !data.users.some((user) => user.id === saved.ownerId)
      ) {
        window.alert("Cadastre ou selecione o responsável pelo pet.");
        return;
      }
      if (
        kind === "reservas" &&
        !data.users.some((user) => user.id === saved.ownerId)
      ) {
        window.alert(
          "O pet precisa estar vinculado a um responsável válido antes de reservar.",
        );
        return;
      }
      if (kind === "reservas" && !editing) {
        const requestedOwner = new URLSearchParams(location.search).get(
          "responsavel",
        );
        if (requestedOwner && saved.ownerId !== requestedOwner) {
          window.alert(
            "Selecione um animal vinculado ao responsável desta reserva.",
          );
          return;
        }
      }
      if (
        kind === "users" &&
        data.users.some(
          (user) =>
            saved.email &&
            user.id !== saved.id &&
            clean(user.email) === clean(saved.email),
        )
      ) {
        window.alert(
          "Este e-mail já está cadastrado. Edite o responsável existente.",
        );
        return;
      }
      if (kind === "reservas") saved.code = reservationCode(saved);
      if (kind === "pets" && item && saved.name !== item.name)
        saved.nameIsCustom = true;
      const missing =
        kind === "reservas"
          ? !saved.pet || !saved.owner || !saved.checkin || !saved.checkout
          : !saved.name ||
            (kind === "pets" &&
              (!saved.race || !saved.ownerId || !(saved.weight > 0)));
      if (missing) {
        window.alert("Preencha os campos obrigatórios antes de salvar.");
        return;
      }
      if (
        kind === "reservas" &&
        new Date(saved.checkout) <= new Date(saved.checkin)
      ) {
        window.alert("A saída deve ocorrer depois da entrada.");
        return;
      }
      // Mantém o mesmo cadastro e seus vínculos ao editar, sem criar duplicatas.
      const beforeSave = clone(data);
      if (editing && item)
        data[kind] = data[kind].map((entry) =>
          entry.id === item.id ? saved : entry,
        );
      else data[kind].push(saved);
      if (kind === "users") {
        data.pets.forEach((pet) => {
          if (pet.ownerId === saved.id) pet.owner = saved.name;
        });
        data.reservas.forEach((reservation) => {
          if (reservation.ownerId === saved.id) reservation.owner = saved.name;
        });
      }
      if (kind === "pets")
        data.reservas.forEach((reservation) => {
          if (reservation.petId === saved.id) {
            reservation.pet = saved.name;
            reservation.race = saved.race;
            reservation.ownerId = saved.ownerId;
            reservation.owner = saved.owner;
          }
        });
      const password = form.elements.namedItem("senha");
      if (password) password.value = "";
      if (!saveData()) {
        data = beforeSave;
        window.alert(
          "Não foi possível salvar os dados neste navegador. Suas alterações continuam no formulário; tente novamente.",
        );
        return;
      }
      if (
        kind === "users" &&
        new URLSearchParams(location.search).get("retorno") === "pet"
      ) {
        location.href =
          "pet_cadastrar.html?responsavel=" +
          encodeURIComponent(saved.id) +
          (new URLSearchParams(location.search).get("reserva") === "1"
            ? "&retorno=reserva"
            : "");
        return;
      }
      if (
        kind === "pets" &&
        new URLSearchParams(location.search).get("retorno") === "reserva"
      ) {
        location.href =
          "reserva_cadastrar.html?responsavel=" +
          encodeURIComponent(saved.ownerId) +
          "&animal=" +
          encodeURIComponent(saved.id);
        return;
      }
      location.href =
        (kind === "pets"
          ? "pets.html"
          : kind === "users"
            ? "usuarios.html"
            : "reservas.html") +
        "?salvo=" +
        encodeURIComponent(saved.id);
    });
  }
  // Exibe o cadastro selecionado e prepara as ações permitidas ao gerente.
  function setupDetail() {
    const main = $(".page-content");
    if (!main) return;
    const id = new URLSearchParams(location.search).get("id");
    const item = data[kind].find((entry) => entry.id === id);
    if (!item) {
      main.replaceChildren(
        el("h1", "", "Registro não encontrado"),
        el("p", "", "Volte à listagem e selecione um cadastro válido."),
      );
      return;
    }
    const title = $("h1", main);
    if (title)
      title.textContent =
        kind === "pets"
          ? item.name
          : kind === "users"
            ? item.name
            : "Reserva " + reservationCode(item);
    const crumb = document.querySelector(".breadcrumb");
    if (crumb?.lastChild?.nodeType === Node.TEXT_NODE)
      crumb.lastChild.textContent = " / " + title.textContent;
    main.querySelectorAll(".card").forEach((card) => (card.hidden = true));
    const card = el("section", "card detail-summary");
    card.append(
      el(
        "h2",
        "",
        kind === "pets"
          ? "Dados do animal"
          : kind === "users"
            ? "Dados do usuário"
            : "Dados da hospedagem",
      ),
    );
    const weight =
      kind === "reservas" ? reservationWeight(item) : Number(item.weight) || 0;
    const nights =
      kind === "reservas"
        ? Math.max(
            0,
            Math.round(
              (Date.parse(item.checkout + "T12:00:00Z") -
                Date.parse(item.checkin + "T12:00:00Z")) /
                86400000,
            ),
          )
        : 0;
    const rate =
      kind === "reservas"
        ? Number(item.dailyRate ?? rateForWeight(weight || 5))
        : 0;
    const values =
      kind === "pets"
        ? [
            ["Nome", item.name],
            ["Tipo", item.type],
            [
              raceTitle(
                kind === "pets"
                  ? item
                  : data.pets.find((pet) => pet.id === item.petId),
              ),
              item.race,
            ],
            [
              "Peso",
              Number(item.weight) > 0
                ? Number(item.weight).toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                  }) + " kg"
                : "Não informado",
            ],
            [
              "Porte",
              item.size ||
                (Number(item.weight) > 0
                  ? classifyWeight(item.weight)
                  : "Não informado"),
            ],
            ["Proprietário", displayOwner(item)],
          ]
        : kind === "users"
          ? [
              ["Nome completo", item.name],
              ["Nome de exibição", item.displayName],
              ["E-mail", item.email || "Não informado"],
              ["Identificação", userIdentification(item)],
              ["Telefone", item.phone],
              ["Função", item.role],
              ["Situação", item.status],
              ["Cadastro", item.created],
            ]
          : [
              ["Número da reserva", reservationCode(item)],
              ["Animal", item.pet],
              [
                raceTitle(
                  kind === "pets"
                    ? item
                    : data.pets.find((pet) => pet.id === item.petId),
                ),
                item.race,
              ],
              [
                "Peso",
                weight > 0
                  ? weight.toLocaleString("pt-BR", {
                      minimumFractionDigits: 1,
                    }) + " kg"
                  : "Não informado",
              ],
              [
                "Porte",
                item.size ||
                  (weight > 0 ? classifyWeight(weight) : "Não informado"),
              ],
              ["Cliente", displayOwner(item)],
              ["Entrada", dateText(item.checkin)],
              [
                "Saída",
                dateText(item.checkout) +
                  " até " +
                  checkoutTime(item) +
                  " · " +
                  (window.HotelPetFuso?.label() || "Brasília"),
              ],
              ["Diárias", String(nights)],
              ["Diária", formatMoney(rate)],
              [
                "Total previsto",
                formatMoney(
                  window.HotelPetFinance.total(item, data.pets, readRates()) /
                    100,
                ),
              ],
              ["Situação", item.status],
              ["Observações", item.note],
            ];
    const list = document.createElement("dl");
    values.forEach(([label, value]) => {
      const row = el("div", "detail-summary__row"),
        description = el("dd", "", value || "—");
      if (["Proprietário", "Cliente"].includes(label) && item.ownerId) {
        const link = el("a", "", value || "Abrir responsável");
        link.href =
          "usuario_visualizar.html?id=" + encodeURIComponent(item.ownerId);
        link.title =
          (data.users.find((user) => user.id === item.ownerId)?.name ||
            item.owner) + "";
        description.replaceChildren(link);
      }
      row.append(el("dt", "", label), description);
      list.append(row);
    });
    if (kind === "pets" || kind === "reservas") {
      card.prepend(
        petPortrait(
          kind === "pets"
            ? item
            : data.pets.find((pet) => pet.id === item.petId),
        ),
      );
      card.append(
        el(
          "p",
          "pet-photo-notice",
          "As imagens padrão são ilustrativas, geradas por IA; podem não corresponder à raça. Envie a foto real no cadastro do pet.",
        ),
      );
    }
    card.append(list);
    const bar = $(".page-actions", main);
    if (bar) main.insertBefore(card, bar);
    else main.append(card);
    const edit = bar?.querySelector(".button--primary");
    if (edit)
      edit.href =
        (kind === "pets"
          ? "pet_editar.html"
          : kind === "users"
            ? "usuario_editar.html"
            : "reserva_editar.html") +
        "?id=" +
        encodeURIComponent(item.id);
    const persistAction = commitChange;
    bar?.querySelector(".button--success")?.addEventListener("click", () => {
      if (kind === "users" && item.id === "u1") {
        window.alert(
          "O gerente responsável pelo sistema deve permanecer ativo.",
        );
        return;
      }
      if (!window.confirm("Mudar a situação deste cadastro?")) return;
      if (
        persistAction(() => {
          const current = data[kind].find((record) => record.id === item.id);
          current.status =
            kind === "users"
              ? current.status === "Ativo"
                ? "Inativo"
                : "Ativo"
              : current.status === "Finalizada"
                ? "Em andamento"
                : "Finalizada";
        })
      )
        location.reload();
    });
    bar
      ?.querySelector(".button--danger")
      ?.addEventListener("click", (event) => {
        event.preventDefault();
        if (kind === "users" && item.id === "u1") {
          window.alert(
            "O gerente responsável pelo sistema não pode ser removido.",
          );
          return;
        }
        if (
          kind === "users" &&
          (data.pets.some((pet) => pet.ownerId === item.id) ||
            data.reservas.some(
              (reservation) => reservation.ownerId === item.id,
            ))
        ) {
          window.alert(
            "Existe pet vinculado ou reserva vinculada a este responsável. Revise os vínculos antes de excluir o cadastro.",
          );
          return;
        }
        if (
          kind === "pets" &&
          data.reservas.some((reservation) => reservation.petId === item.id)
        ) {
          window.alert(
            "Existe reserva vinculada a este pet. Revise as reservas antes de excluir.",
          );
          return;
        }
        if (kind === "reservas" && hasPayment(item.id)) {
          window.alert(
            "Uma reserva com recebimento registrado não pode ser excluída. Preserve o histórico financeiro.",
          );
          return;
        }
        if (!window.confirm("Remover este cadastro da demonstração local?"))
          return;
        if (
          persistAction(() => {
            data[kind] = data[kind].filter((record) => record.id !== item.id);
          })
        )
          location.href =
            kind === "users"
              ? "usuarios.html"
              : kind === "pets"
                ? "pets.html"
                : "reservas.html";
      });
    if (kind === "pets") {
      const history = el(
        "section",
        "card stay-section pet-reservation-history",
      );
      history.append(el("h2", "", "Histórico de reservas deste animal"));
      const reservations = data.reservas
        .filter((reservation) => reservation.petId === item.id)
        .sort((a, b) => String(b.checkin).localeCompare(String(a.checkin)));
      if (!reservations.length)
        history.append(el("p", "", "Nenhuma reserva vinculada a este animal."));
      else {
        const wrapper = el("div", "table-wrapper"),
          table = el("table", "data-table"),
          caption = el(
            "caption",
            "visually-hidden",
            "Reservas vinculadas ao código deste animal",
          ),
          head = table.createTHead(),
          header = head.insertRow();
        [
          "Reserva",
          "Entrada",
          "Saída",
          "Situação",
          "Total previsto",
          "Detalhes",
        ].forEach((label) => {
          const th = el("th", "", label);
          th.scope = "col";
          header.append(th);
        });
        const body = table.createTBody();
        for (const reservation of reservations) {
          const row = body.insertRow();
          row.dataset.reservationId = reservation.id;
          addCell(row, reservationCode(reservation));
          addCell(row, dateText(reservation.checkin));
          addCell(
            row,
            dateText(reservation.checkout) +
              " até " +
              checkoutTime(reservation),
          );
          addCell(row, reservation.status);
          addCell(
            row,
            formatMoney(
              window.HotelPetFinance.total(
                reservation,
                data.pets,
                readRates(),
              ) / 100,
            ),
          );
          const link = el("a", "row-action", "Abrir reserva");
          link.href =
            "reserva_visualizar.html?id=" + encodeURIComponent(reservation.id);
          addCell(row, link);
        }
        table.prepend(caption);
        wrapper.append(table);
        history.append(wrapper);
      }
      main.append(history);
    }
    if (kind === "users") {
      const overview = el("section", "card stay-section owner-overview");
      overview.dataset.ownerId = item.id;
      overview.append(el("h2", "", "Animais e reservas deste responsável"));
      const pets = data.pets.filter((pet) => pet.ownerId === item.id),
        reservations = data.reservas.filter(
          (reservation) => reservation.ownerId === item.id,
        );
      for (const [title, records, entity] of [
        ["Animais", pets, "pet"],
        ["Reservas", reservations, "reserva"],
      ]) {
        overview.append(el("h3", "", title + " (" + records.length + ")"));
        const list = el("ul", "owner-records");
        list.dataset.ownerRecords = entity;
        if (!records.length)
          list.append(el("li", "", "Nenhum registro vinculado."));
        for (const record of records) {
          const row = el("li", "");
          row.dataset.recordId = record.id;
          const link = el(
            "a",
            "",
            entity === "pet"
              ? record.name
              : "Reserva " + reservationCode(record) + " · " + record.pet,
          );
          link.href =
            entity + "_visualizar.html?id=" + encodeURIComponent(record.id);
          row.append(link);
          list.append(row);
        }
        overview.append(list);
      }
      const actions = el("div", "page-actions");
      if (item.role === "Cliente" && item.status === "Ativo") {
        const create = el(
          "a",
          "button button--secondary",
          "Cadastrar animal deste responsável",
        );
        create.href =
          "pet_cadastrar.html?responsavel=" + encodeURIComponent(item.id);
        actions.append(create);
      }
      if (pets.length) {
        const create = el(
          "a",
          "button button--secondary",
          "Cadastrar reserva deste responsável",
        );
        create.href =
          "reserva_cadastrar.html?responsavel=" + encodeURIComponent(item.id);
        actions.append(create);
      }
      overview.append(actions);
      main.append(overview);
    }
  }
  // Atualiza os indicadores a partir dos mesmos cadastros usados nas tabelas.
  function dashboard() {
    if (file !== "painel.html") return;
    const body = document.querySelector(".data-table tbody");
    if (body) {
      body.replaceChildren();
      data.reservas
        .slice(-5)
        .reverse()
        .forEach((reservation) => {
          const row = el("tr");
          addCell(
            row,
            el("span", "reservation-code", reservationCode(reservation)),
          );
          const petIdentity = el("div", "pet-identity");
          petIdentity.append(
            petPortrait(data.pets.find((pet) => pet.id === reservation.petId)),
            el("span", "", reservation.pet),
          );
          addCell(row, petIdentity);
          addCell(row, displayOwner(reservation));
          addCell(
            row,
            el(
              "span",
              "status-badge " + badgeClass(reservation.status),
              reservation.status,
            ),
          );
          const cell = el("td");
          const link = el("a", "row-action", "Detalhes");
          link.href =
            "reserva_visualizar.html?id=" + encodeURIComponent(reservation.id);
          cell.append(link);
          row.append(cell);
          body.append(row);
        });
    }
    const metrics = document.querySelectorAll(".metric-card__value");
    if (metrics[0]) metrics[0].textContent = String(data.reservas.length);
    const occupied = window.HotelPetDemo.occupied(data).length;
    if (metrics[1]) metrics[1].textContent = String(occupied);
    const capacity = document.querySelector("[data-hotel-capacity]");
    if (capacity) {
      let limit = 30;
      try {
        limit =
          JSON.parse(localStorage.getItem("hotelPetShop.final.settings"))
            ?.capacity || 30;
      } catch {}
      capacity.textContent = occupied + " / " + limit;
    }
    if (metrics[2])
      metrics[2].textContent = String(
        data.users.filter((item) => item.role === "Cliente").length,
      );
    if (metrics[3])
      metrics[3].textContent = String(
        data.reservas.reduce(
          (total, item) =>
            total +
            Math.max(
              0,
              Math.round(
                (new Date(item.checkout + "T12:00:00") -
                  new Date(item.checkin + "T12:00:00")) /
                  86400000,
              ),
            ),
          0,
        ),
      );
  }
  if (listing) renderList();
  else if (detail) setupDetail();
  else setupForm();
  if (listing && new URLSearchParams(location.search).has("salvo")) {
    const savedId = new URLSearchParams(location.search).get("salvo");
    if (data[kind].some((record) => record.id === savedId)) {
      const notice = el(
        "p",
        "form-feedback",
        "Cadastro salvo com sucesso neste navegador.",
      );
      notice.setAttribute("role", "status");
      document.querySelector(".page-title")?.after(notice);
    }
  }

  // Edita o perfil do gerente e atualiza os nomes vinculados ao seu código.
  function managerProfile() {
    const manager = data.users.find((user) => user.id === "u1");
    if (!manager) return;
    const avatar = document.querySelector(".topbar__user img");
    if (avatar) {
      avatar.src = manager.photo || "imagens/avatar-gerente.jpeg";
      avatar.alt = "Foto de " + manager.name;
    }
    const span = document.querySelector(".topbar__user span");
    if (span) {
      span.title = manager.name;
      span.replaceChildren(
        document.createTextNode(manager.displayName),
        el("small", "", manager.role),
      );
    }
    if (file !== "perfil.html") return;
    const form = document.querySelector("form.card");
    if (!form) return;
    for (const [name, value] of Object.entries({
      nome: manager.name,
      "nome-exibicao": manager.displayName,
      email: manager.email,
      telefone: manager.phone,
      funcao: manager.role,
    })) {
      const field = form.elements.namedItem(name);
      if (field) field.value = value || "";
    }
    const portrait = form.querySelector(".avatar--large");
    if (portrait) {
      portrait.src = manager.photo || "imagens/avatar-gerente.jpeg";
      portrait.alt = "Foto de " + manager.name;
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.namedItem("nome").value.trim(),
        email = form.elements.namedItem("email").value.trim();
      if (!name || !email) {
        window.alert("Preencha o nome completo e o e-mail.");
        return;
      }
      if (
        data.users.some(
          (user) =>
            user.id !== manager.id && clean(user.email) === clean(email),
        )
      ) {
        window.alert("Este e-mail já está cadastrado.");
        return;
      }
      let photo;
      try {
        photo = await readPhoto(form);
      } catch (error) {
        window.alert(error.message);
        return;
      }
      if (
        commitChange(() => {
          const current = data.users.find((user) => user.id === "u1");
          current.name = name;
          current.displayName =
            form.elements.namedItem("nome-exibicao").value.trim() ||
            abbreviated(name);
          current.email = email;
          current.phone = form.elements.namedItem("telefone").value.trim();
          if (photo) current.photo = photo;
          data.pets.forEach((pet) => {
            if (pet.ownerId === current.id) pet.owner = current.name;
          });
          data.reservas.forEach((reservation) => {
            if (reservation.ownerId === current.id)
              reservation.owner = current.name;
          });
        })
      )
        location.href = "painel.html";
    });
  }
  managerProfile();

  dashboard();
  const demoButton = document.getElementById("carregar-exemplo");
  demoButton?.addEventListener("click", () => {
    let capacity = 30;
    try {
      capacity =
        JSON.parse(localStorage.getItem("hotelPetShop.final.settings"))
          ?.capacity || 30;
    } catch {}
    if (
      window.HotelPetDemo.occupied(data).length >= Math.round(capacity * 0.9)
    ) {
      window.alert(
        "A ocupação já atingiu ou ultrapassou 90%. Nenhum cadastro foi removido.",
      );
      return;
    }
    window.HotelPetDemo.fill(data, capacity);
    if (saveData()) location.reload();
    else window.alert("Não foi possível salvar os exemplos neste navegador.");
  });
  const summary = document.querySelector("[data-occupancy-summary]");
  if (summary) {
    let capacity = 30;
    try {
      capacity =
        JSON.parse(localStorage.getItem("hotelPetShop.final.settings"))
          ?.capacity || 30;
    } catch {}
    const active = window.HotelPetDemo.occupied(data),
      dogs = active.filter(
        (item) =>
          data.pets.find((pet) => pet.id === item.petId)?.type === "Cachorro",
      ).length,
      cats = active.filter(
        (item) =>
          data.pets.find((pet) => pet.id === item.petId)?.type === "Gato",
      ).length;
    summary.textContent =
      Math.round((active.length / capacity) * 100) +
      "% de ocupação · " +
      dogs +
      " cães · " +
      cats +
      " gatos · " +
      Math.max(0, capacity - active.length) +
      " vagas disponíveis.";
  }

  const progress = document.querySelector(".capacity-progress");
  if (progress) {
    let limit = 30;
    try {
      limit =
        JSON.parse(localStorage.getItem("hotelPetShop.final.settings"))
          ?.capacity || 30;
    } catch {}
    progress.max = limit;
    progress.value = window.HotelPetDemo.occupied(data).length;
  }
  saveData();
})();
