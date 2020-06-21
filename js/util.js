export function getRandomNumber(gridSize) {
    return Math.floor(Math.random() * gridSize) + 1;
}

export function inGrid(row, col, gridSize) {
    return row > 0 && row <= gridSize && col > 0 && col <= gridSize;
}

export function toggleFlag(row, col) {
    let cell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0];
    cell.classList.contains('flag') ? cell.classList.remove('flag') : cell.classList.add('flag');
}