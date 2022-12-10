import {splitLinesIntoArray} from "../utils";
import {d10i, d10s} from "../data";

const instructions = splitLinesIntoArray(d10i);
let x = 1;
let signal = 0;
let cycle = 0;
let crt = '';
for (const instruction of instructions) {
    const cycles = instruction === "noop" ? 1 : 2;
    const append = cycles === 2 ? Number(instruction.substring(5)) : 0;
    for (let _ = 0; _ < cycles; _++) {
        if (Math.abs(x - cycle % 40) < 2) {
            crt += '#';
        } else {
            crt += ".";
        }

        cycle++;
        if (cycle % 40 === 20) {
            signal += cycle * x;
        }
    }

    x += append;
}

console.log("d10q1: " + signal);
console.log("d10q2:");
crt.split(/(.{40})/).filter(x => x.length == 40).map(line => console.log(line));
