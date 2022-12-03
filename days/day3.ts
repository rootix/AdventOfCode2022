import {intersect, splitLinesIntoArray, sum} from "../utils";
import {d3s,d3i} from "../data";

function q1() {
    const result = sum(splitLinesIntoArray(d3i)
        .map(line => [line.substring(0, line.length / 2), line.substring(line.length / 2)])
        .map(compartments => findPriority(compartments[0], compartments[1])));

    console.log("d3q1: " + result);
}

function q2() {
    let result = 0;
    const backpacks = splitLinesIntoArray(d3i);
    for (let offset = 0; offset < backpacks.length; offset += 3) {
        result += calculatePriority(intersect(intersect(backpacks[offset].split(''), backpacks[offset + 1].split('')), backpacks[offset + 2].split(''))[0]);
    }

    console.log("d3q2: " + result);
}

function findPriority(first: string, second: string) {
    for (const char of first) {
        if (second.indexOf(char) != -1) {
            return calculatePriority(char);
        }
    }

    return 0;
}

function calculatePriority(char: string) {
    if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 38;
    } else if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 96;
    }

    return 0;
}

q1();
q2();
