import * as util from './util.js'

const grid = document.getElementById('grid');
let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName('cell');
let gridSize = 0;

// ---------------------------------------------------

// beginner:       10 mines, 8x8, 9x9, 10x10
// intermediate:   40 mines, 13x15 to 16x16
// expert:         99 mines, 16x30

export function createGrid(size) {
    console.log("Creating grid...")
    gridSize = size;

    for (var i = 0; i < gridSize; i++) {
        // create row
        let currRow = document.createElement('div');
        grid.appendChild(currRow).className = 'gridRow';

        // create cells in current row
        for (var j = 0; j < gridSize; j++) {
            let newCell = document.createElement('div');
            
            // '0' = empty, 'n' = num of surrounding bombs, 'B' = bomb
            newCell.innerHTML = '0';

            // classes = cell, no-bomb/bomb, no-reveal/reveal
            newCell.className = 'cell no-bomb no-reveal'

            // set attr to easily identify location of cell
            newCell.setAttribute('data-col', j + 1);
            newCell.setAttribute('data-row', i + 1);
            
            currRow.appendChild(newCell);

            // add event to click
            // newCell.addEventListener('click', revealCell(i + 1, j + 1), false);
        }
    }
}

export function addOnclicks() {
    for (var cell of cells) {
        cell.addEventListener('click', function() {
            var row = parseInt(this.getAttribute('data-row'));
            var col = parseInt(this.getAttribute('data-col'));
            revealCell(row, col);
        }, false);
    }
}

// ----------------- BOMB FUNCTIONALITY -----------------

export function generateBombs(numBombs) {
   console.log("Generating " + numBombs + " bombs..."); 

    // randomly place bombs
    for (var i = 0; i < numBombs; i++) {
        let row = util.getRandomNumber(gridSize); // col (left, right)
        let col = util.getRandomNumber(gridSize); // row (up, down)

        placeBomb(row, col);
    }
}

function placeBomb(row, col) {
    console.log('Placing: ' + '(col: ' + col + ', row: ' + row + ')');
    let bombCell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0];
    
    if (bombCell.classList.contains('no-bomb')) {
        bombCell.classList.remove('no-bomb');
        bombCell.classList.add('bomb');
        // revealBomb(row, col);
    }
}

// ----------------- REVEAL FUNCTIONALITY -----------------

/**
 * Reveal cell dependent on if it's a bomb or clear by changing classes
 * 
 * @param {number} row  Number of row from top
 * @param {number} col  Number of col from left 
 */
function revealCell(row, col) {
    let unknownCell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0];

    unknownCell.classList.remove('no-reveal');
    unknownCell.classList.add('reveal');

    if (unknownCell.classList.contains('bomb')) {
        unknownCell.innerHTML = '<img src="/assets/bomb.svg" alt="Image of bomb"></img>'
    }
}

/**
 * Determine number of bombs surrounding the cell with given parameters.
 * 
 * @param {number} row  Number of row from top
 * @param {number} col  Number of col from left
 */
function getSurroundingMines(row, col) {
    let numMines = 0;
    const coords = [[-1,-1], [-1,0], [-1,1],
                    [0,-1],          [0,1],
                    [1,-1], [1,0], [1,1]];
    let bombCell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0]; 

    for (var check of coords) {
        let cell = $(".cell[data-row='" + check[0] +"'][data-col='" + check[1] +"']")[0];

        if (!cell.classList.contains('bomb')) {

        }
    }
    
    return ':)'
}