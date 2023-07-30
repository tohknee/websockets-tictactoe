//import hooks from react, useEffect adds code to function components that trigger side effects
//useRef stores a reference to an object that will persist for the lifetime of the component
//useState hook declares the state variable
import React, { useState, useEffect, useRef } from 'react';
import Home from "./components/Home";
import Game from "./components/Game";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [game, setGame] = useState(null); 

  const webSocket = useRef(null);

  useEffect(() => {
    if (!playerName){ // dont make sense to make a websocket if no playername value
      return
    }
    const ws = new WebSocket(process.env.REACT_APP_WS_URL); //pass Websocket server url as env variable

    const sendMessage=(type,data)=> {
      const message = {
        type,
        data,
      }
      const jsonMessage = JSON.stringify(message)
      console.log("Sending message:",jsonMessage)
      ws.send(jsonMessage)
    }
    //websocket.current objects provides four events:open connection, message recieved, error, connection closed. can be replaced with addEventListene
    //onopen event listener
    ws.onopen = () => {
      sendMessage('add-new-player', { playerName });
    };
    
    //event listener
    ws.onmessage = (e) => {
      console.log(`Processing incoming message ${e.data}...`); 
    
      const message = JSON.parse(e.data);
    
      switch (message.type) { //hhandle start-game message type
        case 'start-game':
          setGame(message.data); // updating game state variable will trigger react rerender in the game component
          break;
        default:
          throw new Error(`Unknown message type: ${message.type}`);
      }
    };
    
    //event listener
    ws.onerror = (e) => {
      console.error(e);
    };
    //event listener for close. this will reset the ref object and revert state variables and send user back to the initial application state
    ws.onclose = (e) => {
      console.log(`Connection closed: ${e}`);
      webSocket.current = null;
      setPlayerName('');
      setGame(null);
    };
    webSocket.current={ //set webSockets's ref object current property to ojbect literally instead of directly 
      ws,
      sendMessage,
    }
    //clean up function called before effect so previous effect execution is cleaned up. closes connection to the server
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.ws.close();
      }
    };
  },[playerName]);
  

  const updatePlayerName = (playerName) => {
    setPlayerName(playerName);
  };

  const selectGameSquare = (squareIndex)=>{
    if(!game || game.gameOver || playerName !== game.currentPlayer.playerName){
      return;
    }
    webSocket.current.sendMessage('select-game-square', {squareIndex})
  }
  return (
    <div>
      <h1>Tic-Tac-Toe Online</h1>
      {playerName ? (
        <Game playerName={playerName} selectGameSquare={selectGameSquare} game={game} />
      ) : (
        <Home updatePlayerName={updatePlayerName} />
      )}
    </div>
  );
};

export default App;
