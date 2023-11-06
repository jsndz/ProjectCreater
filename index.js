#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { generate, count } from "random-words";
import spinner from "nanospinner";
import fs from "fs";
import path from "path";

console.log(chalk.bgBlack("Hello Man How Is Life"));

const sleep = (ms = 2000) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

async function welCome() {
  const welcomeWords = chalkAnimation.rainbow(
    "Welcome To the Path For Projects"
  );
  await sleep();
  welcomeWords.stop();
}

async function usrName() {
  return inquirer
    .prompt([
      {
        name: "User_Name",
        type: "input",
        message: "What is your Name?",
      },
    ])
    .then((answers) => {
      var createdName = `${generate()}_${answers.User_Name}`;
      console.info(`So Your Name is ${createdName}`);
      console.log("Well it doesn't matter what your name is anyway!");
    });
}

async function passWord() {
  let passwordCorrect = false;

  while (!passwordCorrect) {
    const answers = await inquirer.prompt([
      {
        name: "password",
        type: "input",
        message:
          "Give me the correct password if not you won't be allowed to pass",
      },
    ]);

    if (answers.password === "jsndz") {
      console.log("Yeah, Correct password");
      passwordCorrect = true; // Set the flag to exit the loop
    } else {
      console.log("Wrong Password!");
      console.log("Try again");
    }
  }
}

async function fileChoice() {
  return inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What do you want to do?",
        choices: [
          "Create a new project!",
          "open a current project",
          "create a project under a of topic",
        ],
      },
    ])
    .then((answers) => {
      if (answers.choice === "Create a new project!") {
        console.log("Creating a new project...");
        inquirer
          .prompt([
            {
              name: "folderName",
              type: "input",
              message: "Give the Project Name?",
            },
          ])
          .then((answers) => {
            const folder = answers.folderName;
            const directoryPath =
              "/home/gabriel_1/Code/BackEND/JavaScript/projects/";

            const fullname = path.join(directoryPath, folder);
            fs.mkdir(fullname, (err) => {
              if (err) {
                console.error("Already have name with this file!");
              } else {
                console.log("Created folder sucessfully");
              }
            });
          });
      } else if (answers.choice === "Open a current project") {
        console.log("Opening a current project...");
      } else if (answers.choice === "Create a project under a topic") {
        console.log("Creating a project under a topic...");
      }
    });
}

async function main() {
  await welCome();
  await usrName();
  await passWord();
  await fileChoice();
}

main();
