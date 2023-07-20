import React, { useState } from "react";

import Home from "./components/Home";
import Game from "./components/Game";

const App = () => {
  const [playerName, setPlayerName] = useState("");

  const updatePlayerName = (playerName) => {
    setPlayerName(playerName);
  };
  return (
    <div>
      <h1>Tic-Tac-Toe Online</h1>
      {playerName ? (
        <Game playerName={playerName} />
      ) : (
        <Home updatePlayerName={updatePlayerName} />
      )}
    </div>
  );
};

export default App;
