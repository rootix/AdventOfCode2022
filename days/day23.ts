import {d23i, d23s} from "../data";
import {splitLinesIntoArray} from "../utils";

const OFFSET = 1_000;
const INITIAL_DIRECTIONS = [
    [
        [-1, 0], // N
        [-1, -1], // NW
        [-1, 1] // NE
    ],
    [
        [1, 0], // S
        [1, 1], // SE
        [1, -1] // SW
    ],
    [
        [0, -1], // W
        [-1, -1], // NW
        [1, -1] // SW
    ],
    [
        [0, 1], // E
        [-1, 1], // NE
        [1, 1] // SE
    ]
];

function q1() {
    const elves = parseInput(d23i);
    simulateRounds(elves, 10);
    console.log("d23q1: " + countEmptyGroundTiles(elves));
}

function q2() {
    const elves = parseInput(d23i);
    console.log("d23q2: " + simulateRounds(elves, Infinity));
}

function parseInput(input: string): Set<string> {
    const elves = new Set<string>();
    splitLinesIntoArray(input).forEach((row, rowIndex) => {
        row.split('').forEach((col, colIndex) => {
            if (col === '#') {
                elves.add(getPosKey([rowIndex + OFFSET, colIndex + OFFSET]));
            }
        });
    });

    return elves;
}

function simulateRounds(elves: Set<string>, rounds: number): number {
    const directions = [...INITIAL_DIRECTIONS];
    for (let i = 0; i < rounds; i++) {
        const moves: Record<string, [number, number][]> = {};
        for (const key of elves) {
            const pos = getPosFromKey(key);
            let proposedPos: [number, number];
            let mustMove = false;
            for (const dir of directions) {
                let isMovableDirection = true;
                for (const subdir of dir) {
                    const testPos: [number, number] = [pos[0] + subdir[0], pos[1] + subdir[1]];
                    const newPosOccupied = elves.has(getPosKey(testPos));

                    if (newPosOccupied) {
                        isMovableDirection = false;
                        mustMove = true;
                    }
                }

                if (proposedPos === undefined && isMovableDirection) {
                    proposedPos = [pos[0] + dir[0][0], pos[1] + dir[0][1]];
                }
            }

            if (mustMove && proposedPos) {
                const newPosKey = getPosKey(proposedPos);
                if (!moves.hasOwnProperty(newPosKey)) {
                    moves[newPosKey] = [pos];
                } else {
                    moves[newPosKey].push(pos);
                }
            }
        }
        ;

        const keys = Object.keys(moves);
        if (!keys.length) {
            return i + 1;
        }

        for (const move of keys) {
            if (moves[move].length > 1) {
                continue;
            }

            elves.delete(getPosKey(moves[move][0]));
            elves.add(move);
        }

        directions.push(directions.shift());
    }

    return rounds;
}

function countEmptyGroundTiles(elves: Set<string>) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const elvePosKey of elves) {
        const elvePos = getPosFromKey(elvePosKey);
        minX = Math.min(minX, elvePos[0]);
        maxX = Math.max(maxX, elvePos[0]);
        minY = Math.min(minY, elvePos[1]);
        maxY = Math.max(maxY, elvePos[1]);
    }

    let emptyGroundTiles = 0;
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            if (!elves.has(getPosKey([x, y]))) {
                emptyGroundTiles++;
            }
        }
    }

    return emptyGroundTiles;
}

function getPosKey(pos: [number, number]) {
    return `${pos[0]},${pos[1]}`;
}

function getPosFromKey(key: string): [number, number] {
    const parts = key.split(',');
    return [Number(parts[0]), Number(parts[1])];
}

q1();
q2();
