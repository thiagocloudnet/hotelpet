/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-final/js/hotel-config.js
*/
// Controla preços por faixa de peso e vagas no armazenamento local do navegador.
(() => {
  const key = "hotelPetShop.final.settings";
  const defaults = {
    smallRate: 50,
    mediumRate: 65,
    largeRate: 80,
    capacity: 30,
    checkoutTime: "12:00",
    country: "BR",
    timeZone: "America/Sao_Paulo",
  };
  const read = () => {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(key) || "{}") };
    } catch {
      return { ...defaults };
    }
  };
  const money = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  let settings = read();
  const regional = window.HotelPetFuso.read();
  const countryField = document.getElementById("pais-hotel");
  const zoneField = document.getElementById("fuso-hotel");
  if (countryField && zoneField) {
    for (const [code, country] of Object.entries(window.HotelPetFuso.countries))
      countryField.add(new Option(country.name, code));
    countryField.value = regional.country;
    const fillZones = (selected) => {
      zoneField.replaceChildren();
      for (const [zone, label] of window.HotelPetFuso.countries[
        countryField.value
      ].zones)
        zoneField.add(new Option(label + " — " + zone, zone));
      if (selected) zoneField.value = selected;
    };
    fillZones(regional.timeZone);
    countryField.addEventListener("change", () => fillZones());
  }
  const fields = {
    smallRate: document.getElementById("diaria-pequeno"),
    mediumRate: document.getElementById("diaria-medio"),
    largeRate: document.getElementById("diaria-grande"),
    capacity: document.getElementById("vagas"),
    checkoutTime: document.getElementById("horario-saida"),
  };
  Object.entries(fields).forEach(([name, field]) => {
    if (field) field.value = settings[name];
  });
  document
    .querySelectorAll("[data-rate-small]")
    .forEach((node) => (node.textContent = money(settings.smallRate)));
  document
    .querySelectorAll("[data-rate-medium]")
    .forEach((node) => (node.textContent = money(settings.mediumRate)));
  document
    .querySelectorAll("[data-rate-large]")
    .forEach((node) => (node.textContent = money(settings.largeRate)));
  let records = { reservas: [] };
  try {
    records =
      JSON.parse(localStorage.getItem("hotelPetShop.final.records")) || records;
  } catch {}
  const today = window.HotelPetDemo.today();
  const occupied = window.HotelPetDemo.occupied(records).length;
  document
    .querySelectorAll("[data-hotel-capacity]")
    .forEach(
      (node) => (node.textContent = `${occupied} / ${settings.capacity}`),
    );
  const bar = document.querySelector("[data-capacity-fill]");
  if (bar) {
    bar.style.width = `${Math.min(100, Math.round((occupied / settings.capacity) * 100))}%`;
    const label = document.querySelector("[data-capacity-label]");
    if (label)
      label.textContent = `${occupied} de ${settings.capacity} vagas ocupadas; ${Math.max(0, settings.capacity - occupied)} disponíveis.`;
  }
  const progress = document.querySelector(".capacity-bar");
  if (progress) {
    progress.setAttribute("aria-valuemax", String(settings.capacity));
    progress.setAttribute("aria-valuenow", String(occupied));
  }
  const form = document.getElementById("hotel-settings-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = {
      smallRate: Number(fields.smallRate.value),
      mediumRate: Number(fields.mediumRate.value),
      largeRate: Number(fields.largeRate.value),
      capacity: Number(fields.capacity.value),
    };
    const feedback = document.getElementById("settings-feedback");
    if (
      Object.values(next).some(
        (value) => !Number.isFinite(value) || value < 0,
      ) ||
      !Number.isInteger(next.capacity) ||
      next.capacity < 1
    ) {
      feedback.textContent =
        "Informe valores válidos e uma capacidade inteira maior que zero.";
      return;
    }
    if (next.capacity < occupied) {
      feedback.textContent =
        "A capacidade não pode ser menor que os " +
        occupied +
        " pets hospedados hoje.";
      return;
    }
    const time = fields.checkoutTime.value.trim();
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      feedback.textContent =
        "Informe o horário no formato de 24 horas, como 12:00 ou 18:30.";
      return;
    }
    next.checkoutTime = time;
    next.country = countryField.value;
    next.timeZone = zoneField.value;
    if (!window.HotelPetFuso.valid(next.country, next.timeZone)) {
      feedback.textContent = "Selecione um país e um fuso horário compatíveis.";
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(next));
      settings = next;
      feedback.textContent =
        "Diárias, vagas, país, fuso e horário de saída salvos neste navegador.";
      window.setTimeout(() => location.reload(), 700);
    } catch {
      feedback.textContent =
        "O navegador não permitiu guardar as configurações.";
    }
  });
})();
