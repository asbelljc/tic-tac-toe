let gameboard;

const displayController = (() => {
  const _humanScore = document.querySelector("#human .score");
  const _cpuScore = document.querySelector("computer .score");
  const _squares = document.querySelectorAll(".cell");
  const _board = document.querySelector("#gameboard");

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

  _board.addEventListener("click", () => {
    console.log("[working code]");
  });
  
  return {
    renderCurrentBoard
  }
})();

///////////////////////////////////////////////////////////////////////////////

gameboard = (() => {
  // placeholders keep rows of 'undefined' from 'winning' and simplify code
  let _board = [0,1,2,3,4,5,6,7,8];

  const getBoard = () => _board;

  const getEmptySquares = () => { //
    let emptySquares = [];
    _board.forEach(square => {
      if (typeof square === "number") {
        emptySquares.push(square);
      }
    });
    return emptySquares;
  };

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

  // const placeToken = () => {

  // };

  return {
    getBoard,
    getEmptySquares,
    // placeToken
  };
})();

///////////////////////////////////////////////////////////////////////////////

const Player = (brain) => {
  const _token = ((playerBrain) => {
    return playerBrain === "computer" ? "O" : "X" ;
  })(brain);

  const getToken = () => _token;

  // const play = (field) => {
  //   // Call gameboard.getFields()
  //   // Get the corresponding divs and apply click listeners
  //   // On click, gameboard.setField()
  //   // Remove click listeners
  // };

  return {getToken};
}

///////////////////////////////////////////////////////////////////////////////

// const game = (() => {
//   const _reset = () => {
//     // clear gameboard and await "X" player (human)
//   };

//   const nextTurn = () => {
    
//   };
// })();