import React, { useState } from "react";

//errors subcomponent
const ValidationErrors = ({ errors }) => {
  if (errors === null || errors.length === 0) {
    return null;
  }

  return (
    <div>
      <p>Please correct the following errors:</p>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

const Home = ({ updatePlayerName }) => {
  const [playerName, setPlayerName] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errorsToSet = [];
    if (!playerName) {
      errorsToSet.push("Please provide a player name.");
    }
    if (errorsToSet.length) {
      setErrors(errorsToSet);
      return;
    }
    updatePlayerName(playerName);
  };

  const onChange = async (e) => {
    setPlayerName(e.target.value);
  };
  return (
    <div>
      <h2>Welcome!</h2>
      <p>
        Please provide your player name and click the "Play Game" button to
        start a game.
      </p>
      <ValidationErrors errors={errors} />
      <form onSubmit={onSubmit}>
        <input type="text" value={playerName} onChange={onChange} />
        <button>Play Game</button>
      </form>
    </div>
  );
};

export default Home;
