import {input} from "./D03-input.js"

let result = 0;
let array = input.split('\n');

for (let i = 0; i < array.length; i++) {
    let value = "";
    let isSpecialAround = false;
    for (let j = 0; j < array[i].length; j++) {
        if (array[i][j].match(/[0-9]/)) {
            value += array[i][j];
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    if (i - di >= 0 && j - dj >= 0 && i - di < array.length && j - dj < array[i].length) {
                        if (!!(array[i - di][j - dj] && array[i - di][j - dj].match(/([^0-9|.])/g)))
                            isSpecialAround = true;
                    }
                }
            }
        } else {
            if (isSpecialAround) {
                console.log(value);
                result += parseInt(value);
            }
            value = "";
            isSpecialAround = false;
        }
    }
    if (isSpecialAround) {
        result += parseInt(value);
    }
}

console.log(result);