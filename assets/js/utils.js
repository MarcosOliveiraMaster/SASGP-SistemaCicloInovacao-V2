/**
 * Utils Module
 * Utility functions for the SASGP Innovation Cycle System
 */

const Utils = {
  /**
   * Generate a unique ID for projects
   * @returns {string} Unique identifier
   */
  generateId() {
    return 'proj-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Format date to locale string
   * @param {string|Date} date - Date to format
   * @param {boolean} includeTime - Whether to include time
   * @returns {string} Formatted date
   */
  formatDate(date, includeTime = false) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return d.toLocaleString('pt-BR', options);
  },

  /**
   * Validate form data
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result {valid: boolean, errors: array}
   */
  validateForm(formData) {
    const errors = [];
    
    if (!formData.title || formData.title.trim() === '') {
      errors.push('Título é obrigatório');
    }
    
    if (!formData.description || formData.description.trim() === '') {
      errors.push('Descrição é obrigatória');
    }
    
    if (!formData.category || formData.category.trim() === '') {
      errors.push('Categoria é obrigatória');
    }
    
    if (!formData.responsible || formData.responsible.trim() === '') {
      errors.push('Responsável é obrigatório');
    }
    
    if (!formData.phase) {
      errors.push('Fase é obrigatória');
    }
    
    if (!formData.status) {
      errors.push('Status é obrigatório');
    }
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  },

  /**
   * Filter projects based on criteria
   * @param {Array} projects - Array of projects
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered projects
   */
  filterProjects(projects, filters) {
    return projects.filter(project => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(searchLower);
        const matchesDescription = project.description.toLowerCase().includes(searchLower);
        const matchesTags = project.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }
      
      // Phase filter
      if (filters.phase && filters.phase !== 'all') {
        if (project.phase !== filters.phase) {
          return false;
        }
      }
      
      // Status filter
      if (filters.status && filters.status !== 'all') {
        if (project.status !== filters.status) {
          return false;
        }
      }
      
      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (project.category !== filters.category) {
          return false;
        }
      }
      
      return true;
    });
  },

  /**
   * Sort projects by specified field
   * @param {Array} projects - Array of projects
   * @param {string} sortBy - Field to sort by (date, title, phase)
   * @param {string} order - Sort order (asc, desc)
   * @returns {Array} Sorted projects
   */
  sortProjects(projects, sortBy = 'date', order = 'desc') {
    const sorted = [...projects];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'phase':
          comparison = a.phase.localeCompare(b.phase);
          break;
        case 'date':
        default:
          comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
          break;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  },

  /**
   * Sanitize HTML to prevent XSS
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Get unique categories from projects
   * @param {Array} projects - Array of projects
   * @returns {Array} Unique categories
   */
  getUniqueCategories(projects) {
    const categories = projects.map(p => p.category);
    return [...new Set(categories)].sort();
  },

  /**
   * Calculate statistics from projects
   * @param {Array} projects - Array of projects
   * @returns {Object} Statistics object
   */
  calculateStats(projects) {
    const stats = {
      total: projects.length,
      byPhase: {
        ideation: 0,
        prototyping: 0,
        validation: 0,
        implementation: 0,
        scale: 0
      },
      byStatus: {
        active: 0,
        paused: 0,
        completed: 0,
        cancelled: 0
      }
    };
    
    projects.forEach(project => {
      if (stats.byPhase[project.phase] !== undefined) {
        stats.byPhase[project.phase]++;
      }
      if (stats.byStatus[project.status] !== undefined) {
        stats.byStatus[project.status]++;
      }
    });
    
    return stats;
  },

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};
