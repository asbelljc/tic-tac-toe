const gameboard = (() => {
  let _board = [ [], [], [] ];
  let _token = // figure out how to make this X for player / O for CPU
  const _declareResult = () => {
    // something...
  };
  const _checkColumns = () => {
    _board.every(row => {
      return row[0] === "X" || row[1] === "X" || row[2] === "x" ||
             row[0] === "O" || row[1] === "O" || row[2] === "O"
    });
  }
  const _checkRows = () => {
    _board.some(row => row[0] === row[1] && row[1] === row[2]);
  }
  const _checkDiagonals = () => {
    return _board[0][0] === _board[1][1] && _board[1][1] === _board[2][2] ||
           _board[0][2] === _board[1][1] && _board[1][1] === _board[2][0]
  }
  const _checkForEnd = () => {
    if (_checkColumns() || _checkRows() || _checkDiagonals) {
      _declareResult();
    }
  }
  const play = (x, y) => {
    _board[x][y] = _token;
    _checkForEnd();
  };
})();