import { checkBounds,
START_NODE_ROW,
START_NODE_COL,
FINISH_NODE_ROW,
FINISH_NODE_COL,
NUM_ROWS,
NUM_COLS } from "./grid";


function isNodeAWall(node) {
    if (node.isWall && checkBounds(node)) {
        return true;
    }

    return false;
}

function getNeighborWalls(grid, node) {

    let neighbors = [];

    try {
        let leftNeighbor = grid[node.row][node.col - 1];
        if (isNodeAWall(leftNeighbor)) neighbors.push(leftNeighbor);
    } catch (err) {}

    try {
        let rightNeighbor = grid[node.row][node.col + 1];
        if (isNodeAWall(rightNeighbor)) neighbors.push(rightNeighbor);

    } catch (err) {}

    try {
        let topNeighbor = grid[node.row - 1][node.col];
        if (isNodeAWall(topNeighbor)) neighbors.push(topNeighbor);
    } catch (err) {}

    try {
        let bottomNeighbor = grid[node.row + 1][node.col];
        if (isNodeAWall(bottomNeighbor)) neighbors.push(bottomNeighbor);
    } catch (err) {}

    return neighbors;
}

function getRandomNeighborWall(grid, node) {
    let neighbors = [];

    try {
        let leftNeighbor = grid[node.row][node.col - 1];
        if (isNodeAWall(leftNeighbor)) neighbors.push(leftNeighbor);
    } catch (err) {}

    try {
        let rightNeighbor = grid[node.row][node.col + 1];
        if (isNodeAWall(rightNeighbor)) neighbors.push(rightNeighbor);

    } catch (err) {}

    try {
        let topNeighbor = grid[node.row - 1][node.col];
        if (isNodeAWall(topNeighbor)) neighbors.push(topNeighbor);
    } catch (err) {}

    try {
        let bottomNeighbor = grid[node.row + 1][node.col];
        if (isNodeAWall(bottomNeighbor)) neighbors.push(bottomNeighbor);
    } catch (err) {}

    let randomIndex = Math.floor(Math.random() * neighbors.length);

    return neighbors[randomIndex];
}

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

function openPathForStartAndFinishNodes(grid)
{
    let nodes = [
        grid[START_NODE_ROW][START_NODE_COL],
        grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    ];
    
    nodes.forEach(node =>{
        let neighbors = getNeighborWalls(grid, node);
        let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        tearDownWall(neighbor);
    });
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
