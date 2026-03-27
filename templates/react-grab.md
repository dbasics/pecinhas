# React Grab - Setup para projetos Vite + React

Dev tool que permite inspecionar/selecionar componentes React visualmente no browser.
So carrega em modo DEV (nao vai pra producao).

## Instalar

```bash
npm install react-grab @react-grab/claude-code
```

## Adicionar no index.html (dentro do `<head>`)

```html
<script type="module">
  if (import.meta.env.DEV) {
    import("react-grab");
  }
</script>
```

## Referencia

- Testado com: react-grab v0.1.25, React 19, Vite 6
- Projeto de referencia: meta-ads-gestao
