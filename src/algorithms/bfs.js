import { 
clearGrid,
checkNeighbor,
isPositionWithinBounds,
isSameNode,
FINISH_NODE_COL, 
FINISH_NODE_ROW, 
START_NODE_COL, 
START_NODE_ROW, 
} from "../GUI/grid";
import { animatePath, 
createShortestPath } from "../GUI/visualize";

export function bfs(grid) {
    clearGrid(grid);
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let queue = [];
    let visitedNodesInOrder = [];

    queue.push(startNode);

    let currentNode;
    let foundNode = false;

    while(queue.length > 0)
    {
        currentNode = queue.shift();
        currentNode.isVisited = true;
        
        if (isSameNode(currentNode, finishNode)){
            currentNode.isVisited = true;
            foundNode = true
            break;
        }else{
         
            if (isPositionWithinBounds(currentNode.row, currentNode.col - 1)) {
                let leftChild = grid[currentNode.row][currentNode.col - 1];
                queue = checkNeighbor(currentNode, leftChild, currentNode.row, currentNode.col - 1, queue, visitedNodesInOrder);
            }

            if (isPositionWithinBounds(currentNode.row, currentNode.col + 1)) {
                let rightChild = grid[currentNode.row][currentNode.col + 1];
                queue = checkNeighbor(currentNode, rightChild, currentNode.row, currentNode.col + 1, queue, visitedNodesInOrder);
            }

            if (isPositionWithinBounds(currentNode.row - 1, currentNode.col)) {
                let topChild = grid[currentNode.row - 1][currentNode.col];
                queue = checkNeighbor(currentNode, topChild, currentNode.row - 1, currentNode.col, queue, visitedNodesInOrder);
            }

            if (isPositionWithinBounds(currentNode.row + 1, currentNode.col)) {
                let bottomChild = grid[currentNode.row + 1][currentNode.col];
                queue = checkNeighbor(currentNode, bottomChild, currentNode.row + 1, currentNode.col, queue, visitedNodesInOrder);
            }
        }
    }
    
    let shortestPath = createShortestPath(currentNode);
    animatePath(visitedNodesInOrder, shortestPath, foundNode);   
}