import React from "react";
import styles from "./Game.module.css";

const Square = ({ squareIndex, row, col }) => {
  const rowStyleName = `row_${row}`;
  const colStyleName = `col_${col}`;

  const handleClick = () => {
    console.log(`Clicked on square index: ${squareIndex}...`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.square} ${styles[rowStyleName]} ${styles[colStyleName]}`}
    >
      {/* TODO Render square "X" or "O" image */}
    </div>
  );
};

const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.players}>
        <div>Player X: {/* TODO Render player 1 name */}</div>
        <div>Player O: {/* TODO Render player 2 name */}</div>
      </div>
      <h3 className={styles.announcement}>TODO</h3>
      <div className={styles.tic_tac_toe_board}>
        <Square squareIndex={0} row={1} col={1} />
        <Square squareIndex={1} row={1} col={2} />
        <Square squareIndex={2} row={1} col={3} />
        <Square squareIndex={3} row={2} col={1} />
        <Square squareIndex={4} row={2} col={2} />
        <Square squareIndex={5} row={2} col={3} />
        <Square squareIndex={6} row={3} col={1} />
        <Square squareIndex={7} row={3} col={2} />
        <Square squareIndex={8} row={3} col={3} />
      </div>
    </div>
  );
};

export default Game;
