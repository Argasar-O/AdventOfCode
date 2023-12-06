import {input, inputE} from "./D06-Input.js";

let result = 1;

let raceTime = []
let raceRecord = []
input.split('\n').forEach((line, index) => {
    let matched = line.match(/[0-9]+/g);
    if (index === 0) raceTime = matched.map(m => parseInt(m));
    else raceRecord = matched.map(m => parseInt(m));
});

for (let i = 0; i < raceTime.length; i++) {
    let nbWin = 0;
    for (let msPushed = 0; msPushed <= raceTime[i]; msPushed++) {
        let distance = msPushed * (raceTime[i] - msPushed);
        if (distance > raceRecord[i]) nbWin++;
    }
    result *= nbWin;
}

console.log(result);