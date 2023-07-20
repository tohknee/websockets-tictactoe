const express = require("express");
const path = require("path");
const { createServer } = require("http");
const morgan = require("morgan");

const { port } = require("./config");

const app = express();

const WebSocket = require("ws"); //import websocket module

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public"))); // attempt to match request to static files

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // if matching static file isnt found, this file will be served for all other requests
});

const server = createServer(app);

const wss = new WebSocket.Server({ server }); //create websocket server

wss.on("connection", (ws) => {
  //listen for connection events
  ws.on("message", (jsonData) => {
    processIncomingMessage(jsonData, ws);
  });

  ws.on("close", () => {
    // TODO Cleanup the player that's associated with this WS.
  });
});

const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  const addNewPlayer = (playerName, ws) => {
    // TODO Handle adding the new player.
  };

  switch (message.type) {
    case 'add-new-player':
      addNewPlayer(message.data.playerName, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
