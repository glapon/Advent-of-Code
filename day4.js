//find MD5 hashes which, in hexadecimal, start with at least five zeroes

//given some string, find the smallest number that when concatenated to that string
//makes an MD5 hash that has five 0s at the start of its hexadecimal representation

var input = 'iwrupvqb';

//md5 hash function

var counter = 1;

var number;

while (!number) {
	//add hash function here:
	if (md5(input + counter).substr(0,4) == '00000') {
		number = counter;
		break;
	};
	counter++;
}

console.log(number);