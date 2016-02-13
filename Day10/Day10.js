"use strict";
let _ = require('lodash');

let input = '3113322113';

let translate = (input) => {
    let inputArray = input.slice('');
    
    // make array of objects, each one having the number and number of times it appears in a row
    let numTimes = _.transform(inputArray, (result, num, index, array) => {
        if (num == array[index - 1]) { _.last(result).times++; }
        else { result.push({ number: num, times: 1}); };
    }, []);

    // use that array of objects to return look-and-say translation
    return _.reduce(numTimes, (result, countObject) => {
        return result.concat(countObject.times, countObject.number);
    }, '');    
};

let translateForty = (input, counter) => {
    if (counter == 40) { return input; }
    else { return translateForty(translate(input), counter + 1); };
};

let translateFifty = (input, counter) => {
    if (counter == 50) { return input; }
    else { return translateForty(translate(input), counter + 1); };
};

let answer = translateForty(input, 0).length;

let answerPart2 = translateFifty(input, 0).length; //takes a long time...refactor?


