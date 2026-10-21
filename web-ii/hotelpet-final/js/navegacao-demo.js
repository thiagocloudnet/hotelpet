/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-final/js/navegacao-demo.js
*/
// Nesta etapa, os formulários demonstram o caminho de navegação sem salvar dados.
(() => {
  document.querySelectorAll("form").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const page = location.pathname.split("/").pop();
    const destination = page.startsWith("pet") ? "pets.html" : page.startsWith("usuario") ? "usuarios.html" : page.startsWith("reserva") ? "reservas.html" : "painel.html";
    const notice = document.createElement("p"); notice.className = "form-feedback"; notice.setAttribute("role", "status");
    notice.textContent = "Demonstração de navegação: este formulário não gravou dados.";
    form.prepend(notice);
    window.setTimeout(() => { location.href = destination; }, 1100);
  }));
})();
