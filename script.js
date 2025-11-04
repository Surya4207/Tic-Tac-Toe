const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const overlay = document.getElementById('overlay');
const resultText = document.getElementById('resultText');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let board = Array(9).fill('');

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));
newGameBtn.addEventListener('click', resetGame);

function cellClicked(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || checkWinner()) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`🎉 Player ${currentPlayer} Wins!`);
  } else if (board.every(cell => cell !== '')) {
    showResult("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showResult(message) {
  resultText.textContent = message;
  overlay.style.display = 'flex';
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = "Player X's turn";
  overlay.style.display = 'none';
}

