// TODO:
//   [ ] remove square event listeners so can't mark during win animation(?) might be ok...
//   [x] make visual turn indicator
//   [ ] START AT BEGINNING OF GAME PROCESS and code each step before going to next

let game;
let controller;
let playerOne;
let playerTwo;

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
  const playerOneTurn = document.querySelector("#player-one .turn");
  const playerOneName = document.querySelector("#player-one .name");
  const playerOneScore = document.querySelector("#player-one .score");
  const playerTwoTurn = document.querySelector("#player-two .turn")
  const playerTwoName = document.querySelector("#player-two .name");
  const playerTwoScore = document.querySelector("#player-two .score");
  const messageBox = document.getElementById("message-box");
  const message = document.getElementById("message");
  const arrow = document.createElement("img"); // used as turn indicator
    arrow.src = "Images/down-arrow.svg";
  // gameboard
  const gameboard = document.getElementById("gameboard");
  const squares = document.getElementsByClassName("square");
  const newGameBtn = document.getElementById("new-game");

  const updateScores = () => {
    playerOneScore.innerText = playerOne.getScore();
    playerTwoScore.innerText = playerTwo.getScore();
  };

  const updateNames = () => {
    playerOneName.innerText = playerOne.getName();
    playerTwoName.innerText = playerTwo.getName();
  };

  const showStartingTurn = () => {
    // if one player is supposed to start but the other has the turn indicator, swap them
    if (game.doesPlayerOneStart() && playerTwoTurn.firstElementChild) {
      playerTwoTurn.removeChild(playerTwoTurn.firstElementChild);
      playerOneTurn.appendChild(arrow);
    } else if (!game.doesPlayerOneStart() && playerOneTurn.firstElementChild) {
      playerOneTurn.removeChild(playerOneTurn.firstElementChild);
      playerTwoTurn.appendChild(arrow);
    }
  };

  const changeTurn = () => {
    if (playerOneTurn.firstElementChild) {
      playerOneTurn.removeChild(playerOneTurn.firstElementChild);
      playerTwoTurn.appendChild(arrow);
    } else {
      playerTwoTurn.removeChild(playerTwoTurn.firstElementChild);
      playerOneTurn.appendChild(arrow);
    }
  };

  const renderCurrentBoard = () => {
    let currentBoard = game.getBoard();
    for (let i = 0; i < squares.length; i++) {
      if (typeof currentBoard[i] === "number") {
        squares[i].innerText = "";
      } else {
        squares[i].innerText = currentBoard[i];
      }
    }
  };

  const showWin = (winningSquares, winner) => {
    winningSquares.forEach(square => {
      squares[square].classList.add("win");
    });
    message.innerText = `${winner.toUpperCase()} WINS!`;
    messageBox.classList.remove("empty");
  };

  const showDraw = () => {
    message.innerText = "DRAW!";
    messageBox.classList.remove("empty");
  };

  const stopWinAnimation = () => {
    Array.from(squares).forEach(square => {
      square.classList.remove("win");
    });
    messageBox.classList.add("empty");
  };

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
      twoPlayerMenu.classList.add("hidden");
      stopWinAnimation();
      showStartingTurn();
      updateNames();
      updateScores();
      renderCurrentBoard();
      scoreboard.classList.remove("empty");
      gameboard.classList.remove("hidden");
      newGameBtn.classList.remove("hidden");
    } else if (e.detail === "nextRound") {
      stopWinAnimation();
      updateScores();
      showStartingTurn();
      renderCurrentBoard();
      // new-game button circles back to start menu
    } else if (e.detail.button === "new-game") {
      startMenu.classList.remove("hidden");
      scoreboard.classList.add("empty");
      gameboard.classList.add("hidden");
      newGameBtn.classList.add("hidden");
    }
  };

  const setDifficulty = e => {
    slider.className = `slider ${e.detail.difficulty}`;
  };

  return {
    changeScreen,
    setDifficulty,
    renderCurrentBoard,
    changeTurn,
    showWin,
    showDraw
  };
})();

///////////////////////////////////////////////////////////////////////////////

