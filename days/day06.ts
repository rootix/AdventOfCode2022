import {d06i, d06s} from "../data";

function q1() {
    console.log("d06q1: " + getMarkerPosition(d06i, 4));
}

function q2() {
    console.log("d06q2: " + getMarkerPosition(d06i, 14));
}

function getMarkerPosition(input: string, distinct: number) {
    for (let i = distinct; i < input.length; i++) {
        if (new Set(input.slice(i - distinct, i)).size == distinct) {
            return i;
        }
    }

    return -1;
}

q1();
q2();
