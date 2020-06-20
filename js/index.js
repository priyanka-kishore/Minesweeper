const grid = document.getElementById('grid');
let rows = document.getElementsByClassName('gridRow');
let cell = document.getElementsByClassName('cell');

createGrid(15);

function createGrid(size) {
    console.log("calling defaultGrid");
    for (i = 0; i < size; i++) {
        // create row
        let row = document.createElement('div');
        grid.appendChild(row).className = 'gridRow';

        // create cells in current row
        for (j = 0; j < size; j++) {
            let newCell = document.createElement('div');
            row.appendChild(newCell).className = 'cell';
        }
    }
}