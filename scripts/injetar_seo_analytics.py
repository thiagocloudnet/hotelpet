import os
import re
import glob

HOTELPET_DIR = r"C:\Users\Thiago\Desktop\HotelPet\web-ii\hotelpet-final"
DIST_PAGES_DIR = r"C:\Users\Thiago\Desktop\HotelPet\.dist-pages"

GA_SNIPPET = """    <!-- Google tag (gtag.js) - Google Analytics 4 (Fluxo: Pets | ID: G-8PHJYHNDK5) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8PHJYHNDK5"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-8PHJYHNDK5', {
        send_page_view: true,
        stream_id: '16266387736',
        stream_name: 'Pets',
        cookie_flags: 'SameSite=None;Secure'
      });
    </script>
    <script src="js/analytics-eventos.js" defer></script>"""

SCHEMA_JSON_LD = """    <!-- Dados Estruturados Schema.org / SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Hotel Pet",
      "url": "https://hotelpet.shop",
      "logo": "https://hotelpet.shop/imagens/logo-hotel-pet-horizontal.png",
      "image": "https://hotelpet.shop/imagens/pet-cao-ilustrativo.png",
      "description": "Hospedagem profissional e cuidados completos para cães, gatos e animais domésticos. Inclui catálogo ilustrado de raças com Sem Raça Definida (SRD) e controle de diárias por porte.",
      "telephone": "+55-77-99999-9999",
      "priceRange": "R$ 50 - R$ 80",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BR",
        "addressRegion": "BA"
      }
    }
    </script>"""

PAGES_META = {
    "index.html": {
        "title": "Hotel Pet · Entrar · Sistema de Hospedagem Animal",
        "desc": "Acesse a demonstração acadêmica do Hotel Pet: hospedagem cuidadosa e segura para cães, gatos e pets domésticos. Projeto ADS/UESB."
    },
    "login.html": {
        "title": "Hotel Pet · Login · Acesso ao Sistema",
        "desc": "Página de acesso demonstrativo ao painel administrativo e operacional do Hotel Pet."
    },
    "painel.html": {
        "title": "Hotel Pet · Painel de Controle · Visão Geral",
        "desc": "Acompanhe a taxa de ocupação, diárias ativas, hóspedes acolhidos e status de quartos no painel gerencial do Hotel Pet."
    },
    "pets.html": {
        "title": "Hotel Pet · Animais Hóspedes · Gestão de Pets",
        "desc": "Listagem completa de animais hóspedes: cães, gatos e outros pets cadastrados, com porte por peso e dados do tutor."
    },
    "pet_cadastrar.html": {
        "title": "Hotel Pet · Cadastrar Animal · Ficha do Pet",
        "desc": "Cadastre um novo animal hóspede com espécie, raça (incluindo SRD), peso individual, cuidados especiais e tutor responsável."
    },
    "pet_editar.html": {
        "title": "Hotel Pet · Editar Animal · Atualização de Cadastro",
        "desc": "Atualize a ficha cadastral do hóspede: dados veterinários, peso para cálculo de diária e recomendações alimentares."
    },
    "pet_visualizar.html": {
        "title": "Hotel Pet · Detalhes do Pet · Ficha Completa",
        "desc": "Visualize todas as informações do hóspede, histórico de hospedagem, vacinas, alimentação e contatos de emergência."
    },
    "racas.html": {
        "title": "Hotel Pet · Catálogo Ilustrado de Raças · Cães, Gatos e SRD",
        "desc": "Catálogo completo e ilustrado de raças com cães e gatos, incluindo Sem Raça Definida (SRD), guia de cuidados e porte por peso."
    },
    "reservas.html": {
        "title": "Hotel Pet · Reservas e Estadias · Hospedagem",
        "desc": "Controle de reservas ativas, check-in, check-out às 12h no fuso de Brasília e cálculo automático de diárias por porte."
    },
    "reserva_cadastrar.html": {
        "title": "Hotel Pet · Nova Reserva · Agendamento de Hospedagem",
        "desc": "Agende uma nova estadia para seu animal de estimação com datas de entrada e saída, acomodação e cálculo de valores em reais."
    },
    "reserva_editar.html": {
        "title": "Hotel Pet · Editar Reserva · Alteração de Estadia",
        "desc": "Altere datas, horários e condições da estadia contratada no Hotel Pet."
    },
    "reserva_visualizar.html": {
        "title": "Hotel Pet · Detalhes da Reserva · Comprovante de Estadia",
        "desc": "Consulte os dados completos da reserva, cálculo de diárias e informações do animal hospedado."
    },
    "usuarios.html": {
        "title": "Hotel Pet · Tutores e Usuários · Clientes",
        "desc": "Gerenciamento de tutores e responsáveis pelos hóspedes: contatos, endereço e animais vinculados."
    },
    "usuario_cadastrar.html": {
        "title": "Hotel Pet · Cadastrar Tutor · Novo Cliente",
        "desc": "Cadastre um novo responsável por pets com telefone, e-mail e endereço para contato."
    },
    "usuario_editar.html": {
        "title": "Hotel Pet · Editar Tutor · Atualização de Contato",
        "desc": "Modifique informações de contato e endereço dos responsáveis pelos animais hospedados."
    },
    "usuario_visualizar.html": {
        "title": "Hotel Pet · Detalhes do Tutor · Perfil do Cliente",
        "desc": "Consulte o perfil completo do tutor e a listagem de todos os animais vinculados ao seu cadastro."
    },
    "configuracoes.html": {
        "title": "Hotel Pet · Configurações · País, Fuso Horário e Diárias",
        "desc": "Ajuste país (Brasil padrão), fuso horário (Brasília GMT-3), capacidade de vagas, horário padrão de checkout (12h) e tarifas em R$."
    },
    "perfil.html": {
        "title": "Hotel Pet · Perfil do Gerente · Thiago Ferreira Prates Neves",
        "desc": "Perfil do gerente demonstrativo e autor acadêmico: Thiago Ferreira Prates Neves — ADS/UESB."
    }
}

