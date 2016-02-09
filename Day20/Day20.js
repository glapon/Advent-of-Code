
"use strict";
let _ = require('lodash');

let presentsCap = 33100000;


let factorize = (number) => {
    if (number == 1) { return [1]; }
    else if (number < 4) { return [1, number]; }
    else if (number == 4) {return [1, 2, 4]; };

    let possibles = _.range(2, Math.floor(number/2));

    let factors = _.transform(possibles, (factors, element) => {
        if ( number % element == 0) { factors.push(element, number/element); };
    }, [1,number]);

    return (_.unionWith(factors, factors, _.isEqual)); //speed up by removing need? (12 as example)
};

let presentSum = (number) => {
    let factors = factorize(number);

    let totalPresents = _.reduce(factors, (result, factor) => {
        return result + factor * 10;
    }, 0);

    return totalPresents;
};

let houseCounter = (cap) => {
    for ( let house = 1; true; house++) { // to speed this up, is there a number, based on value of cap, to start at higher than 1?
        if (presentSum(house) >= cap) { return house; };
    };
};

houseCounter(presentsCap);