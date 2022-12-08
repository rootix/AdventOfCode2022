import {multiply, splitLinesIntoArray, sum} from "../utils";
import {d8i, d8s} from "../data";

function q1() {
    const grid = splitLinesIntoArray(d8i).map(row => row.split('').map(Number));
    const visibleTrees = sum(grid.flatMap((_, row) => grid[row].map((_, col) => isVisible(row, col, grid) ? 1 : 0)));
    console.log('d8q1: ' + visibleTrees);
}

function q2() {
    const grid = splitLinesIntoArray(d8i).map(row => row.split('').map(Number));
    const maxScore = Math.max(...grid.flatMap((_, row) => grid[row].map((_, col) => getScore(row, col, grid))));
    console.log('d8q2: ' + maxScore);
}

function isVisible(row: number, column: number, grid: number[][]) {
    const tree = grid[row][column];
    const view = getView(row, column, grid);
    return view.filter(v => tree > Math.max(...v)).length > 0;
}

function getScore(row: number, column: number, grid: number[][]) {
    const tree = grid[row][column];
    const view = getView(row, column, grid);

    return multiply(view.map(v => {
        const distance = v.findIndex(other => tree <= other);
        return distance == -1 ? v.length : distance + 1;
    }));
}

function getView(row: number, column: number, grid: number[][]) {
    const up = grid.slice(0, row).map(row => row[column]).reverse();
    const down = grid.slice(row + 1).map(row => row[column]);
    const left = grid[row].slice(0, column).reverse();
    const right = grid[row].slice(column + 1);
    return [up, left, right, down];
}

q1();
q2();
