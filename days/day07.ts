import {sortAsc, sortDesc, splitLinesIntoArray, sum} from "../utils";
import {d07i, d07s} from "../data";

interface Directory {
    name: string,
    parent?: Directory,
    subDirs: Directory[],
    files: File[]
}

interface File {
    name: string,
    size: number
}

function q1() {
    const rootDir = parseFileSystem(d07i);
    console.log("d07q1: " + getQ1Size(rootDir));
}

function q2() {
    const rootDir = parseFileSystem(d07i);
    const allDirSizes = sortAsc(flattenDirSizes(rootDir));
    const unusedSpace = 70000000 - allDirSizes[allDirSizes.length - 1];
    const needsToBeFreedUp = 30000000 - unusedSpace;
    console.log("d07q2: " + allDirSizes.find(s => s > needsToBeFreedUp));
}

function parseFileSystem(input: string) {
    let rootDir: Directory;
    let currentDir: Directory;
    for (const line of splitLinesIntoArray(input)) {
        if (line.startsWith("$ cd")) {
            const param = line.substring(5);
            if (param !== "..") {
                const newDir = <Directory>{name: param, subDirs: [], files: []};
                if (rootDir === undefined) {
                    rootDir = newDir
                } else {
                    newDir.parent = currentDir;
                    currentDir.subDirs.push(newDir)
                }
                currentDir = newDir;
            } else {
                currentDir = currentDir.parent;
            }
        } else if (Number(line.charAt(0))) {
            const [size, name] = line.split(" ");
            currentDir.files.push({name, size: Number(size)})
        }
    }

    return rootDir;
}

function getQ1Size(dir: Directory) {
    let total = 0;
    const size = calculateDirSize(dir);
    if (size < 100000) {
        total += size;
    }
    dir.subDirs.map(d => total += getQ1Size(d))
    return total;
}

function calculateDirSize(dir: Directory) {
    return sum(dir.files.map(f => f.size)) + sum(dir.subDirs.map(d => calculateDirSize(d)))
}

function flattenDirSizes(dir: Directory) {
    const sizes = [calculateDirSize(dir)];
    dir.subDirs.map(subDir => sizes.push(...flattenDirSizes(subDir)))
    return sizes;
}

q1();
q2();
