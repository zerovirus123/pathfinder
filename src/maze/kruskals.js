import {
    checkBounds,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    NUM_ROWS,
    NUM_COLS
} from "../GUI/grid";

import {
    isNodeAWall,
    getNeighborWalls,
    getNodeDOM
}
from "../maze/utils";

function initWalls(grid) {
    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                grid[row][col].isWall = true;
                getNodeDOM(grid[row][col]).className = 'node node-wall';
            }
        }
    }

    return grid;
}


function generateKruskals(grid)
{

    grid = initWalls();

    let MST = [];

}