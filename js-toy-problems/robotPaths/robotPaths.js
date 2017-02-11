/**
 *
 *  A robot located at the top left corner of a 5x5 grid is trying to reach the
 *  bottom right corner. The robot can move either up, down, left, or right,
 *  but cannot visit the same spot twice. How many possible unique paths are
 *  there to the bottom right corner?
 *
 *  make your solution work for a grid of any size.
 *
 */

// A Board class will be useful

var makeBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function(i, j) {
    this[i][j] = !this[i][j];
  };
  board.hasBeenVisited = function(i, j) {
    return Boolean(this[i][j]);
  };
  board.validPosition = function(i, j) {
    let n = board.length;
    let valid = (i >= 0 && i < n) && (j >= 0 && j < n) && !this.hasBeenVisited(i, j);
    // valid && board.togglePiece(i, j);
    return valid;
  };
  board.isEnd = function(i, j) {
    let end = board.length - 1;
    return end === i && end === j;
  }
  return board;
};

var robotPaths = function(n, board, i, j) {
  // Init
  if (!board) {
    board = makeBoard(n);
  }
  if (i === undefined || j === undefined) {
    i = 0;
    j = 0;
  }
  var pathsCount = 0;

  var rec = function(n, board, i, j) {
    board.togglePiece(i, j); // On
    if (board.isEnd(i, j)) {
      // Reached stopping point
      board.togglePiece(i, j); // Off
      pathsCount++;
      return;
    }
    if (board.validPosition(i + 1, j)) {
      // Right
      rec(n, board, i + 1, j);
    }
    if (board.validPosition(i, j + 1)) {
      // Down
      rec(n, board, i, j + 1);
    }
    if (board.validPosition(i - 1, j)) {
      // Left
      rec(n, board, i - 1, j);
    }
    if (board.validPosition(i, j - 1)) {
      // Up
      rec(n, board, i, j - 1);
    }
    // No valid next position
    board.togglePiece(i, j); // Off
    return;
  };
  rec(n, board, i, j);
  return pathsCount;
};

// let n = 3;
// let board = makeBoard(n);
console.log(robotPaths(6));
