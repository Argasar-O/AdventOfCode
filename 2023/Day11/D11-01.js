import {input, inputE} from "./D11-Input.js";

let result = 0;
const array = [];
input.split('\n').forEach(line => array.push(line.split('')));
const transposedArray = array[0].map((col, i) => array.map(row => row[i]));

const lineDuplicatedIds = [];
for (let i = 0; i < array.length; i++) {
    if (array[i].filter(c => c === '#').length === 0) lineDuplicatedIds.push(i);
}
const columnDuplicatedIds = [];
for (let i = 0; i < transposedArray.length; i++) {
    if (transposedArray[i].filter(c => c === '#').length === 0) columnDuplicatedIds.push(i);
}

const galaxies = [];
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === "#") {
            galaxies.push([i + lineDuplicatedIds.filter(ind => ind < i).length, j + columnDuplicatedIds.filter(ind => ind < j).length]);
        }
    }
}

for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
        if (i > j) {
            result += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
        }
    }
}


console.log(result);