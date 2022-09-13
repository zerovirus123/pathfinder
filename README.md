# Pathfinder Algorithm Visualizer

![alt text](https://github.com/zerovirus123/pathfinder/public/example.png?raw=true)

Base version of the code implemented by Clement Mihalescu (https://github.com/clementmihailescu/Pathfinding-Visualizer).

This version has additional features:
- added other pathfinding algorithms (BFS, DFS, A* search). More can be implemented in the future.
- Start node and end node randomizer.
- Random maze generator (Prim's, Kruskals, etc). More can be implemented in the future.
- Code refactoring to organize functions and reduce duplication.

# Instructions

To test the project, first install npm. Instructions for different platforms can be found here: https://nodejs.org/en/download/.

Then, type `npm i` inside the directory where `package.json` resides. This installs the needed node modules.

Finally, run the project with `npm i`. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# TODO
The A* search implementation is a lot slower than the Dijkstra implementation. Not sure if the heuristics are bad or if the
priority queue used is inefficient. Feel free to tinker with the code and come up with a faster A* search (or any searches for that matter).
