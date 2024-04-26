const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const gameModeSelect = document.getElementById('gameMode');
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'human';  // Default mode

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}


function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

//for vs human
function placeMark(cell, player) {
    if (cell.textContent === '' && isGameActive) {
        cell.textContent = player;
        if (checkWin(player)) {
            alert(`Player ${player} wins!`);
            isGameActive = false;
            return;
        }
        if (checkDraw()) {
            alert('Draw!');
            isGameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'computer' && currentPlayer === 'O') {
            computerMove();
        }
    }
}

//for vs computer
function computerMove() {
    const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        placeMark(randomCell, 'O');
    }
}

//iterate on all cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameMode === 'computer' && currentPlayer === 'O') return;
        placeMark(cell, currentPlayer);
    });
});


restartButton.addEventListener('click', () => {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
});

gameModeSelect.addEventListener('change', (e) => {
    gameMode = e.target.value;
    restartButton.click();  
});
