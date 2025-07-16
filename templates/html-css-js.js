// templates/html-css-js.js

import fs from "fs";
import path from "path";
import chalk from "chalk";

export async function create(targetPath) {
  console.log(chalk.cyan("\nScaffolding HTML + CSS + JS project..."));

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Simple HTML Project</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="script.js"></script>
</body>
</html>`;

  const cssContent = `/* Add your styles here */
body {
  font-family: sans-serif;
}
`;

  const jsContent = `console.log("Hello from JS!");`;

  try {
    fs.mkdirSync(targetPath, { recursive: true });

    fs.writeFileSync(path.join(targetPath, "index.html"), htmlContent);
    fs.writeFileSync(path.join(targetPath, "style.css"), cssContent);
    fs.writeFileSync(path.join(targetPath, "script.js"), jsContent);

    console.log(chalk.green(" Created index.html"));
    console.log(chalk.green(" Created style.css"));
    console.log(chalk.green(" Created script.js"));
    console.log(chalk.yellow("\n Project created successfully!\n"));
  } catch (err) {
    console.error(chalk.red("Failed to create files:"), err.message);
  }
}
