# 🚀 SASGP - Sistema de Gestão do Ciclo de Inovação

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)

Sistema completo de gestão de projetos de inovação, desenvolvido 100% em **Vanilla JavaScript** puro, sem dependências externas, frameworks ou necessidade de servidor backend.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Modelo de Dados](#modelo-de-dados)
- [Capturas de Tela](#capturas-de-tela)
- [Melhorias Futuras](#melhorias-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 📖 Sobre o Projeto

O SASGP (Sistema de Gestão do Ciclo de Inovação) é uma aplicação web moderna e responsiva para gerenciar o ciclo completo de projetos de inovação, desde a ideação até a avaliação final.

**Principais Diferenciais:**
- ✅ **100% Client-Side**: Funciona completamente no navegador
- ✅ **Zero Dependências**: Não usa bibliotecas ou frameworks externos
- ✅ **Sem Servidor**: Não precisa de Node.js, PHP ou qualquer backend
- ✅ **Sem Build**: Não precisa compilar ou transpilar código
- ✅ **Offline-First**: Funciona completamente offline
- ✅ **Responsivo**: Design adaptativo para mobile, tablet e desktop
- ✅ **Persistência Local**: Dados salvos automaticamente no navegador

## ✨ Funcionalidades

### 📊 Dashboard Dinâmico
- Estatísticas em tempo real (total de projetos, em andamento, concluídos, taxa de sucesso)
- Cards visuais e coloridos com ícones
- Atualização automática ao modificar projetos

### 📝 Gerenciamento de Projetos (CRUD Completo)
- **Criar** novos projetos com formulário completo
- **Visualizar** detalhes em modal interativo
- **Editar** projetos existentes
- **Excluir** projetos com confirmação
- Validação de formulários em tempo real
- Feedback visual para todas as ações

### 🔍 Busca e Filtros Avançados
- Busca em tempo real (nome, descrição, responsável, tags)
- Filtro por fase do ciclo (Ideação, Validação, Prototipagem, Implementação, Avaliação)
- Filtro por status (Em Andamento, Concluído, Pausado, Cancelado)
- Filtro por responsável (lista dinâmica)
- Combinação de múltiplos filtros

### 🎨 Visualizações Flexíveis
- **Modo Grade**: Cards visuais com todas as informações
- **Modo Tabela**: Lista compacta e organizada
- Alternância simples entre visualizações

### 💾 Exportação e Importação
- Exportar todos os dados em JSON
- Importar dados de arquivo JSON
- Backup e restauração facilitados

### 🎯 Gestão do Ciclo de Inovação
- Acompanhamento de 5 fases distintas
- 4 status de projeto
- Tags/categorias personalizadas
- Barra de progresso temporal
- Rastreamento de datas

### 📱 Design Responsivo
- Layout adaptativo para todos os dispositivos
- Interface touch-friendly para mobile
- Tabelas responsivas com scroll horizontal
- Modais otimizados para telas pequenas

## 🚀 Como Usar

### Instalação

**Método 1: Baixar e Abrir**
1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` diretamente no seu navegador
3. Pronto! O sistema está funcionando

**Método 2: Servidor Local (Opcional)**
```bash
# Se preferir usar um servidor local:
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server

# Depois acesse: http://localhost:8000
```

### Uso Básico

1. **Criar Projeto**
   - Preencha o formulário de cadastro
   - Clique em "Criar Projeto"
   - O projeto aparecerá automaticamente na lista

2. **Visualizar Detalhes**
   - Clique no botão "👁️ Ver" em qualquer projeto
   - Um modal exibirá todas as informações

3. **Editar Projeto**
   - Clique no botão "✏️ Editar"
   - O formulário será preenchido automaticamente
   - Faça as alterações e clique em "Atualizar Projeto"

4. **Excluir Projeto**
   - Clique no botão "🗑️ Excluir"
   - Confirme a exclusão

5. **Buscar e Filtrar**
   - Use a caixa de busca para encontrar projetos
   - Combine filtros de fase, status e responsável
   - Os resultados aparecem instantaneamente

6. **Exportar Dados**
   - Clique em "💾 Exportar" no cabeçalho
   - Um arquivo JSON será baixado

7. **Importar Dados**
   - Clique em "📂 Importar" no cabeçalho
   - Selecione um arquivo JSON válido
   - Os dados serão carregados automaticamente

## 📁 Estrutura de Arquivos

```
/
├── index.html                 # Página principal HTML5
├── README.md                  # Documentação do projeto
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos CSS responsivos
│   └── js/
│       ├── storage.js        # Gerenciamento de LocalStorage
│       ├── utils.js          # Funções utilitárias
│       ├── components.js     # Componentes de UI
│       └── app.js            # Controlador principal
```

### Descrição dos Arquivos

#### `index.html`
Estrutura HTML5 semântica completa com:
- Header com logo e ações principais
- Dashboard com cards de estatísticas
- Formulário de cadastro/edição de projetos
- Controles de busca e filtros
- Container para lista de projetos
- Footer informativo

#### `assets/css/styles.css`
Estilos CSS modernos incluindo:
- Variáveis CSS para cores e espaçamentos
- Layout responsivo com Grid e Flexbox
- Componentes estilizados (cards, forms, tables, modals)
- Animações e transições suaves
- Media queries para responsividade
- Sistema de badges coloridos por status/fase

#### `assets/js/storage.js`
Módulo de persistência com:
- Funções CRUD completas
- Geração de IDs únicos
- Exportação/Importação JSON
- Dados de exemplo (seed data)
- Tratamento de erros

#### `assets/js/utils.js`
Funções utilitárias:
- Formatação de datas
- Cálculo de progresso
- Validação de formulários
- Sistema de notificações toast
- Debounce para busca
- Filtros e ordenação
- Estatísticas

#### `assets/js/components.js`
Geração de componentes HTML:
- Cards de estatísticas
- Cards de projetos
- Linhas de tabela
- Modais de detalhes
- Badges de status/fase
- Estados vazios

#### `assets/js/app.js`
Controlador principal:
- Inicialização da aplicação
- Gerenciamento de estado
- Event listeners
- Handlers de formulários
- Renderização de UI
- Coordenação entre módulos

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com variáveis, grid e flexbox
- **Vanilla JavaScript (ES6+)**: Lógica da aplicação
  - `const` e `let` para variáveis
  - Arrow functions
  - Template literals
  - Destructuring
  - Spread operator
  - Array methods modernos
  - LocalStorage API
  - FileReader API
- **Nenhuma Dependência Externa**: 100% código nativo

## 📊 Modelo de Dados

Cada projeto é representado pelo seguinte modelo:

```javascript
{
  id: "1736704200000-abc123xyz",           // ID único gerado automaticamente
  name: "Nome do Projeto",                  // Obrigatório
  description: "Descrição detalhada...",    // Opcional
  responsible: "Nome do Responsável",       // Opcional
  startDate: "2026-01-15",                  // Formato ISO (YYYY-MM-DD)
  endDate: "2026-06-30",                    // Formato ISO (YYYY-MM-DD)
  phase: "Prototipagem",                    // Ideação | Validação | Prototipagem | Implementação | Avaliação
  status: "Em Andamento",                   // Em Andamento | Concluído | Pausado | Cancelado
  tags: ["inovação", "tecnologia"],         // Array de strings
  createdAt: "2026-01-12T10:30:00.000Z",   // Timestamp de criação
  updatedAt: "2026-01-12T15:45:00.000Z"    // Timestamp da última atualização
}
```

### Fases do Ciclo de Inovação

1. **💡 Ideação**: Geração e captura de ideias
2. **✓ Validação**: Validação da viabilidade e valor
3. **🔧 Prototipagem**: Desenvolvimento de protótipos
4. **⚙️ Implementação**: Execução e desenvolvimento
5. **📊 Avaliação**: Análise de resultados e aprendizados

### Status do Projeto

- **🚀 Em Andamento**: Projeto ativo em desenvolvimento
- **✅ Concluído**: Projeto finalizado com sucesso
- **⏸️ Pausado**: Projeto temporariamente suspenso
- **❌ Cancelado**: Projeto cancelado

## 🖼️ Capturas de Tela

### Tela Principal - Dashboard
Exibe cards com estatísticas gerais: total de projetos, projetos em andamento, concluídos e taxa de sucesso. Cards coloridos e responsivos com ícones visuais.

### Formulário de Cadastro
Formulário completo com todos os campos necessários: nome, descrição, responsável, datas, fase, status e tags. Validação em tempo real e feedback visual.

### Lista de Projetos - Modo Grade
Visualização em cards mostrando cada projeto com badges coloridos de fase e status, descrição resumida, responsável, datas, tags e barra de progresso temporal.

### Lista de Projetos - Modo Tabela
Visualização em tabela compacta com colunas organizadas e ações rápidas (visualizar, editar, excluir).

### Modal de Detalhes
Modal elegante exibindo todas as informações do projeto: descrição completa, responsável, datas, fase, status, tags, progresso e metadados.

### Busca e Filtros
Barra de busca em tempo real e filtros combinados por fase, status e responsável. Resultados atualizados instantaneamente.

### Notificações
Sistema de notificações toast no canto superior direito com feedback visual para ações (sucesso, erro, aviso).

### Responsividade Mobile
Interface totalmente adaptada para dispositivos móveis com layout em coluna única, botões maiores e navegação otimizada para touch.

## 🚧 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] **Gráficos e Relatórios**: Visualizações com gráficos de pizza, barras e linhas
- [ ] **Kanban Board**: Arrastar e soltar projetos entre fases
- [ ] **Timeline de Atividades**: Histórico de alterações dos projetos
- [ ] **Anexos de Arquivos**: Upload e armazenamento de documentos (Base64)
- [ ] **Comentários/Notas**: Sistema de anotações por projeto
- [ ] **Múltiplos Responsáveis**: Equipe ao invés de responsável único
- [ ] **Subtarefas/Checklist**: Breakdown de atividades dentro do projeto
- [ ] **Calendário**: Visualização de prazos em calendário
- [ ] **Modo Escuro**: Theme switcher claro/escuro
- [ ] **PWA**: Converter para Progressive Web App com instalação
- [ ] **Sincronização**: Opção de sincronizar com cloud storage
- [ ] **Impressão**: Versão otimizada para impressão de relatórios
- [ ] **Internacionalização**: Suporte multi-idioma

### Melhorias Técnicas
- [ ] **Service Worker**: Cache offline completo
- [ ] **IndexedDB**: Armazenamento mais robusto que LocalStorage
- [ ] **Web Components**: Componentização nativa
- [ ] **TypeScript**: Adicionar tipagem estática
- [ ] **Testes**: Unit tests e E2E tests
- [ ] **A11y**: Melhorias de acessibilidade (WCAG)
- [ ] **Performance**: Virtualização de listas longas
- [ ] **SEO**: Meta tags e structured data

## 🤝 Contribuição

Contribuições são bem-vindas! Se você deseja melhorar este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes
- Mantenha o código em Vanilla JavaScript puro
- Não adicione dependências externas
- Siga o estilo de código existente
- Adicione comentários explicativos
- Teste em diferentes navegadores

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ pela equipe SASGP

## 🙏 Agradecimentos

- Ícones: Emojis nativos do Unicode
- Inspiração: Metodologias de gestão de inovação
- Comunidade: Desenvolvedores que mantêm a web simples e acessível

---

**💡 Lembre-se**: Este sistema funciona completamente no navegador! Basta abrir o `index.html` e começar a usar. Não precisa instalar nada! 🚀

**⚠️ Nota sobre Dados**: Os dados são salvos no LocalStorage do navegador. Recomenda-se fazer backups regulares usando a função de exportação. Limpar dados do navegador apagará todos os projetos.
