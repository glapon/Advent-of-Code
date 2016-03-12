"use strict";
let _ = require('lodash');
let fs = require('fs');

//replaced do with ddo since do is reserved word in javascript
let inputFile = "/Users/glapon/Desktop/Advent of Code/Day7/input.txt";
let input;
fs.readFile(inputFile, 'utf8', (err, data) => {
    input = data.split('\n');
});

let answer = {};

//There is a separate function for each bitwise operation. It takes a string as input and returns an object.
//The object has three properties. Defined is the name of the variable defined in the operation. Dependencies is an array
//of the variables that must be defined prior to performing the operation. Compute is a function that performs the operation.

//Case 1: assign number to a variable
let assignNumber = (string) => {
    let number = string.slice(0, string.indexOf(' '));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [],
             defined: variable,
             compute: (vars) => { return +number; }
           };
};

//Case 1b: assign variable value to another variable
let assignVariable = (string) => {
    let value = string.slice(0, string.indexOf(' '));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [value],
             defined: variable,
             compute: (vars) => { return vars[value]; }
           };
};

//Case 2: AND gate
let andGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('AND') + 4, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);
    if(isNaN(string[0])) {
        return { dependencies: [input1, input2],
                 defined: variable,
                 compute: (vars) => { return vars[input1] & vars[input2]; }
               };
    }
    else {
        return { dependencies: [input2],
                 defined: variable,
                 compute: (vars) => { return +input1 & vars[input2]; }
               };
    };
};

//CASE 3: OR gate
let orGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('OR') + 3, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);

    return { dependencies: [input1, input2],
             defined: variable,
             compute: (vars) => { return vars[input1] | vars[input2]; }
           };
};

//CASE 4: LSHIFT gate
let lshiftGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('LSHIFT') + 7, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);

    return { dependencies: [input1],
             defined: variable,
             compute: (vars) => { return vars[input1] << input2; }
           };
};

//CASE 5: RSHIFT gate
let rshiftGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('RSHIFT') + 7, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);

    return { dependencies: [input1],
             defined: variable,
             compute: (vars) => { return vars[input1] >> input2; }
           };
};

//CASE 6: NOT gate
let notGate = (string) => {
    let input = string.slice(string.indexOf('NOT') + 4, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [input],
             defined: variable,
             compute: (vars) => { return ~ vars[input]; }
           };
};

// Determines type of gate and calls appropriate function from above
let objectConstructor = (string) => {
    if (string.indexOf('AND') > -1) { return andGate(string); }
    else if (string.indexOf('OR') > -1) { return orGate(string); }
    else if (string.indexOf('LSHIFT') > -1) { return lshiftGate(string); }
    else if (string.indexOf('RSHIFT') > -1) { return rshiftGate(string); }
    else if (string.indexOf('NOT') > -1) { return notGate(string); }
    else if (isNaN(string[0])) { return assignVariable(string); }
    else { return assignNumber(string); };
};

//turns input into array of objects with variable defined, dependencies of that variable, and statement to eval

let circuits = _.transform(input, (result, instruction) => {
    result.push(objectConstructor(instruction));
}, []);

//Strategy: the goal is to find the value of a. However, many more variables must be defined before a can be.
//The strategy is to iterate through circuits multiple times, assigning values to new variables during each sweep,
//until a is defined. Then, return a.

//First, create an array of the names of all the variables in circuits to be defined
let toDeclare = _.transform(circuits, (result, element) => {
    result.push(element.defined);
}, []);

//Second, declare and set each of these variables to undefined in the vars object
let vars = {};

for (let index = 0; index < toDeclare.length; index++) {
    vars[toDeclare[index]] = undefined;
};

//Third, loop through each circuit until a is defined
while (true) {
    //loop through each circuit
    for (let index = 0; index < circuits.length; index++) {
        //if all of the dependencies for a given circuit are defined, compute the value of that circuit
        //and assign that value to the variable to be defined in that circuit.
        //log to console the variable defined to see the process at work
        //if one or more of the dependencies are still undefined skip computing the value this time around
        if ( _.transform(circuits[index].dependencies, (result, element) => {
            if (typeof vars[element] == 'undefined') { result.push(element);};
        }, []).length == 0) { vars[circuits[index].defined] = circuits[index].compute(vars);};
    };
    //if a has been defined we can stop. otherwise keep going
    if(typeof vars.a !== 'undefined') { break; };
};

answer.part1 = vars.a; // assign value of a

//part 2: assign 3176 to b, reset the other circuits, and compute again.

for (let index = 0; index < toDeclare.length; index++) {
    vars[toDeclare[index]] = undefined;
};

vars.b = 3176;

// same, except skip defining b
while (true) {
    for (let index = 0; index < circuits.length; index++) {
        if ( _.transform(circuits[index].dependencies, (result, element) => {
            if (typeof vars[element] == 'undefined') { result.push(element);};
        }, []).length == 0 && circuits[index].defined != 'b') { vars[circuits[index].defined] = circuits[index].compute(vars);};    
    };

    if(typeof vars.a !== 'undefined') { break; }; // breaks once a is defined
};

answer.part2 = vars.a; // assign a for part 2

answer.part1;
answer.part2;
