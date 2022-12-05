import {splitLinesByEmptyLines, splitLinesIntoArray} from "../utils";
import {d5i, d5s} from "../data";

function q1() {
    const [inventory, instructions] = splitLinesByEmptyLines(d5i);
    const stacks = buildStacks(inventory);
    operateCrane("9000", instructions, stacks);
    console.log("d5q1: " + getTopCrateString(stacks));
}

function q2() {
    const [inventory, instructions] = splitLinesByEmptyLines(d5i);
    const stacks = buildStacks(inventory);
    operateCrane("9001", instructions, stacks);
    console.log("d5q2: " + getTopCrateString(stacks));
}

function buildStacks(inventory: string): string[][] {
    const lines = splitLinesIntoArray(inventory);
    const stacks = [];
    const crateNumberLine = lines[lines.length - 1];
    const stackIndex = [];
    for (let i = 0; i < crateNumberLine.length; i++) {
        if (crateNumberLine[i] !== " ") {
            stackIndex.push(i);
            stacks.push([]);
        }
    }

    for (let l = 0; l < lines.length - 1; l++) {
        const line = lines[l];
        for (let c = 0; c < stackIndex.length; c++) {
            if (line[stackIndex[c]] !== " ") {
                stacks[c].push(line[stackIndex[c]]);
            }
        }
    }

    return stacks;
}

function operateCrane(model: "9000" | "9001", instructions: string, stacks: string[][]): string[][] {
    const instructionRegex = /move (\d+) from (\d+) to (\d+)/
    const lines = splitLinesIntoArray(instructions);
    for (const instruction of lines) {
        const matches = instructionRegex.exec(instruction);
        const times = parseInt(matches[1]);
        const from = parseInt(matches[2]) - 1;
        const to = parseInt(matches[3]) - 1;

        for (let a = 0; a < times; a++) {
            const crate = stacks[from].shift();
            if (model === "9000") {
                stacks[to].unshift(crate)
            } else {
                stacks[to].splice(a, 0, crate)
            }
        }
    }

    return stacks;
}

function getTopCrateString(stacks: string[][]) {
    return stacks.map(stack => stack[0]).join('');
}

q1();
q2();
