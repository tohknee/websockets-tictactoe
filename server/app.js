const express = require("express");
const path = require("path");
const { createServer } = require("http");
const morgan = require("morgan");

const { port } = require("./config");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public"))); // attempt to match request to static files

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // if matching static file isnt found, this file will be served for all other requests
});

const server = createServer(app);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
