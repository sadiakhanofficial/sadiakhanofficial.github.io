/**
 * Sadia Khan Portfolio - Main Application Logic
 * Features:
 * - Lucide Iconography integration sitewide
 * - Bilingual engine (DE / EN) with comprehensive i18n coverage
 * - Automatic IP-based Geolocation detection for Germany (DE)
 * - Dynamic 25-project catalog rendering & live filtering
 * - Case study modal engine
 * - Direct contact channel utilities (Email, WhatsApp, Phone)
 */

(function () {
  'use strict';

  // State
  let currentLang = 'de';
  let currentCategory = 'all';
  let searchQuery = '';
  let activeModalProject = null;
  let projectModalInstance = null;
  let isProjectsExpanded = false;
  const INITIAL_PROJECTS_COUNT = 6;

  // German-speaking country codes & timezones
  const GERMAN_COUNTRIES = ['DE', 'AT', 'CH', 'LI', 'LU'];
  const GERMAN_TIMEZONES = ['Europe/Berlin', 'Europe/Vienna', 'Europe/Zurich', 'Europe/Busingen'];

  /**
   * Safe wrapper to trigger Lucide SVG generation
   */
  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Determine initial language based on preference or IP location
   */
  async function detectInitialLanguage() {
    // 1. Check user explicit choice in localStorage
    try {
      const saved = localStorage.getItem('sadia_portfolio_lang');
      if (saved === 'de' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // 2. Fast client-side locale & timezone check
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (GERMAN_TIMEZONES.some(gtz => tz.includes(gtz))) {
        return 'de';
      }
      const navLang = (navigator.language || '').toLowerCase();
      if (navLang.startsWith('de')) {
        return 'de';
      }
    } catch (e) {
      console.warn('Locale check error:', e);
    }

    // 3. Fast IP Geolocation (async with 1200ms timeout)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const resp = await fetch('https://get.geojs.io/v1/ip/country.json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        const country = (data.country || '').toUpperCase();
        if (GERMAN_COUNTRIES.includes(country)) {
          return 'de';
        }
      }
    } catch (err) {
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 1000);
        const resp2 = await fetch('https://ipapi.co/json/', { signal: controller2.signal });
        clearTimeout(timeoutId2);
        if (resp2.ok) {
          const data2 = await resp2.json();
          const country2 = (data2.country_code || '').toUpperCase();
          if (GERMAN_COUNTRIES.includes(country2)) {
            return 'de';
          }
        }
      } catch (err2) {
        // Fall back to default
      }
    }

    // Default to English for global audience
    return 'en';
  }

  /**
   * Set Language & Update all elements in the DOM
   */
  function setLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') lang = 'en';
    currentLang = lang;
    
    try {
      localStorage.setItem('sadia_portfolio_lang', lang);
    } catch (e) {
      // Storage disabled
    }
    
    document.documentElement.lang = lang;

    // Update switcher buttons (desktop and mobile)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};

    // 1. Translate static text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // 2. Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 3. Translate HTML content elements
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // 4. Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        el.setAttribute('title', dict[key]);
      }
    });

    // Re-render projects and modal
    renderProjects();
    if (activeModalProject) {
      populateModal(activeModalProject);
    }

    // Refresh Lucide icons
    refreshLucideIcons();
  }

  /**
   * Helper to retrieve all projects safely
   */
  function getAllProjects() {
    if (window.PORTFOLIO_PROJECTS && Array.isArray(window.PORTFOLIO_PROJECTS)) {
      return window.PORTFOLIO_PROJECTS;
    }
    if (typeof PORTFOLIO_PROJECTS !== 'undefined' && Array.isArray(PORTFOLIO_PROJECTS)) {
      return PORTFOLIO_PROJECTS;
    }
    return [];
  }

  /**
   * Filter and search projects
   */
  function getFilteredProjects() {
    const list = getAllProjects();
    if (!list || list.length === 0) return [];

    return list.filter(project => {
      // Category match
      const matchCat = currentCategory === 'all' || project.categoryKey === currentCategory;

      // Search query match
      if (!matchCat) return false;
      if (!searchQuery) return true;

      const q = searchQuery.toLowerCase();
      const title = (project.title || '').toLowerCase();
      const role = ((project.role && project.role[currentLang]) || (project.role && project.role.en) || '').toLowerCase();
      const desc = ((project.description && project.description[currentLang]) || (project.description && project.description.en) || '').toLowerCase();
      const tags = (project.tags || []).join(' ').toLowerCase();

      return title.includes(q) || role.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }

  /**
   * Render Projects Grid
   */
  function renderProjects(preserveExpandState = false) {
    const container = document.getElementById('projects-grid');
    const countEl = document.getElementById('projects-count');
    const seeMoreContainer = document.getElementById('projects-see-more-container');
    const toggleBtnText = document.getElementById('btn-toggle-projects-text');
    const toggleBtnIcon = document.getElementById('btn-toggle-projects-icon');
    if (!container) return;

    if (!preserveExpandState) {
      // Keep expanded state if user is expanding, or reset when filter changes
    }

    const projects = getFilteredProjects();
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLang]) || (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};

    if (countEl) {
      countEl.textContent = `(${projects.length})`;
    }

    if (projects.length === 0) {
      container.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="p-5 bg-white rounded-4 border">
            <i data-lucide="search" class="text-muted d-block mx-auto mb-3" style="width: 36px; height: 36px;"></i>
            <h5 class="fw-bold text-dark">${currentLang === 'de' ? 'Keine Projekte gefunden' : 'No projects found'}</h5>
            <p class="text-secondary small mb-0">${currentLang === 'de' ? 'Bitte versuchen Sie einen anderen Suchbegriff oder wählen Sie eine andere Kategorie.' : 'Please try adjusting your search terms or selecting another category.'}</p>
          </div>
        </div>
      `;
      if (seeMoreContainer) {
        seeMoreContainer.classList.add('d-none');
      }
      refreshLucideIcons();
      return;
    }

    // Determine how many projects to display
    const shouldLimit = !isProjectsExpanded && projects.length > INITIAL_PROJECTS_COUNT;
    const visibleProjects = shouldLimit ? projects.slice(0, INITIAL_PROJECTS_COUNT) : projects;

    let html = '';
    visibleProjects.forEach((project, index) => {
      const isTPM = (project.role && project.role.en && project.role.en.includes('Manager'));
      const roleBadgeClass = isTPM ? 'badge-role-tpm' : 'badge-role-dev';
      const roleText = (project.role && (project.role[currentLang] || project.role.en)) || 'Full Stack Developer';
      const categoryText = (project.category && (project.category[currentLang] || project.category.en)) || 'Enterprise';
      const descText = (project.description && (project.description[currentLang] || project.description.en)) || '';

      // Links
      const links = project.links || {};
      const hasWeb = links.Web;

      // Tech tags preview (first 4)
      const tagsHtml = (project.tags || []).slice(0, 4).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join(' ');

      // Add stagger animation for newly revealed items (> INITIAL_PROJECTS_COUNT)
      const isNewItem = index >= INITIAL_PROJECTS_COUNT;
      const animStyle = isNewItem ? `animation-delay: ${(index - INITIAL_PROJECTS_COUNT) * 0.05}s;` : '';

      html += `
        <div class="col-12 col-md-6 col-lg-4 mb-4 project-item-anim" style="${animStyle}">
          <div class="card h-100 project-card shadow-sm p-4 d-flex flex-column justify-content-between">
            <div>
              <!-- Top Row: Logo & Category -->
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="project-logo-box">
                  <img src="${project.logo}" alt="${escapeHtml(project.title)} logo" loading="lazy" onerror="this.onerror=null; this.src='assets/logos/projects/cmd.svg';">
                </div>
                <span class="badge bg-light text-secondary border fw-medium px-2.5 py-1.5" style="font-size: 0.75rem;">
                  ${escapeHtml(categoryText)}
                </span>
              </div>

              <!-- Title & Role -->
              <h5 class="fw-bold mb-2 text-dark">${escapeHtml(project.title)}</h5>
              <div class="mb-3">
                <span class="badge badge-role ${roleBadgeClass}">
                  <i data-lucide="${isTPM ? 'kanban' : 'code-2'}" class="lucide-sm"></i>
                  <span>${escapeHtml(roleText)}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-secondary small mb-3" style="line-height: 1.55; min-height: 48px;">
                ${escapeHtml(descText)}
              </p>
            </div>

            <div>
              <!-- Tags -->
              <div class="mb-3 d-flex flex-wrap gap-1.5">
                ${tagsHtml}
              </div>

              <!-- Action Buttons -->
              <div class="pt-3 border-top d-flex align-items-center justify-content-between gap-2">
                <button type="button" class="btn btn-sm btn-outline-dark w-100 fw-semibold rounded-3 py-2 btn-open-modal d-inline-flex align-items-center justify-content-center gap-1.5" data-slug="${project.slug}">
                  <i data-lucide="file-text" class="lucide-sm"></i>
                  <span>${dict.project_btn_details || 'View Case Study'}</span>
                </button>
                ${hasWeb ? `
                  <a href="${hasWeb}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-light border text-danger fw-semibold px-3 py-2 rounded-3 d-inline-flex align-items-center justify-content-center" title="Live Demo">
                    <i data-lucide="external-link" class="lucide-sm"></i>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Show/hide See More container
    if (seeMoreContainer) {
      if (projects.length > INITIAL_PROJECTS_COUNT) {
        seeMoreContainer.classList.remove('d-none');
        if (toggleBtnText) {
          if (isProjectsExpanded) {
            toggleBtnText.textContent = dict.project_btn_show_less || (currentLang === 'de' ? 'Weniger anzeigen' : 'Show Less');
          } else {
            const remaining = projects.length - INITIAL_PROJECTS_COUNT;
            toggleBtnText.textContent = `${dict.project_btn_see_more || (currentLang === 'de' ? 'Weitere Projekte anzeigen' : 'See More Projects')} (${remaining}+)`;
          }
        }
        if (toggleBtnIcon) {
          toggleBtnIcon.setAttribute('data-lucide', isProjectsExpanded ? 'chevron-up' : 'chevron-down');
        }
      } else {
        seeMoreContainer.classList.add('d-none');
      }
    }

    // Attach click listeners to open modal
    container.querySelectorAll('.btn-open-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.getAttribute('data-slug');
        const list = getAllProjects();
        const project = list.find(p => p.slug === slug);
        if (project) {
          openProjectModal(project);
        }
      });
    });

    refreshLucideIcons();
  }

  /**
   * Open & Populate Project Details Modal
   */
  function openProjectModal(project) {
    activeModalProject = project;
    populateModal(project);

    const modalEl = document.getElementById('projectDetailModal');
    if (modalEl && window.bootstrap) {
      if (!projectModalInstance) {
        projectModalInstance = new bootstrap.Modal(modalEl);
      }
      projectModalInstance.show();
    }
  }

  function populateModal(project) {
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLang]) || (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};
    const modalTitleEl = document.getElementById('modalProjectTitle');
    const modalCategoryEl = document.getElementById('modalProjectCategory');
    const modalRoleEl = document.getElementById('modalProjectRole');
    const modalLogoEl = document.getElementById('modalProjectLogo');
    const modalTimelineEl = document.getElementById('modalProjectTimeline');
    const modalProblemHeading = document.getElementById('modalProblemHeading');
    const modalProblemText = document.getElementById('modalProblemText');
    const modalSolutionHeading = document.getElementById('modalSolutionHeading');
    const modalSolutionText = document.getElementById('modalSolutionText');
    const modalTagsContainer = document.getElementById('modalProjectTags');
    const modalLinksContainer = document.getElementById('modalProjectLinks');

    if (!modalTitleEl) return;

    modalTitleEl.textContent = project.title;
    modalCategoryEl.textContent = (project.category && (project.category[currentLang] || project.category.en)) || '';
    modalTimelineEl.textContent = project.timeline || 'Production';

    const isTPM = (project.role && project.role.en && project.role.en.includes('Manager'));
    modalRoleEl.className = `badge badge-role ${isTPM ? 'badge-role-tpm' : 'badge-role-dev'}`;
    modalRoleEl.innerHTML = `<i data-lucide="${isTPM ? 'kanban' : 'code-2'}" class="lucide-sm"></i> <span>${(project.role && (project.role[currentLang] || project.role.en)) || ''}</span>`;

    if (modalLogoEl) {
      modalLogoEl.src = project.logo;
      modalLogoEl.onerror = () => { modalLogoEl.src = 'assets/logos/projects/cmd.svg'; };
    }

    // Problem & Solution
    const prob = project.problem || {};
    modalProblemHeading.innerHTML = `<i data-lucide="alert-triangle" class="text-danger me-2"></i> ${(prob.heading && prob.heading[currentLang]) || dict.project_modal_problem || 'Challenge & Objective'}`;
    modalProblemText.textContent = (prob.summary && prob.summary[currentLang]) || (project.description && (project.description[currentLang] || project.description.en)) || '';

    const sol = project.solution || {};
    modalSolutionHeading.innerHTML = `<i data-lucide="cpu" class="text-danger me-2"></i> ${(sol.heading && sol.heading[currentLang]) || dict.project_modal_solution || 'Architecture & Engineering Implementation'}`;
    modalSolutionText.textContent = (sol.summary && sol.summary[currentLang]) || (project.description && (project.description[currentLang] || project.description.en)) || '';

    // Tags
    if (modalTagsContainer) {
      modalTagsContainer.innerHTML = (project.tags || []).map(t => `<span class="tech-tag fs-7 py-1 px-2.5">${escapeHtml(t)}</span>`).join(' ');
    }

    // Direct links
    if (modalLinksContainer) {
      const links = project.links || {};
      let linksHtml = '';

      if (links.Web) {
        linksHtml += `<a href="${links.Web}" target="_blank" rel="noopener noreferrer" class="btn btn-red btn-sm"><i data-lucide="globe" class="lucide-sm me-1.5"></i> ${dict.project_btn_live || 'Live Demo'}</a>`;
      }
      if (links.Android) {
        linksHtml += `<a href="${links.Android}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm"><i data-lucide="smartphone" class="lucide-sm me-1.5"></i> ${dict.project_btn_mobile || 'Get App'}</a>`;
      }
      if (links.GitHub) {
        linksHtml += `<a href="${links.GitHub}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm"><i data-lucide="code" class="lucide-sm me-1.5"></i> ${dict.project_btn_github || 'Source Code'}</a>`;
      }
      if (links.PubDev) {
        linksHtml += `<a href="${links.PubDev}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm"><i data-lucide="layers" class="lucide-sm me-1.5"></i> Pub.dev</a>`;
      }
      if (links.Medium) {
        linksHtml += `<a href="${links.Medium}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary btn-sm"><i data-lucide="file-text" class="lucide-sm me-1.5"></i> Publication</a>`;
      }

      modalLinksContainer.innerHTML = linksHtml || `<span class="text-muted small">${currentLang === 'de' ? 'Interne Unternehmensanwendung' : 'Internal enterprise system'}</span>`;
    }

    refreshLucideIcons();
  }

  /**
   * Helper: Escape HTML to avoid XSS
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Setup Interactive Event Handlers
   */
  function setupEventHandlers() {
    // Language Switcher Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLanguage(lang);
      });
    });

    // Category Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category || 'all';
        renderProjects();
      });
    });

    // Search Input
    const searchInput = document.getElementById('projectSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = (e.target.value || '').trim();
        // Reset to initial count on new search so user isn't overwhelmed
        isProjectsExpanded = false;
        renderProjects();
      });
    }

    // See More / Show Less Projects Toggle Button
    const toggleProjectsBtn = document.getElementById('btn-toggle-projects');
    if (toggleProjectsBtn) {
      toggleProjectsBtn.addEventListener('click', () => {
        isProjectsExpanded = !isProjectsExpanded;
        renderProjects(true);

        if (!isProjectsExpanded) {
          // If collapsing, scroll smoothly back to projects section top
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    // Copy Email & Phone Buttons
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              showCopyToast(textToCopy);
            }).catch(() => {
              fallbackCopy(textToCopy);
            });
          } else {
            fallbackCopy(textToCopy);
          }
        }
      });
    });

    // Navbar Collapse on Mobile Link Click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && window.bootstrap) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        });
      });
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopyToast(text);
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  /**
   * Show Copy Toast
   */
  function showCopyToast(copiedText) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;

    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLang]) || (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};
    toast.textContent = `${copiedText} - ${dict.contact_copied || 'Copied!'}`;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 2500);
  }

  /**
   * Initialization
   */
  async function init() {
    setupEventHandlers();

    // Detect language and apply
    const initialLang = await detectInitialLanguage();
    setLanguage(initialLang);

    // Initial Lucide icon generation
    refreshLucideIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
