import {input, inputE} from "./D12-Input.js";

let result = 0;
const array = [];

const tryPossibility = (line, index) => {
    if (index === line.length - 1) return line[index] === "?" ? ["#", "."] : [line[index]];
    const possibility = [];
    const next = tryPossibility(line, index + 1);
    next.forEach(subNext => {
        if (line[index] === "?") {
            possibility.push(["#"].concat(...subNext));
            possibility.push(["."].concat(...subNext));
        } else possibility.push([line[index]].concat(...subNext));
    });

    return possibility;
}

const makePatternString = (patternSplit) => {
    const string = [];
    patternSplit.forEach(number => {
        string.push("#".repeat(parseInt(number)));
    });
    return "^\\.*" + string.join("\\.+") + "\\.*$";
}

input.split('\n').forEach(line => {
    const [lineChar, pattern] = line.split(" ");
    const possibilities = tryPossibility(lineChar, 0);
    const patternSplit = pattern.split(",");
    const regexString = makePatternString(patternSplit);
    const regex = new RegExp(regexString);
    possibilities.forEach(possibility => {
        if (possibility.join('').match(regex)) result++;
    });
});


console.log(result);