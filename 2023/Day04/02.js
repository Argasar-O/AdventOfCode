import {input, inputE} from "./input.js";

const games = input.split("\n");
let result = 0;

const virtualCards = [];
games.forEach(game => {
    const virtualOrNotCards = 1 + (virtualCards.shift() || 0);

    const cards = game.split(": ")[1];
    const [myNumbers, winningNumbers] = cards.split('|');
    let winCards = 0;

    myNumbers.split(" ").forEach(number => {
        if (number.match(/[0-9]/g) && winningNumbers.split(" ").includes(number)) {
            virtualCards[winCards] ? virtualCards[winCards]+= 1*virtualOrNotCards: virtualCards[winCards]=1*virtualOrNotCards;
            winCards += 1;
        }
    })
    result += virtualOrNotCards;
})

console.log(result);
