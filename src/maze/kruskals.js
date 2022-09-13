import {
    checkBounds,
    invertNodes,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    NUM_ROWS,
    NUM_COLS
} from "../GUI/grid";

import {
    getNeighborWalls,
    initWalls,
    isNodeAWall,
    openPathForStartAndFinishNodes,
    tearDownWall,
}
from "../maze/utils";

import { makeSet, 
         find, 
         union } 
from "./disjoint-set";

export function generateKruskals(grid)
{
    grid = initWalls(grid);
    let MST = {};
    for(let i = 0; i < NUM_ROWS; i++)
    {
        for(let j = 0; j < NUM_COLS; j++)
        {
            let node = grid[i][j];

            if(!node.isStart && !node.isFinish)
            {
                let entry = makeSet();
                entry.data = node;
                MST[[i, j]] = entry;
            }
        }
    }

    while(Object.keys(MST).length > 0)
    {
        let keys = Object.keys(MST);
        let nodeKey = keys[Math.floor(Math.random() * keys.length)];
        let nodeSet = MST[nodeKey];
        let node = nodeSet.data;
    
        let neighbors = getNeighborWalls(grid, node);

        if (neighbors.length > 0){
            let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            let neighborNodeset = MST[[neighbor.row, neighbor.col]];
            if (neighborNodeset !== undefined)
            {
                if (find(nodeSet) !== find(neighborNodeset)) tearDownWall(neighborNodeset.data);
                union(nodeSet, neighborNodeset);
            }
        }

        delete MST[nodeKey];
    }
    
    grid = invertNodes(grid);
    openPathForStartAndFinishNodes(grid);

    return grid;
}