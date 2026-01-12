# SASGP - Sistema de Ciclo de Inovação v2.0

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow.svg)

Sistema completo de gestão de ciclo de inovação desenvolvido em **Vanilla JavaScript puro**, sem dependências externas. Funciona 100% no lado do cliente (client-side) usando LocalStorage para persistência de dados.

## 🎯 Objetivo

Gerenciar projetos de inovação através das 5 fases do ciclo de inovação:
1. **Ideação** - Geração e captura de ideias
2. **Prototipação** - Desenvolvimento de protótipos
3. **Validação** - Testes e validação com usuários
4. **Implementação** - Execução do projeto
5. **Escala** - Expansão e melhoria contínua

## ✨ Funcionalidades

### Dashboard
- 📊 Visão geral dos projetos
- 📈 Estatísticas em tempo real (total, por fase, por status)
- 🎨 Gráficos visuais usando Canvas API
- 📋 Lista de projetos recentes

### Gestão de Projetos
- ➕ Criar novos projetos de inovação
- ✏️ Editar projetos existentes
- 🗑️ Excluir projetos
- 👁️ Visualizar detalhes completos

### Campos do Projeto
- ID único (gerado automaticamente)
- Título
- Descrição
- Categoria/Área
- Responsável
- Fase do ciclo
- Status (Ativo, Em pausa, Concluído, Cancelado)
- Data de criação e última atualização
- Tags/Palavras-chave
- Observações/Notas

### Filtros e Busca
- 🔍 Busca por título, descrição ou tags
- 🎯 Filtro por fase do ciclo
- 📌 Filtro por status
- 📁 Filtro por categoria
- ⬆️⬇️ Ordenação (data, título, fase)

### Análises e Métricas
- 📊 Gráfico de barras por fase
- 🥧 Gráfico de pizza por status
- 📈 Estatísticas detalhadas
- 💹 Taxa de conclusão

### Exportação e Importação
- ⬇️ Exportar dados em JSON
- ⬆️ Importar dados de arquivo JSON
- 💾 Backup automático em LocalStorage
- 🗑️ Limpar todos os dados

### Experiência do Usuário
- 🌓 Tema claro/escuro
- 📱 Design totalmente responsivo
- 🔔 Notificações visuais
- ✅ Validação de formulários
- ⚡ Interface rápida e fluida

## 🚀 Como Usar

### Instalação

**Não é necessária instalação!** O sistema roda diretamente no navegador.

1. Clone ou baixe este repositório:
```bash
git clone https://github.com/MarcosOliveiraMaster/SASGP-SistemaCicloInovacao-V2.git
```

2. Navegue até a pasta do projeto:
```bash
cd SASGP-SistemaCicloInovacao-V2
```

3. Abra o arquivo `index.html` diretamente no navegador:
   - **Opção 1**: Duplo clique no arquivo `index.html`
   - **Opção 2**: Arraste o arquivo para o navegador
   - **Opção 3**: Use o menu Arquivo > Abrir do navegador

### Uso do Sistema

#### 1. Dashboard
- Acesse a visão geral dos seus projetos
- Veja estatísticas em tempo real
- Clique em "Novo Projeto" para criar um projeto

#### 2. Criar Projeto
1. Clique no botão "Novo Projeto"
2. Preencha todos os campos obrigatórios (*)
3. Adicione tags separadas por vírgula (opcional)
4. Clique em "Salvar Projeto"

#### 3. Editar Projeto
1. Localize o projeto na lista
2. Clique no botão "Editar" no card do projeto
3. Modifique os campos desejados
4. Clique em "Salvar Projeto"

#### 4. Excluir Projeto
1. Localize o projeto na lista
2. Clique no botão "Excluir"
3. Confirme a exclusão

#### 5. Filtrar Projetos
1. Acesse a aba "Projetos"
2. Use os filtros disponíveis:
   - **Buscar**: Digite palavras-chave
   - **Fase**: Selecione a fase do ciclo
   - **Status**: Selecione o status
   - **Categoria**: Selecione a categoria
   - **Ordenar**: Escolha critério de ordenação

#### 6. Visualizar Análises
1. Acesse a aba "Análises"
2. Veja gráficos de distribuição por fase e status
3. Analise estatísticas e taxa de conclusão

#### 7. Exportar Dados
1. Acesse a aba "Projetos"
2. Clique em "Exportar"
3. Um arquivo JSON será baixado automaticamente

#### 8. Importar Dados
1. Acesse a aba "Projetos"
2. Clique em "Importar"
3. Selecione um arquivo JSON válido
4. Os dados serão importados e mesclados

#### 9. Alternar Tema
- Clique no ícone de lua/sol no cabeçalho
- O tema será alternado entre claro e escuro
- A preferência é salva automaticamente

## 📁 Estrutura de Arquivos

