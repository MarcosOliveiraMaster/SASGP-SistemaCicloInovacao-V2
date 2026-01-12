/**
 * Components Module - Componentes de UI reutilizáveis
 * Funções para renderizar elementos da interface
 */

const Components = {
    /**
     * Cria card de estatística para dashboard
     * @param {string} title - Título do card
     * @param {string|number} value - Valor a exibir
     * @param {string} icon - Emoji/ícone
     * @param {string} color - Classe de cor
     * @returns {string} HTML do card
     */
    createStatCard(title, value, icon, color = '') {
        return `
            <div class="stat-card ${color}">
                <div class="stat-icon">${icon}</div>
                <div class="stat-content">
                    <div class="stat-value">${value}</div>
                    <div class="stat-title">${title}</div>
                </div>
            </div>
        `;
    },

    /**
     * Cria badge de status ou fase
     * @param {string} text - Texto do badge
     * @param {string} type - Tipo/classe do badge
     * @returns {string} HTML do badge
     */
    createBadge(text, type) {
        return `<span class="badge ${type}">${Utils.sanitizeHTML(text)}</span>`;
    },

    /**
     * Cria card de projeto para visualização em grid
     * @param {Object} project - Dados do projeto
     * @returns {string} HTML do card
     */
    createProjectCard(project) {
        const progress = Utils.calculateProgress(project.startDate, project.endDate);
        const statusColor = Utils.getStatusColor(project.status);
        const phaseColor = Utils.getPhaseColor(project.phase);
        const phaseIcon = Utils.getPhaseIcon(project.phase);

        return `
            <div class="project-card" data-id="${project.id}">
                <div class="project-card-header">
                    <h3 class="project-name">${Utils.sanitizeHTML(project.name)}</h3>
                    <div class="project-badges">
                        ${this.createBadge(project.phase, phaseColor)}
                        ${this.createBadge(project.status, statusColor)}
                    </div>
                </div>
                
                <div class="project-card-body">
                    <p class="project-description">
                        ${Utils.truncateText(Utils.sanitizeHTML(project.description || 'Sem descrição'), 120)}
                    </p>
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <span class="meta-label">Responsável:</span>
                            <span class="meta-value">${Utils.sanitizeHTML(project.responsible || '-')}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Início:</span>
                            <span class="meta-value">${Utils.formatDate(project.startDate)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Previsão:</span>
                            <span class="meta-value">${Utils.formatDate(project.endDate)}</span>
                        </div>
                    </div>

                    ${project.tags && project.tags.length > 0 ? `
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${Utils.sanitizeHTML(tag)}</span>`).join('')}
                        </div>
                    ` : ''}

                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                        <span class="progress-text">${progress}%</span>
                    </div>
                </div>
                
                <div class="project-card-actions">
                    <button class="btn btn-sm btn-view" onclick="App.viewProjectDetails('${project.id}')">
                        <span class="btn-icon">👁️</span> Ver
                    </button>
                    <button class="btn btn-sm btn-edit" onclick="App.editProject('${project.id}')">
                        <span class="btn-icon">✏️</span> Editar
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="App.deleteProject('${project.id}')">
                        <span class="btn-icon">🗑️</span> Excluir
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Cria linha de tabela para visualização em lista
     * @param {Object} project - Dados do projeto
     * @returns {string} HTML da linha
     */
    createTableRow(project) {
        const statusColor = Utils.getStatusColor(project.status);
        const phaseColor = Utils.getPhaseColor(project.phase);
        const phaseIcon = Utils.getPhaseIcon(project.phase);

        return `
            <tr data-id="${project.id}">
                <td class="td-name">
                    <strong>${Utils.sanitizeHTML(project.name)}</strong>
                </td>
                <td class="td-responsible">${Utils.sanitizeHTML(project.responsible || '-')}</td>
                <td class="td-phase">
                    <span class="phase-icon">${phaseIcon}</span>
                    ${this.createBadge(project.phase, phaseColor)}
                </td>
                <td class="td-status">${this.createBadge(project.status, statusColor)}</td>
                <td class="td-dates">
                    ${Utils.formatDate(project.startDate)} - ${Utils.formatDate(project.endDate)}
                </td>
                <td class="td-actions">
                    <button class="btn-icon-table" onclick="App.viewProjectDetails('${project.id}')" title="Ver detalhes">
                        👁️
                    </button>
                    <button class="btn-icon-table" onclick="App.editProject('${project.id}')" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon-table btn-danger" onclick="App.deleteProject('${project.id}')" title="Excluir">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    },

    /**
     * Cria modal de detalhes do projeto
     * @param {Object} project - Dados do projeto
     * @returns {string} HTML do modal
     */
    createModal(project) {
        const progress = Utils.calculateProgress(project.startDate, project.endDate);
        const statusColor = Utils.getStatusColor(project.status);
        const phaseColor = Utils.getPhaseColor(project.phase);
        const phaseIcon = Utils.getPhaseIcon(project.phase);

        return `
            <div class="modal-overlay" id="projectModal" onclick="App.closeModal(event)">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>${Utils.sanitizeHTML(project.name)}</h2>
                        <button class="modal-close" onclick="App.closeModal()">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="modal-badges">
                            ${this.createBadge(`${phaseIcon} ${project.phase}`, phaseColor)}
                            ${this.createBadge(project.status, statusColor)}
                        </div>

                        <div class="detail-section">
                            <h3>Descrição</h3>
                            <p>${Utils.sanitizeHTML(project.description || 'Sem descrição')}</p>
                        </div>

                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Responsável</label>
                                <p>${Utils.sanitizeHTML(project.responsible || '-')}</p>
                            </div>
                            <div class="detail-item">
                                <label>Data de Início</label>
                                <p>${Utils.formatDate(project.startDate)}</p>
                            </div>
                            <div class="detail-item">
                                <label>Previsão de Conclusão</label>
                                <p>${Utils.formatDate(project.endDate)}</p>
                            </div>
                            <div class="detail-item">
                                <label>Progresso Temporal</label>
                                <p>${progress}%</p>
                            </div>
                        </div>

                        ${project.tags && project.tags.length > 0 ? `
                            <div class="detail-section">
                                <h3>Tags</h3>
                                <div class="project-tags">
                                    ${project.tags.map(tag => `<span class="tag">${Utils.sanitizeHTML(tag)}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <div class="detail-section">
                            <h3>Progresso</h3>
                            <div class="progress-bar progress-bar-large">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                                <span class="progress-text">${progress}%</span>
                            </div>
                        </div>

                        <div class="detail-meta">
                            <small>Criado em: ${Utils.formatDate(project.createdAt)}</small>
                            ${project.updatedAt !== project.createdAt ? `
                                <small>Atualizado em: ${Utils.formatDate(project.updatedAt)}</small>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="App.closeModal()">Fechar</button>
                        <button class="btn btn-primary" onclick="App.editProject('${project.id}'); App.closeModal()">
                            Editar Projeto
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Cria opções para select de filtro
     * @param {Array} options - Array de opções
     * @param {string} allLabel - Label para opção "Todos"
     * @returns {string} HTML das options
     */
    createFilterOptions(options, allLabel = 'Todos') {
        let html = `<option value="all">${allLabel}</option>`;
        options.forEach(option => {
            html += `<option value="${Utils.sanitizeHTML(option)}">${Utils.sanitizeHTML(option)}</option>`;
        });
        return html;
    },

    /**
     * Cria mensagem de lista vazia
     * @param {string} message - Mensagem a exibir
     * @returns {string} HTML da mensagem
     */
    createEmptyState(message = 'Nenhum projeto encontrado') {
        return `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p class="empty-message">${message}</p>
            </div>
        `;
    }
};
