import { 
clearGrid,
checkBounds,
checkNeighbor,
isSameNode,
FINISH_NODE_COL, 
FINISH_NODE_ROW, 
START_NODE_COL, 
START_NODE_ROW, 
NUM_ROWS, 
NUM_COLS} from "../GUI/grid";
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
         
            try{
                let leftChild = grid[currentNode.row][currentNode.col-1];
                queue = checkNeighbor(currentNode, leftChild, currentNode.row, currentNode.col - 1, queue, visitedNodesInOrder);
            }
            catch(err){}

            try {
                let rightChild = grid[currentNode.row][currentNode.col + 1];
                queue = checkNeighbor(currentNode, rightChild, currentNode.row, currentNode.col + 1, queue, visitedNodesInOrder);
            } catch (err) {}

            try {
                let topChild = grid[currentNode.row - 1][currentNode.col];
                queue = checkNeighbor(currentNode, topChild, currentNode.row - 1, currentNode.col, queue, visitedNodesInOrder);
            } catch (err) {}

            try {
                let bottomChild = grid[currentNode.row + 1][currentNode.col];
                queue = checkNeighbor(currentNode, bottomChild, currentNode.row + 1, currentNode.col, queue, visitedNodesInOrder);
            } catch (err) {}
        }
    }
    
    let shortestPath = createShortestPath(currentNode);
    animatePath(visitedNodesInOrder, shortestPath, foundNode);   
}