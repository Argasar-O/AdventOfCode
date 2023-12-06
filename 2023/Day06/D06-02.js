import {input, inputE} from "./D06-Input.js";

let raceTime;
let raceRecord;
input.split('\n').forEach((line, index) => {
    let matched = line.match(/[0-9]+/g).join('');
    if (index === 0) raceTime = parseInt(matched);
    else raceRecord = parseInt(matched);
});

let nbWin = 0;
for (let msPushed = Math.trunc(raceRecord / raceTime) + 1; msPushed <= raceTime; msPushed++) {
    let distance = msPushed * (raceTime - msPushed);
    if (distance > raceRecord) nbWin++;
}

console.log(nbWin);