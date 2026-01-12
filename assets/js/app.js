/**
 * Main Application Module
 * Core logic for the SASGP Innovation Cycle System
 */

class InnovationApp {
  constructor() {
    this.projects = [];
    this.currentFilters = {
      search: '',
      phase: 'all',
      status: 'all',
      category: 'all'
    };
    this.currentSort = {
      by: 'date',
      order: 'desc'
    };
    this.editingProjectId = null;
    this.currentView = 'dashboard';
  }

  /**
   * Initialize the application
   */
  init() {
    // Load data from storage
    this.projects = Storage.loadProjects();
    const settings = Storage.loadSettings();
    
    // Apply theme
    this.applyTheme(settings.theme);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initial render
    this.switchView('dashboard');
    
    // Show welcome message if no projects
    if (this.projects.length === 0) {
      setTimeout(() => {
        Components.showNotification('Bem-vindo ao SASGP! Crie seu primeiro projeto de inovação.', 'info', 5000);
      }, 500);
    }
    
    console.log('SASGP Innovation Cycle System initialized');
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView(link.dataset.view);
      });
    });

    // New project button
    const newProjectBtn = document.getElementById('newProjectBtn');
    if (newProjectBtn) {
      newProjectBtn.addEventListener('click', () => this.showProjectForm());
    }

    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
      projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveProject();
      });
    }

    // Cancel form button
    const cancelFormBtn = document.getElementById('cancelFormBtn');
    if (cancelFormBtn) {
      cancelFormBtn.addEventListener('click', () => this.hideProjectForm());
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.currentFilters.search = e.target.value;
        this.renderProjects();
      }, 300));
    }

    // Filter selects
    ['phaseFilter', 'statusFilter', 'categoryFilter'].forEach(id => {
      const select = document.getElementById(id);
      if (select) {
        select.addEventListener('change', (e) => {
          const filterType = id.replace('Filter', '');
          this.currentFilters[filterType] = e.target.value;
          this.renderProjects();
        });
      }
    });

    // Sort select
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort.by = e.target.value;
        this.renderProjects();
      });
    }

    // Export/Import buttons
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportData());
    }

    const importBtn = document.getElementById('importBtn');
    const importInput = document.getElementById('importInput');
    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());
      importInput.addEventListener('change', (e) => this.importData(e));
    }

    // Clear storage button
    const clearBtn = document.getElementById('clearStorageBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearStorage());
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Tag input
    const tagInput = document.getElementById('projectTags');
    if (tagInput) {
      tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
    }
  }

  /**
   * Switch between views
   * @param {string} view - View name
   */
  switchView(view) {
    this.currentView = view;
    
    // Update navigation
    document.querySelectorAll('[data-view]').forEach(link => {
      link.classList.toggle('active', link.dataset.view === view);
    });
    
    // Show/hide sections
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.toggle('active', section.id === `${view}View`);
    });
    
    // Render appropriate content
    switch (view) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'projects':
        this.renderProjects();
        break;
      case 'analytics':
        this.renderAnalytics();
        break;
    }
  }

  /**
   * Render dashboard
   */
  renderDashboard() {
    const stats = Utils.calculateStats(this.projects);
    const statsContainer = document.getElementById('dashboardStats');
    const recentContainer = document.getElementById('recentProjects');
    
    if (statsContainer) {
      statsContainer.innerHTML = Components.createStatsCards(stats);
    }
    
    if (recentContainer) {
      const recentProjects = [...this.projects]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6);
      
      if (recentProjects.length > 0) {
        recentContainer.innerHTML = `
          <h3>Projetos Recentes</h3>
          <div class="projects-grid">
            ${recentProjects.map(p => Components.createProjectCard(p).outerHTML).join('')}
          </div>
        `;
      } else {
        recentContainer.innerHTML = `
          <div class="empty-state">
            <p>Nenhum projeto ainda. Clique em "Novo Projeto" para começar!</p>
          </div>
        `;
      }
    }
  }

  /**
   * Render projects list
   */
  renderProjects() {
    const container = document.getElementById('projectsList');
    if (!container) return;
    
    // Update category filter options
    this.updateCategoryFilter();
    
    // Apply filters and sorting
    let filteredProjects = Utils.filterProjects(this.projects, this.currentFilters);
    filteredProjects = Utils.sortProjects(filteredProjects, this.currentSort.by, this.currentSort.order);
    
    if (filteredProjects.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>Nenhum projeto encontrado com os filtros aplicados.</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div class="projects-grid">
        ${filteredProjects.map(p => Components.createProjectCard(p).outerHTML).join('')}
      </div>
    `;
  }

  /**
   * Render analytics
   */
  renderAnalytics() {
    const stats = Utils.calculateStats(this.projects);
    
    // Render charts
    setTimeout(() => {
      Components.createChart('phaseChart', stats.byPhase, 'bar');
      Components.createChart('statusChart', stats.byStatus, 'pie');
    }, 100);
    
    // Render stats summary
    const summaryContainer = document.getElementById('analyticsSummary');
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="analytics-summary">
          <h3>Resumo Geral</h3>
          <p><strong>Total de Projetos:</strong> ${stats.total}</p>
          <p><strong>Projetos Ativos:</strong> ${stats.byStatus.active}</p>
          <p><strong>Projetos Concluídos:</strong> ${stats.byStatus.completed}</p>
          <p><strong>Taxa de Conclusão:</strong> ${stats.total > 0 ? ((stats.byStatus.completed / stats.total) * 100).toFixed(1) : 0}%</p>
        </div>
      `;
    }
  }

  /**
   * Update category filter options
   */
  updateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    const categories = Utils.getUniqueCategories(this.projects);
    const currentValue = categoryFilter.value;
    
    categoryFilter.innerHTML = '<option value="all">Todas as Categorias</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      if (cat === currentValue) option.selected = true;
      categoryFilter.appendChild(option);
    });
  }

  /**
   * Show project form
   * @param {string|null} projectId - Project ID to edit, null for new
   */
  showProjectForm(projectId = null) {
    const formSection = document.getElementById('projectFormSection');
    const form = document.getElementById('projectForm');
    const formTitle = document.getElementById('formTitle');
    
    if (!formSection || !form) return;
    
    this.editingProjectId = projectId;
    
    if (projectId) {
      // Edit mode
      const project = this.projects.find(p => p.id === projectId);
      if (!project) return;
      
      formTitle.textContent = 'Editar Projeto';
      document.getElementById('projectTitle').value = project.title;
      document.getElementById('projectDescription').value = project.description;
      document.getElementById('projectCategory').value = project.category;
      document.getElementById('projectResponsible').value = project.responsible;
      document.getElementById('projectPhase').value = project.phase;
      document.getElementById('projectStatus').value = project.status;
      document.getElementById('projectTags').value = project.tags.join(', ');
      document.getElementById('projectNotes').value = project.notes || '';
    } else {
      // New mode
      formTitle.textContent = 'Novo Projeto';
      form.reset();
    }
    
    formSection.classList.add('active');
    formSection.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Hide project form
   */
  hideProjectForm() {
    const formSection = document.getElementById('projectFormSection');
    if (formSection) {
      formSection.classList.remove('active');
    }
    this.editingProjectId = null;
  }

  /**
   * Save project (create or update)
   */
  saveProject() {
    const formData = {
      title: document.getElementById('projectTitle').value.trim(),
      description: document.getElementById('projectDescription').value.trim(),
      category: document.getElementById('projectCategory').value.trim(),
      responsible: document.getElementById('projectResponsible').value.trim(),
      phase: document.getElementById('projectPhase').value,
      status: document.getElementById('projectStatus').value,
      tags: document.getElementById('projectTags').value.split(',').map(t => t.trim()).filter(t => t),
      notes: document.getElementById('projectNotes').value.trim()
    };
    
    // Validate
    const validation = Utils.validateForm(formData);
    if (!validation.valid) {
      Components.showNotification(validation.errors.join(', '), 'error');
      return;
    }
    
    const now = new Date().toISOString();
    
    if (this.editingProjectId) {
      // Update existing project
      const index = this.projects.findIndex(p => p.id === this.editingProjectId);
      if (index !== -1) {
        this.projects[index] = {
          ...this.projects[index],
          ...formData,
          updatedAt: now
        };
        Components.showNotification('Projeto atualizado com sucesso!', 'success');
      }
    } else {
      // Create new project
      const newProject = {
        id: Utils.generateId(),
        ...formData,
        createdAt: now,
        updatedAt: now
      };
      this.projects.push(newProject);
      Components.showNotification('Projeto criado com sucesso!', 'success');
    }
    
    // Save to storage
    Storage.saveProjects(this.projects);
    
    // Hide form and refresh views
    this.hideProjectForm();
    this.renderDashboard();
    this.renderProjects();
    this.renderAnalytics();
  }

  /**
   * Edit project
   * @param {string} projectId - Project ID
   */
  editProject(projectId) {
    this.switchView('projects');
    setTimeout(() => {
      this.showProjectForm(projectId);
    }, 100);
  }

  /**
   * Delete project
   * @param {string} projectId - Project ID
   */
  deleteProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const sanitizedTitle = Utils.sanitizeHTML(project.title);
    if (confirm(`Tem certeza que deseja excluir o projeto "${sanitizedTitle}"?`)) {
      this.projects = this.projects.filter(p => p.id !== projectId);
      Storage.saveProjects(this.projects);
      Components.showNotification('Projeto excluído com sucesso!', 'success');
      
      // Refresh views
      this.renderDashboard();
      this.renderProjects();
      this.renderAnalytics();
    }
  }

  /**
   * Export data
   */
  exportData() {
    Storage.exportData();
    Components.showNotification('Dados exportados com sucesso!', 'success');
  }

  /**
   * Import data
   * @param {Event} event - File input change event
   */
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target.result;
        if (Storage.importData(jsonData)) {
          this.projects = Storage.loadProjects();
          Components.showNotification('Dados importados com sucesso!', 'success');
          
          // Refresh all views
          this.renderDashboard();
          this.renderProjects();
          this.renderAnalytics();
        }
      } catch (error) {
        Components.showNotification('Erro ao importar arquivo.', 'error');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  }

  /**
   * Clear storage
   */
  clearStorage() {
    if (Storage.clearStorage()) {
      this.projects = [];
      Components.showNotification('Armazenamento limpo com sucesso!', 'success');
      
      // Refresh all views
      this.renderDashboard();
      this.renderProjects();
      this.renderAnalytics();
    }
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    const currentTheme = document.body.dataset.theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    Storage.saveSettings({ theme: newTheme });
  }

  /**
   * Apply theme
   * @param {string} theme - Theme name
   */
  applyTheme(theme) {
    document.body.dataset.theme = theme;
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
}

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new InnovationApp();
    app.init();
    window.app = app; // Make accessible globally for inline event handlers
  });
} else {
  app = new InnovationApp();
  app.init();
  window.app = app;
}
