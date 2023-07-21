const boardContainer = document.querySelector('.GameBoard'); // Using querySelector to select the .GameBoard element
const cells = boardContainer.querySelectorAll('.cube');
const message = document.getElementById('message');

const player = function (marker) {
  return { marker };
};

const gameBoard = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => boardArray;

  const isCellEmpty = (index) => boardArray[index] === '';

  const markCube = (index, marker) => {
    if (isCellEmpty(index)) {
      boardArray[index] = marker;
      return true;
    } else {
      return false;
    }
  };

  const clearBoard = () => {
    boardArray = ['', '', '', '', '', '', '', '', ''];
    cells.forEach((cell) => {
      cell.style.backgroundColor = '';
    });

  };

  return { getBoard, markCube, clearBoard };
})();

const board = document.querySelector('.GameBoard'); // Using querySelector to select the .GameBoard element

const player1 = player('X');
const player2 = player('O');

let currentPlayer = player1; // Initialize currentPlayer
let gameRunnig = true;
board.addEventListener('click', (event) => {
   if (!gameRunnig){
      return;
   }
   else{
  const index = Array.from(board.children).indexOf(event.target);
  console.log('Clicked index:', index);

  if (gameBoard.markCube(index, currentPlayer.marker)) {
    displayController.updateBoard();
    displayController.showResult();
    currentPlayer = currentPlayer === player1 ? player2 : player1; // Switch players
    

  }
}
  
});

const displayController = (() => {


  const updateBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const checkWin = () => {
   const board = gameBoard.getBoard();
   const winPatterns = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6],
   ];
  
   for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameRunnig =false;
        
        cells[a].style.backgroundColor = '#22c55e';
        cells[b].style.backgroundColor = '#22c55e';
        cells[c].style.backgroundColor = '#22c55e';

  
        return true;

        
      }
    }

    return false;
  
};

const checkDraw = () => {
   const board = gameBoard.getBoard();
   return board.every((cell) => cell !== ''); // If all cells are marked, it's a draw
 };

   const showResult= ()=>{
      if(checkWin()){
         message.textContent = `${currentPlayer.marker} wins!`;
         

      }
      else if (checkWin() === false && checkDraw()){
         message.textContent = "It's a draw!";
      }
   }
   

 const clearMessage = () => {
   message.textContent = '';
 };


  return { updateBoard,clearMessage,checkDraw, showResult, checkWin};
})();

const startBtn= document.querySelector("#start");


startBtn.addEventListener('click' , ()=> {
   gameBoard.clearBoard();
   displayController.clearMessage();
   displayController.updateBoard();
   
   gameRunnig = true;
})

const replayBtn= document.querySelector("#replay");
replayBtn.addEventListener('click' , ()=> {

   gameBoard.clearBoard();
   displayController.clearMessage();
   displayController.updateBoard();
   
   gameRunnig = true;
})