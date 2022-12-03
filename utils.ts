export function splitLinesByEmptyLines(input: string) {
    return input.split('\n\n');
}

export function splitLinesIntoArray(input: string) {
    return input.split('\n');
}
export function sum(array: number[]) {
    return array.reduce((total, current) => total + current);
}

export function sortDesc(array: number[]) {
    return array.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
}

export function intersect(first: string[], second: string[]): string[] {
    return first.filter(val => second.includes(val));
}
