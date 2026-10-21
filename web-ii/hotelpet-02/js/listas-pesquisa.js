/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-02/js/listas-pesquisa.js
*/
// Pesquisa somente os registros de exemplo apresentados nas tabelas desta etapa.
(() => {
  const table = document.querySelector(".data-table");
  const grid = document.querySelector(".filter-grid");
  if (!table || !grid) return;
  const rows = Array.from(table.tBodies[0]?.rows || []);
  const result = document.querySelector("[data-search-results]") || (() => {
    const node = document.createElement("p"); node.className = "search-results"; node.dataset.searchResults = ""; node.setAttribute("role", "status"); node.setAttribute("aria-live", "polite"); table.closest(".card")?.prepend(node); return node;
  })();
  const clean = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("pt-BR");
  const columns = {pets:{"f-nome":1,"f-tipo":2,"f-raca":3,"f-peso":4,"f-tamanho":5,"f-proprietario":6},users:{"f-email":1,"f-nome":2,"f-funcao":3,"f-status":4,"f-criado-de":5,"f-criado-ate":5},reservas:{"f-id":0,"f-pet":1,"f-cliente":2,"f-entrada":3,"f-saida":4,"f-status":6}};
  const kind = document.getElementById("f-proprietario") ? "pets" : document.getElementById("f-funcao") ? "users" : "reservas";
  function dateIso(value) { const m=String(value||"").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : ""; }
  function apply() {
    let shown=0;
    rows.forEach(row => {
      const matches=Array.from(grid.querySelectorAll("input,select")).every(field => {
        const query=clean(field.value); if(!query || query==="todos" || query==="todas") return true;
        const index=columns[kind][field.id]; if(index===undefined) return true;
        const text=clean(row.cells[index]?.textContent);
        if(field.type==="date") { const date=dateIso(row.cells[index]?.textContent); return field.id.endsWith("-de") || field.id==="f-entrada" ? date>=field.value : date<=field.value; }
        return text.includes(query);
      });
      row.hidden=!matches; if(matches) shown++;
    });
    result.textContent=`${shown} de ${rows.length} registros encontrados.`;
  }
  grid.querySelectorAll("input,select").forEach(field=>{field.addEventListener("input",apply);field.addEventListener("change",apply);});
  grid.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{
    if(/limpar/i.test(button.textContent)){grid.querySelectorAll("input").forEach(input=>input.value="");grid.querySelectorAll("select").forEach(select=>select.selectedIndex=0);}
    apply();
  }));
  apply();
})();
