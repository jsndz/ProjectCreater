#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { input, select } from "@inquirer/prompts";
import { generate } from "random-words";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

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

  const template = await select({
    message: chalk.yellow("Choose a template?"),
    choices: [
      { name: "HTML+CSS+JS", value: "htmlcssjs" },
      { name: "Backend go", value: "go" },
    ],
  });
  console.log(chalk.magenta(`Selected template: ${template}`));
  const folderName = await input({ message: "Enter project name:" });
  const targetPath = path.join(process.cwd(), folderName);

  fs.mkdir(targetPath, (err) => {
    if (err) {
      console.error(chalk.red("A folder with this name already exists."));
      return;
    }
    console.log(chalk.green("Project folder created successfully."));

    exec(`cd ${targetPath}`, (err) => {
      if (err) {
        console.error(
          chalk.red("Failed to switch to the new project directory.")
        );
      } else {
        console.log(chalk.cyan("Switched to the project directory."));
        console.log(chalk.greenBright("Ready to start coding."));
      }
    });
  });
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
