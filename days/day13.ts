import {splitLinesByEmptyLines, splitLinesIntoArray, sum} from "../utils";
import {d13i, d13s} from "../data";

function q1() {
    const pairs = splitLinesByEmptyLines(d13i).map(pair => splitLinesIntoArray(pair).map(part => JSON.parse(part)));
    const result = sum(pairs.map(((pair, index) => compare(pair[0], pair[1]) === -1 ? index + 1 : 0)));

    console.log("d13q1: " + result);
}

function q2() {
    const packets = splitLinesByEmptyLines(d13i).flatMap(pair => splitLinesIntoArray(pair).map(part => JSON.parse(part)));

    const firstDivider = [[2]];
    const secondDivider = [[6]];
    packets.push(firstDivider, secondDivider);

    const sortedPairs = packets.sort(compare);

    const indexOfFirstDivider = sortedPairs.indexOf(firstDivider) + 1;
    const indexOfSecondDivider = sortedPairs.indexOf(secondDivider) + 1;

    console.log("d13q2: " + indexOfFirstDivider * indexOfSecondDivider);
}

function compare(left: any, right: any): number {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        return left < right ? -1 : left > right ? 1 : 0;
    }

    if (Number.isInteger(left)) {
        left = [left];
    }

    if (Number.isInteger(right)) {
        right = [right];
    }

    for (let index = 0; index < left.length; index++) {
        if (index >= right.length) {
            return 1;
        } else {
            const result = compare(left[index], right[index]);
            if (result !== 0) {
                return result;
            }
        }
    }

    return left.length === right.length ? 0 : -1;
}

q1();
q2();
