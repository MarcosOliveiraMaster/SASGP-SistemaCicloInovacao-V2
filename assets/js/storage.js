/**
 * Storage Module
 * Manages LocalStorage operations for the SASGP Innovation Cycle System
 */

const Storage = {
  STORAGE_KEY: 'sasgp_innovation_data',
  
  /**
   * Initialize storage with default data
   * @returns {Object} Initial data structure
   */
  getDefaultData() {
    return {
      projects: [],
      settings: {
        theme: 'light',
        version: '2.0.0'
      }
    };
  },

  /**
   * Save projects to LocalStorage
   * @param {Array} projects - Array of projects to save
   * @returns {boolean} Success status
   */
  saveProjects(projects) {
    try {
      const data = this.loadAll();
      data.projects = projects;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Espaço de armazenamento esgotado. Por favor, exporte seus dados e limpe o armazenamento.');
      }
      return false;
    }
  },

  /**
   * Load projects from LocalStorage
   * @returns {Array} Array of projects
   */
  loadProjects() {
    try {
      const data = this.loadAll();
      return data.projects || [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  },

  /**
   * Load all data from LocalStorage
   * @returns {Object} All stored data
   */
  loadAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return this.getDefaultData();
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading data:', error);
      return this.getDefaultData();
    }
  },

  /**
   * Save settings to LocalStorage
   * @param {Object} settings - Settings object
   * @returns {boolean} Success status
   */
  saveSettings(settings) {
    try {
      const data = this.loadAll();
      data.settings = { ...data.settings, ...settings };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  /**
   * Load settings from LocalStorage
   * @returns {Object} Settings object
   */
  loadSettings() {
    try {
      const data = this.loadAll();
      return data.settings || this.getDefaultData().settings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.getDefaultData().settings;
    }
  },

  /**
   * Clear all data from LocalStorage
   * @returns {boolean} Success status
   */
  clearStorage() {
    try {
      if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem(this.STORAGE_KEY);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  /**
   * Export data as JSON
   * @returns {string} JSON string of all data
   */
  exportData() {
    try {
      const data = this.loadAll();
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sasgp_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return jsonString;
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Erro ao exportar dados.');
      return null;
    }
  },

  /**
   * Import data from JSON
   * @param {string} jsonData - JSON string to import
   * @returns {boolean} Success status
   */
  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate data structure
      if (!data.projects || !Array.isArray(data.projects)) {
        throw new Error('Formato de dados inválido');
      }
      
      // Validate each project has required fields
      const requiredFields = ['id', 'title', 'description', 'phase', 'status'];
      const isValid = data.projects.every(project => 
        requiredFields.every(field => field in project)
      );
      
      if (!isValid) {
        throw new Error('Dados de projeto inválidos');
      }
      
      // Merge with existing settings if not present
      if (!data.settings) {
        const currentSettings = this.loadSettings();
        data.settings = currentSettings;
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Erro ao importar dados: ' + error.message);
      return false;
    }
  },

  /**
   * Get storage usage information
   * @returns {Object} Storage usage stats
   */
  getStorageInfo() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const size = data ? new Blob([data]).size : 0;
      const sizeKB = (size / 1024).toFixed(2);
      const sizeMB = (size / (1024 * 1024)).toFixed(2);
      
      return {
        size: size,
        sizeKB: sizeKB,
        sizeMB: sizeMB,
        projectCount: this.loadProjects().length
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return {
        size: 0,
        sizeKB: '0',
        sizeMB: '0',
        projectCount: 0
      };
    }
  }
};
