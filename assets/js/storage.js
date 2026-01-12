/**
 * Storage Module - Gerencia LocalStorage para persistência de dados
 * Responsável por todas as operações CRUD de projetos
 */

const Storage = {
    STORAGE_KEY: 'sasgp_projects',

    /**
     * Gera um ID único para novos projetos
     * @returns {string} ID único baseado em timestamp e random
     */
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Carrega todos os projetos do localStorage
     * @returns {Array} Array de projetos
     */
    loadProjects() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            return [];
        }
    },

    /**
     * Salva array de projetos no localStorage
     * @param {Array} projects - Array de projetos para salvar
     * @returns {boolean} Sucesso da operação
     */
    saveProjects(projects) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
            return true;
        } catch (error) {
            console.error('Erro ao salvar projetos:', error);
            return false;
        }
    },

    /**
     * Adiciona um novo projeto
     * @param {Object} project - Dados do projeto
     * @returns {Object|null} Projeto criado ou null em caso de erro
     */
    addProject(project) {
        try {
            const projects = this.loadProjects();
            const timestamp = new Date().toISOString();
            
            const newProject = {
                id: this.generateId(),
                ...project,
                createdAt: timestamp,
                updatedAt: timestamp
            };

            projects.push(newProject);
            this.saveProjects(projects);
            return newProject;
        } catch (error) {
            console.error('Erro ao adicionar projeto:', error);
            return null;
        }
    },

    /**
     * Atualiza um projeto existente
     * @param {string} id - ID do projeto
     * @param {Object} updatedData - Dados atualizados
     * @returns {Object|null} Projeto atualizado ou null
     */
    updateProject(id, updatedData) {
        try {
            const projects = this.loadProjects();
            const index = projects.findIndex(p => p.id === id);
            
            if (index === -1) {
                console.error('Projeto não encontrado');
                return null;
            }

            projects[index] = {
                ...projects[index],
                ...updatedData,
                id, // Garantir que o ID não mude
                updatedAt: new Date().toISOString()
            };

            this.saveProjects(projects);
            return projects[index];
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            return null;
        }
    },

    /**
     * Remove um projeto
     * @param {string} id - ID do projeto a remover
     * @returns {boolean} Sucesso da operação
     */
    deleteProject(id) {
        try {
            const projects = this.loadProjects();
            const filteredProjects = projects.filter(p => p.id !== id);
            
            if (filteredProjects.length === projects.length) {
                console.error('Projeto não encontrado');
                return false;
            }

            this.saveProjects(filteredProjects);
            return true;
        } catch (error) {
            console.error('Erro ao deletar projeto:', error);
            return false;
        }
    },

    /**
     * Busca um projeto específico por ID
     * @param {string} id - ID do projeto
     * @returns {Object|null} Projeto encontrado ou null
     */
    getProjectById(id) {
        try {
            const projects = this.loadProjects();
            return projects.find(p => p.id === id) || null;
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
            return null;
        }
    },

    /**
     * Exporta todos os dados como JSON
     * @returns {string} Dados em formato JSON
     */
    exportData() {
        try {
            const projects = this.loadProjects();
            return JSON.stringify(projects, null, 2);
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            return '[]';
        }
    },

    /**
     * Importa dados de JSON
     * @param {string} jsonData - String JSON com dados
     * @returns {boolean} Sucesso da operação
     */
    importData(jsonData) {
        try {
            const projects = JSON.parse(jsonData);
            
            // Validação básica
            if (!Array.isArray(projects)) {
                throw new Error('Dados inválidos: esperado um array');
            }

            this.saveProjects(projects);
            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    },

    /**
     * Limpa todos os dados do localStorage
     * @returns {boolean} Sucesso da operação
     */
    clearAllData() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    },

    /**
     * Inicializa dados de exemplo (seed data)
     */
    initializeSeedData() {
        const projects = this.loadProjects();
        
        // Só adiciona dados de exemplo se não houver projetos
        if (projects.length === 0) {
            const seedProjects = [
                {
                    name: 'Sistema de Gestão de Inovação',
                    description: 'Desenvolvimento de plataforma web para gerenciar o ciclo completo de inovação da empresa',
                    responsible: 'Maria Silva',
                    startDate: '2026-01-15',
                    endDate: '2026-06-30',
                    phase: 'Prototipagem',
                    status: 'Em Andamento',
                    tags: ['software', 'inovação', 'gestão']
                },
                {
                    name: 'App Mobile de Vendas',
                    description: 'Aplicativo mobile para equipe de vendas acessar catálogo e fazer pedidos',
                    responsible: 'João Santos',
                    startDate: '2026-02-01',
                    endDate: '2026-08-15',
                    phase: 'Validação',
                    status: 'Em Andamento',
                    tags: ['mobile', 'vendas', 'app']
                },
                {
                    name: 'Automação de Processos RH',
                    description: 'Automatização de processos de recrutamento e seleção usando IA',
                    responsible: 'Ana Costa',
                    startDate: '2025-11-01',
                    endDate: '2026-02-28',
                    phase: 'Implementação',
                    status: 'Em Andamento',
                    tags: ['automação', 'RH', 'IA']
                },
                {
                    name: 'Portal do Cliente',
                    description: 'Portal web para clientes acompanharem pedidos e solicitarem suporte',
                    responsible: 'Carlos Mendes',
                    startDate: '2025-09-01',
                    endDate: '2025-12-31',
                    phase: 'Avaliação',
                    status: 'Concluído',
                    tags: ['web', 'cliente', 'suporte']
                },
                {
                    name: 'Integração com ERP',
                    description: 'Projeto de integração dos sistemas legados com novo ERP',
                    responsible: 'Paula Oliveira',
                    startDate: '2026-01-10',
                    endDate: '2026-04-30',
                    phase: 'Ideação',
                    status: 'Pausado',
                    tags: ['integração', 'ERP', 'sistemas']
                }
            ];

            seedProjects.forEach(project => this.addProject(project));
        }
    }
};
