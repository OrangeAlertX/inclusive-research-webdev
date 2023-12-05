export default function indexHTML(content) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script defer src="client/client.js" type="application/javascript"></script>
    <title>Test React Template</title>
    </head>
  <body><div id='app'>${content}</div></body>
</html>`;
}
