let game;

const Player = (name, difficulty) => {
  let score = 0;
  const getScore = () => score;
  const getName = () => name;
  const getDifficulty = () => difficulty;
  const win = () => score++;

  return {
    getScore,
    getName,
    getDifficulty,
    win
  }
};

///////////////////////////////////////////////////////////////////////////////

const display = (() => {
  // menus
  const startMenu = document.getElementById("start-menu");
  const onePlayerMenu = document.getElementById("one-player-menu");
    const slider = document.getElementById("slider");
  const twoPlayerMenu = document.getElementById("two-player-menu");
  // scoreboard
  const scoreboard = document.getElementById("scoreboard");
    const playerOneName = document.querySelector("#player-one .name");
      const playerOneScore = document.querySelector("#player-one .score");
    const playerTwoName = document.querySelector("#player-two .name");
      const playerTwoScore = document.querySelector("#player-two .score");
    const messageBox = document.getElementById("message-box");
      const message = document.getElementById("message");
  // gameboard
  const gameboard = document.getElementById("gameboard");
    const squares = document.getElementsByClassName("cell");
  // new game button
  const newGameBtn = document.getElementById("new-game");

  const renderCurrentBoard = () => {
    let currentBoard = game.getBoard();
    for (let i=0; i<squares.length; i++) {
      if (typeof currentBoard[i] === "number") {
        squares[i].innerText = "";
      } else {
        squares[i].innerText = currentBoard[i];
      }
    }
  };

  function moveSlider(e) {
    slider.className = `slider ${e.target.innerText}`;
  }

  return {
    moveSlider
  }
})();

///////////////////////////////////////////////////////////////////////////////

game = (() => {
  // placeholders keep rows of 'undefined' from 'winning' and simplify code
  let board = [0,1,2,3,4,5,6,7,8];

  const getBoard = () => board;

  

  const _checkForEnd = () => {
    if (
      board[0] === board[1] && board[1] === board[2] || // rows
      board[3] === board[4] && board[4] === board[5] || // .
      board[6] === board[7] && board[7] === board[8] || // .
      board[0] === board[3] && board[3] === board[6] || // columns
      board[1] === board[4] && board[4] === board[7] || // .
      board[2] === board[5] && board[5] === board[8] || // .
      board[0] === board[4] && board[4] === board[8] || // diagonals
      board[2] === board[4] && board[4] === board[6]    // .
    ) { console.log("[working code]") }
  };

  const levels = Array.from(document.getElementsByClassName("level"));
  levels.forEach(button => {
    button.addEventListener("click", e => {
      display.moveSlider(e);
      // setDifficulty();
    });
  });

  return {
    getBoard
  };
})();