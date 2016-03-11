"use strict";
let _ = require('lodash');
//replaced do with ddo since do is reserved word in javascript
let input = ['NOT dq -> dr', 'kg OR kf -> kh', 'ep OR eo -> eq', '44430 -> b', 'NOT gs -> gt', 'dd OR ddo -> dp', 'eg AND ei -> ej', 'y AND ae -> ag', 'jx AND jz -> ka', 'lf RSHIFT 2 -> lg', 'z AND aa -> ac', 'dy AND ej -> el', 'bj OR bi -> bk', 'kk RSHIFT 3 -> km', 'NOT cn -> co', 'gn AND gp -> gq', 'cq AND cs -> ct', 'eo LSHIFT 15 -> es', 'lg OR lm -> ln', 'dy OR ej -> ek', 'NOT di -> dj', '1 AND fi -> fj', 'kf LSHIFT 15 -> kj', 'NOT jy -> jz', 'NOT ft -> fu', 'fs AND fu -> fv', 'NOT hr -> hs', 'ck OR cl -> cm', 'jp RSHIFT 5 -> js', 'iv OR jb -> jc', 'is OR it -> iu', 'ld OR le -> lf', 'NOT fc -> fd', 'NOT dm -> dn', 'bn OR by -> bz', 'aj AND al -> am', 'cd LSHIFT 15 -> ch', 'jp AND ka -> kc', 'ci OR ct -> cu', 'gv AND gx -> gy', 'de AND dk -> dm', 'x RSHIFT 5 -> aa', 'et RSHIFT 2 -> eu', 'x RSHIFT 1 -> aq', 'ia OR ig -> ih', 'bk LSHIFT 1 -> ce', 'y OR ae -> af', 'NOT ca -> cb', 'e AND f -> h', 'ia AND ig -> ii', 'ck AND cl -> cn', 'NOT jh -> ji', 'z OR aa -> ab', '1 AND en -> eo', 'ib AND ic -> ie', 'NOT eh -> ei', 'iy AND ja -> jb', 'NOT bb -> bc', 'ha OR gz -> hb', '1 AND cx -> cy', 'NOT ax -> ay', 'ev OR ew -> ex', 'bn RSHIFT 2 -> bo', 'er OR es -> et', 'eu OR fa -> fb', 'jp OR ka -> kb', 'ea AND eb -> ed', 'k AND m -> n', 'et RSHIFT 3 -> ev', 'et RSHIFT 5 -> ew', 'hz RSHIFT 1 -> is', 'ki OR kj -> kk', 'NOT h -> i', 'lv LSHIFT 15 -> lz', 'as RSHIFT 1 -> bl', 'hu LSHIFT 15 -> hy', 'iw AND ix -> iz', 'lf RSHIFT 1 -> ly', 'fp OR fv -> fw', '1 AND am -> an', 'ap LSHIFT 1 -> bj', 'u LSHIFT 1 -> ao', 'b RSHIFT 5 -> f', 'jq AND jw -> jy', 'iu RSHIFT 3 -> iw', 'ih AND ij -> ik', 'NOT iz -> ja', 'de OR dk -> dl', 'iu OR jf -> jg', 'as AND bd -> bf', 'b RSHIFT 3 -> e', 'jq OR jw -> jx', 'iv AND jb -> jd', 'cg OR ch -> ci', 'iu AND jf -> jh', 'lx -> a', '1 AND cc -> cd', 'ly OR lz -> ma', 'NOT el -> em', '1 AND bh -> bi', 'fb AND fd -> fe', 'lf OR lq -> lr', 'bn RSHIFT 3 -> bp', 'bn AND by -> ca', 'af AND ah -> ai', 'cf LSHIFT 1 -> cz', 'dw OR dx -> dy', 'gj AND gu -> gw', 'jg AND ji -> jj', 'jr OR js -> jt', 'bl OR bm -> bn', 'gj RSHIFT 2 -> gk', 'cj OR cp -> cq', 'gj OR gu -> gv', 'b OR n -> o', 'o AND q -> r', 'bi LSHIFT 15 -> bm', 'dy RSHIFT 1 -> er', 'cu AND cw -> cx', 'iw OR ix -> iy', 'hc OR hd -> he', '0 -> c', 'db OR dc -> dd', 'kk RSHIFT 2 -> kl', 'eq LSHIFT 1 -> fk', 'dz OR ef -> eg', 'NOT ed -> ee', 'lw OR lv -> lx', 'fw AND fy -> fz', 'dz AND ef -> eh', 'jp RSHIFT 3 -> jr', 'lg AND lm -> lo', 'ci RSHIFT 2 -> cj', 'be AND bg -> bh', 'lc LSHIFT 1 -> lw', 'hm AND ho -> hp', 'jr AND js -> ju', '1 AND io -> ip', 'cm AND co -> cp', 'ib OR ic -> id', 'NOT bf -> bg', 'fo RSHIFT 5 -> fr', 'ip LSHIFT 15 -> it', 'jt AND jv -> jw', 'jc AND je -> jf', 'du OR dt -> dv', 'NOT fx -> fy', 'aw AND ay -> az', 'ge LSHIFT 15 -> gi', 'NOT ak -> al', 'fm OR fn -> fo', 'ff AND fh -> fi', 'ci RSHIFT 5 -> cl', 'cz OR cy -> da', 'NOT ey -> ez', 'NOT ju -> jv', 'NOT ls -> lt', 'kk AND kv -> kx', 'NOT ii -> ij', 'kl AND kr -> kt', 'jk LSHIFT 15 -> jo', 'e OR f -> g', 'NOT bs -> bt', 'hi AND hk -> hl', 'hz OR ik -> il', 'ek AND em -> en', 'ao OR an -> ap', 'dv LSHIFT 1 -> ep', 'an LSHIFT 15 -> ar', 'fo RSHIFT 1 -> gh', 'NOT im -> in', 'kk RSHIFT 1 -> ld', 'hw LSHIFT 1 -> iq', 'ec AND ee -> ef', 'hb LSHIFT 1 -> hv', 'kb AND kd -> ke', 'x AND ai -> ak', 'dd AND ddo -> dq', 'aq OR ar -> as', 'iq OR ip -> ir', 'dl AND dn -> ddo', 'iu RSHIFT 5 -> ix', 'as OR bd -> be', 'NOT go -> gp', 'fk OR fj -> fl', 'jm LSHIFT 1 -> kg', 'NOT cv -> cw', 'dp AND dr -> ds', 'dt LSHIFT 15 -> dx', 'et RSHIFT 1 -> fm', 'dy RSHIFT 3 -> ea', 'fp AND fv -> fx', 'NOT p -> q', 'dd RSHIFT 2 -> de', 'eu AND fa -> fc', 'ba AND bc -> bd', 'dh AND dj -> dk', 'lr AND lt -> lu', 'he RSHIFT 1 -> hx', 'ex AND ez -> fa', 'df OR dg -> dh', 'fj LSHIFT 15 -> fn', 'NOT kx -> ky', 'gk OR gq -> gr', 'dy RSHIFT 2 -> dz', 'gh OR gi -> gj', 'lj AND ll -> lm', 'x OR ai -> aj', 'bz AND cb -> cc', '1 AND lu -> lv', 'as RSHIFT 3 -> au', 'ce OR cd -> cf', 'il AND in -> io', 'dd RSHIFT 1 -> dw', 'NOT lo -> lp', 'c LSHIFT 1 -> t', 'dd RSHIFT 3 -> df', 'dd RSHIFT 5 -> dg', 'lh AND li -> lk', 'lf RSHIFT 5 -> li', 'dy RSHIFT 5 -> eb', 'NOT kt -> ku', 'at OR az -> ba', 'x RSHIFT 3 -> z', 'NOT lk -> ll', 'lb OR la -> lc', '1 AND r -> s', 'lh OR li -> lj', 'ln AND lp -> lq', 'kk RSHIFT 5 -> kn', 'ea OR eb -> ec', 'ci AND ct -> cv', 'b RSHIFT 2 -> d', 'jp RSHIFT 1 -> ki', 'NOT cr -> cs', 'NOT jd -> je', 'jp RSHIFT 2 -> jq', 'jn OR jo -> jp', 'lf RSHIFT 3 -> lh', '1 AND ds -> dt', 'lf AND lq -> ls', 'la LSHIFT 15 -> le', 'NOT fg -> fh', 'at AND az -> bb', 'au AND av -> ax', 'kw AND ky -> kz', 'v OR w -> x', 'kk OR kv -> kw', 'ks AND ku -> kv', 'kh LSHIFT 1 -> lb', '1 AND kz -> la', 'NOT kc -> kd', 'x RSHIFT 2 -> y', 'et OR fe -> ff', 'et AND fe -> fg', 'NOT ac -> ad', 'jl OR jk -> jm', '1 AND jj -> jk', 'bn RSHIFT 1 -> cg', 'NOT kp -> kq', 'ci RSHIFT 3 -> ck', 'ev AND ew -> ey', '1 AND ke -> kf', 'cj AND cp -> cr', 'ir LSHIFT 1 -> jl', 'NOT gw -> gx', 'as RSHIFT 2 -> at', 'iu RSHIFT 1 -> jn', 'cy LSHIFT 15 -> dc', 'hg OR hh -> hi', 'ci RSHIFT 1 -> db', 'au OR av -> aw', 'km AND kn -> kp', 'gj RSHIFT 1 -> hc', 'iu RSHIFT 2 -> iv', 'ab AND ad -> ae', 'da LSHIFT 1 -> du', 'NOT bw -> bx', 'km OR kn -> ko', 'ko AND kq -> kr', 'bv AND bx -> by', 'kl OR kr -> ks', '1 AND ht -> hu', 'df AND dg -> di', 'NOT ag -> ah', 'd OR j -> k', 'd AND j -> l', 'b AND n -> p', 'gf OR ge -> gg', 'gg LSHIFT 1 -> ha', 'bn RSHIFT 5 -> bq', 'bo OR bu -> bv', '1 AND gy -> gz', 's LSHIFT 15 -> w', 'NOT ie -> if', 'as RSHIFT 5 -> av', 'bo AND bu -> bw', 'hz AND ik -> im', 'bp AND bq -> bs', 'b RSHIFT 1 -> v', 'NOT l -> m', 'bp OR bq -> br', 'g AND i -> j', 'br AND bt -> bu', 't OR s -> u', 'hz RSHIFT 5 -> ic', 'gk AND gq -> gs', 'fl LSHIFT 1 -> gf', 'he RSHIFT 3 -> hg', 'gz LSHIFT 15 -> hd', 'hf OR hl -> hm', '1 AND gd -> ge', 'fo OR fz -> ga', 'id AND if -> ig', 'fo AND fz -> gb', 'gr AND gt -> gu', 'he OR hp -> hq', 'fq AND fr -> ft', 'ga AND gc -> gd', 'fo RSHIFT 2 -> fp', 'gl OR gm -> gn', 'hg AND hh -> hj', 'NOT hn -> ho', 'gl AND gm -> go', 'he RSHIFT 5 -> hh', 'NOT gb -> gc', 'hq AND hs -> ht', 'hz RSHIFT 3 -> ib', 'hz RSHIFT 2 -> ia', 'fq OR fr -> fs', 'hx OR hy -> hz', 'he AND hp -> hr', 'gj RSHIFT 5 -> gm', 'hf AND hl -> hn', 'hv OR hu -> hw', 'NOT hj -> hk', 'gj RSHIFT 3 -> gl', 'fo RSHIFT 3 -> fq', 'he RSHIFT 2 -> hf']


