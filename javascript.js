

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios")
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([{
    message: "Enter your GitHub username",
    name: "username"
  }])
  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/search/users?q=${ username }`
    return axios.get(queryUrl) 
  })
  .then((res) => {
      const profileInfo = new Array(res.data.items[0])
      console.log(profileInfo)
    })}

     


generateHTML = (res) => {
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
    <h1 class="display-4">Hi! My name is ${res.data.login}</h1>
    <img = ${res.avatar_url}>
    <p class="lead">My current location is .</p>
    <p class="lead">I have ${answers.repositories} repositories.</p>
    <p class="lead">I have ${res.followers_url} followers.</p>
    <p class="lead">I have ${res.starred_url} GitHub stars.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      <li class="list-group-item">E-mail: ${answers.email}</li>
    </ul>
  </div>
</div>
</body>
</html>`
}

promptUser()
  .then(function(res) {
    const html = generateHTML(res);

    return writeFileAsync("new-index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to new-index.html");
  })
  .catch(function(err) {
    console.log(err);
  })
