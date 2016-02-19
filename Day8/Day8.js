//read from file...figure out a way to read one character at a time

// https://gist.github.com/Arahnoid/9925725

//potential issue: this creates empty space with length 1??? "\xa8br\x8bjr\""

"use strict";
fs = require('fs') //https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs
let _ = require('lodash');

let inputFile = "/Users/glapon/Desktop/Advent of Code/Day8/input.txt"

let literals;

fs.readFile(inputFile, 'ascii', (err, data) => {
    if (err) { return console.log(err); };
    literals = data;
});


//this messes up for some reason but I can run it separately...

let arrayLines = literals.split('\n');
let arrayChar = literals.split('');

//problem: '"\\xa8br\\x8bjr\\""' is escaping the \
// make \\ = 2

let literalLength = _.reduce(arrayChar, (result, char) => {
    if (char == '\\') { return result + 2; }
    else if (char == '\n') { return result; }
    else { return result + 1; };
}, 0)

let inMemoryLength = _.reduce(arrayLines, (result, line) => {
    return result + eval(line).replace(" ", "").length;
}, 0);

let answer = literalLength - inMemoryLength;

//get 1672, which is too high...remove replace????

//remove \n?