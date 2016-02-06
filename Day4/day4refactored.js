//find MD5 hashes which, in hexadecimal, start with at least five zeroes

//given some string, find the smallest number that when concatenated to that string
//makes an MD5 hash that has five 0s at the start of its hexadecimal representation

"use strict";
let crypto = require('crypto');

let input = 'iwrupvqb';

let hashFunction = (string) => { // returns MD5 hash of input
    let hasher = crypto.createHash('md5');
    hasher.update(string, 'ascii');
    return hasher.digest('hex');
}

let firstStartsWith = (number, string, tester) => {
    for (number; true; number++) {
        let md5 = hashFunction(string + number)
        if(md5.startsWith(tester)) { return number; };
    };
};

first5 = firstStartsWith(1, input, '00000');
first6 = firstStartsWith(first5, input, '000000');