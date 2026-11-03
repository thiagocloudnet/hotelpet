/* Prepara somente os arquivos públicos do trabalho para o GitHub Pages. */
const fs = require("node:fs"),
  path = require("node:path");
const root = path.resolve(__dirname, ".."),
  output = path.join(root, ".dist-pages"),
  marker = path.join(output, ".hotelpet-build");
if (path.dirname(output) !== root || path.basename(output) !== ".dist-pages")
  throw new Error("Destino de build inválido.");
if (fs.existsSync(output)) {
  if (
    !fs.existsSync(marker) ||
    fs.readFileSync(marker, "utf8") !== "HotelPet Pages\n"
  )
    throw new Error(
      "Destino existente sem identificação; nenhuma pasta foi removida.",
    );
  fs.rmSync(output, { recursive: true });
}
fs.mkdirSync(output);
fs.writeFileSync(marker, "HotelPet Pages\n");
function copySite(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.isDirectory() && ["css", "js", "imagens"].includes(entry.name))
      fs.cpSync(
        path.join(source, entry.name),
        path.join(destination, entry.name),
        { recursive: true },
      );
    else if (entry.isFile() && entry.name.endsWith(".html"))
      fs.copyFileSync(
        path.join(source, entry.name),
        path.join(destination, entry.name),
      );
  }
}
copySite(path.join(root, "web-ii/hotelpet-final"), output);
for (const stage of ["hotelpet-01", "hotelpet-02", "hotelpet-final"])
  copySite(
    path.join(root, "web-ii", stage),
    path.join(output, "web-ii", stage),
  );
fs.copyFileSync(
  path.join(root, "web-ii/index.html"),
  path.join(output, "web-ii/index.html"),
);
copySite(path.join(root, "projeto"), path.join(output, "projeto"));
// O pacote leva somente fotos referenciadas e seus créditos, sem sobras da coleta.
const context = { window: {} };
require("node:vm").runInNewContext(
  fs.readFileSync(
    path.join(root, "web-ii/hotelpet-final/js/catalogo-racas.js"),
    "utf8",
  ),
  context,
  { timeout: 1000 },
);
const catalog = context.window.HotelPetRacas;
const references = [
  ...catalog.dogs,
  ...catalog.cats,
  ...Object.values(catalog.others).flat(),
  ...Object.entries(catalog.srd).map(([kind, item]) => ({
    name: "Sem raça definida (" + kind + ")",
    ...item,
  })),
].filter((item) => item.image);
const referenced = new Set(references.map((item) => path.basename(item.image)));
const credits = references.map(
  ({ name, image, author, license, licenseUrl, sourceUrl }) => ({
    nome: name,
    arquivo: image,
    autor: author,
    licenca: license,
    termos: licenseUrl,
    fonte: sourceUrl,
  }),
);
for (const relative of [
  "imagens/racas",
  "web-ii/hotelpet-final/imagens/racas",
]) {
  const directory = path.resolve(output, relative);
  if (!directory.startsWith(output + path.sep))
    throw Error("Diretório de imagens fora do pacote.");
  for (const file of fs.readdirSync(directory))
    if (/\.(?:jpe?g|png|webp)$/i.test(file) && !referenced.has(file)) {
      const target = path.resolve(directory, file);
      if (path.dirname(target) !== directory)
        throw Error("Arquivo fora do diretório de imagens.");
      fs.unlinkSync(target);
    }
  fs.writeFileSync(
    path.join(directory, "creditos.json"),
    JSON.stringify(
      {
        observacao:
          "Logomarca do Hotel Pet aplicada na interface em camada separada. Fotos de terceiros mantêm autoria e licença indicadas.",
        referencias: credits,
      },
      null,
      2,
    ),
  );
}
fs.writeFileSync(path.join(output, ".nojekyll"), "");
console.log(
  "GitHub Pages preparado: versão final na raiz, etapas em /web-ii/ e Web I em /projeto/.",
);
