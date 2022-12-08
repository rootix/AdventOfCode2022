export function splitLinesByEmptyLines(input: string) {
    return input.split('\n\n');
}

export function splitLinesIntoArray(input: string) {
    return input.split('\n');
}

export function sum(array: number[]) {
    if (!array.length) {
        return 0;
    }

    return array.reduce((total, current) => total + current);
}

export function multiply(array: number[]) {
    return array.reduce((total, current) => total * current);
}

export function sortAsc(array: number[]) {
    return array.sort((a, b) => b > a ? -1 : b < a ? 1 : 0);
}

export function sortDesc(array: number[]) {
    return array.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
}

export function intersect<T>(first: T[], second: T[]): T[] {
    return first.filter(val => second.includes(val));
}
