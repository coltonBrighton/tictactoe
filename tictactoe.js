/* Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/

// variable to track current player
let currentPlayer;
// variable to track player choice
let choice;
// varible to track the game buttons
let btnArray = ['', '', '', '', '', '', '', '', ''];

// varible to determine if game is over
let gameOver = false;

// buttons that determine if you are ❌'s or ⭕'s
document.getElementById('x').addEventListener("click", () => {
    choosePlayer('❌');
})

document.getElementById('o').addEventListener("click", () => {
    choosePlayer('⭕');
})


// function to show who's turn it is
function renderTurn(player) {
    return document.getElementById('turn').textContent = `It's ${player}'s turn`;
}

function hideButtons() {
    return document.getElementById('player-choice').classList.add('collapse');
}

function showGameZoneButtons() {
    return document.getElementById('game-zone').classList.remove('invisible')
}

// display result of game
function displayResult(message) {
    gameOver = true;
    document.getElementById('result').textContent = message;
    document.getElementById('result').classList.remove('invisible')
}

// hide results
function hideResult() {
    return document.getElementById('result').classList.add('invisible');
}

// clear buttons
function clearButtons() {
    for(let i = 1; i <= 9; i++) {
        document.getElementById(`btn-${i}`).textContent = '';
    }
}

// show x's or o's depending on who's turn it is
function renderButton(btnIdx, currentPlayer) {
    return document.getElementById(`btn-${btnIdx}`).textContent = currentPlayer;
}
// function that holds the choice of x's or o's
function choosePlayer(choice) {
    userChoice = choice;
    currentPlayer = '❌' // x goes first
    // render player turn
    renderTurn(currentPlayer);
    // hide butttons for player choice
    hideButtons();
    // unhide game zone buttons
    showGameZoneButtons();
}

// handle player turn
function playerMove(btnIdx){
    if (btnArray[btnIdx - 1] === '' && !gameOver) {
        // find current player
        btnArray[btnIdx - 1] = currentPlayer;
        renderButton(btnIdx, currentPlayer);
        checkWinner();
        switchPlayer();
    }
}

// function to switch which player is currently playing
function switchPlayer() {
    currentPlayer = (currentPlayer === '❌') ? '⭕' : '❌';
    renderTurn(currentPlayer);
}

// function to determine the winner comparing an array pattern a winning array pattern
function checkWinner() {
    // winning combos
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical wins
        [0, 4, 8], [2, 4, 6] // diagonal wins
    ];

    // check for winning pattern to match
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        // check if pattern in btnArray matches a win pattern
        if (btnArray[a] && btnArray[a] === btnArray[b] && btnArray[a] === btnArray[c]) {
            displayResult(`${currentPlayer} wins!`);
            return; // exit the function after a winner is found
        }
    }

    // check for draw
    if (!btnArray.includes('')) {
        displayResult("It's a draw!");
    }
}

// function that resets the game back to default
function resetGame() {
    btnArray = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = '❌';
    renderTurn(currentPlayer);
    hideResult();
    clearButtons();
}

