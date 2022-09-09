import {
    clearGrid,
    checkBounds,
    checkNeighbor,
    isSameNode,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    START_NODE_COL,
    START_NODE_ROW,
} from "../GUI/grid";
import {
    animatePath,
    createShortestPath
} from "../GUI/visualize";

export function dfs(grid) {
    clearGrid(grid);
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    let stack = [];
    let visitedNodesInOrder = [];

    stack.push(startNode);

    let currentNode;
    let foundNode = false;

    while (stack.length > 0) {
        currentNode = stack.pop();
        currentNode.isVisited = true;

        if (isSameNode(currentNode, finishNode)) {
            currentNode.isVisited = true;
            foundNode = true
            break;
        } else {
            try {
                let leftChild = grid[currentNode.row][currentNode.col - 1];
                stack = checkNeighbor(currentNode, leftChild, currentNode.row, currentNode.col - 1, stack, visitedNodesInOrder);
            } catch (err) {}

            try {
                let rightChild = grid[currentNode.row][currentNode.col + 1];
                stack = checkNeighbor(currentNode, rightChild, currentNode.row, currentNode.col + 1, stack, visitedNodesInOrder);
            } catch (err) {}

            try {
                let topChild = grid[currentNode.row - 1][currentNode.col];
                stack = checkNeighbor(currentNode, topChild, currentNode.row - 1, currentNode.col, stack, visitedNodesInOrder);
            } catch (err) {}

            try {
                let bottomChild = grid[currentNode.row + 1][currentNode.col];
                stack = checkNeighbor(currentNode, bottomChild, currentNode.row + 1, currentNode.col, stack, visitedNodesInOrder);
            } catch (err) {}
        }
    }
    let shortestPath = createShortestPath(currentNode);
    animatePath(visitedNodesInOrder, shortestPath, foundNode);
}