```
/
├── index.html              # Página principal da aplicação
├── README.md              # Este arquivo
├── assets/
│   ├── css/
│   │   └── styles.css     # Estilos CSS com suporte a temas
│   ├── js/
│   │   ├── app.js         # Lógica principal da aplicação
│   │   ├── storage.js     # Gerenciamento de LocalStorage
│   │   ├── utils.js       # Funções utilitárias
│   │   └── components.js  # Componentes reutilizáveis da UI
│   └── img/
│       └── (imagens do sistema, se aplicável)
```

## 💾 Estrutura de Dados

Os dados são armazenados em LocalStorage no seguinte formato:

```json
{
  "projects": [
    {
      "id": "proj-1234567890-abc123",
      "title": "Projeto Exemplo",
      "description": "Descrição detalhada do projeto",
      "category": "Tecnologia",
      "responsible": "João Silva",
      "phase": "prototyping",
      "status": "active",
      "createdAt": "2026-01-12T10:00:00Z",
      "updatedAt": "2026-01-12T15:30:00Z",
      "tags": ["inovação", "digital", "sustentabilidade"],
      "notes": "Observações adicionais"
    }
  ],
  "settings": {
    "theme": "light",
    "version": "2.0.0"
  }
}
```

### Fases do Ciclo
- `ideation` - Ideação
- `prototyping` - Prototipação
- `validation` - Validação
- `implementation` - Implementação
- `scale` - Escala

### Status do Projeto
- `active` - Ativo
- `paused` - Em Pausa
- `completed` - Concluído
- `cancelled` - Cancelado

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno e responsivo com variáveis CSS
- **JavaScript ES6+**: Código modular e orientado a objetos
  - Classes ES6
  - Arrow Functions
  - Template Literals
  - Destructuring
  - Spread Operator
- **Canvas API**: Renderização de gráficos
- **LocalStorage API**: Persistência de dados local

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Google Chrome (versão 90+)
- ✅ Mozilla Firefox (versão 88+)
- ✅ Microsoft Edge (versão 90+)
- ✅ Safari (versão 14+)
- ✅ Opera (versão 76+)

### Dispositivos
- 💻 Desktop (Windows, macOS, Linux)
- 📱 Tablets (iPad, Android)
- 📱 Smartphones (iOS, Android)

## 🔒 Segurança

- ✅ Validação de inputs no lado do cliente
- ✅ Sanitização de dados para prevenir XSS
- ✅ Tratamento robusto de erros
- ✅ Confirmação para ações destrutivas

## ⚡ Performance

- Carregamento instantâneo (sem dependências externas)
- Operações otimizadas com LocalStorage
- Renderização eficiente da interface
- Debouncing em busca e filtros

## 📊 Limitações

### LocalStorage
- **Capacidade**: ~5-10 MB por domínio (varia por navegador)
- **Persistência**: Dados permanecem até serem limpos manualmente
- **Escopo**: Dados são isolados por domínio/origem

### Recomendações
- Exporte seus dados regularmente como backup
- Monitore o uso de armazenamento
- Limpe projetos antigos periodicamente

## 🐛 Troubleshooting

### O sistema não salva dados
**Solução**: Verifique se o navegador permite LocalStorage. Alguns modos privados/anônimos bloqueiam o armazenamento local.

### Erro "Quota Exceeded"
**Solução**: O armazenamento está cheio. Exporte seus dados, limpe o armazenamento e importe os dados novamente.

### Gráficos não aparecem
**Solução**: Aguarde o carregamento completo da página. Se o problema persistir, verifique se há dados suficientes para gerar os gráficos.

### Importação falha
**Solução**: Verifique se o arquivo JSON está no formato correto. Use arquivos exportados pelo próprio sistema.

### Tema não muda
**Solução**: Limpe o cache do navegador e tente novamente.

## 🚀 Próximas Funcionalidades (Roadmap)

- [ ] Arrastar e soltar projetos entre fases (Drag & Drop)
- [ ] Histórico de alterações nos projetos
- [ ] Comentários e discussões em projetos
- [ ] Anexar arquivos aos projetos
- [ ] Notificações e lembretes
- [ ] Colaboração multi-usuário (via sincronização)
- [ ] Exportação em PDF
- [ ] Templates de projetos
- [ ] Metas e prazos

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no GitHub
- Entre em contato com a equipe SASGP

## 📝 Notas da Versão 2.0.0

### Novidades
- ✨ Sistema 100% client-side em Vanilla JavaScript
- 🎨 Design moderno e responsivo
- 🌓 Suporte a tema claro/escuro
- 📊 Gráficos visuais com Canvas API
- 💾 Sistema robusto de backup/restore
- 🔍 Busca e filtros avançados
- 📱 Totalmente responsivo

### Melhorias
- ⚡ Performance otimizada
- 🔒 Validação e sanitização aprimoradas
- 📈 Análises e métricas expandidas
- 💡 Interface mais intuitiva

---

**Desenvolvido com ❤️ pela equipe SASGP**

**Versão:** 2.0.0 | **Data:** Janeiro 2026
