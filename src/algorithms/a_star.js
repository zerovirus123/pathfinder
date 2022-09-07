export function a_star(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    
    const unvisitedNodes = getAllNodes(grid);
    

}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}