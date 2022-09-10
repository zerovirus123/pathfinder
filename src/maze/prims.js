import { checkBounds,
START_NODE_ROW,
START_NODE_COL,
FINISH_NODE_ROW,
FINISH_NODE_COL,
NUM_ROWS,
NUM_COLS } from "../GUI/grid";

import {getNeighborWalls, 
       isNodeAWall,
       openPathForStartAndFinishNodes}
       from "../maze/utils";

function getFrontiers(grid, node)
{
    let frontiers = [];

    try {
        let leftNeighbor = grid[node.row][node.col - 2];
        if (isNodeAWall(leftNeighbor)) frontiers.push(leftNeighbor);
    } catch (err) {}

    try {
        let rightNeighbor = grid[node.row][node.col + 2];
        if (isNodeAWall(rightNeighbor)) frontiers.push(rightNeighbor);

    } catch (err) {}

    try {
        let topNeighbor = grid[node.row - 2][node.col];
        if (isNodeAWall(topNeighbor)) frontiers.push(topNeighbor);
    } catch (err) {}

    try {
        let bottomNeighbor = grid[node.row + 2][node.col];
        if (isNodeAWall(bottomNeighbor)) frontiers.push(bottomNeighbor);
    } catch (err) {}

    return frontiers;
}

function getNodeDOM(node) {
    return document.getElementById(`node-${node.row}-${node.col}`);
}

function tearDownWall(node){
    getNodeDOM(node).className = 'node';
    node.isWall = false;
}

function initWalls(grid)
{
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

function invertNodes(grid)
{
    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            if(!grid[row][col].isStart && !grid[row][col].isFinish)
            {
                if (grid[row][col].isWall) {
                    grid[row][col].isWall = false;
                    getNodeDOM(grid[row][col]).className = 'node';

                } else {
                    grid[row][col].isWall = true;
                    getNodeDOM(grid[row][col]).className = 'node node-wall';
                }
            }
        }
    }
    return grid;
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
    openPathForStartAndFinishNodes(grid);

    return grid;
}
