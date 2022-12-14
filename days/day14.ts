import {splitLinesIntoArray} from "../utils";
import {d14i, d14s} from "../data";

interface Point {
    x: number,
    y: number
}

const newSand: Point = {x: 500, y: 0};

function q1() {
    const occupied = parseWalls(d14i);
    const bottom = calculateBottom([...occupied]);
    let endlessVoidReached = false;
    let sandGrains = 0;
    let currentSand: Point = {x: newSand.x, y: newSand.y};

    while (!endlessVoidReached) {
        while (!endlessVoidReached) {
            const cameToRest = fall(currentSand, occupied);
            if (cameToRest) {
                break;
            }

            if (currentSand.y > bottom) {
                endlessVoidReached = true;
            }
        }

        sandGrains++;
        currentSand = {x: newSand.x, y: newSand.y};
    }

    console.log("d14q1: " + (sandGrains - 1));
}

function q2() {
    const occupied = parseWalls(d14i);
    const bottom = calculateBottom([...occupied]);
    let sandGrains = 0;
    let currentSand: Point = {x: newSand.x, y: newSand.y};

    while (!occupied.has(`${newSand.x},${newSand.y}`)) {
        while (true) {
            const cameToRest = fall(currentSand, occupied);
            if (cameToRest) {
                break;
            }

            if (currentSand.y == bottom + 1) {
                occupied.add(`${currentSand.x},${currentSand.y}`);
                break;
            }
        }

        sandGrains++;
        currentSand = {x: newSand.x, y: newSand.y};
    }

    console.log("d14q2: " + sandGrains);
}

function parseWalls(input: string): Set<string> {
    const walls = new Set<string>();
    splitLinesIntoArray(d14i)
        .map(wall => wall.split(" -> ").map(edge => {
            const edgeSplit = edge.split(',');
            return <Point>{x: Number(edgeSplit[0]), y: Number(edgeSplit[1])}
        }))
        .forEach(wall => {
            for (let i = 1; i < wall.length; i++) {
                let minX = Math.min(wall[i - 1].x, wall[i].x);
                let maxX = Math.max(wall[i - 1].x, wall[i].x);
                let minY = Math.min(wall[i - 1].y, wall[i].y);
                let maxY = Math.max(wall[i - 1].y, wall[i].y);
                for (let y = minY; y <= maxY; y++) {
                    for (let x = minX; x <= maxX; x++) {
                        walls.add(`${x},${y}`);
                    }
                }
            }
        });
    return walls;
}

function calculateBottom(rocks: string[]) {
    return rocks.reduce((lowest: number, rock) => Math.max(Number(rock.split(',')[1]), lowest), -Infinity);
}

function fall(currentSand: Point, occupied: Set<string>): boolean {
    if (occupied.has(`${currentSand.x},${currentSand.y + 1}`)) {
        if (!occupied.has(`${currentSand.x - 1},${currentSand.y + 1}`)) {
            currentSand.x--;
            currentSand.y++;
        } else if (!occupied.has(`${currentSand.x + 1},${currentSand.y + 1}`)) {
            currentSand.x++;
            currentSand.y++;
        } else {
            occupied.add(`${currentSand.x},${currentSand.y}`);
            return true;
        }
    } else {
        currentSand.y++;
    }

    return false;
}

q1();
q2();
