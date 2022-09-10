import {
    checkBounds,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    NUM_ROWS,
    NUM_COLS
} from "../GUI/grid";

export function isNodeAWall(node) {
    if (node.isWall && checkBounds(node)) {
        return true;
    }

    return false;
}

export function getNeighborWalls(grid, node) {

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

export function getRandomNeighborWall(grid, node) {
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

export function getNodeDOM(node) {
    return document.getElementById(`node-${node.row}-${node.col}`);
}

export function tearDownWall(node) {
    getNodeDOM(node).className = 'node';
    node.isWall = false;
}

export function openPathForStartAndFinishNodes(grid) {
    let nodes = [
        grid[START_NODE_ROW][START_NODE_COL],
        grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    ];

    nodes.forEach(node => {
        let neighbors = getNeighborWalls(grid, node);
        let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        tearDownWall(neighbor);
    });
}

export function initWalls(grid) {
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