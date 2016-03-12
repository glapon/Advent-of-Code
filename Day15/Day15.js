

"use strict";
let fs = require('fs'); //https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs
let _ = require('lodash');

let inputFile = "/Users/glapon/Desktop/Advent of Code/Day15/input.txt";

let input;

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) { return console.log(err); };
    input = data;
});

let inputArray = input.split('\n');

let toObject = (string) {
    let properties = {};
    properties.name = string.slice(0, string.indexOf(':'));
    
}

let ingredients = _.transform()