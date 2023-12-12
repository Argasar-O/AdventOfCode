import {input, inputE3, inputE2, inputE4} from "./D10-Input.js";


class Node {
    constructor(id) {
        this.id = id;
        this.links = new Set();
        this.links.add([id, 0]);
    }

    addLink(id, cost) {
        this.links.add([id, cost]);
    }

    getNeighbor() {
        return [...this.links].map(l => l[0]);
    }

    getLinksSorted() {
        return [...this.links].sort((a, b) => a[1] - b[1]);
    }

}

class Graph {
    constructor(input, isOrientedGraph) {
        this.nodes = {};
        this.lines = input.split('\n');
        this.inputToGraph(isOrientedGraph);
    }

    transformNodeId(lineId, columnId) {
        return lineId.toString() + '|' + columnId.toString();
    }

    inputToGraph(isOrientedGraph) {
        this.graphRepresentation = {};
        for (let lineId = 0; lineId < this.lines.length; lineId++) {
            for (let columnId = 0; columnId < this.lines[lineId].length; columnId++) {
                if (!this.nodes[this.transformNodeId(lineId, columnId)])
                    this.nodes[this.transformNodeId(lineId, columnId)] = new Node(this.transformNodeId(lineId, columnId));
                this.pipeToLinks(this.lines[lineId][columnId], lineId, columnId).forEach(links => {
                    if (!this.nodes[this.transformNodeId(links[0], links[1])])
                        this.nodes[this.transformNodeId(links[0], links[1])] = new Node(this.transformNodeId(links[0], links[1]));

                    this.nodes[this.transformNodeId(lineId, columnId)].addLink(this.transformNodeId(links[0], links[1]), 1);
                    if (!isOrientedGraph)
                        this.nodes[this.transformNodeId(links[0], links[1])].addLink(this.transformNodeId(lineId, columnId), 1);
                });
            }
        }
    }

    pipeToLinks(charPipe, lineId, columnId) {
        switch (charPipe) {
            case "L":
                return [[lineId - 1, columnId], [lineId, columnId + 1]];
            case "7":
                return [[lineId, columnId - 1], [lineId + 1, columnId]];
            case "J":
                return [[lineId - 1, columnId], [lineId, columnId - 1]];
            case "F":
                return [[lineId + 1, columnId], [lineId, columnId + 1]];
            case "|":
                return [[lineId - 1, columnId], [lineId + 1, columnId]];
            case "-":
                return [[lineId, columnId - 1], [lineId, columnId + 1]];
            case "S":
                return this.findLinksSource(lineId, columnId)
            default:
                return []
        }
    }

    findLinksSource(lineId, columnId) {
        this.source = this.transformNodeId(lineId, columnId);
        const sourceLinks = [];
        const canBe = [];
        if (lineId > 0) {
            switch (this.lines[lineId - 1][columnId]) {
                case 'F':
                case '|':
                case '7':
                    sourceLinks.push([lineId - 1, columnId]);
                    canBe.push(...["L", "|", "J"]);
                    break;
            }
        }
        if (lineId < this.lines.length) {
            switch (this.lines[lineId + 1][columnId]) {
                case 'J':
                case '|':
                case 'L':
                    sourceLinks.push([lineId + 1, columnId]);
                    canBe.push(...["F", "|", "7"]);
                    break;
            }
        }
        if (columnId < this.lines[lineId].length) {
            switch (this.lines[lineId][columnId + 1]) {
                case 'J':
                case '-':
                case '7':
                    sourceLinks.push([lineId, columnId + 1]);
                    canBe.push(...["F", "-", "L"]);
                    break;
            }
        }
        if (columnId > 0) {
            switch (this.lines[lineId][columnId - 1]) {
                case 'L':
                case '-':
                case 'F':
                    sourceLinks.push([lineId, columnId - 1]);
                    canBe.push(...["J", "-", "7"]);
                    break;
            }
        }
        this.sourceIs = canBe.sort((a, b) =>
            canBe.filter(v => v === a).length
            - canBe.filter(v => v === b).length
        ).pop();
        return sourceLinks;
    }

