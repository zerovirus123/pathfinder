import React, {Component} from 'react';
import './GUI.css';
import {getInitialGrid, 
        getNewGridWithWallToggled, 
        randomizeStartAndEnd,
        START_NODE_ROW, 
        START_NODE_COL, 
        FINISH_NODE_ROW, 
        FINISH_NODE_COL} from './grid';
import Node from './Node/Node';
import {animatePath} from "./visualize"

import {dijkstra, 
       getNodesInShortestPathOrder} from"./../algorithms/dijkstra";

import {bfs} from "./../algorithms/bfs";
import {dfs} from "./../algorithms/dfs";
import {a_star} from "./../algorithms/a_star";

import Header from '../Header/Header';

import "./Dropdown/dropdown.css";
import { animateDropdown } from './Dropdown/dropdown';

import { generatePrims } from '../maze/prims';
import { generateKruskals} from '../maze/kruskals';

export default class GUI extends Component{

    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            isDropdownActive: true
        };
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    toggleDropdown = () => 
    {
        this.setState({isDropdownActive: !this.state.isDropdownActive});
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    redrawGrid()
    {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        return [visitedNodesInOrder, nodesInShortestPathOrder];
    }

    runPathFinder()
    {
        const nodesInfo = this.visualizeDijkstra();
        const visitedNodesInOrder = nodesInfo[0];
        const nodesInShortestPathOrder = nodesInfo[1];
        let foundNode = true
        if (nodesInShortestPathOrder.length <= 1) foundNode = false
        animatePath(visitedNodesInOrder, nodesInShortestPathOrder, foundNode);
    }

    render() {
        const {grid, mouseIsPressed} = this.state;

        return(<>
           <div className="gui__container">
                <Header></Header>
                <div className="button__container">
                  <button className="button" onClick={() => {
                      randomizeStartAndEnd()
                      this.redrawGrid()
                  }}>
                  Randomize Start and End Nodes
                  </button>

                  <div className="dropdown__container">
                    <div className="dropdown">
                       <div className="dropdown__btn" onClick={() => {
                        this.toggleDropdown()
                        animateDropdown(this.state.isDropdownActive, "dropdown__algorithm")
                       }}>
                       Choose an Algorithm
                       </div>
                     <ul className="dropdown__content" id="dropdown__algorithm">
                        <li className="dropdown__item" onClick={() => {bfs(this.state.grid)}}>BFS</li>
                        <li className="dropdown__item" onClick={() => {dfs(this.state.grid)}}>DFS</li>
                        <li className="dropdown__item" onClick={() => {this.runPathFinder()}}>Dijkstra</li>
                        <li className="dropdown__item" onClick={() => {a_star(this.state.grid)}}>A*</li>
                     </ul>
                    </div>
                    <div className="dropdown">
                       <div className="dropdown__btn" onClick={() => {
                        this.toggleDropdown()
                        animateDropdown(this.state.isDropdownActive, "dropdown__maze")
                       }}>
                       Choose a Maze Generator
                       </div>
                       <ul className="dropdown__content" id="dropdown__maze">
                          <li className="dropdown__item" onClick={() => {
                            generatePrims(this.state.grid)
                            }}>Prim</li>
                          <li className="dropdown__item" onClick={() => {
                            generateKruskals(this.state.grid);
                          }}>Kruskal</li>
                        </ul>
                    </div>
                  </div>

                </div>
                
                <div className="grid">
                {grid.map((row, rowIdx) => {
                  return(
                    <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                        const {row, col, isFinish, isStart, isWall} = node;
                        return (
                        <Node
                            key={nodeIdx}
                            col={col}
                            isFinish={isFinish}
                            isStart={isStart}
                            isWall={isWall}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) =>
                                this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                            row={row}>
                        </Node>
                    );
                    })}
                    </div>
                  );
              })}
              </div>
           </div>
        </>)
    }

}