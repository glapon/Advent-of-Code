
"use strict";
let _ = require('lodash');

let presentsCap = 33100000;

let factorize = (number) => {
    if (number == 1) { return [1]; }
    else if (number < 4) { return [1, number]; }
    else if (number == 4) {return [1, 2, 4]; };
    
    //only need to look at numbers <= half the number
    return _.transform(_.range(2, Math.floor(Math.sqrt(number))), (factors, element) => {
        if ( number % element == 0 && factors.indexOf(element) == -1) { factors.push(element, number/element); };
    }, [1,number]);
};

let presentSum = (number) => {
    return _.reduce(factorize(number), (result, factor) => {
        return result + factor;
    }, 0) * 10;
};

let houseCounter = (cap) => {
    for ( let house = 1; true; house++) { // to speed this up, is there a number, based on value of cap, to start at higher than 1?
        if (presentSum(house) >= cap) { return house; };
    };
};

houseCounter(presentsCap);