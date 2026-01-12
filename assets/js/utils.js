/**
 * Utils Module - Funções utilitárias do sistema
 * Funções auxiliares para formatação, validação, notificações, etc.
 */

const Utils = {
    /**
     * Formata data para exibição (dd/mm/yyyy)
     * @param {string|Date} date - Data para formatar
     * @returns {string} Data formatada
     */
    formatDate(date) {
        if (!date) return '-';
        
        const d = new Date(date);
        if (isNaN(d.getTime())) return '-';
        
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return `${day}/${month}/${year}`;
    },

    /**
     * Formata data para input type="date" (yyyy-mm-dd)
     * @param {string|Date} date - Data para formatar
     * @returns {string} Data formatada
     */
    formatDateForInput(date) {
        if (!date) return '';
        
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    },

    /**
     * Calcula progresso do projeto baseado nas datas
     * @param {string} startDate - Data de início
     * @param {string} endDate - Data prevista de conclusão
     * @returns {number} Percentual de progresso (0-100)
     */
    calculateProgress(startDate, endDate) {
        if (!startDate || !endDate) return 0;
        
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const now = Date.now();
        
        if (now < start) return 0;
        if (now > end) return 100;
        
        const total = end - start;
        const elapsed = now - start;
        
        return Math.round((elapsed / total) * 100);
    },

    /**
     * Retorna cor baseada no status
     * @param {string} status - Status do projeto
     * @returns {string} Classe CSS da cor
     */
    getStatusColor(status) {
        const colors = {
            'Em Andamento': 'status-ongoing',
            'Concluído': 'status-completed',
            'Pausado': 'status-paused',
            'Cancelado': 'status-cancelled'
        };
        
        return colors[status] || 'status-default';
    },

    /**
     * Retorna ícone/emoji para cada fase
     * @param {string} phase - Fase do ciclo
     * @returns {string} Emoji/ícone
     */
    getPhaseIcon(phase) {
        const icons = {
            'Ideação': '💡',
            'Validação': '✓',
            'Prototipagem': '🔧',
            'Implementação': '⚙️',
            'Avaliação': '📊'
        };
        
        return icons[phase] || '📋';
    },

    /**
     * Retorna cor para cada fase
     * @param {string} phase - Fase do ciclo
     * @returns {string} Classe CSS da cor
     */
    getPhaseColor(phase) {
        const colors = {
            'Ideação': 'phase-ideation',
            'Validação': 'phase-validation',
            'Prototipagem': 'phase-prototype',
            'Implementação': 'phase-implementation',
            'Avaliação': 'phase-evaluation'
        };
        
        return colors[phase] || 'phase-default';
    },

    /**
     * Valida dados do formulário
     * @param {Object} formData - Dados do formulário
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validateForm(formData) {
        const errors = [];

        // Nome é obrigatório
        if (!formData.name || formData.name.trim() === '') {
            errors.push('Nome do projeto é obrigatório');
        }

        // Validar datas
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            
            if (end < start) {
                errors.push('Data de conclusão deve ser posterior à data de início');
            }
        }

        // Validar fase
        const validPhases = ['Ideação', 'Validação', 'Prototipagem', 'Implementação', 'Avaliação'];
        if (formData.phase && !validPhases.includes(formData.phase)) {
            errors.push('Fase inválida');
        }

        // Validar status
        const validStatuses = ['Em Andamento', 'Concluído', 'Pausado', 'Cancelado'];
        if (formData.status && !validStatuses.includes(formData.status)) {
            errors.push('Status inválido');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    },

    /**
     * Exibe notificação toast
     * @param {string} message - Mensagem a exibir
     * @param {string} type - Tipo: success, error, warning, info
     */
    showNotification(message, type = 'info') {
        // Remove notificações existentes
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Anima entrada
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Debounce - limita a frequência de execução de uma função
     * @param {Function} func - Função a debounced
     * @param {number} delay - Delay em ms
     * @returns {Function} Função debounced
     */
    debounce(func, delay = 300) {
        let timeoutId;
        
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Ordena projetos por critério
     * @param {Array} projects - Array de projetos
     * @param {string} criteria - Critério: name, startDate, endDate, phase, status
     * @param {boolean} ascending - Ordem ascendente
     * @returns {Array} Projetos ordenados
     */
    sortProjects(projects, criteria = 'name', ascending = true) {
        const sorted = [...projects].sort((a, b) => {
            let valueA = a[criteria];
            let valueB = b[criteria];

            // Conversão para minúsculas se for string
            if (typeof valueA === 'string') valueA = valueA.toLowerCase();
            if (typeof valueB === 'string') valueB = valueB.toLowerCase();

            if (valueA < valueB) return ascending ? -1 : 1;
            if (valueA > valueB) return ascending ? 1 : -1;
            return 0;
        });

        return sorted;
    },

    /**
     * Filtra projetos baseado em critérios
     * @param {Array} projects - Array de projetos
     * @param {Object} filters - Objeto com filtros { search, phase, status, responsible }
     * @returns {Array} Projetos filtrados
     */
    filterProjects(projects, filters = {}) {
        return projects.filter(project => {
            // Filtro de busca (nome, descrição, responsável, tags)
            if (filters.search) {
                const search = filters.search.toLowerCase();
                const matchesSearch = 
                    project.name.toLowerCase().includes(search) ||
                    (project.description && project.description.toLowerCase().includes(search)) ||
                    (project.responsible && project.responsible.toLowerCase().includes(search)) ||
                    (project.tags && project.tags.some(tag => tag.toLowerCase().includes(search)));
                
                if (!matchesSearch) return false;
            }

            // Filtro de fase
            if (filters.phase && filters.phase !== 'all') {
                if (project.phase !== filters.phase) return false;
            }

            // Filtro de status
            if (filters.status && filters.status !== 'all') {
                if (project.status !== filters.status) return false;
            }

            // Filtro de responsável
            if (filters.responsible && filters.responsible !== 'all') {
                if (project.responsible !== filters.responsible) return false;
            }

            return true;
        });
    },

    /**
     * Obtém lista única de responsáveis
     * @param {Array} projects - Array de projetos
     * @returns {Array} Lista de responsáveis únicos
     */
    getUniqueResponsibles(projects) {
        const responsibles = projects
            .map(p => p.responsible)
            .filter(r => r && r.trim() !== '');
        
        return [...new Set(responsibles)].sort();
    },

    /**
     * Calcula estatísticas dos projetos
     * @param {Array} projects - Array de projetos
     * @returns {Object} Estatísticas
     */
    calculateStatistics(projects) {
        const total = projects.length;
        const ongoing = projects.filter(p => p.status === 'Em Andamento').length;
        const completed = projects.filter(p => p.status === 'Concluído').length;
        const paused = projects.filter(p => p.status === 'Pausado').length;
        const cancelled = projects.filter(p => p.status === 'Cancelado').length;
        
        const successRate = total > 0 
            ? Math.round((completed / total) * 100) 
            : 0;

        return {
            total,
            ongoing,
            completed,
            paused,
            cancelled,
            successRate
        };
    },

    /**
     * Sanitiza string para prevenir XSS
     * @param {string} str - String para sanitizar
     * @returns {string} String sanitizada
     */
    sanitizeHTML(str) {
        if (!str) return '';
        
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Trunca texto longo
     * @param {string} text - Texto para truncar
     * @param {number} maxLength - Comprimento máximo
     * @returns {string} Texto truncado
     */
    truncateText(text, maxLength = 100) {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength) + '...';
    }
};
