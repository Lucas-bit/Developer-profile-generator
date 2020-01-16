const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "What is your current location?"
    },
    {
      type: "input",
      name: "repositories",
      message: "How many public repositories do you have?"
    },
    {
      type: "input",
      name: "followers",
      message: "How many followers do you have?"
    },
    {
      type: "input",
      name: "stars",
      message: "How many Github stars do you have?"
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub Username?"
    },
    {
      type: "input",
      name: "linkedin",
      message: "What is your LinkedIn URL?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="stylesheet.css">
  <title>Document</title>
</head>
<body>
  
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">My current location is ${answers.location}.</p>
    <p class="lead">I have ${answers.repositories} repositories.</p>
    <p class="lead">I have ${answers.followers} followers.</p>
    <p class="lead">I have ${answers.stars} GitHub stars.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      <li class="list-group-item">E-mail: ${answers.email}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("new-index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to new-index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
