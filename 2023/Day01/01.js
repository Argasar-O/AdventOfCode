import {input} from "./input";

let result = 0;

input.forEach(line => {
    let matched = line.match(/[0-9]/g);
    let number = matched[0] + matched[matched.length - 1];
    result += parseInt(number);
})

console.log(result);