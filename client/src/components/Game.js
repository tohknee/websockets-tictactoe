import React from "react";
import styles from "./Game.module.css";
import playerX from '../assets/playerX.svg';
import playerO from '../assets/playerO.svg';    
// import { type } from "os"; //this throws error

//subcomponent to render square's image
const SquareImage = ({ value }) => {
    if (value === '') {
      return null;
    } else if (value === 'X') {
      return <img src={playerX} alt='X' />
    } else {
      return <img src={playerO} alt='O' />
    }
  };

const Square = ({ squareIndex, value, row, col,selectSquare }) => {
  const rowStyleName = `row_${row}`;
  const colStyleName = `col_${col}`;

  const handleClick = () => {
    if(typeof onselect==='function'){
        onselect(squareIndex)
    }
    console.log(`Clicked on square index: ${squareIndex}...`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.square} ${styles[rowStyleName]} ${styles[colStyleName]}`}>
        <SquareImage value={value} />
    </div>
  );
};

const Game = ({ playerName, game ,selectGameSquare}) => {
    if (!game) {
        return <h3 className={styles.announcement}>Loading...</h3>;
      }

    const selectSquare=(squareIndex)=>{
        if(!game.gameOver || playerName !== game.currentPlayer.playerName ){
            return;
        }

        selectGameSquare(squareIndex)
    }
  return (
    <div className={styles.game}>
      <div className={styles.players}>
        <div>
          {game.player1Symbol}: {game.player1.playerName}
        </div>
        <div>
          {game.player2Symbol}: {game.player2.playerName}
        </div>
      </div>
      {!game ? (
        <h3 className={styles.announcement}>{game.statusMessage}</h3>
      ) : (
        <div className={styles.tic_tac_toe_board}>
          <Square
            squareIndex={0}
            value={game.squareValues[0]}
            row={1}
            col={1}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={1}
            value={game.squareValues[1]}
            row={1}
            col={2}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={2}
            value={game.squareValues[2]}
            row={1}
            col={3}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={3}
            value={game.squareValues[3]}
            row={2}
            col={1}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={4}
            value={game.squareValues[4]}
            row={2}
            col={2}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={5}
            value={game.squareValues[5]}
            row={2}
            col={3}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={6}
            value={game.squareValues[6]}
            row={3}
            col={1}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={7}
            value={game.squareValues[7]}
            row={3}
            col={2}
            selectSquare={selectSquare}
          />
          <Square
            squareIndex={8}
            value={game.squareValues[8]}
            row={3}
            col={3}
            selectSquare={selectSquare}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
