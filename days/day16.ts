import {splitLinesIntoArray} from "../utils";
import {d16i, d16s} from "../data";

function q1() {
    const {flows, tunnels} = parseInput(d16i);
    console.log("d16q1: " + getMaxPressure(30, "AA", [], false, flows, tunnels, {}));
}

function q2() {
    const {flows, tunnels} = parseInput(d16i);
    console.log("d16q2: " + getMaxPressure(26, "AA", [], true, flows, tunnels, {}));
}

function parseInput(input: string): { flows: { [key: string]: number }, tunnels: { [key: string]: string[] } } {
    const flows: { [key: string]: number } = {};
    const tunnels: { [key: string]: string[] } = {};
    splitLinesIntoArray(input)
        .map(valve => valve.match(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/).slice(1))
        .forEach(v => {
            flows[v[0]] = Number(v[1]);
            tunnels[v[0]] = v[2].split(", ");
        });
    return {flows, tunnels};
}

function getMaxPressure(remaining: number,
                        valve: string,
                        opened: string[],
                        withElephant: boolean,
                        flows: { [key: string]: number },
                        tunnels: { [key: string]: string[] },
                        cache: { [key: string]: number }): number {
    if (remaining <= 0) {
        return withElephant ? getMaxPressure(26, "AA", opened, false, flows, tunnels, cache) : 0;
    }

    const cacheKey = `${remaining};${valve};${withElephant};${opened.join('')}`;
    if (cache.hasOwnProperty(cacheKey)) {
        return cache[cacheKey];
    }

    let maxPressure = 0;
    if (flows[valve] > 0 && !opened.includes(valve)) {
        const valvePressure = (remaining - 1) * flows[valve];
        const openedWithValve = opened.concat(valve).sort();
        tunnels[valve].forEach(tunnel => {
            maxPressure = Math.max(maxPressure, valvePressure + getMaxPressure(remaining - 2, tunnel, openedWithValve, withElephant, flows, tunnels, cache));
        })
    }

    tunnels[valve].forEach(tunnel => {
        maxPressure = Math.max(maxPressure, getMaxPressure(remaining - 1, tunnel, opened, withElephant, flows, tunnels, cache));
    })

    cache[cacheKey] = maxPressure;
    return maxPressure;
}

q1();
q2();
