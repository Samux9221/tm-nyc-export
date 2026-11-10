# TM NYC Export

Site em React + Vite com banco de dados no Supabase.

```bash
npm install
npm run dev
```

## Keep-alive do Supabase

No plano gratuito, o Supabase pausa o projeto após 7 dias sem atividade. O workflow
`.github/workflows/ping-supabase.yml` roda todo dia às 12:00 UTC e faz uma leitura mínima
(`products?select=id&limit=1`) via API REST, o que mantém o banco ativo.

### Configuração

1. No GitHub: **Settings → Secrets and variables → Actions → New repository secret**
2. Nome: `VITE_SUPABASE_ANON_KEY` — valor: a *anon key* do projeto
   (Supabase → Project Settings → API).

Ou pelo terminal:

```bash
gh secret set VITE_SUPABASE_ANON_KEY
```

### Testar

```bash
gh workflow run ping-supabase.yml
gh run list --workflow ping-supabase.yml --limit 1
```

O job falha (e o GitHub envia e-mail) se a secret estiver ausente ou se o Supabase
responder com erro. O próprio workflow se reativa a cada execução, evitando que o
GitHub o desative após 60 dias sem commits no repositório.
