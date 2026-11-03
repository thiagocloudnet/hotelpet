/* Referências educativas: a dieta efetiva pertence à ficha de cada hóspede. */
(() => {
  const mammal =
    "https://healthtopics.vetmed.ucdavis.edu/health-topics/exotics/healthy-shopping-guide-herbivorous-small-mammals";
  const rodents = "https://vcahospitals.com/know-your-pet/feeding-rodents";
  const reptile =
    "https://www.merckvetmanual.com/management-and-nutrition/nutrition-exotic-and-zoo-animals/nutrition-in-reptiles";
  const lizard =
    "https://www.merckvetmanual.com/management-and-nutrition/nutrition-exotic-and-zoo-animals/nutrition-in-lizards";
  const defaults = {
    Cachorro: {
      text: "Alimento completo e balanceado para cães, adequado à idade e às condições individuais. Manter a alimentação habitual e água disponível.",
      source:
        "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals",
    },
    Gato: {
      text: "Alimento completo e balanceado específico para gatos, adequado à idade e às condições individuais; água disponível. Alimentação de cães não substitui a dos gatos.",
      source:
        "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals",
    },
    Coelho: {
      text: "Para adultos saudáveis: feno de gramíneas como base, alimento específico em quantidade orientada e água. Vegetais e mudanças de dieta devem seguir o plano individual.",
      source: mammal,
    },
    Roedor: {
      text: "Alimento completo próprio para a espécie, água e complementos definidos no plano individual. Uma mistura de sementes não é uma dieta completa universal para roedores.",
      source: rodents,
    },
    Ave: {
      text: "A dieta depende da espécie: alimento formulado apropriado, complementos e água conforme plano individual. Não alimentar todas as aves apenas com sementes. Confirmar a espécie antes da hospedagem.",
      source:
        "https://www.merckvetmanual.com/exotic-and-laboratory-animals/pet-birds/management-of-pet-birds",
    },
    Réptil: {
      text: "Identificar a espécie científica antes de definir alimentação: répteis podem ser herbívoros, onívoros ou carnívoros. Registrar dieta, ambiente térmico e orientações do veterinário.",
      source: reptile,
    },
  };
  const specific = {
    "Porquinho-da-Índia": {
      text: "Feno de gramíneas como base, alimento específico para porquinhos-da-índia e fonte adequada de vitamina C conforme orientação. Não substituir por alimento de coelho; água disponível.",
      source:
        "https://www.merckvetmanual.com/all-other-pets/guinea-pigs/diet-for-a-guinea-pig",
    },
    Chinchila: {
      text: "Feno de gramíneas e alimento específico para chinchilas, com água. A alimentação do adulto difere da de filhotes e fêmeas lactantes; seguir o plano individual.",
      source: mammal,
    },
    Degu: {
      text: "Dieta rica em fibras e própria para degus, com feno e água. Confirmar complementos e restrições no plano veterinário individual.",
      source: rodents,
    },
    Iguana: {
      text: "Para iguana-verde: dieta predominantemente vegetal, com folhas e vegetais adequados; não usar ração de cães ou gatos como base. Cálcio, UVB e manejo térmico precisam de orientação específica.",
      source: lizard,
    },
    "Gecko Leopardo": {
      text: "Insetívoro: insetos de criação apropriados ao tamanho do animal, nutridos adequadamente. Suplementação e frequência dependem do plano veterinário; água disponível. Não oferecer insetos coletados com risco de agrotóxicos.",
      source: lizard,
    },
    Jabuti: {
      text: "Confirmar a espécie: o registro atual usa jabuti-piranga como referência. Vegetais, folhas e demais componentes variam conforme espécie e plano individual; não tratar todos os jabutis como iguais nem oferecer apenas frutas.",
      source: reptile,
    },
  };
  window.HotelPetAlimentacao = {
    consultar: (kind, name) => specific[name] || defaults[kind],
  };
})();
