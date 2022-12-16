import {splitLinesIntoArray} from "../utils";
import {d16i, d16s} from "../data";

interface Step {
    remaining: number,
    valve: string,
    pressure: number,
    opened: string[]
}

// Credit to https://github.com/carrdelling/AdventOfCode2022/blob/main/day16/silver.py
function q1() {
    const flows: { [key: string]: number } = {};
    const tunnels: { [key: string]: string[] } = {};
    splitLinesIntoArray(d16i)
        .map(valve => valve.match(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/).slice(1))
        .forEach(v => {
            flows[v[0]] = Number(v[1]);
            tunnels[v[0]] = v[2].split(", ");
        });

    console.log("d16q1: " + getMaxPressureQueue(flows, tunnels))
    // console.log("d16q1: " + getMaxPressureRecursive(29, 0, "AA", flows, tunnels, [], {}))
}

function getMaxPressureQueue(
    flows: { [key: string]: number },
    tunnels: { [key: string]: string[] }) {
    const queue: Step[] = [{remaining: 29, valve: 'AA', pressure: 0, opened: []}];
    const cache: { [key: string]: number } = {};
    let maxPressure = 0;

    while (queue.length) {
        const {remaining, valve, pressure, opened} = queue.pop();
        if (cache.hasOwnProperty(`${remaining};${valve}`)) {
            if (cache[`${remaining};${valve}`] >= pressure) {
                continue
            }
        }

        cache[`${remaining};${valve}`] = pressure;

        if (remaining === 0) {
            maxPressure = Math.max(maxPressure, pressure);
            continue;
        }

        if (flows[valve] > 0 && !opened.includes(valve)) {
            const newPressure = pressure + [...opened, valve].reduce((sum, valve) => sum + flows[valve], 0);
            queue.push({remaining: remaining - 1, pressure: newPressure, valve, opened: [...opened, valve]});
        }

        const newPressure = pressure + opened.reduce((sum, valve) => sum + flows[valve], 0);
        tunnels[valve].forEach(v => {
            queue.push({remaining: remaining - 1, pressure: newPressure, valve: v, opened});
        })
    }

    return maxPressure;
}


// G*d d*mn, why does this recursive version give the correct result for the sample, but not for my input?!
// function getMaxPressureRecursive(remaining: number,
//                                  pressure: number,
//                                  valve: string,
//                                  flows: { [key: string]: number },
//                                  tunnels: { [key: string]: string[] },
//                                  opened: string[],
//                                  cache: { [key: string]: number }): number {
//     if (cache.hasOwnProperty(`${remaining};${valve}`)) {
//         if (cache[`${remaining};${valve}`] >= pressure) {
//             return cache[`${remaining};${valve}`];
//         }
//     }
//
//     cache[`${remaining};${valve}`] = pressure;
//
//     if (remaining === 0) {
//         return pressure;
//     }
//
//     let maxPressure = 0;
//
//     if (flows[valve] > 0 && !opened.includes(valve)) {
//         const newPressure = pressure + [...opened, valve].reduce((sum, valve) => sum + flows[valve], 0);
//         maxPressure = Math.max(maxPressure, getMaxPressureRecursive(remaining - 1, newPressure, valve, flows, tunnels, [...opened, valve], cache))
//     }
//
//     const newPressure = pressure + opened.reduce((sum, valve) => sum + flows[valve], 0);
//     tunnels[valve].forEach(v => {
//         maxPressure = Math.max(maxPressure, getMaxPressureRecursive(remaining - 1, newPressure, v, flows, tunnels, opened, cache))
//     })
//
//     return maxPressure;
// }

q1();
