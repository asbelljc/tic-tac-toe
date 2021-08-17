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
    if (e.detail.mode === "1 player") {
      startMenu.classList.add("hidden");
      onePlayerMenu.classList.remove("hidden");
    } else if (e.detail.mode === "2 player") {
      startMenu.classList.add("hidden");
      twoPlayerMenu.classList.remove("hidden");
      // 1- and 2-player options both do the same thing
    } else if (e.detail.button === "start") {
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
    for (let i = 0; i < squares.length; i++) {
      if (typeof currentBoard[i] === "number") {
        squares[i].innerText = "";
      } else {
        squares[i].innerText = currentBoard[i];
      }
    }
  }

  const showDifficulty = e => {
    slider.className = `slider ${e.detail.difficulty}`;
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
  let turn = 1;
  let playerOne;
  let playerTwo;

  // integer placeholders keep rows of 'undefined' from 'winning' and simplify code
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const winLines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
  ];

  const getBoard = () => board;

  const fillSquare = e => {
    // check if square is empty before 
    if (typeof board[parseInt(e.detail.square)] === "number") {
      // odd turns should always mark X (because X starts in tic-tac-toe)
      board[parseInt(e.detail.square)] = turn % 2 === 1 ? "X" : "O";
      display.renderCurrentBoard();
      checkForEnd();
      turn++;
    }
  };

  const checkForEnd = () => {
    const isWin = winLines.some(winLine => {
      
    });
  };

  const setMode = e => {
    mode = e.detail.mode === "1 player" ? "single" : "multi";
    display.changeScreen(e);
  };

  const setDifficulty = e => {
    difficulty = e.detail.difficulty;
    display.showDifficulty(e);
  };

  const start = e => {
    turn = 1;
    display.changeScreen(e);
  };

  document.addEventListener("setDifficulty", setDifficulty);

  return {
    getBoard
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

  // convert clicks to custom events for the game module to catch

  gameModeButtons.forEach(button => button.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("setMode", { detail: { mode: e.target.innerText } })
    );
  }));

  difficultyBtns.forEach(button => button.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("setDifficulty", { detail: { difficulty: e.target.innerText } })
    );
  }));

  startBtns.forEach(button => button.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("start", { detail: { button: e.target.className } })
    );
  }));

  squares.forEach(square => square.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("fillSquare", { detail: { square: e.target.id } })
    )
  }));

  newGameBtn.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("reset", { detail: { button: e.target.id } })
    );
  });

  const getNames = () => nameInputs.map(input => input.innerText);
  const resetNameInputs = () => nameInputs.forEach(input => input.innerText === "");

  return {
    getNames,
    resetNameInputs
  };
})();