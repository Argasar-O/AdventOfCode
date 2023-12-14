import {input, inputE} from "./D14-Input.js";

const objectHash = val => JSON.stringify(val);


let mappy = input.split("\n").map(line => line.split(""));
const transpose = (array) => {
    return array[0].map((_, index) => array.map(row => row[index]));
}
const goRoll = (mapp) => {
    let result = mapp;
    for (let lineIndex = 0; lineIndex < result.length; lineIndex++) {
        let blocked = -1;
        for (let tileIndex = 0; tileIndex < result[lineIndex].length; tileIndex++) {
            switch (result[lineIndex][tileIndex]) {
                case "O":
                    result[lineIndex][tileIndex] = ".";
                    result[lineIndex][blocked + 1] = "O";
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
    return result;
}

const count = (baseMap) => {
    let result = 0;

    transpose(baseMap).forEach(line => {
        line.forEach((tile, index) => {
            if (tile === "O") result += line.length - index;
        });
    });

    return result;
}

const goRollByDir = (baseMap, dir) => {
    let transposed = null;
    switch (dir) {
        case "N":
            transposed = transpose(baseMap);
            transposed = goRoll(transposed);
            transposed = transpose(transposed);
            return transposed;
        case "S":
            transposed = transpose(baseMap);
            transposed = transposed.map(line => line.reverse());
            transposed = goRoll(transposed);
            transposed = transposed.map(line => line.reverse());
            transposed = transpose(transposed);
            return transposed;
        case "W":
            transposed = baseMap;
            transposed = goRoll(transposed);
            return transposed;
        case "E":
            transposed = baseMap;
            transposed = transposed.map(line => line.reverse());
            transposed = goRoll(transposed);
            transposed = transposed.map(line => line.reverse());
            return transposed;
    }
}

const array = [];
let loopSize = -1;
let loopStartHash = -1;
const values = [];

for (let i = 0; i < 1000000; i++) {
    for (const dir of ["N", "W", "S", "E"]) {
        mappy = goRollByDir(mappy, dir);
    }
    const hash = objectHash(mappy);
    if (array.includes(hash)) {
        loopStartHash = array.indexOf(hash);
        loopSize = i - array.indexOf(hash);
        console.log(values[loopStartHash + (1000000000 - 1 - loopStartHash) % loopSize].count);
        break;
    } else {
        array.push(hash);
        values.push({map: '\n' + mappy.map(line => line.join('')).join('\n'), count: count(mappy)});
    }

}






