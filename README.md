# ScanCal Frontend

Interface React para o aplicativo ScanCal de análise nutricional.

## 🚀 Como executar

### Desenvolvimento
```bash
npm install
npm start
```

A aplicação estará disponível em `http://localhost:3250`

### Build para Produção
```bash
npm run build
```

## 📋 Variáveis de Ambiente

Configure no arquivo `.env`:

- `REACT_APP_API_URL`: URL da API backend (padrão: http://localhost:5500)
- `BROWSER`: Configuração do navegador (padrão: none)

## 🎨 Tecnologias

- React 18
- TailwindCSS
- React Router
- Axios

## 📱 Funcionalidades

- Landing Page responsiva
- Sistema de autenticação
- Dashboard interativo
- Busca de alimentos
- Diário alimentar
- Sugestões nutricionais

## 🐳 Docker

```bash
docker build -t scancal-frontend .
docker run -p 3250:3250 scancal-frontend
```
