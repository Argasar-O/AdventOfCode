import {input, inputE} from "./D05-input.js";

const categories = input.split("\n\n");
const tableSeedsRange = []
let tempSeedRange = []
categories.shift().split(': ')[1].split(' ').forEach((seedNumber, index) => {
    if (index % 2 === 1) {
        tempSeedRange.push(parseInt(seedNumber) + tempSeedRange[0]);
        tableSeedsRange.push(tempSeedRange);
        tempSeedRange = [];
    } else {
        tempSeedRange.push(parseInt(seedNumber));
    }
});

const splitRanges = (start, ranges) => {
    let points = [start[0], start[1], ...ranges.source]
    points.sort((a, b) => a - b);
    let diff = ranges.destination[0] - ranges.source[0];

    if (start[0] < ranges.source[0] && start[1] > ranges.source[1]) return [[start[0], ranges.source[0] - 1, start[2]], [ranges.source[0] + diff, ranges.source[1] + diff, start[2] + 1], [ranges.source[1] + 1, start[1], start[2]]];
    if (start[1] <= ranges.source[1] && start[0] >= ranges.source[0]) return [[start[0] + diff, start[1] + diff, start[2] + 1]]
    if (start[1] >= ranges.source[0] && start[0] < ranges.source[0]) return [[start[0], ranges.source[0] - 1, start[2]], [ranges.source[0] + diff, start[1] + diff, start[2] + 1]]
    if (start[0] <= ranges.source[1] && start[1] > ranges.source[1]) return [[start[0] + diff, ranges.source[1] + diff, start[2] + 1], [ranges.source[1] + 1, start[1], start[2]]]
    if (start[1] < ranges.source[0] || start[0] > ranges.source[1]) return [start];

    throw new Error();
}


const getNewRanges = (startRange, newRangesArray, indexRangeArray = 0) => {
    if (indexRangeArray >= newRangesArray.length) return startRange;
    const categoryRanges = newRangesArray[indexRangeArray]
    let splitedRanges = startRange;

    categoryRanges.forEach(categoryRange => {
        const newSplitRange = []
        splitedRanges.forEach(splitRange => {
            if (splitRange[2] === indexRangeArray) {
                newSplitRange.push(...splitRanges(splitRange, categoryRange));
            } else {
                newSplitRange.push(splitRange)
            }
        });
        splitedRanges = newSplitRange

    });
    splitedRanges = splitedRanges.map(sr => [sr[0], sr[1], indexRangeArray + 1])
    splitedRanges = getNewRanges(splitedRanges, newRangesArray, indexRangeArray + 1);
    return splitedRanges
}

let arrayCategories = [];
categories.forEach(category => {
    const numbersLine = category.split("\n");
    numbersLine.shift();
    let temp = [];

    numbersLine.map(line => line.split(" ").map(str => parseInt(str))).forEach(arrayInterval => {
        temp.push({
            source: [arrayInterval[1], arrayInterval[1] + arrayInterval[2] - 1],
            destination: [arrayInterval[0], arrayInterval[0] + arrayInterval[2] - 1]
        });
    });
    arrayCategories.push(temp);
});

const startRanges = tableSeedsRange.map(seedRange => [...seedRange, 0]);

const finalRanges = getNewRanges(startRanges, arrayCategories);

console.log(Math.min(...finalRanges.map(array => array[0])));
