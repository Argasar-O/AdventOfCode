import {input} from "./input.js"

let result = 0;

input.split('\n').forEach(game => {
    const [gameId, set] = game.split(':')
    const sets = set.split(';');
    const max = {red: 0, green: 0, blue: 0}
    sets.forEach(set => {
        const colors = set.split(',');
        colors.forEach(colorLine => {
            const color = colorLine.match(/(blue|green|red)/g)[0];
            const number = parseInt(colorLine.match(/[0-9]+/g)[0]);
            if (max[color] < number) max[color] = number;
        });
    });
    result += max['red'] * max['green'] * max["blue"];
})
console.log(result);