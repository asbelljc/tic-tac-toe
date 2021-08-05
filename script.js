let gameboard;

const displayController = (() => {
  const humanScore = document.querySelector("#human .score");
  const cpuScore = document.querySelector("computer .score");
  const squares = document.querySelectorAll(".cell");

  const renderCurrentBoard = () => {
    let currentBoard = gameboard.getBoard();
    for (let i=0; i<_squares.length; i++) {
      if (typeof currentBoard[i] === "number") {
        _squares[i].innerText = "";
      } else {
        _squares[i].innerText = currentBoard[i];
      }
    }
  };
  
})();

///////////////////////////////////////////////////////////////////////////////

gameboard = (() => {
  // placeholders keep rows of 'undefined' from 'winning' and simplify code
  let _board = [0,1,2,3,4,5,6,7,8];

  const getBoard = () => _board;

  

  const _checkForEnd = () => {
    if (
      _board[0] === _board[1] && _board[1] === _board[2] || // rows
      _board[3] === _board[4] && _board[4] === _board[5] || // .
      _board[6] === _board[7] && _board[7] === _board[8] || // .
      _board[0] === _board[3] && _board[3] === _board[6] || // columns
      _board[1] === _board[4] && _board[4] === _board[7] || // .
      _board[2] === _board[5] && _board[5] === _board[8] || // .
      _board[0] === _board[4] && _board[4] === _board[8] || // diagonals
      _board[2] === _board[4] && _board[4] === _board[6]    // .
    ) { console.log("[working code]") }
  };

  return {
    getBoard,
    getEmptySquares,
    placeToken
  };
})();

///////////////////////////////////////////////////////////////////////////////

const Player = (name, difficulty) => {
  let score = 0;
  const getScore = () => score;
  const getName = () => name;
  const getDifficulty = () => difficulty;
  const win = () => score++;
  const resetScore = () => score = 0;

  return {
    getScore,
    getName,
    getDifficulty,
    win,
    resetScore
  }
};

///////////////////////////////////////////////////////////////////////////////

// const game = (() => {
//   const _reset = () => {
//     // clear gameboard and await "X" player (human)
//   };

//   const nextTurn = () => {
    
//   };
// })();