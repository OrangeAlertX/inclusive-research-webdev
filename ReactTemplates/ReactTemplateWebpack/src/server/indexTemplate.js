export default function indexHTML(content) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module">
      import RefreshRuntime from 'http://localhost:5501/@react-refresh'
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="http://localhost:5501/@vite/client"></script>
    <script type="module" src="http://localhost:5501/main.js"></script>
    <title>Test React Template</title>
    </head>
  <body><div id='app'>${content}</div></body>
</html>`;
}
