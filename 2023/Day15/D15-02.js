import {input, inputE} from "./D15-Input.js";

let result = 0;

const holidayASCIIStringHelper = (str) => {
    let value = 0;
    for (let i = 0; i < str.length; i++) {
        value = (value + str.charCodeAt(i)) * 17 % 256;
    }
    return value;
}

const holidayASCIIStringHelperManualArrangementProcedure = (str) => {
    const strSplit = str.split("=");
    const label = strSplit.length === 1 ? strSplit[0].split('-')[0] : strSplit[0];
    const value = strSplit.length === 1 ? Infinity : parseInt(strSplit[1]);

    return {box: holidayASCIIStringHelper(label), label: label, value: value};
}

const boxes = {};

input.split(",").forEach(str => {
    const hashmap = holidayASCIIStringHelperManualArrangementProcedure(str);
    if (hashmap.value === Infinity) {
        if (boxes[hashmap.box])
            for (let i = 0; i < boxes[hashmap.box].length; i++) {
                if (boxes[hashmap.box][i].label === hashmap.label) {
                    boxes[hashmap.box].splice(i, 1);
                    break;
                }
            }
    } else {
        if(!boxes[hashmap.box]) boxes[hashmap.box] = [];
        let done = false;
        for (let i = 0; i < boxes[hashmap.box].length; i++) {
            if (boxes[hashmap.box][i].label === hashmap.label) {
                boxes[hashmap.box][i].value = hashmap.value;
                done = true;
                break;
            }
        }
        if (!done)
            boxes[hashmap.box].push({label: hashmap.label, value: hashmap.value});
    }
});

for (const [key, value] of Object.entries(boxes)){
    let boxValue = parseInt(key)+1;
    value.forEach((lens, index) => {
       result+= boxValue * (index+1) * lens.value;
    });
}

console.log(result);