const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});
 const checks=[],errors=[];
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8090/racas.html');
  assert(await page.locator('.breed-photo').count());
  const first=page.locator('.breed-photo').first();await first.locator('img').evaluateAll(async images=>{await Promise.all(images.map(i=>i.decode()));});
  assert.equal(await first.locator('.breed-photo__brand').count(),1);checks.push('Foto possui logomarca em camada separada');
  const frame=await first.boundingBox(),brand=await first.locator('.breed-photo__brand').boundingBox();assert(brand.x>=frame.x&&brand.y>=frame.y&&brand.x+brand.width<=frame.x+frame.width+1&&brand.y+brand.height<=frame.y+frame.height+1);checks.push('Logomarca permanece dentro do canto da moldura');
  assert(await page.locator('.breed-reference').first().getByRole('link',{name:'Termos da licença'}).isVisible());checks.push('Crédito e link de licença permanecem visíveis');
  await page.screenshot({path:'relatorios/catalogo-com-logomarca.png',fullPage:false});
  await page.setViewportSize({width:320,height:850});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('Moldura e marca cabem em tela de 320 pixels');
  await page.goto('http://127.0.0.1:8090/index.html');assert.equal(await page.locator('.login-portrait__brand').count(),1);assert.equal(await page.locator('img[src*="avatar-gerente"]').count(),0);checks.push('Entrada mantém animais e aplica a marca no canto');
  assert.equal(await page.locator('#senha').inputValue(),'barao17@');checks.push('Acesso demonstrativo permanece preenchido');
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'relatorios/login-animais-com-logomarca.png',fullPage:true});assert.deepEqual(errors,[]);
  fs.writeFileSync('relatorios/verificacao-marca-imagens.json',JSON.stringify({aprovado:true,total:checks.length,verificacoes:checks,erros:errors},null,2));console.log(JSON.stringify({aprovado:true,total:checks.length,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
