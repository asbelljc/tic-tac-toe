const gameboard = (() => {
  // placeholders keep rows of 'undefined' from 'winning' and simplify code
  let _board = [ [1,2,3], [4,5,6], [7,8,9] ];
  let _token = "#"; // figure out how to make this X for player / O for CPU
  const _declareResult = () => {
    // something...
    console.log("test");
  };
  const _checkColumns = () => { // this doesn't work
    return _board.every(row => {
      return row[0] === "X" || row[1] === "X" || row[2] === "x" ||
             row[0] === "O" || row[1] === "O" || row[2] === "O"
    });
  }
  const _checkRows = () => { // this doesn't work
    return _board.some(row => row[0] === row[1] && row[1] === row[2]);
  }
  const _checkDiagonals = () => { // this seems to work now but looks... clunky
    return ((_board[0][0] === _board[1][1]) && (_board[1][1] === _board[2][2])) ||
           ((_board[0][2] === _board[1][1]) && (_board[1][1] === _board[2][0]))
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

  return { _board, _checkForEnd, _checkColumns, _checkRows, _checkDiagonals, play };
})();