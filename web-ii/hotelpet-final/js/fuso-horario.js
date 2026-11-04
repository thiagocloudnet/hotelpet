/* País e fuso do estabelecimento; datas de calendário não são instantes UTC. */
(() => {
  const countries = {
    BR: {
      name: "Brasil",
      zones: [
        ["America/Bahia", "Bahia"],
        ["America/Sao_Paulo", "Brasília"],
        ["America/Manaus", "Manaus"],
        ["America/Cuiaba", "Cuiabá"],
        ["America/Rio_Branco", "Rio Branco"],
        ["America/Noronha", "Fernando de Noronha"],
      ],
    },
    PT: {
      name: "Portugal",
      zones: [
        ["Europe/Lisbon", "Lisboa"],
        ["Atlantic/Azores", "Açores"],
        ["Atlantic/Madeira", "Madeira"],
      ],
    },
    AO: { name: "Angola", zones: [["Africa/Luanda", "Luanda"]] },
    MZ: { name: "Moçambique", zones: [["Africa/Maputo", "Maputo"]] },
    CV: { name: "Cabo Verde", zones: [["Atlantic/Cape_Verde", "Cabo Verde"]] },
    AR: {
      name: "Argentina",
      zones: [["America/Argentina/Buenos_Aires", "Buenos Aires"]],
    },
    UY: { name: "Uruguai", zones: [["America/Montevideo", "Montevidéu"]] },
    US: {
      name: "Estados Unidos",
      zones: [
        ["America/New_York", "Nova York"],
        ["America/Chicago", "Chicago"],
        ["America/Denver", "Denver"],
        ["America/Los_Angeles", "Los Angeles"],
        ["Pacific/Honolulu", "Honolulu"],
      ],
    },
    JP: { name: "Japão", zones: [["Asia/Tokyo", "Tóquio"]] },
  };
  const valid = (country, zone) => {
    if (!countries[country]?.zones.some(([id]) => id === zone)) return false;
    try {
      new Intl.DateTimeFormat("pt-BR", { timeZone: zone }).format();
      return true;
    } catch {
      return false;
    }
  };
  const read = () => {
    let data = {};
    try {
      data =
        JSON.parse(localStorage.getItem("hotelPetShop.final.settings")) || {};
    } catch {}
    return valid(data.country, data.timeZone)
      ? { country: data.country, timeZone: data.timeZone }
      : { country: "BR", timeZone: "America/Bahia" };
  };
  const zone = () => read().timeZone;
  const label = () => {
    const data = read();
    return countries[data.country].zones.find(
      ([id]) => id === data.timeZone,
    )[1];
  };
  window.HotelPetFuso = { countries, valid, read, zone, label };
})();
