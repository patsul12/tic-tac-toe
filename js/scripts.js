function Board() {
  this.board = [[0,0,0],
                [0,0,0],
                [0,0,0]];
  this.moveCount = 0;
}

Board.prototype.makeMove = function(player, yCoord, xCoord) {
  this.board[yCoord][xCoord] = player;
  this.moveCount++;
}

Board.prototype.checkWin = function () {
  var horizontalWin = this.checkHorizontal();
  var verticalWin = this.checkVertical();
  var diagonalWin = this.checkDiagonal();
  if (horizontalWin || verticalWin || diagonalWin) {
    return true;
  }
  return false;
};

Board.prototype.checkDraw = function () {
  return this.moveCount === (Math.pow(this.board.length, 2)) && this.checkWin() === false;
}

Board.prototype.checkHorizontal = function () {
  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== 0)
    {
      return true;
    }
  }
  return false;
};

Board.prototype.checkVertical = function () {
  for (var i = 0; i < this.board[0].length; i++) {
    if (this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== 0)
    {
      return true;
    }
  }
  return false;
};

Board.prototype.checkDiagonal = function () {
    if ((this.board[0][0] === this.board[1][1] &&
         this.board[1][1] === this.board[2][2] &&
         this.board[0][0] !== 0) ||
        (this.board[0][2] === this.board[1][1] &&
         this.board[1][1] === this.board[2][0] &&
         this.board[2][0] !== 0))
    {
      return true;
    }
  return false;
};

var showBoard = function(board) {
  $("div.board").empty();
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      $(".board").append("<button id='" + i + j + "' class='tile empty'></button>");
    }
  }
}

$(function() {
  var board = new Board();
  var currentPlayer = 1;
  showBoard(board.board);

  $(".tile").on("click", function() {
    var coordinates = $(this).attr("id").split("");
    var yCoord = coordinates[0];
    var xCoord = coordinates[1];
    board.makeMove(currentPlayer, parseInt(yCoord), parseInt(xCoord));
    $(".tile#" + yCoord + xCoord).addClass("player" + currentPlayer);
    var win = board.checkWin();
    var draw = board.checkDraw();
    if (win === true) {
      alert("Winner!!!!!");
    } else if (draw === true) {
      alert("Its A Draw!!!!!!");
    }
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  })
});
