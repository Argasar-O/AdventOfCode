import {input, inputE} from "./D13-Input.js";

let result = 0;

const patterns = input.split("\n\n");

const isSymmetric = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false
    }
    return true;
}

const transpose = (array) => {
    return array[0].map((_, index) => array.map(row => row[index]));
}

const countResult = (patternsArray, isHorizontal) => {
    let localResult = 0;
    for (let pattern of patternsArray) {

        let lines = pattern.split('\n');
        if (!isHorizontal) {
            lines = transpose(lines.map(line => line.split(''))).map(line => line.join(''));
        }
        for (let lineId = 1; lineId < lines.length; lineId++) {
            const array1 = lines.slice(0, lineId).reverse();
            const array2 = lines.slice(lineId, lines.length);
            let isSym = false;
            if (array1.length < array2.length) {
                isSym = isSymmetric(array1, array2);
            } else {
                isSym = isSymmetric(array2, array1);
            }
            if (isSym) {
                localResult += isHorizontal ? lineId * 100 : lineId;
            }
        }
    }
    return localResult;
}

result += countResult(patterns, true);
result += countResult(patterns, false);

console.log(result);