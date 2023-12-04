import {input} from "./D01-Input.js";

const numbers = {one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9'};
let result = 0;

input.split('\n').forEach(line => {
    let matched = line.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/g);
    let first = matched[0].length > 1 ? numbers[matched[0]] : matched[0];

    let reverseLine = line.split("").reverse().join('');
    let reverseMatch = reverseLine.match(/([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g);
    let last = reverseMatch[0].length > 1 ? numbers[reverseMatch[0].split("").reverse().join("")] : reverseMatch[0];

    let number = first + last;
    result += parseInt(number);
})

console.log(result);