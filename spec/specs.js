describe('Board', function() {
    it("generate an empty board", function() {
      var testBoard = new Board();
      var emptyBoard = [[0,0,0],
                        [0,0,0],
                        [0,0,0]];
      expect(testBoard.board).to.eql(emptyBoard);
   });

   it("lets a player mark a space", function() {
     var testBoard = new Board();
     var testMove = [[0,0,0],
                     [0,0,0],
                     [0,1,0]];
     testBoard.makeMove(1, 2, 1);
     expect(testBoard.board).to.eql(testMove);
   });

   it("checks horizontal win condition", function() {
     var testBoard = new Board();
     testBoard.makeMove(1, 2, 0);
     testBoard.makeMove(1, 2, 1);
     testBoard.makeMove(1, 2, 2);
     expect(testBoard.checkWin()).to.equal(true);

     var testBoard2 = new Board();
     expect(testBoard2.checkWin()).to.equal(false);
   });

   it("checks vertical win condition", function() {
     var testBoard = new Board();
     testBoard.makeMove(1, 0, 1);
     testBoard.makeMove(1, 1, 1);
     testBoard.makeMove(1, 2, 1);
     expect(testBoard.checkWin()).to.equal(true);

     var testBoard2 = new Board();
     expect(testBoard2.checkWin()).to.equal(false);
   });

   it("checks diagonal win condition", function() {
     var testBoard = new Board();
     testBoard.makeMove(1, 0, 0);
     testBoard.makeMove(1, 1, 1);
     testBoard.makeMove(1, 2, 2);
     var testBoardTwo = new Board();
     testBoardTwo.makeMove(1, 0, 2);
     testBoardTwo.makeMove(1, 1, 1);
     testBoardTwo.makeMove(1, 2, 0);
     expect(testBoard.checkWin()).to.equal(true);
     expect(testBoardTwo.checkWin()).to.equal(true);

     var testBoard2 = new Board();
     expect(testBoard2.checkWin()).to.equal(false);
   });

   it("checks draw condition", function() {
     var testBoard = new Board();
     testBoard.makeMove(1, 0, 0);
     testBoard.makeMove(1, 0, 1);
     testBoard.makeMove(2, 0, 2);
     testBoard.makeMove(2, 1, 0);
     testBoard.makeMove(2, 1, 1);
     testBoard.makeMove(1, 1, 2);
     testBoard.makeMove(1, 2, 0);
     testBoard.makeMove(1, 2, 1);
     testBoard.makeMove(2, 2, 2);
     expect(testBoard.checkDraw()).to.equal(true);

     var testBoard2 = new Board();
     expect(testBoard2.checkWin()).to.equal(false);
   });

});
