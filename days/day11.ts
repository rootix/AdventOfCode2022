import {multiply, sortDesc, splitLinesByEmptyLines, splitLinesIntoArray} from "../utils";
import {d11i, d11s} from "../data";

interface Monkey {
    items: number[],
    operation: (item: number) => number,
    test: number;
    testPassedMonkey: number,
    testFailedMonkey: number
    itemsInspected: number
}

function q1() {
    const monkeys = parseInput(d11i);
    playRounds(monkeys, 20, true);
    console.log("d11q1: " + getMonkeyBusinessLevel(monkeys));
}

function q2() {
    const monkeys = parseInput(d11i);
    playRounds(monkeys, 10000, false);
    console.log("d11q2: " + getMonkeyBusinessLevel(monkeys));
}

function parseInput(input: string): Monkey[] {
    const monkeys = [];
    for (const monkeyDefinition of splitLinesByEmptyLines(input)) {
        const monkeySpec = splitLinesIntoArray(monkeyDefinition);
        const monkey = <Monkey>{};
        monkeys.push(monkey);

        monkey.items = monkeySpec[1].substring(18).split(', ').map(Number);
        monkey.test = Number(monkeySpec[3].substring(21));
        monkey.testPassedMonkey = Number(monkeySpec[4].substring(29));
        monkey.testFailedMonkey = Number(monkeySpec[5].substring(30));
        monkey.itemsInspected = 0;

        const operation = monkeySpec[2].substring(19);
        if (operation === "old * old") {
            monkey.operation = item => item * item;
        } else if (operation.indexOf('*') !== -1) {
            monkey.operation = item => item * Number(operation.substring(5));
        } else {
            monkey.operation = item => item + Number(operation.substring(5));
        }
    }

    return monkeys;
}

function playRounds(monkeys: Monkey[], rounds: number, onlySlightlyWorried: boolean) {
    for (let _ = 0; _ < rounds; _++) {
        for (const monkey of monkeys) {
            while (monkey.items.length) {
                let inspectedItem = monkey.operation(monkey.items.shift());
                if (onlySlightlyWorried) {
                    inspectedItem = Math.floor(inspectedItem / 3);
                } else {
                    // NGL, i had to find this online. Holy moly
                    inspectedItem = inspectedItem % monkeys.reduce((a, b) => a * b.test, 1);
                }

                if (inspectedItem % monkey.test === 0) {
                    monkeys[monkey.testPassedMonkey].items.push(inspectedItem);
                } else {
                    monkeys[monkey.testFailedMonkey].items.push(inspectedItem);
                }

                monkey.itemsInspected++;
            }
        }
    }
}

function getMonkeyBusinessLevel(monkeys: Monkey[]) {
    return multiply(sortDesc(monkeys.map(m => m.itemsInspected)).slice(0, 2));
}

q1();
q2();
