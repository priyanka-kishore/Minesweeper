import * as util from './util.js'

const grid = document.getElementById('grid');
let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName('cell');


// beginner:       10 mines, 8x8, 9x9, 10x10
// intermediate:   40 mines, 13x15 to 16x16
// expert:         99 mines, 16x30

let gridSize = 0;

function createGrid(size) {
    gridSize = size;

    console.log("calling defaultGrid");
    for (var i = 0; i < gridSize; i++) {
        // create row
        let row = document.createElement('div');
        grid.appendChild(row).className = 'gridRow';

        // create cells in current row
        for (var j = 0; j < gridSize; j++) {
            let newCell = document.createElement('div');
            newCell.innerHTML = '0';
            newCell.className = 'cell no-bomb no-reveal'

            row.appendChild(newCell);
        }
    }
}

createGrid(8);

function placeBombs(numBombs) {
   console.log(gridSize); 

    // randomly place bombs
    for (var i = 0; i < numBombs; i++) {
        let x = getRandomNumber();
        let y = getRandomNumber();
        console.log('placing: ' + '(' + x + ', ' + y + ')');
        
    }

}

function getRandomNumber() {
    return Math.floor(Math.random() * gridSize) + 1;
}

placeBombs(4);
