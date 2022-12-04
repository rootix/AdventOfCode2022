import {splitLinesIntoArray, sum} from "../utils";
import {d4i, d4s} from "../data";

interface Range {
    from: number,
    to: number
}

function q1() {
    const result = sum(splitLinesIntoArray(d4i)
        .map(pairings => pairings.split(',').map(parseRange))
        .map(pairings => contains(pairings[0], pairings[1]) ? 1 : 0));

    console.log("d4q1: " + result);
}

function q2() {
    const result = sum(splitLinesIntoArray(d4i)
        .map(pairings => pairings.split(',').map(parseRange))
        .map(pairings => overlaps(pairings[0], pairings[1]) ? 1 : 0));

    console.log("d4q2: " + result);
}

function parseRange(input: string): Range {
    const parts = input.split('-');
    return {from: parseInt(parts[0]), to: parseInt(parts[1])};
}

function contains(first: Range, second: Range): boolean {
    return first.from <= second.from && first.to >= second.to ||
        second.from <= first.from && second.to >= first.to;
}

function overlaps(first: Range, second: Range): boolean {
    return second.to >= first.from && first.to >= second.from;
}

q1();
q2();
