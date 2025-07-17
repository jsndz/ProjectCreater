#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { input, select } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(
  chalk
    .bgHex("#1a1a1a")
    .hex("#00ffcc")
    .bold(" Projector CLI — Simple Project Launcher ")
);

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const animation = chalkAnimation.rainbow("Welcome to the Projector CLI");
  await sleep();
  animation.stop();
}

async function getUserChoice() {
  return await select({
    message: chalk.yellow("What would you like to do?"),
    choices: [
      { name: "Create a new project", value: "create" },
      { name: "Show the templates", value: "show" },
      { name: "Create templates", value: "createTemplates" },
      { name: "Delete a template", value: "deleteTemplate" },
    ],
  });
}

async function createProject() {
  console.log(chalk.blue("Creating a new project..."));
  console.log(
    chalk.gray("Project will be created in your current working directory.")
  );

  const templatesDir = path.join(__dirname, "../templates");
  if (!fs.existsSync(templatesDir)) {
    console.log(chalk.red("No templates directory found."));
    return;
  }

  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith(".js"));
  if (files.length === 0) {
    console.log(chalk.red("No templates found."));
    return;
  }

  const choices = files.map((file) => ({
    name: file.replace(/-/g, " ").replace(".js", "").toUpperCase(),
    value: file.replace(".js", ""),
  }));

  const selected = await select({
    message: chalk.yellow("Choose a template"),
    choices,
  });

  const folderName = await input({ message: "Enter project name:" });
  const targetPath = path.join(process.cwd(), folderName);

  try {
    const templateModule = await import(`../templates/${selected}.js`);
    if (typeof templateModule.create === "function") {
      await templateModule.create(targetPath);
    } else {
      console.error(chalk.red("Template does not export a 'create' function."));
    }
  } catch (err) {
    console.error(chalk.red("Failed to load template:"), err.message);
  }
}

async function showTemplates() {
  console.log(chalk.blue("Available templates:"));

  const templatesDir = path.join(__dirname, "../templates");

  if (!fs.existsSync(templatesDir)) {
    console.log(chalk.red("Templates directory does not exist."));
    return;
  }

  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith(".js"));

  if (files.length === 0) {
    console.log(chalk.gray("No template files found."));
    return;
  }

  files.forEach((file) => {
    console.log(chalk.white(`- ${file}`));
  });
}
async function deleteTemplate() {
  const templatesDir = path.join(__dirname, "../templates");

  if (!fs.existsSync(templatesDir)) {
    console.log(chalk.red("Templates directory does not exist."));
    return;
  }

  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith(".js"));

  if (files.length === 0) {
    console.log(chalk.gray("No templates to delete."));
    return;
  }

  const choices = files.map((file) => ({
    name: file.replace(".js", ""),
    value: file,
  }));

  const selectedFile = await select({
    message: chalk.yellow("Select a template to delete"),
    choices,
  });

  const confirm = await input({
    message: chalk.red(
      `Are you sure you want to delete "${selectedFile}"? Type 'yes' to confirm:`
    ),
  });

  if (confirm.toLowerCase() === "yes") {
    const filePath = path.join(templatesDir, selectedFile);
    try {
      fs.unlinkSync(filePath);
      console.log(
        chalk.green(`Template "${selectedFile}" deleted successfully.`)
      );
    } catch (err) {
      console.error(chalk.red("Error deleting file:"), err.message);
    }
  } else {
    console.log(chalk.gray("Deletion cancelled."));
  }
}

async function createTemplates() {
  console.log(
    chalk.blue.bold("\nCreating a Custom Template for Projector CLI")
  );

  const name = await input({
    message: chalk.blue.bold("\nEnter the project name"),
  });

  const safeName = name.trim().replace(/\s+/g, "-");
  const templatesDir = path.join(__dirname, "../templates");
  const templateFilePath = path.join(templatesDir, `${safeName}.js`);

  fs.mkdirSync(templatesDir, { recursive: true });
  fs.writeFileSync(templateFilePath, "", "utf8");

  console.log(chalk.cyan("\nPlan your project structure manually"));
  console.log(chalk.gray(`Template file: ${safeName}.js`));

  console.log(
    chalk.cyan(
      "\nStep 2: Use the following prompt to help generate your template using an LLM:"
    )
  );

  console.log(
    chalk.yellow(`
You are creating a template for a CLI tool named "projector".

The template should be written in a single JavaScript file using ES modules.

All logic should go inside the following function:
export async function create(targetPath) {
  // Your commands here
}

Inside this function, write code that:
- Creates folders and files (using fs)
- Runs shell commands if needed (using child_process.exec)
- Uses 'path' module to build correct file paths
- Creates files like index.html, style.css, main.js, README.md etc.

Assume the function will be called with a full absolute target path.

Do NOT include any interactive input inside this function.
`)
  );

  const editor = await select({
    message: chalk.blue.bold("\nChoose an editor to open the file:"),
    choices: [
      { name: "VS Code", value: "code" },
      { name: "Notepad", value: "notepad" },
      { name: "Vim", value: "vim" },
    ],
  });

  exec(`${editor} "${templateFilePath}"`, (err) => {
    if (err) {
      console.error(chalk.red("Failed to open editor:"), err.message);
    } else {
      console.log(chalk.green("File opened in your selected editor."));
    }
  });

  console.log(
    chalk.green.bold(
      "\nDone! Now select your new template when creating a project."
    )
  );
}

async function main() {
  await welcome();

  const action = await getUserChoice();

  switch (action) {
    case "create":
      await createProject();
      break;
    case "show":
      await showTemplates();
      break;
    case "createTemplates":
      await createTemplates();
      break;
    case "deleteTemplate":
      await deleteTemplate();
      break;
    default:
      console.log(chalk.red("Invalid option selected."));
      break;
  }
}

main();
