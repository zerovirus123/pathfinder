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
    getNeighborWalls,
    getNodeDOM,
    initWalls,
    isNodeAWall,
}
from "../maze/utils";

export function generateKruskals(grid)
{

    grid = initWalls(grid);

    let MST = [];

    

}