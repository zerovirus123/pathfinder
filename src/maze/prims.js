import {
invertNodes,
isPositionWithinBounds,
START_NODE_ROW,
START_NODE_COL,
} from "../GUI/grid";

import {getNeighborWalls,
       initWalls,
       isNodeAWall,
       openPathForStartAndFinishNodes,
       tearDownWall}
from "../maze/utils";

function getFrontiers(grid, node)
{
    let frontiers = [];

    if(isPositionWithinBounds(node.row, node.col - 2))
    {
        let leftNeighbor = grid[node.row][node.col - 2];
        if (isNodeAWall(leftNeighbor)) frontiers.push(leftNeighbor);
    }
    
    if (isPositionWithinBounds(node.row, node.col + 2))
    {
        let rightNeighbor = grid[node.row][node.col + 2];
        if (isNodeAWall(rightNeighbor)) frontiers.push(rightNeighbor);
    }

    if (isPositionWithinBounds(node.row - 2, node.col))
    {
        let topNeighbor = grid[node.row - 2][node.col];
        if (isNodeAWall(topNeighbor)) frontiers.push(topNeighbor);
    }

    if (isPositionWithinBounds(node.row + 2, node.col)){
        let bottomNeighbor = grid[node.row + 2][node.col];
        if (isNodeAWall(bottomNeighbor)) frontiers.push(bottomNeighbor);
    }

    return frontiers;
}

function getNodeDOM(node) {
    return document.getElementById(`node-${node.row}-${node.col}`);
}

export function generatePrims(grid) {

    /**
     * 
     * Generates a maze using prim's algorithm
        Pseudo code:
        1. Set all nodes to be walls (except start and finish nodes)
        3. Get frontier fs of start node and add to the frontier set that contains all frontier cells
        4. while s is not empty:
            4a. Pick a random frontier node from the frontier set
            4b. Get neighbour nodes ns of the random frontier node
            4c. Connect random frontier node with random neighbour node from ns
            4d. Add the frontier nodes of the random frontier node to the frontier set
            4e. Remove the random node from the frontier set.
        5. Invert the whole grid (passages to walls, vice versa). This is specific to this implementation.
           Not sure if there is a better way, but inverting the logic of every helper function is a hassle ;(
     *
     */

    grid = initWalls(grid);
    let frontiers = new Set();

    getFrontiers(grid, grid[START_NODE_ROW][START_NODE_COL]).forEach(node => {
        frontiers.add(node);
    });

    while (frontiers.size > 0) {
        let randomFrontier = Array.from(frontiers)[Math.floor(Math.random() * frontiers.size)];
        tearDownWall(randomFrontier);

        let neighborNodes = getNeighborWalls(grid, randomFrontier);
        let randomNeighbor = neighborNodes[Math.floor(Math.random() * neighborNodes.length)];

        if(neighborNodes.length > 0)
        {           
            tearDownWall(randomNeighbor);

            getFrontiers(grid, randomFrontier).forEach(node => {
                frontiers.add(node);
            });    
        }
        frontiers.delete(randomFrontier);
    }

    grid = invertNodes(grid);

    return grid;
}
