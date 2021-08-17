let game;

const Player = (name) => {
  let score = 0;
  const getScore = () => score;
  const getName = () => name;
  const win = () => score++;

  return {
    getScore,
    getName,
    win
  };
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
    const squares = document.getElementsByClassName("square");
    const newGameBtn = document.getElementById("new-game");

  const changeScreen = e => {
      // start menu options
    if (e.target.innerText === "1 player") {
      startMenu.classList.add("hidden");
      onePlayerMenu.classList.remove("hidden");
    } else if (e.target.innerText === "2 player") {
      startMenu.classList.add("hidden");
      twoPlayerMenu.classList.remove("hidden");
      // 1- and 2-player options both do the same thing
    } else if (e.target.className === "start") {
      onePlayerMenu.classList.add("hidden");
      playerOneName.innerText === game.playerOne.getName();
      playerOneScore.innerText === 0;
      playerTwoName.innerText === game.playerTwo.getName();
      playerTwoScore.innerText === 0;
      scoreboard.classList.remove("empty");
      gameboard.classList.remove("hidden");
      newGameBtn.classList.remove("hidden");
      // new-game button circles back to start menu
    } else if (e.target.id === "new-game") {
      onePlayerMenu.classList.remove("hidden");
      scoreboard.classList.add("empty");
      gameboard.classList.add("hidden");
      newGameBtn.classList.add("hidden");
    }
  } 

  const renderCurrentBoard = () => {
    let currentBoard = game.getBoard();
    for (let i=0; i<squares.length; i++) {
      if (typeof currentBoard[i] === "number") {
        squares[i].innerText = "";
      } else {
        squares[i].innerText = currentBoard[i];
      }
    }
  }

  const showDifficulty = e => {
    slider.className = `slider ${e.target.innerText}`;
  }

  return {
    changeScreen,
    renderCurrentBoard,
    showDifficulty
  };
})();

///////////////////////////////////////////////////////////////////////////////

game = (() => {
  let mode; // single or multi-player
  let difficulty = "medium"; // establish default diffulty
  let playerOne;
  let playerTwo;

  // integer placeholders keep rows of 'undefined' from 'winning' and simplify code
  let board = [0,1,2,3,4,5,6,7,8];

  const getBoard = () => board;

  const fillSquare = e => {
    board[parseInt(e.target.id)] = mode === "single" ? "X" : "O";
    display.renderCurrentBoard();
  };

  const checkForEnd = () => {
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

  const setMode = (e) => {
    mode = e.target.innerText === "1 player" ? "single" : "multi";
    display.changeScreen(e);
  };

  const setDifficulty = (e) => {
    difficulty = e.target.innerText;
    display.showDifficulty(e);
  };

  return {
    setMode,
    setDifficulty,
    start,
    fillSquare,
    getBoard,
    reset
  };
})();

///////////////////////////////////////////////////////////////////////////////

const controller = (() => {
  // buttons and inputs
  const gameModeButtons = Array.from(document.getElementsByClassName("player-count"));
  const difficultyBtns = Array.from(document.getElementsByClassName("level"));
  const startBtns = Array.from(document.getElementsByClassName("start"));
  const nameInputs = Array.from(document.getElementsByClassName("name-input"));
  const squares = Array.from(document.getElementsByClassName("square"));
  const newGameBtn = document.getElementById("new-game");

  gameModeButtons.forEach(button => button.addEventListener("click", game.setMode));
  difficultyBtns.forEach(button => button.addEventListener("click", game.setDifficulty));
  startBtns.forEach(button => button.addEventListener("click", game.start));
  squares.forEach(square => square.addEventListener("click", game.fillSquare));
  newGameBtn.addEventListener("click", game.reset);

  const getNames = () => nameInputs.map(input => input.innerText);
  const resetNameInputs = () => nameInputs.forEach(input => input.innerText === "");
  
  return {
    getNames,
    resetNameInputs
  };
})();