import * as game from './index.js'

// beginner:       10 mines, 8x8, 9x9, 10x10
// intermediate:   40 mines, 13x15 to 16x16
// expert:         99 mines, 16x30

game.createGrid(8);     // param = size of square grid
game.generateBombs(5);  // param = number of bombs hidden in grid

game.addOnclicks();     // add on click feature to each cell
game.setInnerHTMLs();   // set number of surrounding bombs per cell