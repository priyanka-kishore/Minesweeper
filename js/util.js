export function getRandomNumber(gridSize) {
    return Math.floor(Math.random() * gridSize) + 1;
}

export function inGrid(row, col, gridSize) {
    return row > 0 && row <= gridSize && col > 0 && col <= gridSize;
}