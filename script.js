const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes(null) ? null : 'T'; // 'T' for tie
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        status.textContent = winner === 'T' ? 'It\'s a Tie!' : `Player ${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
