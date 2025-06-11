const http = require("http");
const fs = require("fs");
const minimist = require('minimist');
const args = minimist(process.argv.slice(1));

const port = parseInt(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";


fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  homeContent = home;

  fs.readFile("project.html", (err, project) => {
    if (err) throw err;
    projectContent = project;

    fs.readFile("registration.html", (err, registration) => {
      if (err) throw err;
      registrationContent = registration;

      http
        .createServer((request, response) => {
          let url = request.url;
          response.writeHead(200, { "Content-Type": "text/html" });

          switch (url) {
            case "/project":
              response.write(projectContent);
              break;
            case "/project/registration":
              response.write(registrationContent);
              break;

            default:
              response.write(homeContent);
          }
          response.end();
        })
        .listen(port, () => {
          console.log("Server running at http://localhost:${port}/");
        });
    });
  });
});