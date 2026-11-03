/*
====================================================================
UNIVERSIDADE ESTADUAL DO SUDOESTE DA BAHIA - UESB
CURSO: Análise e Desenvolvimento de Sistemas - EAD
DISCIPLINA: Programação Web II (2026.2)
PROFESSOR: Lucas Santos de Oliveira
ALUNO: Thiago Ferreira Prates Neves
PROJETO: Hotel Pet (https://hotelpet.shop)
ARQUIVO: js/login-responsivo.js
OBJETIVO: Controlador de responsividade e alternador de 2 temas (Claro e Escuro)
====================================================================
*/

(() => {
  'use strict';

  const root = document.documentElement;
  const TEMA_KEY = 'hotelPet.tema';

  // ==========================================
  // 1. GERENCIAMENTO DE 2 TEMAS (CLARO / ESCURO)
  // ==========================================
  function obterTemaSalvo() {
    try {
      const salvo = localStorage.getItem(TEMA_KEY);
      if (salvo === 'escuro' || salvo === 'claro') {
        return salvo;
      }
    } catch (e) {
      console.warn('[HotelPet] Erro ao ler tema do localStorage:', e);
    }
    // Preferência do sistema como fallback
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'escuro'
      : 'claro';
  }

  function aplicarTema(tema) {
    root.dataset.theme = tema;
    const btnTema = document.getElementById('btn-tema-login');
    if (btnTema) {
      const ehEscuro = tema === 'escuro';
      btnTema.innerHTML = ehEscuro
        ? '<span class="theme-icon" aria-hidden="true">☀️</span> <span>Tema Claro</span>'
        : '<span class="theme-icon" aria-hidden="true">🌙</span> <span>Tema Escuro</span>';
      btnTema.setAttribute('aria-label', ehEscuro ? 'Alternar para tema claro' : 'Alternar para tema escuro');
      btnTema.setAttribute('aria-pressed', String(ehEscuro));
      btnTema.title = ehEscuro ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro';
    }

    try {
      localStorage.setItem(TEMA_KEY, tema);
    } catch (e) {
      console.warn('[HotelPet] Erro ao salvar tema:', e);
    }

    // Notifica o Google Analytics se disponível
    if (window.HotelPetAnalytics && typeof window.HotelPetAnalytics.registrarEvento === 'function') {
      window.HotelPetAnalytics.registrarEvento('alternar_tema', {
        tema_escolhido: tema
      });
    }
  }

  // Aplicação imediata para evitar piscar de tela
  let temaAtual = obterTemaSalvo();
  aplicarTema(temaAtual);

  // ==========================================
  // 2. CONTROLE DE RESPONSIVIDADE VIA JAVASCRIPT
  // ==========================================
  const mediaQueryMobile = window.matchMedia('(max-width: 860px)');

  function adaptarLayoutDispositivo(e) {
    const ehMobile = e ? e.matches : mediaQueryMobile.matches;
    const container = document.querySelector('.login-container-pro');
    const heroSide = document.querySelector('.login-hero-side');
    const formSide = document.querySelector('.login-form-side');

    if (!container || !heroSide || !formSide) return;

    if (ehMobile) {
      // Dispositivo Móvel / Smartphone
      container.classList.add('is-mobile-layout');
      container.classList.remove('is-desktop-layout');
      container.setAttribute('data-device', 'mobile');
      
      // Garante foco amigável e ajuste de viewport
      document.body.classList.add('mobile-viewport-active');
    } else {
      // Dispositivo Grande / Desktop
      // Imagens e dados do lado esquerdo, caixa de login à direita
      container.classList.add('is-desktop-layout');
      container.classList.remove('is-mobile-layout');
      container.setAttribute('data-device', 'desktop');
      
      document.body.classList.remove('mobile-viewport-active');
    }
  }

  // Inicialização no carregamento do DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Re-sincroniza tema com o botão renderizado
    aplicarTema(temaAtual);

    const btnTema = document.getElementById('btn-tema-login');
    if (btnTema) {
      btnTema.addEventListener('click', () => {
        temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
        aplicarTema(temaAtual);
      });
    }

    // Executa e registra ouvinte de responsividade
    adaptarLayoutDispositivo(mediaQueryMobile);
    if (typeof mediaQueryMobile.addEventListener === 'function') {
      mediaQueryMobile.addEventListener('change', adaptarLayoutDispositivo);
    } else if (typeof mediaQueryMobile.addListener === 'function') {
      mediaQueryMobile.addListener(adaptarLayoutDispositivo);
    }

    // Redimensionamento de janela seguro
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        adaptarLayoutDispositivo(mediaQueryMobile);
      }, 150);
    });
  });
})();
