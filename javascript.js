

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
    .then(function ({ username, color }) {
      const queryUrl = `https://api.github.com/users/${username}`
      axios.get(queryUrl)

        .then((res) => {
          const queryUrlRepos = `https://api.github.com/users/${username}/repos`
          axios.get(queryUrlRepos)
            .then((repoRes) => {
              const stars = 10
              const profileInfo = { stars, color, ...res.data }
              console.log(queryUrlRepos)
              return profileInfo
            })
            .then(function (res) {
              console.log(res)
              const html = generateHTML(res);

              return writeFileAsync("new-index.html", html);
            })
            .then(function () {
              console.log("Successfully wrote to new-index.html");
            })
            .catch(function (err) {
              console.log(err);
            })

        })


    })

};

//stargazers_count (for stars, go through the repos and adds up all the stars)

//.name somehwere? .JSON?
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

generateHTML = (res) => {
  return `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link rel="stylesheet" href = "stylesheet.css">
      <title>Document</title>
      <style>
         
         .wrapper {
         background-color: ${res.color};
         }
         body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'Cabin', sans-serif;
          }
          main {
          background-color: ${res.color};
          height: auto;
          padding-top: 30px;
          }
          h1, h2, h3, h4, h5, h6 {
          font-family: 'BioRhyme', serif;
          margin: 0;
          }
          h1 {
          font-size: 3em;
          }
          h2 {
          font-size: 2.5em;
          }
          h3 {
          font-size: 2em;
          }
          h4 {
          font-size: 1.5em;
          }
          h5 {
          font-size: 1.3em;
          }
          h6 {
          font-size: 1.2em;
          }
          .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: ${colors[res.color].headerBackground};
          color: ${colors[res.color].headerColor};
          padding: 10px;
          width: 95%;
          border-radius: 6px;
          }
          .photo-header img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: -75px;
          border: 6px solid ${colors[res.color].photoBorderColor};
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
          }
          .photo-header h1, .photo-header h2 {
          width: 100%;
          text-align: center;
          }
          .photo-header h1 {
          margin-top: 10px;
          }
          .links-nav {
          width: 100%;
          text-align: center;
          padding: 20px 0;
          font-size: 1.1em;
          }
          .nav-link {
          display: inline-block;
          margin: 5px 10px;
          }
          .workExp-date {
          font-style: italic;
          font-size: .7em;
          text-align: right;
          margin-top: 10px;
          }
          .container {
          padding: 50px;
          padding-left: 100px;
          padding-right: 100px;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .card {
            padding: 20px;
            border-radius: 6px;
            background-color: ${colors[res.color].headerBackground};
            color: ${colors[res.color].headerColor};
            margin: 20px;
          }
          
          .col {
          flex: 1;
          text-align: center;
          }
          a, a:hover {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
          }
          @media print { 
           body { 
             zoom: .75; 
           } 
          }
         
      </style>
</head>
<body>
  
<div class="jumbotron jumbotron-fluid wrapper">
  <div class="container wrapper">
    <h1 class="display-4">Hi! My name is ${res.name}</h1>
    <img class= "image" src = "${res.avatar_url}">
    <h2> About Me: </h2>
    <p class="lead"> Github Bio: ${res.bio}
    <p class="lead"> My current location is <span><a href = "https://www.google.com/maps/place/${res.location}">${res.location}</a></span></p>
    <p class="lead"> I have ${res.public_repos} repositories.</p>
    <p class="lead"> I have ${res.followers} follower(s).</p>
    <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <div class = contact-me>
    <p class="list-group-item">My GitHub username is <span><a href = "https://github.com/${res.login}">${res.login}</a></span> </p>
    <p class="list-group-item">My portfolio/blog is located here <span><a href = "https://github.com/${res.blog}">${res.blog}</a></span></p>
    </div>
    </div>
</div>
</body>
</html>`
        
}
promptUser()

.catch(function (err) {
  console.log(err);
})


