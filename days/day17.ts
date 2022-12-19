import {d17i, d17s} from "../data";

const CHAMBER_WIDTH = 7;
const ROCK_SHAPES: string[][][] = [
    [
        ['#', '#', '#', '#']
    ],
    [
        ['.', '#', '.'],
        ['#', '#', '#'],
        ['.', '#', '.']
    ],
    [

        ['.', '.', '#'],
        ['.', '.', '#'],
        ['#', '#', '#']
    ],
    [

        ['#'],
        ['#'],
        ['#'],
        ['#']
    ],
    [
        ['#', '#'],
        ['#', '#']
    ]
]

interface FallingRock {
    x: number,
    y: number,
    shape: string[][]
}

function q1() {
    const jets = d17i.split('');
    const chamber = new Set<string>();
    let rockIndex = 0;
    let jetIndex = 0;
    let height = 0;

    while (rockIndex < 2022) {
        const rockShape = ROCK_SHAPES[rockIndex % ROCK_SHAPES.length];
        const rock: FallingRock = {x: 2, y: height + 3 + rockShape.length - 1, shape: rockShape};
        while (true) {
            const jet = jets[jetIndex++ % jets.length];
            applyJet(jet, rock, chamber)
            if (wouldCollide(rock, chamber)) {
                break;
            }

            rock.y--;
        }

        putRockToRest(rock, chamber);
        height = getChamberHeight(chamber);
        rockIndex++;
    }

    console.log("d17q1: " + height);
}

function q2() {
    const jets = d17i.split('');
    const chamber = new Set<string>();
    const maxRocks = 1e12;
    const stateCache = {};
    let rockIndex = 0;
    let jetIndex = 0;
    let height = 0;
    let skippedHeight = 0;
    let cycleDetected = false;
    while (rockIndex < maxRocks) {
        const rockPrototype = ROCK_SHAPES[rockIndex % ROCK_SHAPES.length];
        const rock: FallingRock = {x: 2, y: height + 3 + rockPrototype.length - 1, shape: rockPrototype};
        while (true) {
            const jet = jets[jetIndex++ % jets.length];
            applyJet(jet, rock, chamber)
            if (wouldCollide(rock, chamber)) {
                break;
            }

            rock.y--;
        }

        putRockToRest(rock, chamber);
        height = getChamberHeight(chamber);

        // Detect a cycle and skip as high as possible. Then end the calculation normally. The chamber is messed up, but hey, no need :)
        if (!cycleDetected) {
            let cacheKey = `${jetIndex % jets.length},${rockIndex % ROCK_SHAPES.length},`;
            for (let y = height; y >= height - 10; y--) {
                let rowNum = '';
                for (let x = 0; x < CHAMBER_WIDTH; x++) {
                    rowNum += chamber.has(`${x},${y}`) ? 1 : 0;
                }
                cacheKey += Number(rowNum) + ',';
            }

            if (stateCache[cacheKey] != null) {
                cycleDetected = true;
                const rockIndexDifference = rockIndex - stateCache[cacheKey].rockIndex;
                const heightDifference = height - stateCache[cacheKey].height;
                const numberOfRemainingRepetitions = Math.floor((maxRocks - stateCache[cacheKey].rockIndex) / rockIndexDifference) - 1;
                skippedHeight += numberOfRemainingRepetitions * heightDifference;
                rockIndex += numberOfRemainingRepetitions * rockIndexDifference;
            } else {
                stateCache[cacheKey] = {height, rockIndex};
            }
        }

        rockIndex++;
    }

    console.log("d17q2: " + (skippedHeight + height));
}

function getChamberHeight(chamber: Set<string>) {
    return [...chamber]
        .map(coord => parseInt(coord.split(',')[1]))
        .reduce((max, height) => Math.max(max, height), -1) + 1;
}

function applyJet(jet: string, rock: FallingRock, chamber: Set<string>) {
    const moveBy = jet === '>' ? 1 : -1;
    for (let y = 0; y < rock.shape.length; y++) {
        for (let x = 0; x < rock.shape[y].length; x++) {
            if (rock.shape[y][x] !== '#') {
                continue;
            }

            if (rock.x + x + moveBy < 0 || rock.x + x + moveBy >= CHAMBER_WIDTH || chamber.has(`${rock.x + x + moveBy},${rock.y - y}`)) {
                return;
            }
        }
    }

    rock.x += moveBy;
}

function wouldCollide(rock: FallingRock, chamber: Set<string>) {
    for (let y = 0; y < rock.shape.length; y++) {
        for (let x = 0; x < rock.shape[y].length; x++) {
            if (rock.shape[y][x] != '#') {
                continue;
            }

            if (rock.y - y - 1 < 0 || chamber.has(`${rock.x + x},${rock.y - y - 1}`)) {
                return true;
            }
        }
    }

    return false;
}

function putRockToRest(rock: FallingRock, chamber: Set<string>) {
    for (let y = 0; y < rock.shape.length; y++) {
        for (let x = 0; x < rock.shape[y].length; x++) {
            if (rock.shape[y][x] != '#') continue;
            chamber.add(`${rock.x + x},${rock.y - y}`);
        }
    }
}

function renderChamber(chamber: Set<string>) {
    let maxY = getChamberHeight(chamber);
    for (let y = maxY; y >= 0; y--) {
        let row = '';
        for (let x = 0; x < CHAMBER_WIDTH; x++) {
            row += chamber.has(`${x},${y}`) ? '#' : '.';
        }

        console.log(row);
    }

    console.log('-----------------------------------------')
}

q1();
q2();
