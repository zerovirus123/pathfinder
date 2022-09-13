/* eslint-disable no-loop-func */
import {
    clearGrid,
    checkNeighbor,
    getNodePosition,
    isPositionWithinBounds,
    isSameNode,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    START_NODE_COL,
    START_NODE_ROW,
    NUM_ROWS,
    NUM_COLS
} from "../GUI/grid";
import {
    animatePath,
    createShortestPath
} from "../GUI/visualize";

class PriorityQueue {

    #list = [];
    #capacity;

    constructor(capacity) {
        this.#capacity = Math.max(Number(capacity), 0) || null;
    }

    get size() {
        return this.#list.length;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get isFull() {
        return this.#capacity !== null && this.size === this.#capacity;
    }

    dequeue() {
        return this.isEmpty ? null : this.#list.shift().item;
    }

    toString() {
        return this.#list.map((el) => el.item).toString();
    }

    peek() {
        const element = this.#list[0];
        return element ? element.item : null;
    }

    print() {
        console.log(this.#list.map(el => el.item));
    }

    enqueue(item, priority = 0) {

        priority = Math.max(Number(priority), 0); // ensure that priority is never 0

        const element = {
            item,
            priority
        };

        if ( // if queue is empty of the inserted element's priority is greater or equal to last item's priority
            this.isEmpty ||
            element.priority >= this.#list[this.size - 1].priority
        ) {
            this.#list.push(element);
        } else {
            for (let index in this.#list) {
                if (element.priority < this.#list[index].priority) {
                    this.#list.splice(index, 0, element); //insert element into index
                    break;
                }
            }
        }

        return this.size;
    }
}

function hamilton(p1, p2)
{
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function a_star(grid) {
    clearGrid(grid);
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = [];
    let count = 0;

    let open_set_hash = new Set();
    open_set_hash.add(startNode);

    let open_set_queue = new PriorityQueue(NUM_ROWS * NUM_COLS);
    open_set_queue.enqueue( {node: startNode, neighborScore: 0}, count);

    let g_score = new Map();
    let f_score = new Map();

    for(let i = 0; i < NUM_ROWS; i++){
        for(let j = 0; j < NUM_COLS; j++){
            g_score[[i, j]] = Infinity;
            f_score[[i, j]] = Infinity;
        }
    }

    f_score[getNodePosition(startNode)] = hamilton(getNodePosition(startNode), getNodePosition(finishNode));

    let currentNode;
    let foundNode = false;

    while(open_set_hash.size !== 0)
    {
        currentNode = open_set_queue.dequeue().node;
        open_set_hash.delete(currentNode);

        if (isSameNode(currentNode, finishNode))
        {
            foundNode = true;
            break;
        }

        let neighbors = [];
        
        if (isPositionWithinBounds(currentNode.row, currentNode.col - 1)){
            let leftChild = grid[currentNode.row][currentNode.col - 1];
            neighbors = checkNeighbor(currentNode, leftChild, currentNode.row, currentNode.col - 1, neighbors, visitedNodesInOrder);
        }

        if (isPositionWithinBounds(currentNode.row, currentNode.col + 1)) {
            let rightChild = grid[currentNode.row][currentNode.col + 1];
            neighbors = checkNeighbor(currentNode, rightChild, currentNode.row, currentNode.col + 1, neighbors, visitedNodesInOrder);
        } 

        if (isPositionWithinBounds(currentNode.row - 1, currentNode.col)) {
            let topChild = grid[currentNode.row - 1][currentNode.col];
            neighbors = checkNeighbor(currentNode, topChild, currentNode.row - 1, currentNode.col, neighbors, visitedNodesInOrder);
        } 

        if (isPositionWithinBounds(currentNode.row + 1, currentNode.col)) {
            let bottomChild = grid[currentNode.row + 1][currentNode.col];
            neighbors = checkNeighbor(currentNode, bottomChild, currentNode.row + 1, currentNode.col, neighbors, visitedNodesInOrder);
        } 

        neighbors.forEach(neighbor => {
            let temp_g_score = g_score[[currentNode.row, currentNode.col]] + 1;

            if (temp_g_score <= g_score[[neighbor.row, neighbor.col]])
            {
                g_score[getNodePosition(neighbor)] = temp_g_score;
                f_score[getNodePosition(neighbor)] = temp_g_score + hamilton(getNodePosition(neighbor), getNodePosition(finishNode))

                if (!open_set_hash.has(neighbor))
                {
                    count++;
                    open_set_queue.enqueue({node: neighbor, neighborScore: f_score[getNodePosition(neighbor)]}, count);
                    open_set_hash.add(neighbor);
                }
            }
        });
    }

    startNode.previousNode = null; // not proud of this, but currently could not find the root cause of the previous node bug
    let shortestPath = createShortestPath(currentNode);
    animatePath(visitedNodesInOrder, shortestPath, foundNode);
}