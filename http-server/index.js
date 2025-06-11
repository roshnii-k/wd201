const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
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
    
    http.createServer((request, response) => {
      const url = request.url;
      console.log("Requested URL:", url);

      response.writeHead(200, { "Content-Type": "text/html" });

      if (url === "/project" || url === "/project.html") {
        response.write(projectContent);
      }
      else if (url === "/registration" || url === "/registration.html") {
        fs.readFile("registration.html", (err, registration) => {
          if (err) throw err;
          registrationContent = registration;
        });
        response.write(registrationContent);
      }
      else {
        response.write(homeContent);
      }

      response.end();
    }).listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });

  });
});
