/*
====================================================================
UNIVERSIDADE ESTADUAL DO SUDOESTE DA BAHIA - UESB
CURSO: Análise e Desenvolvimento de Sistemas - EAD
DISCIPLINA: Programação Web II (2026.2)
PROFESSOR: Lucas Santos de Oliveira
ALUNO: Thiago Ferreira Prates Neves
PROJETO: Hotel Pet (https://hotelpet.shop)
FLUXO GOOGLE ANALYTICS: Pets (ID do Fluxo: 16266387736 | Métrica: G-8PHJYHNDK5)
ARQUIVO: js/analytics-eventos.js
OBJETIVO: Rastreamento semântico de métricas, conversões e interações do Hotel Pet
====================================================================
*/

(() => {
  'use strict';

  const GA_ID = 'G-8PHJYHNDK5';
  const FLUXO_ID = '16266387736';
  const FLUXO_NOME = 'Pets';

  // Helper seguro para envio de eventos ao Google Analytics
  function registrarEvento(nomeEvento, parametros = {}) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', nomeEvento, {
          send_to: GA_ID,
          fluxo_id: FLUXO_ID,
          fluxo_nome: FLUXO_NOME,
          timestamp_local: new Date().toISOString(),
          fuso_selecionado: (window.HotelPetFuso && typeof window.HotelPetFuso.zone === 'function')
            ? window.HotelPetFuso.zone()
            : 'America/Sao_Paulo',
          ...parametros
        });
      }
    } catch (erro) {
      console.warn('[HotelPet Analytics] Aviso ao despachar evento:', erro);
    }
  }

  // Exporta função globalmente para reutilização em outros módulos
  window.HotelPetAnalytics = {
    registrarEvento,
    metricaId: GA_ID,
    fluxoId: FLUXO_ID,
    fluxoNome: FLUXO_NOME
  };

  document.addEventListener('DOMContentLoaded', () => {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Rastreio de Navegação e Visualização de Tela
    registrarEvento('visualizar_pagina_hotelpet', {
      pagina: paginaAtual,
      titulo_documento: document.title,
      idioma: 'pt-BR'
    });

    // 2. Interações no Login (index.html)
    const formLogin = document.getElementById('login-form');
    if (formLogin) {
      formLogin.addEventListener('submit', () => {
        const emailInput = document.getElementById('usuario');
        registrarEvento('login_demonstrativo', {
          metodo: 'demo_local',
          usuario_tipo: 'gerente',
          sucesso: true
        });
      });

      const btnAlternarSenha = document.getElementById('alternar-senha');
      if (btnAlternarSenha) {
        btnAlternarSenha.addEventListener('click', () => {
          registrarEvento('interacao_exibir_senha', {
            pagina: 'login'
          });
        });
      }
    }

    // 3. Interações no Catálogo de Raças (racas.html)
    const selectEspecie = document.getElementById('especie-catalogo');
    if (selectEspecie) {
      selectEspecie.addEventListener('change', (e) => {
        registrarEvento('filtrar_especie_catalogo', {
          especie_selecionada: e.target.value
        });
      });
    }

    const inputPesquisaCatalogo = document.getElementById('pesquisa-catalogo');
    if (inputPesquisaCatalogo) {
      let timeoutBusca;
      inputPesquisaCatalogo.addEventListener('input', (e) => {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(() => {
          const termo = (e.target.value || '').trim();
          if (termo.length >= 2) {
            registrarEvento('buscar_raca_catalogo', {
              termo_busca: termo,
              busca_srd: termo.toLowerCase().includes('srd') || termo.toLowerCase().includes('vira')
            });
          }
        }, 700);
      });
    }

    // 4. Interações em Configurações (configuracoes.html)
    const formConfig = document.getElementById('hotel-settings-form');
    if (formConfig) {
      formConfig.addEventListener('submit', () => {
        const pais = document.getElementById('pais-hotel')?.value;
        const fuso = document.getElementById('fuso-hotel')?.value;
        const checkout = document.getElementById('horario-saida')?.value;
        const capacidade = document.getElementById('vagas')?.value;

        registrarEvento('atualizar_configuracoes_hotel', {
          pais_configurado: pais,
          fuso_configurado: fuso,
          horario_checkout: checkout,
          vagas_capacidade: capacidade
        });
      });

      const btnExportarCopia = document.querySelector('button[data-action="export-copy"], .btn-exportar-copia');
      if (btnExportarCopia) {
        btnExportarCopia.addEventListener('click', () => {
          registrarEvento('exportar_backup_json', {
            formato: 'json'
          });
        });
      }
    }

    // 5. Interações em Animais / Pets (pet_cadastrar.html, pet_editar.html)
    const formPet = document.getElementById('pet-form') || document.querySelector('form[action*="pet"]');
    if (formPet) {
      formPet.addEventListener('submit', () => {
        const especie = document.getElementById('tipo')?.value;
        const raca = document.getElementById('raca')?.value;
        const peso = document.getElementById('peso')?.value;
        registrarEvento('salvar_ficha_animal', {
          especie: especie,
          raca: raca,
          faixa_peso: Number(peso) <= 10 ? 'pequeno' : Number(peso) <= 25 ? 'medio' : 'grande'
        });
      });
    }

    // 6. Interações em Reservas (reserva_cadastrar.html, reserva_editar.html)
    const formReserva = document.getElementById('reserva-form') || document.querySelector('form[action*="reserva"]');
    if (formReserva) {
      formReserva.addEventListener('submit', () => {
        registrarEvento('salvar_reserva_hospedagem', {
          tipo_operacao: paginaAtual.includes('editar') ? 'edicao' : 'novo_cadastro'
        });
      });
    }
  });
})();
