/**
 * Components Module
 * Reusable UI components for the SASGP Innovation Cycle System
 */

const Components = {
  /**
   * Phase names mapping
   */
  phaseNames: {
    ideation: 'Ideação',
    prototyping: 'Prototipação',
    validation: 'Validação',
    implementation: 'Implementação',
    scale: 'Escala'
  },

  /**
   * Status names mapping
   */
  statusNames: {
    active: 'Ativo',
    paused: 'Em Pausa',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  },

  /**
   * Phase colors
   */
  phaseColors: {
    ideation: '#3498db',
    prototyping: '#9b59b6',
    validation: '#f39c12',
    implementation: '#16a085',
    scale: '#27ae60'
  },

  /**
   * Status colors
   */
  statusColors: {
    active: '#27ae60',
    paused: '#f39c12',
    completed: '#3498db',
    cancelled: '#e74c3c'
  },

  /**
   * Create a project card
   * @param {Object} project - Project object
   * @param {Function} onEdit - Edit callback
   * @param {Function} onDelete - Delete callback
   * @returns {HTMLElement} Project card element
   */
  createProjectCard(project, onEdit, onDelete) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    
    const phaseColor = this.phaseColors[project.phase] || '#95a5a6';
    const statusColor = this.statusColors[project.status] || '#95a5a6';
    
    card.innerHTML = `
      <div class="project-card-header" style="border-left: 4px solid ${phaseColor}">
        <h3 class="project-title">${Utils.sanitizeHTML(project.title)}</h3>
        <div class="project-badges">
          <span class="badge badge-phase" style="background-color: ${phaseColor}">
            ${this.phaseNames[project.phase] || project.phase}
          </span>
          <span class="badge badge-status" style="background-color: ${statusColor}">
            ${this.statusNames[project.status] || project.status}
          </span>
        </div>
      </div>
      <div class="project-card-body">
        <p class="project-description">${Utils.sanitizeHTML(project.description)}</p>
        <div class="project-meta">
          <div class="meta-item">
            <strong>Categoria:</strong> ${Utils.sanitizeHTML(project.category)}
          </div>
          <div class="meta-item">
            <strong>Responsável:</strong> ${Utils.sanitizeHTML(project.responsible)}
          </div>
          <div class="meta-item">
            <strong>Atualizado:</strong> ${Utils.formatDate(project.updatedAt)}
          </div>
        </div>
        ${project.tags && project.tags.length > 0 ? `
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${Utils.sanitizeHTML(tag)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      <div class="project-card-footer">
        <button class="btn btn-secondary btn-sm" onclick="window.app.editProject('${project.id}')">
          <i class="icon">✏️</i> Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="window.app.deleteProject('${project.id}')">
          <i class="icon">🗑️</i> Excluir
        </button>
      </div>
    `;
    
    return card;
  },

  /**
   * Create a modal
   * @param {string} title - Modal title
   * @param {string} content - Modal content HTML
   * @param {Array} buttons - Array of button configs
   * @returns {HTMLElement} Modal element
   */
  createModal(title, content, buttons = []) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const buttonsHTML = buttons.map(btn => `
      <button class="btn ${btn.className || 'btn-primary'}" onclick="${btn.onclick}">
        ${btn.text}
      </button>
    `).join('');
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${buttons.length > 0 ? `
          <div class="modal-footer">
            ${buttonsHTML}
          </div>
        ` : ''}
      </div>
    `;
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    return modal;
  },

  /**
   * Show a notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info, warning)
   * @param {number} duration - Duration in ms (0 = permanent)
   */
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
      success: '✓',
      error: '✗',
      info: 'ℹ',
      warning: '⚠'
    };
    
    notification.innerHTML = `
      <span class="notification-icon">${icons[type] || icons.info}</span>
      <span class="notification-message">${Utils.sanitizeHTML(message)}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const container = document.getElementById('notifications') || this.createNotificationContainer();
    container.appendChild(notification);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        notification.classList.add('notification-fade-out');
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
  },

  /**
   * Create notification container if it doesn't exist
   * @returns {HTMLElement} Notification container
   */
  createNotificationContainer() {
    let container = document.getElementById('notifications');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notifications';
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
    return container;
  },

  /**
   * Create a chart using Canvas
   * @param {string} canvasId - Canvas element ID
   * @param {Object} data - Chart data
   * @param {string} type - Chart type (bar, pie)
   */
  createChart(canvasId, data, type = 'bar') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (type === 'bar') {
      this.drawBarChart(ctx, data, width, height);
    } else if (type === 'pie') {
      this.drawPieChart(ctx, data, width, height);
    }
  },

  /**
   * Draw a bar chart
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {Object} data - Chart data
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   */
  drawBarChart(ctx, data, width, height) {
    const labels = Object.keys(data);
    const values = Object.values(data);
    const maxValue = Math.max(...values, 1);
    
    const barWidth = (width - 40) / labels.length - 10;
    const chartHeight = height - 60;
    
    // Draw bars
    labels.forEach((label, index) => {
      const value = values[index];
      const barHeight = (value / maxValue) * chartHeight;
      const x = 30 + index * (barWidth + 10);
      const y = height - 40 - barHeight;
      
      // Bar
      ctx.fillStyle = this.phaseColors[label] || this.statusColors[label] || '#3498db';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Value text
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value, x + barWidth / 2, y - 5);
      
      // Label
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 20);
      ctx.rotate(-Math.PI / 4);
      ctx.textAlign = 'right';
      ctx.fillText(this.phaseNames[label] || this.statusNames[label] || label, 0, 0);
      ctx.restore();
    });
  },

  /**
   * Draw a pie chart
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {Object} data - Chart data
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   */
  drawPieChart(ctx, data, width, height) {
    const labels = Object.keys(data);
    const values = Object.values(data);
    const total = values.reduce((sum, val) => sum + val, 0);
    
    if (total === 0) return;
    
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = Math.min(width, height) / 2 - 60;
    
    let currentAngle = -Math.PI / 2;
    
    // Draw slices
    labels.forEach((label, index) => {
      const value = values[index];
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      // Slice
      ctx.fillStyle = this.phaseColors[label] || this.statusColors[label] || '#3498db';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      // Label
      if (value > 0) {
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.phaseNames[label] || this.statusNames[label] || label} (${value})`, labelX, labelY);
      }
      
      currentAngle += sliceAngle;
    });
  },

  /**
   * Create statistics cards
   * @param {Object} stats - Statistics object
   * @returns {string} HTML string for stats cards
   */
  createStatsCards(stats) {
    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Total de Projetos</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💡</div>
          <div class="stat-value">${stats.byPhase.ideation}</div>
          <div class="stat-label">Ideação</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔧</div>
          <div class="stat-value">${stats.byPhase.prototyping}</div>
          <div class="stat-label">Prototipação</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✓</div>
          <div class="stat-value">${stats.byPhase.validation}</div>
          <div class="stat-label">Validação</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">${stats.byPhase.implementation}</div>
          <div class="stat-label">Implementação</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-value">${stats.byPhase.scale}</div>
          <div class="stat-label">Escala</div>
        </div>
      </div>
    `;
  }
};
