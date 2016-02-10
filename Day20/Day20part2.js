
"use strict";
let _ = require('lodash');

let presentsCap = 33100000;

let factorize = (number) => {
    if (number == 1) { return [1]; }
    else if (number < 4) { return [1, number]; }
    else if (number == 4) {return [1, 2, 4]; };
    
    return _.transform(_.range(2, Math.floor(Math.sqrt(number))), (factors, element) => {
        if ( number % element == 0 && number / element <= 50 ) { factors.push(element, number/element); };
    }, [1,number]);
};

let presentSum = (number) => {
    return _.reduce(factorize(number), (result, factor) => {
        return result + factor;
    }, 0) * 11;
};

let houseCounter = (cap) => {
    for ( let house = 1; true; house++) {
        if (presentSum(house) >= cap) { return house; };
    };
};

houseCounter(presentsCap);