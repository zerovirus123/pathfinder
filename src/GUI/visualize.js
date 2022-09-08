export function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}

export function animatePath(visitedNodesInOrder, shortestPath, foundNode) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length && foundNode) {
            setTimeout(() => {
                animateShortestPath(shortestPath);
            }, 10 * i);
            return;
        }
        if (i === visitedNodesInOrder.length && !foundNode) return
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 
            'node node-visited';
        }, 10 * i);
    }
}

export function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
        }, 50 * i);
    }
}

export function createShortestPath(currentNode) {
    let shortestPath = [];

    while (currentNode.previousNode !== null) {
        shortestPath.push(currentNode);
        currentNode = currentNode.previousNode;
    }

    return shortestPath.reverse();
}