    getNeighbor(id) {
        return this.nodes[id].getNeighbor();
    }

    getCost(id1, id2) {
        for (let link of this.nodes[id1].getLinksSorted()) {
            if (link[0] === id2)
                return link[1];
        }
    }

}

class Dijkstra {
    constructor(graph) {
        this.dist = {};
        this.prev = {};
        this.graph = graph;

        Object.keys(this.graph.nodes).forEach(node => {
            this.dist[node] = graph.source === node ? 0 : Infinity;
            this.prev[node] = null;
        })
    }

    findMin(notPassedNode) {
        let min = Infinity;
        let node = null;
        for (let nodeNotPassed of notPassedNode) {
            if (this.dist[nodeNotPassed] < min) {
                min = this.dist[nodeNotPassed];
                node = nodeNotPassed
            }
        }
        return node;
    }

    updateDist(node1, node2) {
        const cost = this.graph.getCost(node1, node2);
        if (this.dist[node2] > this.dist[node1] + cost) {
            this.dist[node2] = this.dist[node1] + cost;
            this.prev[node2] = node1;
        }
    }

    run() {
        const notPassedNode = Object.keys(this.graph.nodes);
        while (notPassedNode.length > 0) {
            const node1 = this.findMin(notPassedNode);
            if (node1 === null) break;
            delete notPassedNode[notPassedNode.indexOf(node1)];
            for (let neighbor of this.graph.getNeighbor(node1)) {
                this.updateDist(node1, neighbor);
            }
        }
    }

    getMaxValueOfShortestPath() {
        let result = 0;
        Object.keys(this.dist).forEach(node => {
                if (this.dist[node] !== Infinity && this.dist[node] > result) result = this.dist[node];
            }
        );
        return result;
    }

    getLoopNodes() {
        const result = [];
        Object.keys(this.dist).forEach(node => {
                if (this.dist[node] !== Infinity) result.push(node);
            }
        );
        return result;
    }
}

let entry = input;

const graph = new Graph(entry, true);

const dijkstra = new Dijkstra(graph);
dijkstra.run(graph.source);

entry = entry.replace("S", graph.sourceIs);
const inputSplit = entry.split('\n');
const polygon = dijkstra.getLoopNodes().map(node => node.split('|').map(str => parseInt(str)));

const arrayIncludes = (array, value) => {
    for (const arrayElement of array) {
        if (JSON.stringify(arrayElement) === JSON.stringify(value)) return true;
    }
    return false;
}

for (let i = 0; i < inputSplit.length; i++) {
    const line = inputSplit[i].split('');
    for (let j = 0; j < line.length; j++) {
        if (!arrayIncludes(polygon, [i, j])) {
            line[j] = ".";
        }
    }
    inputSplit[i] = line.join("");
}

function getPossibleEnclosedLines(array) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        let isIn = false;
        let edgeBeginState = null;
        let edgeBeginElement = null;
        for (let j = 0; j < array[i].length; j++) {
            if (arrayIncludes(polygon, [i, j])) {
                if (array[i][j] === "L" || array[i][j] === "F") {
                    edgeBeginState = isIn;

                    edgeBeginElement = array[i][j];
                } else if (array[i][j] === "J" || array[i][j] === "7") {
                    if ((edgeBeginElement === "L" && array[i][j] === "J")
                        || (edgeBeginElement === "F" && array[i][j] === "7")) {
                        isIn = edgeBeginState;
                        edgeBeginState = null;
                        edgeBeginElement = null;
                    } else {
                        isIn = !isIn;
                        edgeBeginState = null;
                        edgeBeginElement = null;
                    }
                } else if (array[i][j] === "|") {
                    isIn = !isIn;
                }

            } else if (isIn) result.push([i, j]);
        }

    }
    return result;
}

console.log(getPossibleEnclosedLines(inputSplit).length);
