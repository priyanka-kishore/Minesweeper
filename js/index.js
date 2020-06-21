import * as util from './util.js'

const grid = document.getElementById('grid');
let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName('cell');
let gridSize = 0;
let totalBombs = 0;
let bombsRevealed = 0;
let safeCells;
let cellsClicked = 0;

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
        // listen for left clicks
        cell.addEventListener('click', cell.clickHandler = function clickHandler() {
            var row = parseInt(this.getAttribute('data-row'));
            var col = parseInt(this.getAttribute('data-col'));
            revealCell(row, col);

            this.removeEventListener('click', clickHandler);
            this.removeEventListener('contextmenu', cell.flagHandler);
        }, false);

        // listen for right clicks
        cell.addEventListener('contextmenu', cell.flagHandler = function flagHandler(ev) {
            ev.preventDefault();
            
            var row = parseInt(this.getAttribute('data-row'));
            var col = parseInt(this.getAttribute('data-col'));
            util.toggleFlag(row, col);
            
            return false;
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
    totalBombs = numBombs;
    safeCells = cells.length - numBombs;
    console.log("Generating " + numBombs + " bombs...");
   
//    $('#numBombs').innerHTML = 'There are ' + numBombs + ' bombs!'
    document.getElementById('numBombs').innerHTML = 'There are ' + numBombs + ' bombs!';

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

    if (unknownCell.classList.contains('bomb')) {
        unknownCell.innerHTML = '<img src="./assets/bomb.png" alt="Image of bomb"></img>'
        bombsRevealed++;
    } else if (unknownCell.classList.contains('no-bomb') && unknownCell.classList.contains('no-reveal')){
        cellsClicked++;
    }
    
    unknownCell.classList.remove('no-reveal');
    unknownCell.classList.add('reveal');

    checkGameStatus();
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

function checkGameStatus() {
    var count = document.getElementById('count');

    if (bombsRevealed == totalBombs) { // game over
        count.innerHTML = 'GAME OVER :(';
        for (var cell of cells) {
            if (cell.classList.contains('no-reveal')) {
                cell.removeEventListener('click', cell.clickHandler);
                cell.removeEventListener('contextmenu', cell.flagHandler);
            }
        }
    } else if (cellsClicked < safeCells && bombsRevealed < totalBombs) { // still playing
        count.innerHTML = 'Revealed ' + bombsRevealed + '/' + totalBombs;
    } else if (cellsClicked == safeCells && bombsRevealed < totalBombs) {
        count.innerHTML = 'YOU WIN!'

        for (var cell of cells) {
            if (cell.classList.contains('no-reveal')) {
                cell.removeEventListener('click', cell.clickHandler);
                cell.removeEventListener('contextmenu', cell.flagHandler);
            }
        }
    }
}