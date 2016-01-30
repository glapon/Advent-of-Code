//find first MD5 hash which, in hexadecimal, start with at least six zeroes


var crypto = require('crypto');

var input = 'iwrupvqb';

var counter = 346387; //can start here since looking for first with 6 zeros, and this is first with 5

var number;

while (!number) {
	
	var hasher = crypto.createHash('md5');
	hasher.update(input + counter, 'ascii');
	var hash = hasher.digest('hex');

	if (hash.startsWith('000000')) { //test to see if it has 6 zeroes at beginning
		number = counter;
		break;
	};
	counter++;
}

console.log(number);