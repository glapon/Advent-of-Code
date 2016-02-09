
"use strict";
let _ = require('lodash');

let presentsCap = 33100000;

let factorize = (number) => {
    if (number < 4) { return [1, number]; }
    else if (number == 4) {return [1, 2, 4]; };

    let possibles = _.range(2, Math.floor(number/2));

    let factors = _.transform(possibles, (factors, element) => {
        if ( number % element == 0) { factors.push(element, number/element); };
    }, [1,number]);

    return (_.unionWith(factors, factors, _.isEqual)); // return unique factors (to speed up, could fix above so (in cases like 12) it only pushes factors once by checking if other factor is < number/2), and remove this
};

let presentSum = (number) => {
    let factors = factorize(number);

    let totalPresents = _.transform(factors, (result, factor) => {
        result = result + factor * 10;
    }, 0);

    return totalPresents;
};

let houseCounter = (cap) => {
    let limit = cap;

    for ( let house = 1; true; house++) { // to speed this up, is there a number, based on value of cap, to start at higher than 1?
        if (presentSum(house) >= cap) { return house; };
    };
};

houseCounter(presentsCap);