//There is a separate function for each bitwise operation. It takes a string as input and returns an object.
//The object has three properties. Defined is the name of the variable defined in the operation. Dependencies is an array
//of the variables that must be defined prior to performing the operation. Compute is a function that performs the operation.

//Case 1: assign number to a variable
let assignNumber = (string) => {
    let number = string.slice(0, string.indexOf(' '));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [],
             defined: variable,
             compute: () => { return +number; }
           };
};

//Case 1b: assign variable value to another variable
let assignVariable = (string) => {
    let value = string.slice(0, string.indexOf(' '));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [value],
             defined: variable,
             compute: () => { return global[value]; }
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
                 compute: () => { return global[input1] & global[input2]; }
               };
    }
    else {
        return { dependencies: [input2],
                 defined: variable,
                 compute: () => { return +input1 & global[input2]; }
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
             compute: () => { return global[input1] | global[input2]; }
           };
};

//CASE 4: LSHIFT gate
let lshiftGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('LSHIFT') + 7, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);

    return { dependencies: [input1],
             defined: variable,
             compute: () => { return global[input1] << input2; }
           };
};

//CASE 5: RSHIFT gate
let rshiftGate = (string) => {
    let input1 = string.slice(0, string.indexOf(' '));
    let input2 = string.slice(string.indexOf('RSHIFT') + 7, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);

    return { dependencies: [input1],
             defined: variable,
             compute: () => { return global[input1] >> input2; }
           };
};

