
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

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

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== '' || isGameOver) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = 'It\'s a draw!';
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);