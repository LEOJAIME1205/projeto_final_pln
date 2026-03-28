# ZapGuard Frontend

Interface React para análise de phishing e fraudes em mensagens.

## 🚀 Quick Start

### Instalação
```bash
npm install
```

### Development
```bash
npm run dev
# Acesse http://localhost:5173
```

### Production Build
```bash
npm run build
# Output em pasta `dist/`
```

---

## 📋 Estrutura do Projeto

```
src/
├── api/              # Integração com backend
│   ├── client.ts     # Cliente HTTP (Axios)
│   └── analyze.api.ts # Endpoint /analyze
├── components/       # Componentes React reutilizáveis
│   ├── AnalyzeForm.tsx
│   ├── ResultCard.tsx
│   └── HistoryList.tsx
├── hooks/            # Custom React hooks
│   ├── useAnalyze.ts     # Estado de análise
│   └── useHistory.ts     # Persistência localStorage
├── pages/            # Páginas/layouts
│   └── AnalyzePage.tsx
├── types/            # Tipos TypeScript
├── utils/            # Utilitários
│   └── config.ts     # Configuração de ambiente
└── styles/           # Estilos customizados
```

---

## 🔧 Configuração

Variáveis de ambiente (gerenciadas automaticamente):

| Variável | Default | Descrição |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | URL base do backend |
| `VITE_API_TIMEOUT` | `5000` | Timeout de requisições (ms) |

---

## 📱 Funcionalidades

- ✅ **Análise de Mensagens**: Envie uma mensagem para verificar se é phishing
- ✅ **Indicador Visual**: Verde (Seguro) ou Vermelho (Risco Alto)
- ✅ **Confiança**: Percentual de confiança da análise
- ✅ **Histórico Local**: Últimas 50 análises salvas automaticamente
- ✅ **Responsivo**: Desktop e mobile

---

## 🚀 Deploy

Backend deve estar rodando em `http://localhost:8000`:

```bash
cd ../zapguard_backend
python main.py
```

Frontend rodará em `http://localhost:5173` com `npm run dev`.

---

## 📚 Tech Stack

- **React** 19.2.4
- **TypeScript** (strict mode)
- **Vite** 8.0.3
- **Tailwind CSS** 4.0
- **Axios** (HTTP)

---

## 📈 Performance

Production build: **~77 kB gzip (JS) + 1.3 kB gzip (CSS)**

---

Para mais informações, veja a documentação no backend.

      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
