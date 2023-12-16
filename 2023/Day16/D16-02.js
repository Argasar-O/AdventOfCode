import {input, inputE} from "./D16-Input.js";

const mappy = input.split('\n').map(str => str.split(''));

const getNbEnergized = (beams) => {
    let result = 0;

    const energizedMappy = JSON.parse(JSON.stringify(mappy));
    const alreadyPassedCheckPoints = [];

    while (beams.length > 0) {
        for (let i = 0; i < beams.length; i++) {
            let beam = beams[i];
            beam[0] = [beam[0][0] + beam[1][0], beam[0][1] + beam[1][1]];
            // remove if not in map
            if (beam[0][0] < 0 || beam[0][0] >= mappy.length || beam[0][1] < 0 || beam[0][1] >= mappy[0].length) {
                beams.splice(i, 1);
                i--;
                continue;
            }
            energizedMappy[beam[0][0]][beam[0][1]] = "#";
            let pointPassed = false;
            switch (mappy[beam[0][0]][beam[0][1]]) {
                case '/':
                    if (!alreadyPassedCheckPoints.includes(JSON.stringify([beam[0][0], beam[0][1]]) + "-" + JSON.stringify([beam[1][0], beam[1][1]]))) {
                        alreadyPassedCheckPoints.push(JSON.stringify([beam[0][0], beam[0][1]]) + "-" + JSON.stringify([beam[1][0], beam[1][1]]));
                        if (beam[1][0] === 0) {
                            if (beam[1][1] > 0) {
                                beam[1] = [-1, 0];
                            } else {
                                beam[1] = [1, 0];
                            }
                        } else {
                            if (beam[1][0] > 0) {
                                beam[1] = [0, -1];
                            } else {
                                beam[1] = [0, 1];
                            }
                        }
                    } else {
                        pointPassed = true;
                    }
                    break;
                case '\\':
                    if (!alreadyPassedCheckPoints.includes(JSON.stringify([beam[0][0], beam[0][1]]) + "-" + JSON.stringify([beam[1][0], beam[1][1]]))) {
                        alreadyPassedCheckPoints.push(JSON.stringify([beam[0][0], beam[0][1]]) + "-" + JSON.stringify([beam[1][0], beam[1][1]]));
                        if (beam[1][0] === 0) {
                            if (beam[1][1] > 0) {
                                beam[1] = [1, 0];
                            } else {
                                beam[1] = [-1, 0];
                            }
                        } else {
                            if (beam[1][0] > 0) {
                                beam[1] = [0, 1];
                            } else {
                                beam[1] = [0, -1];
                            }
                        }
                    } else
                        pointPassed = true;
                    break;
                case '-' :
                    if (beam[1][0] !== 0) {
                        if (!alreadyPassedCheckPoints.includes(JSON.stringify([beam[0][0], beam[0][1]]))) {
                            alreadyPassedCheckPoints.push(JSON.stringify([beam[0][0], beam[0][1]]));
                            beam[1] = [0, 1];
                            beams.push([beam[0], [0, -1]]);
                        } else pointPassed = true;
                    }
                    break;
                case '|':
                    if (beam[1][0] === 0)
                        if (!alreadyPassedCheckPoints.includes(JSON.stringify([beam[0][0], beam[0][1]]))) {
                            alreadyPassedCheckPoints.push(JSON.stringify([beam[0][0], beam[0][1]]));
                            beam[1] = [1, 0];
                            beams.push([beam[0], [-1, 0]]);
                        } else pointPassed = true;
                    break;
            }

            if (pointPassed) {
                beams.splice(i, 1);
                i--;
            }

        }
    }
    energizedMappy.forEach(line => {
        line.forEach(char => {
            if (char === "#") result++;
        })
    });

    return result;
}

let max = 0;
for (let i = 0; i < mappy.length; i++) {
    let result = getNbEnergized([[[i, -1], [0, 1]]]);
    max = max < result ? result : max;
    result = getNbEnergized([[[i, mappy.length], [0, -1]]]);
    max = max < result ? result : max;
}
for (let j = 0; j < mappy[0].length; j++) {
    let result = getNbEnergized([[[-1, j], [1, 0]]]);
    max = max < result ? result : max;
    result = getNbEnergized([[[mappy[0].length, j], [-1, 0]]]);
    max = max < result ? result : max;
}

console.log(max);