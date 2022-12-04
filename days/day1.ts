import {d1s, d1i} from '../data'
import {splitLinesByEmptyLines, splitLinesIntoArray, sum, sortDesc} from '../utils'

function q1() {
    const result = Math.max(...splitLinesByEmptyLines(d1i)
        .map(splitLinesIntoArray)
        .map(group => group.map(Number))
        .map(group => sum(group)));

    console.log('d1q1: ' + result);
}

function q2() {
    const result = sum(sortDesc(splitLinesByEmptyLines(d1i)
        .map(splitLinesIntoArray)
        .map(group => group.map(Number))
        .map(group => sum(group)))
        .slice(0, 3));

    console.log('d1q2: ' + result);
}

q1();
q2();
