import {mod, move, splitLinesIntoArray, sum} from "../utils";
import {d20i, d20s} from "../data";

interface Num {
    value: number
}

function q1() {
    const mixed = mix(d20i);
    console.log("d20q1: " + getGroveCoordinates(mixed));
}

function q2() {
    const mixed = mix(d20i, 10, 811589153);
    console.log("d20q2: " + getGroveCoordinates(mixed));
}

function mix(file: string, times = 1, multiplier = 1) {
    const initial = splitLinesIntoArray(file).map(n => <Num>{value: Number(n) * multiplier});
    const mixed = [...initial];
    for (let _ = 0; _ < times; _++) {
        for (const num of initial) {
            const mixedIndex = mixed.indexOf(num);
            let newMixedIndex = mod(mixedIndex + num.value, mixed.length - 1);
            newMixedIndex = newMixedIndex === 0 ? mixed.length - 1 : newMixedIndex;
            move(mixedIndex, newMixedIndex, mixed);
        }
    }

    return mixed;
}

function getGroveCoordinates(mixed: Num[]) {
    const zeroIndex = mixed.findIndex(n => n.value === 0);
    return sum([1000, 2000, 3000].map(number => mixed[mod((zeroIndex + number), mixed.length)].value));
}

q1();
q2();
