// Set of emojis for the game
let emojiSet = [
    '😄', '🐱', '🍎', '🚗', '⚽', '🎁', '🍕', '🐶', '🌸', '🍉', '🎯', '⚡',
    '🐨', '🎮', '📱', '🚀', '🐼', '🎃', '🍔', '🍟', '🦄', '🐍', '🎲', '🍰',
    '🚲', '🍇', '🌻', '🍭', '🍤', '🐢', '🍓', '🚤', '🎤', '🍿', '🎧', '🎵',
    '🐠', '🌳', '🍩', '🎱', '📷', '✈️', '🚤', '🐷', '🐸', '🐙', '🐞', '🐝',
    '🥑', '🍒', '🌶️', '🍋', '🍍', '🍇', '🍉', '🥝', '🍆', '🍄', '🥕', '🥒',
    '🌽', '🍗', '🍖', '🍣', '🍤', '🍦', '🍰', '🍪', '🍩', '🍫', '🍭', '🍡',
    '🍿', '🍕', '🍔', '🍟', '🍝', '🍛', '🍱', '🥡', '🥟', '🍚', '🍜', '🍢'
];

// DOM elements for game board, score, and win status
let gameBoard = document.getElementById('gameBoard');
let scoreDisplay = document.getElementById('score');
let winStatus = document.getElementById('winStatus');

// Game state variables
let score = 0; // Initialize score to 0
let firstTile = null; // Track the first tile clicked
let secondTile = null; // Track the second tile clicked
let matchedTiles = 0; // Track the number of matched tiles
let totalTiles = 0; // Total number of tiles for the current game
let isClickable = true; // Control to prevent multiple clicks during tile flipping

// Start the game with 4x4 grid visible by default
window.onload = function() {
    startGame(4);
};

/**
 * Function to start the game based on the selected grid size.
 * @param {number} gridSize - The size of the grid (4x4, 6x6, etc.).
 */
function startGame(gridSize) {
    resetGame(); // Reset the game state and board
    totalTiles = gridSize * gridSize; // Calculate total tiles based on grid size

    // Adjust the grid layout based on the selected size
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    // Shuffle the selected number of emojis for the game
    let emojis = shuffle([...emojiSet.slice(0, totalTiles / 2), ...emojiSet.slice(0, totalTiles / 2)]);

    // Create and display the game tiles
    emojis.forEach(emoji => {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.emoji = emoji; // Store the emoji in the dataset
        tile.addEventListener('click', handleTileClick); // Add click event listener for tile
        gameBoard.appendChild(tile); // Add tile to the game board
    });
}

/**
 * Function to reset the game board and state.
 */
function resetGame() {
    gameBoard.innerHTML = ''; // Clear the current game board
    firstTile = null; // Reset the first tile
    secondTile = null; // Reset the second tile
    matchedTiles = 0; // Reset the matched tiles count
    score = 0; // Reset the score
    scoreDisplay.textContent = score; // Display the updated score
    winStatus.textContent = ''; // Clear the win status message
}

/**
 * Function to handle tile clicks, flipping tiles and checking for matches.
 */
function handleTileClick() {
    // Prevent tile flipping if tiles are in the process of flipping back
    if (!isClickable || this.classList.contains('flipped') || firstTile === this) return;

    // Flip the clicked tile
    this.classList.add('flipped');

    // Check if this is the first or second tile clicked
    if (!firstTile) {
        firstTile = this; // First tile clicked
    } else {
        secondTile = this; // Second tile clicked

        // Check if the emojis of both tiles match
        if (firstTile.dataset.emoji === secondTile.dataset.emoji) {
            matchedTiles += 2; // Increment matched tiles count
            score += 10; // Increase score for a match
            scoreDisplay.textContent = score; // Update the displayed score
            resetTiles(); // Reset firstTile and secondTile variables
            checkWin(); // Check if all tiles are matched and the player has won
        } else {
            // If the tiles don't match, hide them after a brief delay
            isClickable = false; // Disable further clicks until tiles are hidden
            setTimeout(() => {
                firstTile.classList.remove('flipped');
                secondTile.classList.remove('flipped');
                resetTiles(); // Reset firstTile and secondTile variables
                isClickable = true; // Re-enable clicking
            }, 1000); // Delay for tile hiding
        }
    }
}

/**
 * Function to reset the selected tiles (firstTile and secondTile) after checking for a match.
 */
function resetTiles() {
    firstTile = null; // Reset the first tile
    secondTile = null; // Reset the second tile
}

/**
 * Function to check if the player has matched all the tiles and won the game.
 */
function checkWin() {
    if (matchedTiles === totalTiles) {
        winStatus.textContent = 'You Win!'; // Display win message in floating bar
    }
}

/**
 * Function to shuffle an array of emojis.
 * @param {Array} array - The array of emojis to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array; // Return the shuffled array
}
