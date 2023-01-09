import {splitLinesIntoArray, sum} from "../utils";
import {d25i, d25s} from "../data";

const SNAFU_TABLE = {
    '2': 2,
    '1': 1,
    '0': 0,
    '-': -1,
    '=': -2
}

function q1() {
    const fuelRequirement = sum(splitLinesIntoArray(d25i).map(snafuToInt));
    console.log("d25q1: " + intToSnafu(fuelRequirement));
}

function intToSnafu(int: number) {
    if (int === 0) return '';

    const nextDigit = int % 5;
    const snafuTable = Object.entries(SNAFU_TABLE);
    for (let i = 0; i < snafuTable.length; i++) {
        if ((snafuTable[i][1] + 5) % 5 === nextDigit) {
            const newDigit = Math.floor(int - snafuTable[i][1]) / 5;
            return intToSnafu(newDigit) + snafuTable[i][0];
        }
    }
}

function snafuToInt(snafu: string) {
    let int = 0;
    for (let i = 0; i < snafu.length; i++) {
        const snafuDigit = SNAFU_TABLE[snafu[i]];
        int += Math.pow(5, snafu.length - i - 1) * snafuDigit;
    }

    return int;
}

q1();