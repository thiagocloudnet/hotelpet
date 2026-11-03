const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({executablePath: process.env.HOTELPET_CHROMIUM});
  const checks = [], errors = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:8090/racas.html');
    const summary = await page.evaluate(() => {
      const c = window.HotelPetRacas;
      return ['Cachorro','Gato',...Object.keys(c.others)].map(kind => {
        const entries = kind === 'Cachorro' ? c.dogs : kind === 'Gato' ? c.cats : c.others[kind];
        return {kind, valid: entries.every(e => {
          const food = window.HotelPetAlimentacao.consultar(kind,e.name);
          return food?.text && food.source.startsWith('https://');
        })};
      });
    });
    for (const row of summary) {assert(row.valid); checks.push('Alimentação e fonte disponíveis: '+row.kind);}
    await page.locator('#especie-catalogo').selectOption('Réptil');
    for (const [name, word] of [['Iguana','vegetal'],['Gecko Leopardo','Insetívoro'],['Jabuti','Confirmar a espécie']]) {
      await page.locator('#pesquisa-catalogo').fill(name);
      assert.match(await page.locator('.breed-reference').innerText(),new RegExp(word));
      checks.push('Alimentação específica: '+name);
    }
    await page.locator('#documentacao-ambiental summary').click();
    assert.match(await page.locator('#documentacao-ambiental').innerText(),/Inema/);
    assert.match(await page.locator('#documentacao-ambiental').innerText(),/não emite nem valida/);
    checks.push('Documentação ambiental distingue proprietário e empreendimento');
    await page.locator('#especie-catalogo').selectOption('Coelho');
    assert.equal(await page.locator('.breed-reference').count(),12);
    checks.push('Doze referências de coelhos disponíveis');
    await page.setViewportSize({width:320,height:850});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    checks.push('Informações adicionais cabem em tela de 320 pixels');
    assert.deepEqual(errors,[]);
    const result = {aprovado:true,total:checks.length,verificacoes:checks,erros:errors};
    fs.writeFileSync('relatorios/verificacao-alimentacao-catalogo.json',JSON.stringify(result,null,2));
    console.log(JSON.stringify({aprovado:true,total:checks.length,erros:errors}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
