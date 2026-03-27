# Pecinhas - Bibliotecas reutilizaveis dbasics

Repo central de codigo compartilhado entre projetos da org dbasics.
Cada pasta na raiz e uma "pecinha" (mini-biblioteca).

## Como funciona

- Sem build step - JS puro com tipos (.d.ts) ao lado
- `package.json` na raiz usa `exports` pra mapear cada pecinha
- Projetos consomem via: `npm install github:dbasics/pecinhas`
- Import: `import { fn } from '@dbasics/pecinhas/nome-da-pecinha'`

## Pecinhas disponiveis

- **formatters-br** - formatadores pt-BR (moeda, data, parse, normalizar string)
- **supabase-client** - createSupabaseClient() com noopLock (evita AbortError). Requer @supabase/supabase-js
- **toast** - pub/sub de notificacoes (showToast, subscribeToast, dismissToast). Framework-agnostico
- **modal** - useModal() hook React com a11y (ESC, focus trap, scroll lock, restaura foco). Requer react
- **use-supabase-auth** - useAuth() hook React para login/logout/reset. Suporta fetchUserData para roles. Requer react + @supabase/supabase-js
- **supabase-crud** - CRUD generico (getCollection, createDocument, updateDocument, deleteDocument, upsertDocument, batch). Requer @supabase/supabase-js
- **use-app-state** - createAppStore() factory: Context + useReducer + hooks (useSetState, useBulkSetState). Requer react
- **download-csv** - downloadCSV() exporta array para CSV compativel com Excel BR (BOM + ;)
- **whatsapp-float** - buildWhatsAppUrl() + useWhatsAppFloat() hook com scroll/delay. Requer react

## Templates (copiar, nao importar)

- **templates/vercel.json** - headers de seguranca + SPA rewrite + cache de assets
- **templates/variables.css** - design tokens tema violet (cores, spacing, shadows, z-index)
- **templates/react-grab.md** - setup React Grab (dev tool visual) para Vite + React

## Regras

- Nunca codigo de dominio especifico (logica que so um projeto usa)
- Testar antes de commitar: `node -e "import { fn } from './pecinha/index.js'"`
- Manter .d.ts em sincronia com .js
- peerDependencies sao opcionais - so instale o que a pecinha usada precisa
