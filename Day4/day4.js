//find MD5 hashes which, in hexadecimal, start with at least five zeroes

//given some string, find the smallest number that when concatenated to that string
//makes an MD5 hash that has five 0s at the start of its hexadecimal representation


var crypto = require('crypto');

var input = 'iwrupvqb';

var counter = 1;

var number;

while (!number) {
	
	var hasher = crypto.createHash('md5');
	hasher.update(input + counter, 'ascii');
	var hash = hasher.digest('hex');

	if (hash.startsWith('00000')) { //test to see if it has 5 zeroes at beginning
		number = counter;
		break;
	};
	counter++;
}

console.log(number);