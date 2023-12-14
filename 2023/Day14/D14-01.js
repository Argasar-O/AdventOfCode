import {input, inputE} from "./D14-Input.js";

let result = 0;

const mappy = input.split("\n").map(line => line.split(""));

const transpose = (array) => {
    return array[0].map((_, index) => array.map(row => row[index]));
}

const transposed = transpose(mappy);
console.log(transposed.map(line => line.join("")).join("\n"));

for (let lineIndex = 0; lineIndex < transposed.length; lineIndex++) {
    let blocked = -1;
    for (let tileIndex = 0; tileIndex < transposed[lineIndex].length; tileIndex++) {
        switch (transposed[lineIndex][tileIndex]) {
            case "O":
                transposed[lineIndex][tileIndex] = ".";
                transposed[lineIndex][blocked + 1] = "O";
                blocked = blocked + 1;
                break;
            case "#":
                blocked = tileIndex;
                break;
            case ".":
                break;
        }
    }
}
transposed.forEach(line => {
    line.reverse().forEach((tile, index) => {
        if (tile === "O") result += index + 1;
    });
});

console.log(result);