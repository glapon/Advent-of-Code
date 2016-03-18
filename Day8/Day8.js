//read from file...figure out a way to read one character at a time

// https://gist.github.com/Arahnoid/9925725

//potential issue: this creates empty space with length 1??? "\xa8br\x8bjr\""

"use strict";
fs = require('fs'); //https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs
let _ = require('lodash');

let inputFile = "/Users/glapon/Desktop/Advent of Code/Day8/input.txt"

let literals;
//look at first line, it is auto escaping
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) { return console.log(err); };
    literals = data;

    let arrayLines = literals.split('\n');
    let arrayChar = literals.split('');

    let literalLength = _.reduce(arrayChar, (result, char, index, array) => {
        if (char == '\\') { return result + 2; }
        else if (char == '\n') { return result; }
        else if (char == '"' && array[index - 1] != '\n' && array[index + 1] != '\n') { return result + 2; } //deals with escaped "
        else { return result + 1; };
    }, 0)

    // am i undercounting this? or overcounting the above? or both?
    let inMemoryLength = _.reduce(arrayLines, (result, line) => {
        return result + eval(line).length;
    }, 0);

    let answer = literalLength - inMemoryLength;

    //get 1672, which is too high...remove replace???? Now 2291...getting worse...try 2290 now? 1670 too high

    //remove \n?


});


//problem: '"\\xa8br\\x8bjr\\""' is escaping the \
// make \\ = 2

//problem...when splitting into arrayChar, \" is becoming " inside string ...add to if statement to add 1?
//can i process literals as one chunk? and ignore \n?