game = (() => {
  let mode; // single or multi-player
  let difficulty = "medium"; // establish default diffulty
  let turn = "X"; // used to make sure x is the first mark in every game
  let playerOneStarts; // used to alternate who plays first

  // integer placeholders keep rows of 'undefined' from 'winning' and simplify code
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // need getter function for display to properly read this value
  const doesPlayerOneStart = () => playerOneStarts;

  const getBoard = () => board;
  // needs argument for use in minimax function
  const getFreeSquares = (board) => {
    return board.filter(square => typeof square === "number");
  };

  const resetBoard = () => {
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

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
  // needs argument for use in minimax function
  const isWin = (board) => {
    return winLines.some(line => {
      return line.every(square => board[square] === board[line[0]]);
    });
  };
  // needs argument for use in minimax function
  const getWinningSquares = (board) => {
    let winningSquares = [];
    // for each possible win line...
    winLines.forEach(line => {
      // ...if every corresponding square on the board has the same mark...
      if (line.every(square => board[square] === board[line[0]])) {
        // ...collect those winning squares.
        line.forEach(square => {
          if (!winningSquares.includes(square)) { // ignore squares already collected,
            winningSquares.push(square);         // implying a double-line win
          }
        });
      }
    });
    return winningSquares;
  };

  const fillSquare = e => {
    // check if square is empty before filling
    if (getFreeSquares(board).includes(parseInt(e.detail.square))) {
      board[parseInt(e.detail.square)] = turn;
      display.renderCurrentBoard();
      processTurn();
    }
  };

  const processTurn = () => {
    // If there was a win...
    if (isWin(board)) {
      controller.clickToContinue();
      // ...announce it and give a point to the appropriate player.
      if (playerOneStarts && turn === "X" || !playerOneStarts && turn === "O") {
        playerOne.win();
        display.showWin(getWinningSquares(board), playerOne.getName());
      } else {
        playerTwo.win();
        display.showWin(getWinningSquares(board), playerTwo.getName());
      } // If there was no win and all squares are filled...
    } else if (board.every(square => typeof square === "string")) {
      controller.clickToContinue();
      display.showDraw(); // ...announce a tie.
    } else { // If there was no win and empty squares remain...
      turn = turn === "X" ? "O" : "X";
      display.changeTurn(); // ...just change turns.
    }
  };

  const setMode = e => {
    mode = e.detail.mode === "1 player" ? "single" : "multi";
    display.changeScreen(e);
  };

  const setDifficulty = e => {
    difficulty = e.detail.difficulty;
    display.setDifficulty(e);
  };

  const createPlayers = (names) => {
    if (mode === "single") {
      playerOne = Player(names[0] || "Player");
      playerTwo = Player("CPU");
    } else {
      playerOne = Player(names[1] || "Player 1");
      playerTwo = Player(names[2] || "Player 2");
    }
  };

  const start = e => {
    turn = "X";
    playerOneStarts = true;
    resetBoard();
    createPlayers(controller.getNames());
    display.changeScreen(e);
  };

  const nextRound = e => {
    turn = "X";
    playerOneStarts = !playerOneStarts;
    resetBoard();
    display.changeScreen(e);
  };

  const reset = e => {
    display.changeScreen(e);
  };

  const getHumanMark = () => {
    return playerOneStarts ? "X" : "O";
  };

  const getCpuMark = () => {
    return playerOneStarts ? "O" : "X";
  };

  const minimax = (newBoard, mark) => {
    const freeSquares = getFreeSquares(newBoard);
    const humanMark = getHumanMark();
    const cpuMark = getCpuMark();

    // For each possible move, if there is a win for the cpu, score is positive
    if (isWin(newBoard) && getWinningSquares(newBoard)[0] === cpuMark) {
      return { score: 1 };
      // If there's a win for the human, score is negative
    } else if (isWin(newBoard)) {
      return { score: -1 };
      // If there is no win and no free spaces left, score is neutral
    } else if (freeSquares.length === 0) {
      return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < freeSquares.length; i++) {
      let move = {};
      move.index = newBoard[freeSquares[i]];

      newBoard[freeSquares[i]] = mark;

      if (mark === cpuMark) {
        let result = minimax(newBoard, humanMark);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, cpuMark);
        move.score = result.score;
      }

      newBoard[freeSquares[i]] = move.index;

      moves.push(move);
    }

    let bestMove;

    if (mark === cpuMark) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  document.addEventListener("setMode", setMode);
  document.addEventListener("setDifficulty", setDifficulty);
  document.addEventListener("start", start);
  document.addEventListener("fillSquare", fillSquare);
  document.addEventListener("nextRound", nextRound);
  document.addEventListener("reset", reset);

  return {
    getBoard,
    processTurn,
    doesPlayerOneStart,
    minimax,
    getHumanMark,
    getCpuMark
  };
})();

///////////////////////////////////////////////////////////////////////////////

controller = (() => {
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

  newGameBtn.addEventListener("click", e => {
    document.dispatchEvent(
      new CustomEvent("reset", { detail: { button: e.target.id } })
    );
    // clear previously entered names before next round
    nameInputs.forEach(input => input.value = "");
  });

  const fillSquare = e => {
    document.dispatchEvent(
      new CustomEvent("fillSquare", { detail: { square: e.target.id } })
    )
    e.stopPropagation(); // prevents click from being caught by temporary
  };                     // 'clickToContinue' event listener

  const addSquareListeners = () => {
    squares.forEach(square => square.addEventListener("click", fillSquare));
  };

  const removeSquareListeners = () => {
    squares.forEach(square => square.removeEventListener("click", fillSquare));
  };

  const clickToContinue = () => {
    const nextRound = e => {
      // tell the game module to start the next round
      document.dispatchEvent(
        new CustomEvent("nextRound", { detail: "nextRound" })
      );
      // then stop listening for nextRound and listen for fillSquare again
      document.removeEventListener("click", nextRound);
      e.stopPropagation();
      addSquareListeners();
    };
    removeSquareListeners(); // need to disallow fillSquare while showing round win
    document.addEventListener("click", nextRound);
  };

  const getNames = () => nameInputs.map(input => input.value);

  addSquareListeners();

  return {
    getNames,
    clickToContinue,
    squares
  };
})();