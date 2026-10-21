/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-final/js/hotel-config.js
*/
// Controla preços por faixa de peso e vagas no armazenamento local do navegador.
(() => {
  const key="hotelPetShop.final.settings";
  const defaults={smallRate:50,mediumRate:65,largeRate:80,capacity:30};
  const read=()=>{try{return {...defaults,...JSON.parse(localStorage.getItem(key)||"{}")};}catch{return {...defaults};}};
  const money=value=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(value);
  let settings=read();
  const fields={smallRate:document.getElementById("diaria-pequeno"),mediumRate:document.getElementById("diaria-medio"),largeRate:document.getElementById("diaria-grande"),capacity:document.getElementById("vagas")};
  Object.entries(fields).forEach(([name,field])=>{if(field)field.value=settings[name];});
  document.querySelectorAll("[data-rate-small]").forEach(node=>node.textContent=money(settings.smallRate));
  document.querySelectorAll("[data-rate-medium]").forEach(node=>node.textContent=money(settings.mediumRate));
  document.querySelectorAll("[data-rate-large]").forEach(node=>node.textContent=money(settings.largeRate));
  let records={reservas:[]};try{records=JSON.parse(localStorage.getItem("hotelPetShop.final.records"))||records;}catch{}
  const today=new Date().toISOString().slice(0,10);
  const occupied=(records.reservas||[]).filter(item=>item.status==="Em andamento"&&item.checkin<=today&&item.checkout>today).length;
  document.querySelectorAll("[data-hotel-capacity]").forEach(node=>node.textContent=`${occupied} / ${settings.capacity}`);
  const bar=document.querySelector("[data-capacity-fill]"); if(bar){bar.style.width=`${Math.min(100,Math.round(occupied/settings.capacity*100))}%`;const label=document.querySelector("[data-capacity-label]");if(label)label.textContent=`${occupied} de ${settings.capacity} vagas ocupadas; ${settings.capacity-occupied} disponíveis.`;}
  const form=document.getElementById("hotel-settings-form");if(!form)return;
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const next={smallRate:Number(fields.smallRate.value),mediumRate:Number(fields.mediumRate.value),largeRate:Number(fields.largeRate.value),capacity:Number(fields.capacity.value)};
    const feedback=document.getElementById("settings-feedback");
    if(Object.values(next).some(value=>!Number.isFinite(value)||value<0)||!Number.isInteger(next.capacity)||next.capacity<1){feedback.textContent="Informe valores válidos e uma capacidade inteira maior que zero.";return;}
    try{localStorage.setItem(key,JSON.stringify(next));settings=next;feedback.textContent="Tabela de preços e vagas salva neste navegador.";window.setTimeout(()=>location.reload(),700);}catch{feedback.textContent="O navegador não permitiu guardar as configurações.";}
  });
})();
