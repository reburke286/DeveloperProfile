const inquirer = require("inquirer");
const fs = require("fs-extra");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
    .prompt([
      {
        type: "rawlist",
        name: "color",
        message: "What is your favorite color?",
        choices: ["blue", "red", "pink", "green"]
      },
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "github",
        message: "Enter your github username"
      }
    ])
    .then(answers => {
      const username = answers.github;

      const queryUrl = `https://api.github.com/users/${username}`;
      return axios.get(queryUrl).then(res => {
        return {
          name: answers.name,
          color: answers.color,
          username: answers.github,
          bio: res.data.bio,
          image: res.data.avatar_url,
          location: res.data.location,
          github: res.data.html_url,
          repos: res.data.public_repos,
          followers: res.data.followers,
          following: res.data.following,
          blog: res.data.blog
        };
      });
    });
}

function generateHTML(data) {
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
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>${data.name}</title>
        <style>
            @page {
              margin: 0;
            }
          *,
          *::after,
          *::before {
          box-sizing: border-box;
          }
          html, body {
          padding: 0;
          margin: 0;
          }
          html, body, .wrapper {
          height: 100%;
          }
          .wrapper {
          background-color: ${colors[data.color].wrapperBackground};
          padding-top: 100px;
          }
          body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'Cabin', sans-serif;
          }
          main {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 30px;
          }
          h1, h2, h3, h4, h5, h6 {
          font-family: 'BioRhyme', serif;
          margin: 0;
          text-align: center;
          }
          h1 {
          font-size: 3em;
          }
          h2 {
          font-size: 2.5em;
          margin-bottom: 10px;
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
          ul#profile li {
            display: inline;
            padding: 0px 70px;
          }
          .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: ${colors[data.color].headerBackground};
          color: ${colors[data.color].headerColor};
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
          border: 6px solid ${colors[data.color].photoBorderColor};
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
          }
          .photo-header h1, .photo-header h2 {
          width: 100%;
          text-align: center;
          }
          .photo-header h1 {
          margin-top: 50px;
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
          margin-top: 17px;
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
            background-color: ${colors[data.color].headerBackground};
            color: ${colors[data.color].headerColor};
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
        <body>
          <div class="container">
          <div class="photo-header">
            <img class="photo-header" src= "${data.image}">
            <h1>Hi!</h1>
            <h2>My name is ${data.name}.</h2>
            <ul id="profile">
                <li><i class="fas fa-location-arrow"></i>
                  ${data.location}</li>
                <li><i class="fab fa-github-alt"></i>
                    <a href="${data.github}">Github</a>
                </li>
                <li> <i class="fas fa-rss"></i>
                    <a href="https://${data.blog}">Blog</a>
                </li>
            </ul>
          </div>
          </div>
          <div class="container">
            <h2>${data.bio}</h2>
            <div class="row">
              <div class="col-sm card">
                <h3>Public Respositories</h3>
                <h4>${data.repos}</h4>
              </div>
              <div class="col-sm card">
                <h3>Followers</h3>
                <h4>${data.followers}</h4>
              </div>
            </div>  
            <div class="row">
                <div class="col-sm card">
                    <h3>Following</h3>
                    <h4>${data.following}</h4>
                </div>
                <div class="col-sm card">
                    <h3>Github Stars</h3>
                    <h4>0</h4>
                </div>
            </div>  
              
          </div>
            
        </body>
        </html>`;
}

promptUser()
  .then(data => {
    console.log(data);
    const html = generateHTML(data);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
