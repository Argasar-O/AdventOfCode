import {input, inputE} from "./D07-Input.js";

let result = 0;
let hands = [];
const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].reverse();

const getHandType = (hand) => {
    const handCards = {}
    let jokers = 0;
    hand.split('').forEach(card => {
        if (card === 'J') {
            jokers++;
        } else {
            if (!handCards[card]) handCards[card] = 1;
            else handCards[card]++;
        }
    });
    const values = Object.values(handCards);
    values.sort((a, b) => b - a);
    if (jokers === 5) return 6;
    if (values[0] + jokers === 5) return 6;
    if (values[0] + jokers === 4) return 5;
    if (values[0] + jokers === 3) {
        if (values[1] === 2) return 4;
        else return 3;
    }
    if (values[0] + jokers === 2) {
        if (values[1] === 2) return 2;
        else return 1;
    }
    return 0;
}
const getCardValue = (card) => {
    return cards.indexOf(card);
}

input.split('\n').forEach((line, index) => {
    let value = line.split(' ');
    value.push(getHandType(value[0]));
    hands.push(value);
});

const compareHands = (handA, handB) => {
    if (handA[2] !== handB[2]) return handA[2] - handB[2];
    for (let i = 0; i < 5; i++) {
        if (handA[0][i] !== handB[0][i]) return getCardValue(handA[0][i]) - getCardValue(handB[0][i])
    }
    return 0
}

hands.sort(compareHands);
hands.forEach((v, i) => result += v[1] * (i + 1))
console.log(result);