import { d1i } from '../data'
import { splitLinesByEmptyLines, splitLinesIntoArray, sum, sortDesc } from '../utils'

export function q1() {
    const aggregatedValues = splitLinesByEmptyLines(d1i)
        .map(splitLinesIntoArray)
        .map(group => group.map(Number))
        .map(group => sum(group));
    console.log('d1q1: ' + Math.max(...aggregatedValues));
}

export function q2() {
    const aggregatedValues = sortDesc(splitLinesByEmptyLines(d1i)
        .map(splitLinesIntoArray)
        .map(group => group.map(Number))
        .map(group => sum(group)));
    console.log('d1q2: ' + sum(aggregatedValues.slice(0, 3)));
}

q1();
q2();
