import * as game from './index.js'

game.createGrid(8);     // param = size of square grid
game.generateBombs(4);  // param = number of bombs hidden in grid

game.addOnclicks();     // add on click feature to each cell