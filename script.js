const cells = document.querySelectorAll(".cell");
const statusTexts = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCondition = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();
function initializeGame(){
      cells.forEach(cell => cell.addEventListener("click",cellClicked));
      restartBtn.addEventListener("click",restartGame);
      statusTexts.textContent = `${currentPlayer}'s turn`;
      running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index){
     options[index] = currentPlayer;
     cell.textContent = currentPlayer;
}

function changeplayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusTexts.textContent = `${currentPlayer}'s turn`;
  statusTexts.style.color = "rgba(144, 81, 42, 0.918)";
}

function checkWinner(){
     let roundWon = false;

     for(let i = 0;i < winCondition.length;i++){
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon=true;
            break;
        }
     }
     if(roundWon){
        statusTexts.textContent = `${currentPlayer} wins!`;
        running = false;
     }
     else if(!options.includes("")){
        statusTexts.textContent = `Draw!`;
     }
     else{
        changeplayer();
     }
}

function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusTexts.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}