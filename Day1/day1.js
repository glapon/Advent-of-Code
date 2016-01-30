var input = "";
var floor = 0;

//ending floor
for (i = 0; i < input.length; i++) {
	if (input[i] === "(") {
		floor++;
	} else if (input[i] === ")") {
		floor--;
	};
};

console.log(floor);

//first to enter basement

var input = "";
var floor = 0;

//refactor splitting array .split('') then use forEach

//ending floor
for (i = 0; i < input.length && floor > -1; i++) {
	if (input[i] === "(") {
		floor++;
	} else if (input[i] === ")") {
		floor--;
	};
	if (floor === -1) {
		console.log(i + 1)
	}
};