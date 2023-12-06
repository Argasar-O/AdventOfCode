import {input, inputE} from "./D05-input.js";

const categories = input.split("\n\n");
const tableSeeds = []
categories.shift().split(': ')[1].split(' ').forEach(seedNumber => {
    tableSeeds.push([parseInt(seedNumber), parseInt(seedNumber), false]);
});

categories.forEach(category => {
    const numbersLine = category.split("\n");
    numbersLine.shift();
    tableSeeds.forEach(ts => ts[2] = false);
    numbersLine.forEach(numbersStr => {
        const numbers = numbersStr.split(" ").map(str => parseInt(str))
        let [source, maxSource, destinationBase] = [numbers[1], numbers[1] + numbers[2], numbers[0]];

        tableSeeds.forEach(seedMap => {
            if (!seedMap[2] && seedMap[1] >= source && seedMap[1] <= maxSource) {
                seedMap[1] = seedMap[1] + (destinationBase - source);
                seedMap[2] = true;
            }
        });
    });
})

console.log(Math.min(...tableSeeds.map(ts => ts[1])));
