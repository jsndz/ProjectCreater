# Projector CLI

> Scaffold full-stack projects and custom stacks in seconds with an interactive, powerful CLI tool — designed to supercharge your learning, prototyping, and productivity.

---

## Features

- **Create projects** with predefined or user-defined templates
- **Support for full-stack combinations** like Go + React, Node.js + TypeScript
- **Build your own templates** using a simple step-by-step wizard
- **Auto-generate folders, files, and run shell commands**
- **Delete or clone templates** with confirmation
- **Future-ready** for remote template sharing via GitHub

---

## Installation

```bash
git clone https://github.com/jsndz/projector.git
cd projector
npm install
npm link
```

Now you can run it from anywhere:

```bash
projector
```

---

## CLI Options

Upon launch, you'll be prompted to choose an action:

```
? What would you like to do?
  > Create a new project
    Show the templates
    Create templates
    Delete a template
```

---

## Create a New Project

1. Select a template (e.g. Go + React, Node + TypeScript)
2. Enter your project name
3. The CLI will:

   - Create the folder structure
   - Generate starter files
   - Run all necessary commands

4. Your project is ready to go!

---

## Create Your Own Templates

Use the **Create templates** option to build your own stack logic:

- Define the **template name**
- Choose folders to create
- Add files and their contents
- Enter shell commands to execute (e.g., `npm install`, `go mod init`)
- Save your template to reuse it anytime

Templates are saved under:

```
templates/
└── my-custom-template.json
```

---

## Delete a Template

1. Choose **"Delete a template"**
2. Select any user-created template
3. Confirm deletion

Official templates are protected by default.

---

## Clone a Template

1. Choose **"Clone a template"**
2. Pick an existing `.js` or `.json` template
3. Provide a new name
4. The file will be duplicated and ready for editing

---

## Coming Soon

- **Download templates** from GitHub/Gist
- **Template marketplace support**
- **Prompt variables** inside templates (e.g., asking user input dynamically)
- **Publishable template packages** via npm

---

## Project Structure

```
projector/
├── bin/
│   └── projector.js              # CLI entry point
├── templates/
│   └── go-react.js
│
├── utils/
│   ├── helpers.js
│   └── constants.js
├── test/
│   └── template.test.js
├── .gitignore
├── README.md
└── package.json
```

---

## Dev Commands

To run locally without linking:

```bash
node bin/projector.js
```

To link globally:

```bash
npm link
```

To unlink:

```bash
npm unlink
```

---

## License

MIT © \[Your Name]

---

## Contributing

Want to add a template, fix a bug, or suggest an idea?

1. Fork the repo
2. Create a new branch
3. Submit a PR

All contributions welcome!

---

## Inspiration

This tool was built to:

- Automate my daily full-stack project setup
- Learn how to architect CLI tools
- Help others scaffold ideas without boilerplate friction

---

## Feedback

Feel free to [open an issue](https://github.com/jsndz/projector/issues)
or reach out on [X](https://x.com/https://x.com/jzn18524) / [LinkedIn](https://www.linkedin.com/in/jaison-dsouza-414082263/)
