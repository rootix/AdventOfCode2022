import {splitLinesIntoArray, sum} from "../utils";
import {d8i, d8s} from "../data";

function q1() {
    const grid = splitLinesIntoArray(d8i).map(row => row.split('').map(Number));
    const visibleTrees = sum(grid.map((_, row) => sum(grid[row].map((_, col) => isVisible(row, col, grid) ? 1 : 0))));
    console.log('d8q1: ' + visibleTrees);
}

function q2() {
    const grid = splitLinesIntoArray(d8i).map(row => row.split('').map(Number));
    const maxScore = Math.max(...grid.map((_, row) => Math.max(...grid[row].map((_, col) => getScore(row, col, grid)))));
    console.log('d8q2: ' + maxScore);
}

function isVisible(row: number, column: number, grid: number[][]) {
    const tree = grid[row][column];
    let isTopVisible = true;
    let isDownVisible = true;
    let isLeftVisible = true;
    let isRightVisible = true;
    if (row == 0 || row == grid.length - 1 || column == 0 || column == grid[row].length - 1) {
        return true
    }

    for (let up = row - 1; up >= 0; up--) {
        if (tree <= grid[up][column]) {
            isTopVisible = false;
            break;
        }
    }

    for (let down = row + 1; down < grid.length; down++) {
        if (tree <= grid[down][column]) {
            isDownVisible = false;
            break;
        }
    }

    for (let right = column + 1; right <= grid[row].length; right++) {
        if (tree <= grid[row][right]) {
            isRightVisible = false;
            break;
        }
    }

    for (let left = column - 1; left >= 0; left--) {
        if (tree <= grid[row][left]) {
            isLeftVisible = false;
            break;
        }
    }

    return isTopVisible || isDownVisible || isRightVisible || isLeftVisible;
}

function getScore(row: number, column: number, grid: number[][]) {
    const tree = grid[row][column];
    let topDistance = 0;
    let downDistance = 0;
    let leftDistance = 0;
    let rightDistance = 0;

    for (let up = row - 1; up >= 0; up--) {
        topDistance++;
        if (tree <= grid[up][column]) {
            break;
        }
    }
    for (let down = row + 1; down < grid.length; down++) {
        downDistance++;
        if (tree <= grid[down][column]) {
            break;
        }
    }

    for (let right = column + 1; right < grid[row].length; right++) {
        rightDistance++;
        if (tree <= grid[row][right]) {
            break;
        }
    }

    for (let left = column - 1; left >= 0; left--) {
        leftDistance++;
        if (tree <= grid[row][left]) {
            break;
        }
    }

    return topDistance * leftDistance * rightDistance * downDistance;
}

q1();
q2();
