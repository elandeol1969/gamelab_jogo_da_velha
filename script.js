let board = Array(9).fill(null);
let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let score = {};
let gameActive = false;

const gameBoard = document.getElementById('game-board');
const scoreBoard = document.getElementById('score-board');
const playersInput = document.getElementById('players-input');
const scoreList = document.getElementById('score-list');
const turnIndicator = document.getElementById('turn-indicator');
const cells = document.querySelectorAll('.cell');
const messageArea = document.getElementById('message-area');
const messageText = document.getElementById('message-text');
const closeMessageButton = document.getElementById('close-message-button');



closeMessageButton.addEventListener('click', closeMessage);

function startGame() {
  player1Name = document.getElementById('player1').value.trim() || 'Jogador 1';
    player2Name = document.getElementById('player2').value.trim() || 'Jogador 2';
    if (player1Name && player2Name){

        score[player1Name] = 0;
        score[player2Name] = 0;
        playersInput.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        scoreBoard.classList.remove('hidden');
        updateScoreboard();
        resetBoard();
        gameActive = true;
    }else{
       showMessage("Por favor, insira o nome dos dois jogadores");
    }

}

function resetBoard() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    turnIndicator.textContent = `Vez de ${currentPlayer === 'X' ? player1Name : player2Name}`;
}

function handleCellClick(event) {
    if (!gameActive) return;
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Vez de ${currentPlayer === 'X' ? player1Name : player2Name}`;
}
function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            gameActive = false;
            const winner = board[a];
            const winnerName = winner === 'X' ? player1Name : player2Name;
            score[winnerName]++;
            updateScoreboard();
            showMessage(`${winnerName} venceu!`);
             return;
        }
    }
     if (board.every(cell => cell)) {
          gameActive = false;
           showMessage('Empate!');
     }
}
function updateScoreboard(){
   scoreList.innerHTML = '';
    for(const player in score){
       const li = document.createElement('li');
        li.textContent = `${player}: ${score[player]}`;
         scoreList.appendChild(li);
    }
}
function resetGame() {
    resetBoard();
    gameActive = true;
}
function resetScore(){
    gameBoard.classList.add('hidden');
    scoreBoard.classList.add('hidden');
    playersInput.classList.remove('hidden');
    score = {};
}

function showMessage(message){
    messageArea.classList.remove('hidden');
    messageText.textContent = message;
}
function closeMessage(){
    messageArea.classList.add('hidden');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
