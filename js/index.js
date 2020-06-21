import * as util from './util.js'

const grid = document.getElementById('grid');
let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName('cell');
let gridSize = 0;

// ---------------------------------------------------
/* TODO:
    [ ] show stats
    [ ] show how many bombs left
    [ ] recursive reveal when click cell with '0' surrounding
    [ ] enable flags for suspected bombs
*/
// ---------------------------------------------------

export function createGrid(size) {
    console.log("Creating grid...")
    gridSize = size;

    for (var i = 1; i <= gridSize; i++) {
        // create row
        let currRow = document.createElement('div');
        grid.appendChild(currRow).className = 'gridRow';

        // create cells in current row
        for (var j = 1; j <= gridSize; j++) {
            let newCell = document.createElement('div');
            
            // classes = cell, no-bomb/bomb, no-reveal/reveal
            newCell.className = 'cell no-bomb no-reveal'

            // set attr to easily identify location of cell
            newCell.setAttribute('data-col', j);
            newCell.setAttribute('data-row', i);
            
            currRow.appendChild(newCell);
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

export function setInnerHTMLs() {
    for (var cell of cells) {
        var row = cell.getAttribute('data-row');
        var col = cell.getAttribute('data-col');
        cell.innerHTML = getNumMines(row, col);
    }
}
// ----------------- BOMB FUNCTIONALITY -----------------

export function generateBombs(numBombs) {
   console.log("Generating " + numBombs + " bombs...");

    // randomly place bombs
    for (var i = 0; i < numBombs; i++) {
        let x = util.getRandomNumber(gridSize);
        let y = util.getRandomNumber(gridSize);

        // avoid duplicate bombs
        !$(".cell[data-row='" + x +"'][data-col='" + y +"']")[0].classList.contains('bomb') ? placeBomb(x, y) : i--;
    }
}

function placeBomb(row, col) {
    console.log('Placing: ' + '(col: ' + col + ', row: ' + row + ')');
    let bombCell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0];
    
    if (bombCell.classList.contains('no-bomb')) {
        bombCell.classList.remove('no-bomb');
        bombCell.classList.add('bomb');
    }
}

// ----------------- REVEAL FUNCTIONALITY -----------------

// Reveal cell dependent on if it's a bomb or clear by changing classes
function revealCell(row, col) {
    let unknownCell = $(".cell[data-row='" + row +"'][data-col='" + col +"']")[0];

    unknownCell.classList.remove('no-reveal');
    unknownCell.classList.add('reveal');

    if (unknownCell.classList.contains('bomb')) {
        unknownCell.innerHTML = '<img src="/assets/bomb.svg" alt="Image of bomb"></img>'
    }
}

// Determine number of bombs surrounding the cell with given parameters.
function getNumMines(row, col) {
    let total = 0;
    const coordinates = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1], [1,0], [1,1]];

    for (var coord of coordinates) {
        let newRow = coord[0] + parseInt(row);
        let newCol = coord[1] + parseInt(col);

        if (util.inGrid(newRow, newCol, gridSize)) {
            let curr = $(".cell[data-row='" + newRow +"'][data-col='" + newCol +"']")[0];
            if (curr.classList.contains('bomb')) total += 1;
        }
    }

    return total;
}