//CASE 6: NOT gate
let notGate = (string) => {
    let input = string.slice(string.indexOf('NOT') + 4, string.indexOf(' ->'));
    let variable = string.slice(string.indexOf('->') + 3);
    
    return { dependencies: [input],
             defined: variable,
             compute: () => { return ~ global[input]; }
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

//Second, declare and set each of these variables to undefined in the global object
for (let index = 0; index < toDeclare.length; index++) {
    global[toDeclare[index]] = undefined;
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
            if (typeof global[element] == 'undefined') { result.push(element);};
        }, []).length == 0) { global[circuits[index].defined] = circuits[index].compute() ; console.log(circuits[index].defined + global[circuits[index].defined])};    
    };
    //if a has been defined we can stop. otherwise keep going
    if(typeof global['a'] !== 'undefined') { break; };
};

a; // return value of a


//part 2: assign 3176 to b, reset the other circuits, and compute again.

for (let index = 0; index < toDeclare.length; index++) {
    global[toDeclare[index]] = undefined;
};

b = 3176;

while (true) {
    for (let index = 0; index < circuits.length; index++) {
        if ( _.transform(circuits[index].dependencies, (result, element) => {
            if (typeof global[element] == 'undefined') { result.push(element);};
        }, []).length == 0 && circuits[index].defined != 'b') { global[circuits[index].defined] = circuits[index].compute() ; console.log(circuits[index].defined + global[circuits[index].defined])};    
    };

    if(typeof global['a'] !== 'undefined') { break; }; // breaks once a is defined
};
