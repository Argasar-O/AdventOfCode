import {input, inputE} from "./D15-Input.js";

const holidayASCIIStringHelper = (str) => {
    let value = 0;
    for (let i = 0; i < str.length; i++) {
        value = (value + str.charCodeAt(i)) * 17 % 256;
    }
    return value;
}


console.log(input.split(",").map(v => holidayASCIIStringHelper(v)).reduce((sum, cur) => sum + cur));