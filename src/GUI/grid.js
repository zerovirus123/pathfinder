export let START_NODE_ROW = 10;
export let START_NODE_COL = 15;
export let FINISH_NODE_ROW = 10;
export let FINISH_NODE_COL = 35;

export let NUM_ROWS = 20;
export let NUM_COLS = 50;

export const clearGrid = (grid) => {
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLS; col++) {
            let node = grid[row][col];
            if (!node.isStart && !node.isFinish && !node.isWall) {
                node.isVisited = false;
                node.previousNode = null;
                node.distance = Infinity;
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            }
            else if (node.isStart){
                node.isVisited = false;
                node.distance = Infinity;
            }
            else if (node.isFinish) {
                node.isVisited = false;
                node.distance = Infinity;
                // document.getElementById(`node-${node.row}-${node.col}`).className = 'node-finish';
            }
        }
        grid.push(currentRow);
    }
    return grid;
}

export const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

export const randomizeStartAndEnd = () =>
{
    START_NODE_ROW = Math.floor(Math.random() * NUM_ROWS);
    START_NODE_COL = Math.floor(Math.random() * NUM_COLS);
    let coordinatesToExclude = [START_NODE_ROW, START_NODE_COL];
    randomWithExclude(coordinatesToExclude);
};

const randomWithExclude = (itemsToExclude) => {
    FINISH_NODE_ROW = Math.floor(Math.random() * NUM_ROWS);
    FINISH_NODE_COL = Math.floor(Math.random() * NUM_COLS);

    let hasDuplicates = true;

    while(hasDuplicates)
    {
        if(itemsToExclude.includes(FINISH_NODE_ROW) &&
           itemsToExclude.includes(FINISH_NODE_COL)
        ){
            randomWithExclude(itemsToExclude);
        }
        else{
            break;
        }
    }
}

export const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        leftChild: null,
        rightChild: null,
        topChild: null,
        bottomChild: null
    };
};

export const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export function checkBounds(node) {
    return (node.row >= 0 && node.col >= 0 && node.row < NUM_ROWS && node.col < NUM_COLS);
}

export function getNodePosition(node) {
    return [node.row, node.col];
}

export function isSameNode(node1, node2) {
    return (node1.row === node2.row && node1.col === node2.col);
}

export function checkNeighbor(currentNode, neighborNode, neighborRow, neighborCol, neighbors, visitedNodesInOrder) {
    if (!neighborNode.isVisited && !neighborNode.isWall && checkBounds(neighborNode)) {
        neighborNode.row = neighborRow;
        neighborNode.col = neighborCol;
        neighborNode.isVisited = true;
        neighborNode.previousNode = currentNode;
        neighbors.push(neighborNode);
        visitedNodesInOrder.push(neighborNode);
    }
    return neighbors;
}