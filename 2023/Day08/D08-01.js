import {input, inputE} from "./D08-Input.js";

let result = 0;
const lines = input.split('\n');
const path = lines.shift();
lines.shift();

const map = {}
lines.forEach((line) => {
    const split = line.split(" = ");
    const key = split[0];
    const split2 = split[1].split(",");
    map[key] = [split2[0].replace("(", ""), split2[1].replace(")", "").trim()];
});

let currentPosition = "AAA";
while (currentPosition !== "ZZZ") {
    for (let direction of path) {
        if (currentPosition === "ZZZ") break;
        result++;
        const dir = direction === "L" ? 0 : 1;
        currentPosition = map[currentPosition][dir];
    }
}

console.log(result);