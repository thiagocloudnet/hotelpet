/* Referências de raça separadas da fotografia do animal cadastrado. */
(() => {
  const catalog = window.HotelPetRacas;
  if (!catalog) return;
  const normalize = (text) =>
    String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  const entries = (type) => [
    ...(["Cachorro", "Gato"].includes(type)
      ? [
          {
            name: "Sem raça definida",
            group: "Sem raça definida (SRD)",
            ...(catalog.srd?.[type] || {}),
          },
        ]
      : []),
    ...(type === "Cachorro"
      ? catalog.dogs
      : type === "Gato"
        ? catalog.cats
        : catalog.others?.[type] || []),
  ];
  const node = (tag, text, cls) => {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (cls) element.className = cls;
    return element;
  };
  const figure = (entry, species) => {
    const element = node("figure", null, "breed-reference");
    const description = node("figcaption");
    description.append(node("strong", entry.name), node("small", entry.group));
    description.append(
      node("small", "Porte da hospedagem: calculado pelo peso individual."),
    );
    const kind = species || type?.value;
    const food = window.HotelPetAlimentacao?.consultar(kind, entry.name);
    if (food) {
      description.append(node("strong", "O que come"), node("p", food.text));
      const source = node("a", "Referência de alimentação");
      source.href = food.source;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      description.append(
        source,
        node(
          "small",
          "Na hospedagem, seguir a dieta, quantidade, horários e restrições da ficha individual; alterações dependem de orientação veterinária.",
        ),
      );
    }
    if (kind === "Réptil") {
      description.append(
        node("strong", "Origem e documentação"),
        node(
          "p",
          "Conferir espécie científica, proprietário, nota fiscal, certificado de origem e identificação individual quando aplicáveis. A presença no catálogo não significa autorização de criação ou de hospedagem.",
        ),
      );
      const legal = node("a", "Entenda a documentação ambiental");
      legal.href = "racas.html#documentacao-ambiental";
      description.append(legal);
    }
    if (entry.image) {
      const image = node("img");
      image.src = entry.image;
      image.alt =
        entry.name === "Sem raça definida"
          ? "Exemplo de animal sem raça definida; a aparência varia entre indivíduos"
          : "Referência ilustrativa: " + entry.name;
      image.loading = "lazy";
      image.width = 330;
      image.height = 220;
      image.onerror = () => {
        image.hidden = true;
        description.append(node("p", "Imagem indisponível neste dispositivo."));
      };
      const photo = node("div", null, "breed-photo");
      const brand = node("img");
      brand.src = "imagens/logo-hotel-pet-horizontal.png";
      brand.alt = "";
      brand.className = "breed-photo__brand";
      brand.setAttribute("aria-hidden", "true");
      photo.append(image, brand);
      element.append(photo);
      const credit = node(
        "small",
        (entry.author || "Crédito na fonte") + " · ",
      );
      const link = node("a", entry.license || "Fonte da imagem");
      link.href = entry.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      credit.append(link);
      if (entry.licenseUrl) {
        const license = node("a", "Termos da licença");
        license.href = entry.licenseUrl;
        license.target = "_blank";
        license.rel = "noopener noreferrer";
        credit.append(document.createTextNode(" · "), license);
      }
      description.append(credit);
    } else
      description.append(
        node(
          "p",
          "Foto da raça ainda indisponível. O cadastro continua disponível.",
        ),
      );
    description.append(
      node(
        "small",
        entry.name === "Sem raça definida"
          ? "SRD não tem aparência única. Use a foto do próprio animal no cadastro."
          : "Imagem de referência; características individuais podem variar. Não é a foto do hóspede.",
      ),
    );
    element.append(description);
    if (species) {
      const register = node(
        "a",
        "Cadastrar animal desta referência",
        "button button--secondary",
      );
      register.setAttribute(
        "aria-label",
        "Cadastrar animal: " + entry.name + " — " + species,
      );
      register.href =
        "pet_cadastrar.html?especie=" +
        encodeURIComponent(species) +
        "&raca=" +
        encodeURIComponent(entry.name);
      element.append(register);
    }
    return element;
  };
  const race = document.querySelector("#raca"),
    type = document.querySelector("#tipo");
  if (race && type) {
    const preview = node("div");
    preview.id = "referencia-raca";
    const link = node("a", "Consultar catálogo de animais e raças");
    link.href = "racas.html";
    link.target = "_blank";
    link.rel = "noopener";
    race.parentElement.append(link, preview);
    const render = () => {
      preview.replaceChildren();
      const item = entries(type.value).find(
        (entry) => entry.name === race.value,
      );
      if (item) preview.append(figure(item));
    };
    race.addEventListener("change", render);
    type.addEventListener("change", render);
    render();
  }
  const gallery = document.querySelector("#catalogo-ilustrado");
  if (!gallery) return;
  const filter = document.querySelector("#especie-catalogo"),
    search = document.querySelector("#pesquisa-catalogo");
  const summary = document.querySelector("#resumo-catalogo"),
    controls = document.querySelector("#paginas-catalogo");
  const group = document.querySelector("#grupo-catalogo");
  const weight = document.querySelector("#peso-catalogo");
  const size = document.querySelector("#porte-catalogo");
  const groupNames = {
    "Grupo FCI 1": "Grupo 1 — Pastores e boiadeiros",
    "Grupo FCI 2":
      "Grupo 2 — Pinschers, schnauzers, molossoides e boiadeiros suíços",
    "Grupo FCI 3": "Grupo 3 — Terriers",
    "Grupo FCI 4": "Grupo 4 — Dachshunds",
    "Grupo FCI 5": "Grupo 5 — Spitz e tipos primitivos",
    "Grupo FCI 6": "Grupo 6 — Sabujos e raças relacionadas",
    "Grupo FCI 7": "Grupo 7 — Cães de aponte",
    "Grupo FCI 8": "Grupo 8 — Retrievers, levantadores e cães de água",
    "Grupo FCI 9": "Grupo 9 — Cães de companhia",
    "Grupo FCI 10": "Grupo 10 — Lebréis",
  };
  const groups = () => {
    group.replaceChildren(new Option("Todos os grupos", ""));
    for (const name of new Set(entries(filter.value).map((item) => item.group)))
      group.add(new Option(groupNames[name] || name, name));
  };
  const classify = () => {
    const number = Number(weight.value);
    size.textContent =
      !weight.value || !weight.checkValidity() || number <= 0
        ? "Informe o peso individual para calcular o porte."
        : "Porte da hospedagem: " +
          (number <= 10 ? "Pequeno" : number <= 25 ? "Médio" : "Grande") +
          ". A raça não determina o porte ou a diária.";
  };
  weight.addEventListener("input", classify);
  classify();
  groups();
  let page = 0;
  const render = () => {
    const query = normalize(search.value);
    const list = entries(filter.value).filter(
      (entry) =>
        (!group.value || entry.group === group.value) &&
        normalize(
          entry.name +
            " " +
            (entry.officialName || "") +
            " " +
            entry.group +
            (entry.name === "Sem raça definida" ? " SRD vira-lata" : ""),
        ).includes(query),
    );
    const pages = Math.max(1, Math.ceil(list.length / 24));
    page = Math.min(page, pages - 1);
    gallery.replaceChildren(
      ...list
        .slice(page * 24, page * 24 + 24)
        .map((entry) => figure(entry, filter.value)),
    );
    summary.textContent = `${list.length} opções encontradas · ${list.filter((entry) => entry.image).length} com foto · página ${page + 1} de ${pages}. Catálogo atualizado em 03/11/2026.`;
    controls.replaceChildren();
    for (const [label, step, disabled] of [
      ["Página anterior", -1, page === 0],
      ["Próxima página", 1, page === pages - 1],
    ]) {
      const button = node("button", label, "button button--secondary");
      button.type = "button";
      button.disabled = disabled;
      button.onclick = () => {
        page += step;
        render();
      };
      controls.append(button);
    }
  };
  for (const field of [filter, search])
    field.addEventListener(field === search ? "input" : "change", () => {
      page = 0;
      if (field === filter) {
        groups();
        search.value = "";
      }
      render();
    });
  group.addEventListener("change", () => {
    page = 0;
    render();
  });
  render();
})();
