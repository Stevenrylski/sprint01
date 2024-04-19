const port = 3000,
  http = require("http"),
  httpStatusCodes = require("http-status-codes"),
  router = require("./router"),
  fs = require("fs");

const plainTextContentType = {
  "Content-Type": "text/plain"
};

const htmlContentType = {
  "Content-Type": "text/html"
};

const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
      res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, plainTextContentType);
      res.end("Internal Server Error");
    } else {
      res.end(data);
    }
  });
};

router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer((req, res) => {
  router.handle(req, res); // Assuming router.handle is a function that handles routing logic
}).listen(port);

console.log(`The server is listening on port number: ${port}`);
