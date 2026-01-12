# SAS GP - Sistema de Análise de PDF

Sistema inteligente para análise contextual de documentos PDF usando IA.

## 🚀 Instalação

1. Clone o repositório
2. Copie `.env.example` para `.env` e adicione sua API key da Groq
3. Instale as dependências:

```bash
pip install fastapi uvicorn groq PyPDF2 python-multipart python-dotenv
```

## ▶️ Execução

1. Inicie o backend:
```bash
python app.py
```

2. Abra `index.html` no navegador

## 📝 Uso

1. Clique em "Adicionar Arquivo" e carregue um PDF
2. Aguarde o processamento (máximo 15.000 caracteres)
3. Faça perguntas sobre o conteúdo do documento

## 🔑 Configuração da API

Obtenha sua chave de API gratuita em: https://console.groq.com/keys

Adicione no arquivo `.env`:
```
GROQ_API_KEY=sua_chave_aqui
```
