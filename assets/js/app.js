/**
 * App Module - Controlador principal da aplicação
 * Gerencia toda a lógica de negócio e interação com UI
 */

const App = {
    // Estado atual da aplicação
    state: {
        projects: [],
        currentView: 'grid', // 'grid' ou 'table'
        filters: {
            search: '',
            phase: 'all',
            status: 'all',
            responsible: 'all'
        },
        editingProjectId: null
    },

    /**
     * Inicializa a aplicação
     */
    init() {
        console.log('🚀 Inicializando SASGP - Sistema de Gestão do Ciclo de Inovação');
        
        // Inicializa dados de exemplo se necessário
        Storage.initializeSeedData();
        
        // Carrega projetos
        this.loadProjects();
        
        // Configura event listeners
        this.setupEventListeners();
        
        // Renderiza interface inicial
        this.renderDashboard();
        this.renderProjects();
        this.updateFilterOptions();
        
        console.log('✅ Aplicação inicializada com sucesso');
    },

    /**
     * Carrega projetos do storage
     */
    loadProjects() {
        this.state.projects = Storage.loadProjects();
    },

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Formulário de projeto
        const form = document.getElementById('projectForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Botão cancelar
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.resetForm());
        }

        // Busca com debounce
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', 
                Utils.debounce((e) => this.handleSearch(e), 300)
            );
        }

        // Filtros
        const phaseFilter = document.getElementById('phaseFilter');
        if (phaseFilter) {
            phaseFilter.addEventListener('change', (e) => this.handleFilterChange(e));
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.handleFilterChange(e));
        }

        const responsibleFilter = document.getElementById('responsibleFilter');
        if (responsibleFilter) {
            responsibleFilter.addEventListener('change', (e) => this.handleFilterChange(e));
        }

        // Toggle de visualização
        const gridViewBtn = document.getElementById('gridViewBtn');
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => this.switchView('grid'));
        }

        const tableViewBtn = document.getElementById('tableViewBtn');
        if (tableViewBtn) {
            tableViewBtn.addEventListener('click', () => this.switchView('table'));
        }

        // Exportar/Importar
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        const importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', () => document.getElementById('importFile').click());
        }

        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.addEventListener('change', (e) => this.importData(e));
        }

        // Limpar dados
        const clearBtn = document.getElementById('clearDataBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllData());
        }
    },

    /**
     * Manipula submissão do formulário
     */
    handleFormSubmit(e) {
        e.preventDefault();

        // Coleta dados do formulário
        const formData = {
            name: document.getElementById('projectName').value.trim(),
            description: document.getElementById('projectDescription').value.trim(),
            responsible: document.getElementById('projectResponsible').value.trim(),
            startDate: document.getElementById('projectStartDate').value,
            endDate: document.getElementById('projectEndDate').value,
            phase: document.getElementById('projectPhase').value,
            status: document.getElementById('projectStatus').value,
            tags: this.parseTagsInput(document.getElementById('projectTags').value)
        };

        // Valida
        const validation = Utils.validateForm(formData);
        if (!validation.valid) {
            Utils.showNotification(validation.errors.join(', '), 'error');
            return;
        }

        // Salva (criar ou atualizar)
        if (this.state.editingProjectId) {
            this.updateProject(this.state.editingProjectId, formData);
        } else {
            this.createProject(formData);
        }
    },

    /**
     * Cria novo projeto
     */
    createProject(projectData) {
        const project = Storage.addProject(projectData);
        
        if (project) {
            this.loadProjects();
            this.renderDashboard();
            this.renderProjects();
            this.updateFilterOptions();
            this.resetForm();
            Utils.showNotification('✅ Projeto criado com sucesso!', 'success');
        } else {
            Utils.showNotification('❌ Erro ao criar projeto', 'error');
        }
    },

    /**
     * Atualiza projeto existente
     */
    updateProject(id, projectData) {
        const project = Storage.updateProject(id, projectData);
        
        if (project) {
            this.loadProjects();
            this.renderDashboard();
            this.renderProjects();
            this.updateFilterOptions();
            this.resetForm();
            Utils.showNotification('✅ Projeto atualizado com sucesso!', 'success');
        } else {
            Utils.showNotification('❌ Erro ao atualizar projeto', 'error');
        }
    },

    /**
     * Prepara formulário para edição
     */
    editProject(id) {
        const project = Storage.getProjectById(id);
        
        if (!project) {
            Utils.showNotification('❌ Projeto não encontrado', 'error');
            return;
        }

        // Preenche formulário
        document.getElementById('projectName').value = project.name || '';
        document.getElementById('projectDescription').value = project.description || '';
        document.getElementById('projectResponsible').value = project.responsible || '';
        document.getElementById('projectStartDate').value = project.startDate || '';
        document.getElementById('projectEndDate').value = project.endDate || '';
        document.getElementById('projectPhase').value = project.phase || 'Ideação';
        document.getElementById('projectStatus').value = project.status || 'Em Andamento';
        document.getElementById('projectTags').value = project.tags ? project.tags.join(', ') : '';

        // Atualiza estado e UI
        this.state.editingProjectId = id;
        document.getElementById('formTitle').textContent = 'Editar Projeto';
        document.getElementById('submitBtn').textContent = 'Atualizar Projeto';
        document.getElementById('cancelBtn').style.display = 'inline-block';

        // Scroll para o formulário
        document.getElementById('projectForm').scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Exclui projeto
     */
    deleteProject(id) {
        const project = Storage.getProjectById(id);
        
        if (!project) {
            Utils.showNotification('❌ Projeto não encontrado', 'error');
            return;
        }

        const confirmed = confirm(`Tem certeza que deseja excluir o projeto "${project.name}"?`);
        
        if (confirmed) {
            const success = Storage.deleteProject(id);
            
            if (success) {
                this.loadProjects();
                this.renderDashboard();
                this.renderProjects();
                this.updateFilterOptions();
                Utils.showNotification('✅ Projeto excluído com sucesso!', 'success');
            } else {
                Utils.showNotification('❌ Erro ao excluir projeto', 'error');
            }
        }
    },

    /**
     * Visualiza detalhes do projeto em modal
     */
    viewProjectDetails(id) {
        const project = Storage.getProjectById(id);
        
        if (!project) {
            Utils.showNotification('❌ Projeto não encontrado', 'error');
            return;
        }

        // Cria e exibe modal
        const modalHTML = Components.createModal(project);
        const existingModal = document.getElementById('projectModal');
        
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
    },

    /**
     * Fecha modal
     */
    closeModal(event) {
        // Se event for passado, verifica se clicou no overlay
        if (event && event.target.className !== 'modal-overlay') {
            return;
        }

        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    },

    /**
     * Reseta formulário
     */
    resetForm() {
        document.getElementById('projectForm').reset();
        this.state.editingProjectId = null;
        document.getElementById('formTitle').textContent = 'Cadastrar Novo Projeto';
        document.getElementById('submitBtn').textContent = 'Criar Projeto';
        document.getElementById('cancelBtn').style.display = 'none';
    },

    /**
     * Parse tags input (separadas por vírgula)
     */
    parseTagsInput(input) {
        if (!input || input.trim() === '') return [];
        
        return input
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
    },

    /**
     * Manipula busca
     */
    handleSearch(e) {
        this.state.filters.search = e.target.value.trim();
        this.renderProjects();
    },

    /**
     * Manipula mudança de filtros
     */
    handleFilterChange(e) {
        const filterId = e.target.id;
        
        if (filterId === 'phaseFilter') {
            this.state.filters.phase = e.target.value;
        } else if (filterId === 'statusFilter') {
            this.state.filters.status = e.target.value;
        } else if (filterId === 'responsibleFilter') {
            this.state.filters.responsible = e.target.value;
        }

        this.renderProjects();
    },

    /**
     * Alterna entre visualização grid e tabela
     */
    switchView(view) {
        this.state.currentView = view;
        
        // Atualiza botões
        document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
        document.getElementById('tableViewBtn').classList.toggle('active', view === 'table');
        
        this.renderProjects();
    },

    /**
     * Renderiza dashboard com estatísticas
     */
    renderDashboard() {
        const stats = Utils.calculateStatistics(this.state.projects);
        const container = document.getElementById('dashboardStats');
        
        if (!container) return;

        container.innerHTML = `
            ${Components.createStatCard('Total de Projetos', stats.total, '📊', 'stat-primary')}
            ${Components.createStatCard('Em Andamento', stats.ongoing, '🚀', 'stat-info')}
            ${Components.createStatCard('Concluídos', stats.completed, '✅', 'stat-success')}
            ${Components.createStatCard('Taxa de Sucesso', `${stats.successRate}%`, '🎯', 'stat-warning')}
        `;
    },

    /**
     * Renderiza lista de projetos (grid ou tabela)
     */
    renderProjects() {
        // Aplica filtros
        let filteredProjects = Utils.filterProjects(this.state.projects, this.state.filters);
        
        // Ordena por nome
        filteredProjects = Utils.sortProjects(filteredProjects, 'name');

        const container = document.getElementById('projectsContainer');
        if (!container) return;

        // Lista vazia
        if (filteredProjects.length === 0) {
            container.innerHTML = Components.createEmptyState(
                this.state.filters.search || 
                this.state.filters.phase !== 'all' || 
                this.state.filters.status !== 'all' || 
                this.state.filters.responsible !== 'all'
                    ? 'Nenhum projeto encontrado com os filtros aplicados'
                    : 'Nenhum projeto cadastrado. Crie seu primeiro projeto!'
            );
            return;
        }

        // Renderiza baseado na visualização
        if (this.state.currentView === 'grid') {
            container.innerHTML = '<div class="projects-grid">' +
                filteredProjects.map(p => Components.createProjectCard(p)).join('') +
                '</div>';
        } else {
            container.innerHTML = `
                <div class="projects-table-container">
                    <table class="projects-table">
                        <thead>
                            <tr>
                                <th>Nome do Projeto</th>
                                <th>Responsável</th>
                                <th>Fase</th>
                                <th>Status</th>
                                <th>Período</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredProjects.map(p => Components.createTableRow(p)).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    },

    /**
     * Atualiza opções dos filtros
     */
    updateFilterOptions() {
        const responsibleFilter = document.getElementById('responsibleFilter');
        if (responsibleFilter) {
            const responsibles = Utils.getUniqueResponsibles(this.state.projects);
            const currentValue = responsibleFilter.value;
            responsibleFilter.innerHTML = Components.createFilterOptions(responsibles, 'Todos os Responsáveis');
            
            // Restaura valor se ainda existir
            if (responsibles.includes(currentValue)) {
                responsibleFilter.value = currentValue;
            }
        }
    },

    /**
     * Exporta dados para JSON
     */
    exportData() {
        const data = Storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `sasgp-projetos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        Utils.showNotification('✅ Dados exportados com sucesso!', 'success');
    },

    /**
     * Importa dados de arquivo JSON
     */
    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const jsonData = event.target.result;
                const success = Storage.importData(jsonData);
                
                if (success) {
                    this.loadProjects();
                    this.renderDashboard();
                    this.renderProjects();
                    this.updateFilterOptions();
                    Utils.showNotification('✅ Dados importados com sucesso!', 'success');
                } else {
                    Utils.showNotification('❌ Erro ao importar dados. Verifique o arquivo.', 'error');
                }
            } catch (error) {
                Utils.showNotification('❌ Arquivo inválido', 'error');
            }
            
            // Limpa input
            e.target.value = '';
        };

        reader.onerror = () => {
            Utils.showNotification('❌ Erro ao ler arquivo', 'error');
            e.target.value = '';
        };

        reader.readAsText(file);
    },

    /**
     * Limpa todos os dados
     */
    clearAllData() {
        const confirmed = confirm(
            'ATENÇÃO: Esta ação irá excluir TODOS os projetos!\n\n' +
            'Recomendamos exportar seus dados antes de prosseguir.\n\n' +
            'Deseja continuar?'
        );
        
        if (confirmed) {
            const success = Storage.clearAllData();
            
            if (success) {
                this.loadProjects();
                this.renderDashboard();
                this.renderProjects();
                this.updateFilterOptions();
                Utils.showNotification('✅ Todos os dados foram removidos', 'success');
            } else {
                Utils.showNotification('❌ Erro ao limpar dados', 'error');
            }
        }
    }
};

// Inicializa aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
