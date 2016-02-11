function Board(firstPlayer) {
  this.board = [[0,0,0],
                [0,0,0],
                [0,0,0]];
  this.moveCount = 0;
  this.firstPlayer = firstPlayer;
}

// player move
Board.prototype.makeMove = function(player, yCoord, xCoord) {
  this.board[yCoord][xCoord] = player;
  this.moveCount++;
}

//ai logic starts here
Board.prototype.cpuMove = function () {
  var centerEmpty = this.center();
  var cornerEmpty = this.cornerEmpty();
  var twoInARow = this.twoInARow();
  var yCoord;
  var xCoord;
  if (twoInARow !== false) {
    yCoord = twoInARow[0];
    xCoord = twoInARow[1];
  } else if (centerEmpty) {
    yCoord = 1;
    xCoord = 1;
  } else if (cornerEmpty !== false) {
    yCoord = cornerEmpty[0];
    xCoord = cornerEmpty[1];
  } else {
    var emptySpaces = this.getEmptySpaces();
    var cpuRandomChoice = emptySpaces[Math.floor(Math.random() * (emptySpaces.length-1))]
    yCoord = cpuRandomChoice[0];
    xCoord = cpuRandomChoice[1];
  }
  this.board[yCoord][xCoord] = 2;
  this.moveCount++;
  return [yCoord,xCoord];
};

Board.prototype.twoInARow = function() {
  twoHorizontal = this.twoHorizontal();
  twoVertical = this.twoVertical();
  twoDiagonal = this.twoDiagonal();
  if (twoHorizontal !== false) {
    return twoHorizontal;
  } else if (twoVertical) {
    return twoVertical;
  } else if (twoDiagonal) {
    return twoDiagonal;
  } else {
    return false;
  }
}

Board.prototype.twoHorizontal = function() {
  for(var i = 0; i < this.board.length; i++) {
    if ((this.board[i][0] === this.board[i][1]) && (this.board[i][0] !== 0) && (this.board[i][2] === 0)) {
      return [i, 2];
    } else if ((this.board[i][1] === this.board[i][2]) && (this.board[i][1] !== 0) && (this.board[i][0] === 0)) {
      return [i, 0];
    } else if ((this.board[i][0] === this.board[i][2]) && (this.board[i][0] !== 0) && (this.board[i][1] === 0)) {
      return [i, 1];
    }
  }
  return false;
}

Board.prototype.twoVertical = function() {
  for(var i = 0; i < this.board[0].length; i++) {
    if ((this.board[0][i] === this.board[1][i]) && (this.board[0][i] !== 0) && (this.board[2][i] === 0)) {
      return [2, i];
    } else if ((this.board[1][i] === this.board[2][i]) && (this.board[1][i] !== 0) && (this.board[0][i] === 0)) {
      return [0, i];
    } else if ((this.board[0][i] === this.board[2][i]) && (this.board[0][i] !== 0) && (this.board[1][i] === 0)) {
      return [1, i];
    }
  }
  return false;
}

Board.prototype.twoDiagonal = function() {
  if ((this.board[0][0] === this.board[1][1]) && (this.board[0][0] !== 0) && (this.board[2][2] === 0)) {
    return [2, 2];
  } else if ((this.board[1][1] === this.board[2][2]) && (this.board[1][1] !== 0) && (this.board[0][0] === 0)) {
    return [0, 0];
  } else if ((this.board[0][0] === this.board[2][2]) && (this.board[0][0] !== 0) && (this.board[1][1] === 0)) {
    return [1, 1];
  } else if ((this.board[0][2] === this.board[1][1]) && (this.board[0][2] !== 0) && (this.board[2][0] === 0)) {
    return [2, 0];
  } else if ((this.board[2][0] === this.board[1][1]) && (this.board[2][0] !== 0) && (this.board[0][2] === 0)) {
    return [0, 2];
  } else if ((this.board[2][0] === this.board[0][2]) && (this.board[2][0] !== 0) && (this.board[1][1] === 0)) {
    return [1, 1];
  }
  return false;
}

Board.prototype.center = function() {
  return this.board[1][1] === 0;
}

Board.prototype.cornerEmpty = function() {
  if (this.board[0][0] === 0) {
    return [0,0];
  } else if (this.board[0][2] === 0) {
    return [0,2];
  } else if (this.board[2][0] === 0) {
    return [2,0];
  } else if (this.board[2][2] === 0) {
    return [2,2];
  } else {
    return false;
  }
} //ai logic ends here

// check all win conditions
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
  return this.moveCount === (Math.pow(this.board.length, 2) ) && this.checkWin() === false;
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

Board.prototype.getEmptySpaces = function () {
  var emptySpaceArray = [];
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === 0) {
        emptySpaceArray.push([i,j]);
      }
    }
  }
  return emptySpaceArray;
};

var showBoard = function(board) {
  $(".board").empty();
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      $(".board").append("<button id='" + i + j + "' class='tile empty'></button>");
    }
  }
}

var resetBoard = function() {
  window.location = 'index.html';
}

var checkForAWin = function(board, player) {
  var win = board.checkWin();
  var draw = board.checkDraw();
  if (win === true) {
    alert("Winner!!!!! Player" + player);
    resetBoard();
  } else if (draw === true) {
    alert("Its A Draw!!!!!!");
    resetBoard();
  }
}

var randomPlayer = function () {
  return Math.floor(Math.random() * 2) + 1;
}



$(function() {
  var currentBoard = new Board(randomPlayer());
  var currentPlayer = currentBoard.firstPlayer;
  console.log("first player is " + currentPlayer);
  showBoard(currentBoard.board);

  if (currentPlayer === 2) {
    var coords = currentBoard.cpuMove();
    $(".tile#" + coords[0] + coords[1] ).addClass("player" + currentPlayer);
    $(".tile#" + coords[0] + coords[1] ).attr("disabled", "true");
    currentBoard = checkForAWin(currentBoard, currentPlayer) || currentBoard;
    currentPlayer = 1;
  }

  $(".tile").on("click", function() {
    var coordinates = $(this).attr("id").split("");
    var yCoord = coordinates[0];
    var xCoord = coordinates[1];
    currentBoard.makeMove(currentPlayer, parseInt(yCoord), parseInt(xCoord));
    $(".tile#" + yCoord + xCoord).addClass("player" + currentPlayer);
    $(".tile#" + yCoord + xCoord).attr("disabled", "true");
    currentBoard = checkForAWin(currentBoard, currentPlayer) || currentBoard;

    currentPlayer = 2;
    var coords = currentBoard.cpuMove();
    $(".tile#" + coords[0] + coords[1] ).addClass("player" + currentPlayer);
    $(".tile#" + coords[0] + coords[1] ).attr("disabled", "true");
    currentBoard = checkForAWin(currentBoard, currentPlayer) || currentBoard;
    currentPlayer = 1;
  });
});
