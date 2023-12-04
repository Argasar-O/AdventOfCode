import {input, inputE} from "./D04-input.js";

const games = input.split("\n");
let result = 0;

games.forEach(game => {
    const cards = game.split(": ")[1];
    const [myNumbers, winningNumbers] = cards.split('|');
    let points = 0;

    myNumbers.split(" ").forEach(number => {
        if (number.match(/[0-9]/g) && winningNumbers.split(" ").includes(number)) {
            if (points === 0) points += 1;
            else points *= 2;
        }
    })
    result += points;
})

console.log(result);
