let emojiSet = [
    '😄', '🐱', '🍎', '🚗', '⚽', '🎁', '🍕', '🐶', '🌸', '🍉', '🎯', '⚡',
    '🐨', '🎮', '📱', '🚀', '🐼', '🎃', '🍔', '🍟', '🦄', '🐍', '🎲', '🍰',
    '🚲', '🍇', '🌻', '🍭', '🍤', '🐢', '🍓', '🚤', '🎤', '🍿', '🎧', '🎵',
    '🐠', '🌳', '🍩', '🎱', '📷', '✈️', '🚤', '🐷', '🐸', '🐙', '🐞', '🐝',
    '🥑', '🍒', '🌶️', '🍋', '🍍', '🍇', '🍉', '🥝', '🍆', '🍄', '🥕', '🥒',
    '🌽', '🍗', '🍖', '🍣', '🍤', '🍦', '🍰', '🍪', '🍩', '🍫', '🍭', '🍡',
    '🍿', '🍕', '🍔', '🍟', '🍝', '🍛', '🍱', '🥡', '🥟', '🍚', '🍜', '🍢'
];

let gameBoard = document.getElementById('gameBoard');
let scoreDisplay = document.getElementById('score');
let score = 0; // Initialize score
let firstTile = null;
let secondTile = null;
let matchedTiles = 0;
let totalTiles = 0;
let isClickable = true;

// Function to start the game with dynamic grid size
function startGame(gridSize) {
    resetGame(); // Reset the game state
    totalTiles = gridSize * gridSize;

    // Adjust the grid based on grid size
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    // Select the correct number of emojis and shuffle them
    let emojis = shuffle([...emojiSet.slice(0, totalTiles / 2), ...emojiSet.slice(0, totalTiles / 2)]);

    // Generate the game board
    emojis.forEach(emoji => {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.emoji = emoji;
        tile.addEventListener('click', handleTileClick);
        gameBoard.appendChild(tile);
    });
}

// Reset the game board and state
function resetGame() {
    gameBoard.innerHTML = ''; // Clear the current board
    firstTile = null;
    secondTile = null;
    matchedTiles = 0;
    score = 0; // Reset the score
    scoreDisplay.textContent = score;
    document.getElementById('status').textContent = ''; // Clear the status message
}

function handleTileClick() {
    if (!isClickable || this.classList.contains('flipped') || firstTile === this) return; // Ignore if not clickable or already flipped

    this.classList.add('flipped');

    if (!firstTile) {
        firstTile = this; // First tile clicked
    } else {
        secondTile = this; // Second tile clicked

        if (firstTile.dataset.emoji === secondTile.dataset.emoji) {
            matchedTiles += 2;
            score += 10; // Add points for a match
            scoreDisplay.textContent = score;
            resetTiles(); // Correct match
            checkWin();
        } else {
            isClickable = false; // Disable clicking while hiding tiles
            setTimeout(() => {
                firstTile.classList.remove('flipped');
                secondTile.classList.remove('flipped');
                resetTiles(); // No match, hide both
                isClickable = true; // Re-enable clicking
            }, 1000);
        }
    }
}

function resetTiles() {
    firstTile = null;
    secondTile = null;
}

function checkWin() {
    if (matchedTiles === totalTiles) {
        document.getElementById('status').textContent = 'You Win!';
    }
}

// Shuffle function for randomizing the emojis
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