def process_file(file_path):
    filename = os.path.basename(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Se já tem o GA snippet, remove para reinjetar limpo e atualizado
    if "G-8PHJYHNDK5" in content:
        content = re.sub(r'<!-- Google tag \(gtag\.js\) - Google Analytics 4.*?<\/script>\s*<script src="js/analytics-eventos\.js" defer><\/script>\s*', '', content, flags=re.DOTALL)

    # Remove qualquer bloco anterior de dados estruturados
    content = re.sub(r'<!-- Dados Estruturados Schema\.org \/ SEO.*?<\/script>\s*', '', content, flags=re.DOTALL)
    # Remove tags SEO antigas se houver
    content = re.sub(r'<link rel="canonical"[^>]*>\s*', '', content)
    content = re.sub(r'<meta property="og:[^>]*>\s*', '', content)
    content = re.sub(r'<meta name="twitter:[^>]*>\s*', '', content)
    content = re.sub(r'<meta name="keywords"[^>]*>\s*', '', content)
    content = re.sub(r'<meta name="robots"[^>]*>\s*', '', content)

    meta_info = PAGES_META.get(filename, {
        "title": f"Hotel Pet · {filename.replace('.html', '').capitalize()}",
        "desc": "Sistema de gestão de hospedagem de animais domésticos — Hotel Pet (ADS/UESB)."
    })

    canonical_url = f"https://hotelpet.shop/{filename}"
    seo_tags = f"""    <!-- Metatags de SEO e Otimização Social -->
    <link rel="canonical" href="{canonical_url}" />
    <meta name="keywords" content="hotel pet, hospedagem de animais, cães, gatos, SRD, vira-lata, diárias pet, cuidado animal, UESB, Salvador, Bahia" />
    <meta name="robots" content="index, follow" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Hotel Pet — Hospedagem e Cuidado Animal" />
    <meta property="og:title" content="{meta_info['title']}" />
    <meta property="og:description" content="{meta_info['desc']}" />
    <meta property="og:url" content="{canonical_url}" />
    <meta property="og:image" content="https://hotelpet.shop/imagens/logo-hotel-pet-horizontal.png" />
    <meta property="og:image:alt" content="Logomarca do Hotel Pet" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{meta_info['title']}" />
    <meta name="twitter:description" content="{meta_info['desc']}" />
    <meta name="twitter:image" content="https://hotelpet.shop/imagens/logo-hotel-pet-horizontal.png" />"""

    # Injetar dentro do <head> logo antes de </head>
    injection = f"\n{GA_SNIPPET}\n{seo_tags}\n{SCHEMA_JSON_LD}\n  </head>"
    new_content = re.sub(r'\s*<\/head>', injection, content, count=1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Atualizado SEO & GA4: {filename}")

def main():
    print("Injetando SEO e Google Analytics 4 em todos os arquivos HTML...")
    files = glob.glob(os.path.join(HOTELPET_DIR, "*.html"))
    for file in files:
        process_file(file)
    print(f"Total de {len(files)} arquivos atualizados em {HOTELPET_DIR}!")

if __name__ == "__main__":
    main()
