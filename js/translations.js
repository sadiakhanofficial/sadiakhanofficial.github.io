/**
 * Sadia Khan Portfolio - Bilingual Translations Dictionary (DE / EN)
 * Updated with Lucide icons support, balanced layout phrasing, and direct contact options
 */
const TRANSLATIONS = {
  de: {
    // Navigation
    nav_about: "Über mich",
    nav_skills: "Kompetenzen",
    nav_projects: "Projekte",
    nav_experience: "Werdegang",
    nav_contact: "Kontakt",
    nav_cta: "Kontakt aufnehmen",
    lang_toggle_label: "Sprache",

    // Hero
    hero_badge_status: "Verfügbar für neue Herausforderungen",
    hero_badge_location: "Böblingen, Deutschland",
    hero_greeting: "Hallo, ich bin",
    hero_name: "Sadia Khan",
    hero_role: "Full Stack Developer",
    hero_tagline: "Konzeption, Entwicklung und Skalierung robuster Webanwendungen mit klarem Fokus auf Performance, saubere Code-Architektur und herausragende Benutzererfahrung.",
    hero_cta_projects: "Projekte ansehen",
    hero_cta_contact: "Direkt kontaktieren",
    hero_cta_email: "E-Mail schreiben",
    
    // Stats (Graduated used as requested)
    stat_projects_num: "20+",
    stat_projects_label: "Produktiv-Projekte",
    stat_exp_num: "4+",
    stat_exp_label: "Jahre Full-Stack-Erfahrung",
    stat_degree_num: "Graduiert",
    stat_degree_label: "Informatik · FAST NUCES",
    stat_quality_num: "100%",
    stat_quality_label: "Zuverlässigkeit & Code-Qualität",

    // Hero Banner
    hero_banner_title: "Deutsche Ingenieursstandards",
    hero_banner_desc: "Clean Code, DSGVO-konforme & zukunftssichere Architekturen.",

    // About Section
    about_eyebrow: "Profil & Philosophie",
    about_heading: "Leidenschaftliche Full-Stack-Ingenieurin mit Blick fürs Ganze",
    about_p1: "Ich bin eine detailorientierte Full-Stack-Entwicklerin mit fundierter Praxiserfahrung in moderner Frontend-, Mobile- und Backend-Entwicklung sowie intelligenter Automatisierung. Mein Schwerpunkt liegt auf der Entwicklung und Wartung skalierbarer Web- und App-Lösungen mit agilem Vorgehen und durchdachter Softwarearchitektur.",
    about_p2: "Ob moderne Webanwendungen mit Next.js und React, performante Cross-Platform-Apps mit Flutter und Dart, Cloud-Backends mit Node.js und Supabase/Firebase oder effiziente Workflow-Automatisierungen mit n8n und GoHighLevel (GHL): Ich verbinde technische Exzellenz mit nutzerzentriertem Design und geschäftlichem Mehrwert.",
    about_city_label: "Standort:",
    about_city_val: "Böblingen, Baden-Württemberg, Deutschland",
    about_status_label: "Verfügbarkeit:",
    about_status_val: "Verfügbar für Festanstellung & Projekte",
    about_email_label: "E-Mail:",
    about_phone_label: "Telefon:",
    about_degree_label: "Abschluss:",
    about_degree_val: "Graduiert (Informatik)",
    about_edu_inst_label: "Universität:",
    about_edu_inst_val: "FAST NUCES",
    about_lang_label: "Sprachen:",
    about_lang_val: "Deutsch, Englisch",
    about_pillar1: "Agile & Scrum-Methoden",
    about_pillar2: "Clean Architecture & REST/GraphQL",
    about_pillar3: "Cloud & DevOps (AWS, Docker, CI/CD)",
    about_pillar4: "Performance & Web-Optimierung",

    // Skills & Services (Core Domains)
    skills_eyebrow: "Leistungen & Kernkompetenzen",
    skills_heading: "Kernkompetenzen & Dienstleistungen",
    skills_sub: "Maßgeschneiderte Softwarelösungen mit Fokus auf Skalierbarkeit, intuitive Nutzererfahrung und zukunftsfähige Architekturen.",
    skills_cat_web: "Web Development",
    skills_cat_web_desc: "Entwicklung hochperformanter, reaktiver Webanwendungen, skalierbarer Plattformen und stabiler APIs nach Clean-Code-Standards.",
    skills_cat_app: "App Development",
    skills_cat_app_desc: "Konzeption und Realisierung nativer und plattformübergreifender Mobile Apps mit flüssigen Interfaces und Offline-Fähigkeiten.",
    skills_cat_ai: "AI Automation",
    skills_cat_ai_desc: "Intelligente Automatisierungsworkflows, LLM-Integrationen, generative KI-Tools und effiziente Prozessoptimierung für Unternehmen.",

    // Projects
    projects_eyebrow: "Portfolio & Fallstudien",
    projects_heading: "Ausgewählte Produktiv-Projekte",
    projects_sub: "20 interaktive Architektur-Fallstudien und Anwendungen aus den Bereichen Enterprise, Healthcare, KI und Mobile.",
    filter_all: "Alle (20)",
    filter_enterprise: "Unternehmen & SaaS",
    filter_ai_health: "KI & MedTech",
    filter_mobile_media: "Medien & Mobile",
    search_placeholder: "Nach Technologie, Rolle oder Name suchen...",
    project_btn_details: "Fallstudie ansehen",
    project_btn_see_more: "Weitere Projekte anzeigen",
    project_btn_show_less: "Weniger anzeigen",
    project_btn_live: "Live-Demo",
    project_btn_mobile: "App ansehen",
    project_btn_github: "Quellcode",
    project_role_label: "Rolle:",
    project_modal_problem: "Herausforderung & Problemstellung",
    project_modal_solution: "Architektur & Technische Umsetzung",
    project_modal_stack: "Technologie-Stack",
    project_modal_links: "Projekt-Links",
    project_modal_close: "Schließen",

    // Experience
    exp_eyebrow: "Werdegang & Ausbildung",
    exp_heading: "Beruflicher Hintergrund",
    exp_title_work: "Berufserfahrung",
    exp_title_edu: "Ausbildung & Werdegang",
    exp_job1_role: "Freelance Full Stack Developer",
    exp_job1_period: "Januar 2022 – Heute",
    exp_job1_company: "Freiberuflich / Projektbasis · Böblingen",
    exp_job1_desc: "Entwicklung und Bereitstellung maßgeschneiderter Webanwendungen, E-Commerce-Plattformen und APIs für internationale Kunden. Fokus auf Clean Architecture, API-Design, Cloud-Integration und SEO-Performance.",
    exp_edu1_title: "Graduiert: Informatik (Computer Science)",
    exp_edu1_period: "2012 – 2017",
    exp_edu1_school: "FAST NUCES School of Management Sciences",
    exp_edu1_desc: "Kernbereiche: Software Engineering, Datenbanksysteme, Algorithmen, Verteilte Systeme und moderne Web-Technologien.",
    exp_edu2_title: "Fachabitur & Abitur (Pre-Engineering)",
    exp_edu2_period: "2008 – 2012",
    exp_edu2_school: "Punjab Group of College & Govt. Comprehensive School",
    exp_edu2_desc: "Mathematisch-naturwissenschaftlicher Schwerpunkt mit Auszeichnung.",

    // Direct Contact Section (No form - direct channels)
    contact_eyebrow: "Kontakt & Austausch",
    contact_heading: "Direkt und unkompliziert Kontakt aufnehmen",
    contact_sub: "Ob Festanstellung, anspruchsvolles Projekt oder technischer Austausch: Ich bin jederzeit über E-Mail, WhatsApp oder Telefon erreichbar.",
    contact_card_email_title: "E-Mail schreiben",
    contact_card_email_desc: "Für offizielle Anfragen, detaillierte Projektbeschreibungen und Angebote.",
    contact_card_email_action: "E-Mail senden",
    contact_card_whatsapp_title: "WhatsApp Chat",
    contact_card_whatsapp_desc: "Schnelle und direkte Abstimmung per WhatsApp.",
    contact_card_whatsapp_action: "WhatsApp Chat starten",
    contact_card_phone_title: "Telefonischer Anruf",
    contact_card_phone_desc: "Mo–Fr von 9:00 bis 18:00 Uhr direkt erreichbar.",
    contact_card_phone_action: "Jetzt anrufen",
    contact_location_title: "Standort",
    contact_location_val: "71034 Böblingen, Baden-Württemberg, Deutschland",
    contact_location_extra: "Region Stuttgart · Deutschlandweit remote & hybrid",
    contact_copied: "Kopiert!",
    contact_copied_toast: "In die Zwischenablage kopiert!",
    contact_copy_btn: "Kopieren",

    // Footer & Impressum
    footer_tagline: "Full Stack Developer mit Fokus auf Performance, Zuverlässigkeit und saubere Code-Struktur.",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_impressum_btn: "Impressum & Datenschutz",
    footer_german_touch: "Mit Präzision entwickelt in Böblingen, Deutschland 🇩🇪",
    impressum_title: "Impressum & Datenschutzhinweis",
    impressum_content: `
      <h6 class="fw-bold mb-2">Angaben gemäß § 5 TMG:</h6>
      <p class="mb-3"><strong>Sadia Khan</strong><br>
      Full Stack Developer<br>
      Böblingen, Deutschland<br>
      E-Mail: <a href="mailto:contact@sadiakhan.dev" class="text-danger text-decoration-none">contact@sadiakhan.dev</a><br>
      Telefon: <a href="tel:+4915756856048" class="text-dark text-decoration-none">+49 1575 6856048</a></p>
      <h6 class="fw-bold mb-2">Haftung für Inhalte & Urheberrecht:</h6>
      <p class="text-muted small mb-3">Als Diensteanbieterin bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
      <h6 class="fw-bold mb-2">Datenschutz:</h6>
      <p class="text-muted small mb-0">Diese Webseite dient ausschließlich als beruflicher Portfolio-Auftritt. Es werden keine Tracking-Cookies von Drittanbietern eingesetzt. Lokale Einstellungen (wie Sprachauswahl) werden ausschließlich im lokalen Speicher Ihres Browsers (localStorage) hinterlegt.</p>
    `
  },
  en: {
    // Navigation
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    nav_cta: "Get in Touch",
    lang_toggle_label: "Language",

    // Hero
    hero_badge_status: "Available for Opportunities",
    hero_badge_location: "Böblingen, Germany",
    hero_greeting: "Hello, I am",
    hero_name: "Sadia Khan",
    hero_role: "Full Stack Developer",
    hero_tagline: "Architecting, building, and scaling resilient web systems with a rigorous focus on speed, clean code architecture, and high-impact user experiences.",
    hero_cta_projects: "View Projects",
    hero_cta_contact: "Get in Touch",
    hero_cta_email: "Send Email",

    // Stats (Graduated used as requested)
    stat_projects_num: "20+",
    stat_projects_label: "Production Projects",
    stat_exp_num: "4+",
    stat_exp_label: "Years of Full Stack Experience",
    stat_degree_num: "Graduated",
    stat_degree_label: "Computer Science · FAST NUCES",
    stat_quality_num: "100%",
    stat_quality_label: "Reliability & Code Quality",

    // Hero Banner
    hero_banner_title: "German Engineering Standards",
    hero_banner_desc: "Clean Code, GDPR-compliant & future-proof software architectures.",

    // About Section
    about_eyebrow: "Profile & Philosophy",
    about_heading: "Passionate Full-Stack Engineer with an End-to-End Mindset",
    about_p1: "I am a detail-oriented Full Stack Developer with extensive hands-on expertise across modern frontend, mobile, and backend domains, as well as intelligent automation. My core focus is designing, deploying, and maintaining scalable web and mobile applications with strong emphasis on performance, accessibility, and robust code architecture.",
    about_p2: "Whether engineering reactive web applications with Next.js and React, cross-platform mobile apps with Flutter and Dart, orchestrating resilient cloud backends with Node.js and Supabase/Firebase, or implementing end-to-end workflow automations with n8n and GoHighLevel (GHL): I bridge engineering rigor with intuitive user experiences and measurable business value.",
    about_city_label: "Location:",
    about_city_val: "Böblingen, Baden-Württemberg, Germany",
    about_status_label: "Availability:",
    about_status_val: "Available for Full-Time Roles & Contracts",
    about_email_label: "Email:",
    about_phone_label: "Phone:",
    about_degree_label: "Education:",
    about_degree_val: "Graduated (Computer Science)",
    about_edu_inst_label: "Institution:",
    about_edu_inst_val: "FAST NUCES",
    about_lang_label: "Languages:",
    about_lang_val: "German, English",
    about_pillar1: "Agile & Scrum Methodologies",
    about_pillar2: "Clean Architecture & REST/GraphQL",
    about_pillar3: "Cloud & DevOps (AWS, Docker, CI/CD)",
    about_pillar4: "Performance & Web Optimization",

    // Skills & Services (Core Domains)
    skills_eyebrow: "Services & Core Domains",
    skills_heading: "Core Competencies & Services",
    skills_sub: "Specialized engineering services focused on scalability, elegant user experience, and robust production architectures.",
    skills_cat_web: "Web Development",
    skills_cat_web_desc: "End-to-end engineering of responsive web applications, high-throughput microservices, and robust REST/GraphQL APIs.",
    skills_cat_app: "App Development",
    skills_cat_app_desc: "Modern cross-platform and native mobile applications with smooth gesture-driven UI and resilient offline-first data sync.",
    skills_cat_ai: "AI Automation",
    skills_cat_ai_desc: "Intelligent agent workflows, LLM integrations, retrieval systems, and end-to-end automation pipelines to accelerate operations.",

    // Projects
    projects_eyebrow: "Portfolio & Case Studies",
    projects_heading: "Featured Production Projects",
    projects_sub: "20 interactive architectural case studies and live systems across Enterprise, Healthcare, AI, and Mobile platforms.",
    filter_all: "All (20)",
    filter_enterprise: "Enterprise & SaaS",
    filter_ai_health: "AI & HealthTech",
    filter_mobile_media: "Media & Mobile",
    search_placeholder: "Search by tech, role, or project name...",
    project_btn_details: "View Case Study",
    project_btn_see_more: "See More Projects",
    project_btn_show_less: "Show Less",
    project_btn_live: "Live Demo",
    project_btn_mobile: "Get App",
    project_btn_github: "Source Code",
    project_role_label: "Role:",
    project_modal_problem: "Challenge & Objective",
    project_modal_solution: "Architecture & Engineering Implementation",
    project_modal_stack: "Tech Stack",
    project_modal_links: "Direct Links",
    project_modal_close: "Close",

    // Experience
    exp_eyebrow: "Background & Education",
    exp_heading: "Professional Background",
    exp_title_work: "Work Experience",
    exp_title_edu: "Education & Qualifications",
    exp_job1_role: "Freelance Full Stack Developer",
    exp_job1_period: "January 2022 – Present",
    exp_job1_company: "Independent / Contract · Böblingen",
    exp_job1_desc: "Architected and delivered custom full-stack web applications, e-commerce platforms, and microservices for international clients. Spearheaded clean code architecture, database optimization, and high-conversion UI/UX.",
    exp_edu1_title: "Graduated: Computer Science",
    exp_edu1_period: "2012 – 2017",
    exp_edu1_school: "FAST NUCES School of Management Sciences",
    exp_edu1_desc: "Core focus: Software Engineering, Database Systems, Distributed Architectures, and Modern Web Systems.",
    exp_edu2_title: "Pre-Engineering & Secondary Education",
    exp_edu2_period: "2008 – 2012",
    exp_edu2_school: "Punjab Group of College & Govt. Comprehensive School",
    exp_edu2_desc: "Rigorous focus on advanced mathematics, physics, and analytical problem-solving.",

    // Direct Contact Section (No form - direct channels)
    contact_eyebrow: "Contact & Collaboration",
    contact_heading: "Connect Directly via Email, WhatsApp, or Phone",
    contact_sub: "Available for full-time engineering roles, technical project management, and collaborative software projects.",
    contact_card_email_title: "Direct Email",
    contact_card_email_desc: "Best for project inquiries, role descriptions, and formal proposals.",
    contact_card_email_action: "Send Email",
    contact_card_whatsapp_title: "WhatsApp Chat",
    contact_card_whatsapp_desc: "Fast, direct communication via WhatsApp messenger.",
    contact_card_whatsapp_action: "Open WhatsApp Chat",
    contact_card_phone_title: "Phone Call",
    contact_card_phone_desc: "Available Mon–Fri 9:00 AM – 6:00 PM CET for direct calls.",
    contact_card_phone_action: "Call Now",
    contact_location_title: "Location",
    contact_location_val: "71034 Böblingen, Baden-Württemberg, Germany",
    contact_location_extra: "Stuttgart Metropolitan Region · Nationwide Remote & Hybrid",
    contact_copied: "Copied!",
    contact_copied_toast: "Copied to clipboard!",
    contact_copy_btn: "Copy",

    // Footer & Impressum
    footer_tagline: "Full Stack Developer dedicated to high performance, reliability, and clean software craftsmanship.",
    footer_rights: "All rights reserved.",
    footer_impressum_btn: "Legal Notice & Privacy",
    footer_german_touch: "Engineered with precision in Böblingen, Germany 🇩🇪",
    impressum_title: "Legal Notice & Privacy Policy",
    impressum_content: `
      <h6 class="fw-bold mb-2">Information pursuant to § 5 TMG:</h6>
      <p class="mb-3"><strong>Sadia Khan</strong><br>
      Full Stack Developer<br>
      Böblingen, Germany<br>
      Email: <a href="mailto:contact@sadiakhan.dev" class="text-danger text-decoration-none">contact@sadiakhan.dev</a><br>
      Phone: <a href="tel:+4915756856048" class="text-dark text-decoration-none">+49 1575 6856048</a></p>
      <h6 class="fw-bold mb-2">Liability for Contents & Copyright:</h6>
      <p class="text-muted small mb-3">As a service provider, I am responsible for my own contents on these pages under general law according to § 7 para. 1 TMG. The contents and works created on these pages are subject to German copyright law.</p>
      <h6 class="fw-bold mb-2">Privacy:</h6>
      <p class="text-muted small mb-0">This website serves strictly as a professional engineering portfolio. No third-party tracking cookies are deployed. Local preferences (such as language selection) are stored solely in your browser's local storage (localStorage).</p>
    `
  }
};

window.TRANSLATIONS = TRANSLATIONS;
