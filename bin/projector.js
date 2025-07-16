#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { input, select } from "@inquirer/prompts";
import { generate } from "random-words";
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

async function getUserName() {
  const name = await input({ message: "What is your name?" });
  const generatedName = `${generate()}_${name}`;
  console.log(chalk.greenBright(`Your generated name: ${generatedName}`));
  console.log(chalk.dim("Note: Your real name doesn’t matter for this CLI."));
}

async function getUserChoice() {
  const choice = await select({
    message: chalk.yellow("What would you like to do?"),
    choices: [
      { name: "Create a new project", value: "create" },
      { name: "Show the templates", value: "show" },
      { name: "Create templates", value: "createTemplates" },
    ],
  });

  return choice;
}

async function createProject() {
  console.log(chalk.blue("Creating a new project..."));
  console.log(
    chalk.gray("Project will be created in your current working directory.")
  );
  const templatesDir = path.join(__dirname, "../templates");
  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith(".js"));
  const choices = files.map((file) => {
    const name = file.replace(/-/g, " ").replace(".js", "").toUpperCase();
    return {
      name: name,
      value: file.replace(".js", ""),
    };
  });
  const selected = await select({
    message: chalk.yellow("Choose a template"),
    choices,
  });

  console.log(chalk.magenta(`Selected template: ${selected}`));

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
  console.log(chalk.blue("Available templates in current directory:"));

  exec(`ls ${process.cwd()}`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      return;
    }
    if (stderr) {
      console.error(chalk.yellow(`Warning: ${stderr}`));
      return;
    }
    console.log(chalk.white(stdout));
  });
}

async function main() {
  await welcome();
  await getUserName();

  const action = await getUserChoice();

  switch (action) {
    case "create":
      await createProject();
      break;
    case "show":
      await showTemplates();
      break;
    case "createTemplates":
      console.log(chalk.gray("Template creation is not implemented yet."));
      break;
  }
}

main();
