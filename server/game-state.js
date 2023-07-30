//track connected players
class Player {
    constructor(playerName, ws) {
      this.playerName = playerName;
      this.ws = ws;
    }
  
    getData() {
      return {
        playerName: this.playerName,
      };
    }
  }

  //takes care of logic and state for tic tac toe
  class Game {
    constructor(player1) {
      this.player1 = player1;
      this.player2 = null;
      this.player1Symbol = 'X';
      this.player2Symbol = 'O';
      this.currentPlayer = player1;
      this.squareValues = ['', '', '', '', '', '', '', '', ''];
      this.gameOver = false;
      this.winner = null;
      this.statusMessage = null;
    }
  
    getPlayers() {
      return [this.player1, this.player2];
    }
    //getData method gets data for the game when creating WebSocket messages
    getData() {
      return {
        player1: this.player1.getData(),
        player2: this.player2.getData(),
        player1Symbol: this.player1Symbol,
        player2Symbol: this.player2Symbol,
        currentPlayer: this.currentPlayer.getData(),
        squareValues: this.squareValues,
        gameOver: this.gameOver,
        winner: this.winner ? this.winner.getData() : null,
        statusMessage: this.statusMessage,
      };
    }
  }

  module.exports = {
    Game,
    Player,
  };