const express = require("express");
const path = require("path");
const { createServer } = require("http");
const morgan = require("morgan");

const { port } = require("./config");
const { Game, Player } = require("./game-state");

const app = express();

const WebSocket = require("ws"); //import websocket module

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public"))); // attempt to match request to static files

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // if matching static file isnt found, this file will be served for all other requests
});

const server = createServer(app);

const wss = new WebSocket.Server({ server }); //create websocket server

let game = null; // this module level global var is how the game will persist across websocket messages

wss.on("connection", (ws) => {
  //listen for connection events
  ws.on("message", (jsonData) => {
    processIncomingMessage(jsonData, ws);
  });

  ws.on('close', () => {
    // If there's a game available...
    if (game !== null) {
      const { player1, player2 } = game;
  
      // If the closed WS belonged to either player 1 or player 2
      // then we need to abort the game.
      if (player1.ws === ws || (player2 !== null && player2.ws === ws)) {
        // If the closed WS doesn't belong to player 1
        // then close their WS, otherwise if there's a
        // player 2 then close their WS.
        if (player1.ws !== ws) {
          player1.ws.close();
        } else if (player2 !== null) {
          player2.ws.close();
        }
        game = null;
      }
    }
  });
});

const broadcastMessage = (type, data, players) => {
  const message = JSON.stringify({
    type,
    data,
  });

  console.log(`Broadcasting message ${message}...`);

  players.forEach((player) => {
    player.ws.send(message, (err) => {
      if (err) {
        // TODO Handle errors.
        console.error(err);
      }
    });
  });
};

const startGame = () => {
  const data = game.getData(); //gets data for current game state
  data.statusMessage = `Select a square ${game.currentPlayer.playerName}!`;
  broadcastMessage('start-game', data, game.getPlayers());
};


const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  const addNewPlayer = (playerName, ws) => {
    const player = new Player(playerName, ws);

    // Check if the game global variable is null
    if (game === null) {
      // Instantiate a new instance of the Game class, passing in the new player as player "1"
      game = new Game(player);

      // Now you have a new game instance with the new player as player "1"
    } else if (game.player2 === null) {
      // If player2 property is null, set it to the instantiated player
      game.player2 = player;
      // Call the startGame function to begin the game
      startGame();
    } else {
      console.log(`Ignoring player ${playerName}...`);
      //close players websocket
      ws.close();
    }
  };

  switch (message.type) {
    case "add-new-player":
      addNewPlayer(message.data.playerName, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
