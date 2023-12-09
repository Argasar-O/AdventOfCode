import {input, inputE} from "./D09-Input.js";

let result = 0;
const lines = input.split('\n');

lines.forEach((line) => {
    const numbersExtrapolation = [line.split(' ').map(str => parseInt(str))];
    while (!numbersExtrapolation[numbersExtrapolation.length - 1].every(v => v === 0)) {
        const current = numbersExtrapolation[numbersExtrapolation.length - 1];
        numbersExtrapolation.push([]);
        for (let i = 1; i < current.length; i++) {
            numbersExtrapolation[numbersExtrapolation.length - 1].push(current[i] - current[i - 1]);
        }
    }
    const predict = [0];
    for (let i = numbersExtrapolation.length - 2; i >= 0; i--) {
        predict.push(numbersExtrapolation[i][0] - predict[predict.length - 1]);
    }
    result += predict[predict.length - 1];
});

console.log(result);