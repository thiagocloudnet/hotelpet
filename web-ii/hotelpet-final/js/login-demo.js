/*
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
Arquivo: hotelpet-final/js/login-demo.js
*/
// Controla apenas a navegação demonstrativa do login offline; não autentica em servidor.
const loginForm = document.querySelector("#login-form");
const loginFeedback = document.querySelector("#login-feedback");
const passwordInput = document.querySelector("#senha");
const passwordToggle = document.querySelector("#alternar-senha");

// Mostra ou oculta o campo sem copiar nem guardar o conteúdo.
passwordToggle?.addEventListener("click", () => {
  const visible = passwordInput.type === "password";
  passwordInput.type = visible ? "text" : "password";
  passwordToggle.textContent = visible ? "Ocultar" : "Mostrar";
  passwordToggle.setAttribute("aria-label", visible ? "Ocultar senha" : "Mostrar senha");
  passwordToggle.setAttribute("aria-pressed", String(visible));
  passwordInput.focus();
});

loginForm?.addEventListener("submit", (event) => {
  // Impede que os campos sejam enviados pela URL ou para um servidor inexistente.
  event.preventDefault();

  const username = document.querySelector("#usuario").value.trim().toLowerCase();
  const password = passwordInput.value;

  // Credencial pública de exemplo: comparação local para a atividade, sem autenticação real.
  if (username !== "thiagoprates@hotelpet.shop" || password !== "barao17@") {
    loginFeedback.textContent = "Confira o usuário e a senha demonstrativa exibidos na tela.";
    return;
  }

  // Encaminha ao painel e limpa o campo para que a senha não permaneça na tela.
  document.querySelector("#senha").value = "";
  window.location.href = "painel.html";
});

