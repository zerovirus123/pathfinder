import {
    NUM_ROWS,
    NUM_COLS,
} from "../GUI/grid";

import {
    getNeighborWalls,
    initWalls,
    tearDownWall,
}
from "../maze/utils";

import { makeSet, 
         find, 
         union } 
from "./disjoint-set";

export function generateKruskals(grid) {
    grid = initWalls(grid);

    let graph = {};
    graph.vertices = {};
    graph.edges = [];

    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS; j++) {
            let node = grid[i][j];

            if (!node.isStart && !node.isFinish){

                let neighbors = getNeighborWalls(grid, node);

                neighbors.forEach(neighbor => {
                    let randomWeight = Math.floor(Math.random() * 100);
                    let edge = {'weight': randomWeight, 'source': [node.row, node.col] , 'dest': [neighbor.row, neighbor.col]};
                    graph.edges.push(edge);
                });
                
                let vertexSet = makeSet();
                vertexSet.data = {'node': node, 'position': [i, j]};
                graph.vertices[[i, j]] = vertexSet;
            }
        }
    }

    graph.edges = graph.edges.sort((edgeA, edgeB) => edgeA.weight - edgeB.weight);

    let MST = [];

    for (let i = 0; i < graph.edges.length; i++)
    {
        let node = graph.edges[i];

        let nodeASet = graph.vertices[node.source];
        let nodeBSet = graph.vertices[node.dest];

        if(find(nodeASet) !== find(nodeBSet))
        {
            MST.push(nodeBSet.data.node);
        } 
        union(nodeASet, nodeBSet);
    }

    MST.forEach(node => {tearDownWall(node);});

    return grid;
}