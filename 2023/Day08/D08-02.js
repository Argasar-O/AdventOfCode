import {input, inputE2} from "./D08-Input.js";

const lines = input.split('\n');
const path = lines.shift();
lines.shift();

const map = {};
let start = [];
lines.forEach((line) => {
    const split = line.split(" = ");
    const key = split[0];
    const split2 = split[1].split(",");
    map[key] = [split2[0].replace("(", ""), split2[1].replace(")", "").trim()];
    if (key[2] === "A") start.push([key, 0, false]);
});

while (!start.every(point => point[2])) {
    for (let direction of path) {
        if (start.every(point => point[2])) break;
        const dir = direction === "L" ? 0 : 1;
        for (let i = 0; i < start.length; i++) {
            if (!start[i][2]) {
                start[i][1]++;
                start[i][0] = map[start[i][0]][dir];
                if (start[i][0][2] === "Z") start[i][2] = true;
            }
        }
    }
}

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

console.log(start.map(s => s[1]).reduce(lcm));