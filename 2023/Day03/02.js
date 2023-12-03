import {input} from "./input.js"

let result = 0;
let array = input.split('\n');

const getNumbersAround = (i, j) => {
    const numberAround = [];
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if (i - di >= 0 && j - dj >= 0 && i - di < array.length && j - dj < array[i].length) {
                if (!!(array[i - di][j - dj] && array[i - di][j - dj].match(/([0-9])/g)))
                    numberAround.push([i - di, j - dj]);
            }
        }
    }
    return numberAround;
}

const reconstructNumberRecursive = (coords, indexNextCount, number) => {
    if (coords[1] + indexNextCount >= 0 &&
        coords[1] + indexNextCount <= array[coords[0]].length - 1 &&
        array[coords[0]][coords[1] + indexNextCount].match(/[0-9]/g)) {
        number.push([coords[0], coords[1] + indexNextCount, array[coords[0]][coords[1] + indexNextCount]]);
        return reconstructNumberRecursive([coords[0], coords[1] + indexNextCount], indexNextCount, number);
    }
    return number;
}


const getNumbersFromIds = (numbersAround) => {
    const alreadyDone = [];
    const result = [];
    numbersAround.forEach(nbCoord => {
        if (!alreadyDone.map(v => JSON.stringify(v)).includes(JSON.stringify(nbCoord))) {
            const numberBefore = reconstructNumberRecursive(nbCoord, -1, []);
            numberBefore.reverse();
            const numberAfter = reconstructNumberRecursive(nbCoord, 1, []);
            result.push(numberBefore.map(nb => nb[2]).join('') + array[nbCoord[0]][nbCoord[1]] + numberAfter.map(na => na[2]).join(''));
            alreadyDone.push(...numberBefore.map(nb => [nb[0], nb[1]]));
            alreadyDone.push(...numberAfter.map(na => [na[0], na[1]]));
        }
    })
    return result;
}

for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === "*") {
            const numbersAround = getNumbersAround(i, j);
            const numbers = getNumbersFromIds(numbersAround);
            if (numbers.length === 2) result += numbers[0] * numbers[1];
        }
    }
}

console.log(result);