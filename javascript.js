

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios").default
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([{
      message: "Enter your GitHub username",
      name: "username",
  }, {
      message: "Enter your fav color",
      name: "color"
  }])
  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/search/users?q=${username}`
    return axios.get(queryUrl) 

  })
  .then((res) => {
      const profileInfo = res.data.items[0]
      console.log(profileInfo)
    })};
  

     //.name somehwere? .JSON?


generateHTML = (res) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="stylesheet" href="stylesheet.css">
  <title>Document</title>
</head>
<body>
  
<div class="jumbotron jumbotron-fluid">
  <div class="container">
  <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <h1 class="display-4">Hi! My name is ${res.login}</h1>
    <img = ${res.avatar_url}>
    <p class="lead">My current location is .</p>
    <p class="lead">I have ${res.repositories} repositories.</p>
    <p class="lead">I have ${res.followers_url} followers.</p>
    <p class="lead">I have ${res.starred_url} GitHub stars.</p>
    <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${res.github}</li>
      <li class="list-group-item">LinkedIn: ${res.linkedin}</li>
      <li class="list-group-item">E-mail: ${res.email}</li>
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
