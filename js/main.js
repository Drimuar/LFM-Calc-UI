let main = document.querySelector(".main-frame");
let buttons = main.querySelectorAll("button");
let output = document.querySelector(".output");
let operation;
let length;
const operations = {
	"÷": "/",
	"×": "*",
	"–": "-",
	"+": "+",
};
const methods = {
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
	"/": (a, b) => a / b,
	"*": (a, b) => a * b,
}


for (let button of buttons) {
	button.addEventListener("click", function () {
		switch (button.value) {
			case "C":
				output.value = "";
				break;
			case "⌫":
				output.value = output.value.slice(0, -1);
				break;
			case "oper":
				operation = operations[button.innerHTML];
				output.value += operation;
				break;
			case "=":
				output.value = calc(output.value, operation);
				break;
			default:
				if (output.value === "0") {
					output.value = button.innerHTML;
				}
				else {
					output.value += button.innerHTML;
				}
				break;
		}
		length = output.value;
		if (length.length > 10) {
			output.style.fontSize = "32px";
		}
		else if (length.length > 6) {
			output.style.fontSize = "64px";
		}
		else if (length.length < 7) {
			output.style.fontSize = "96px";
		}
	});
}


function calc(str, operation) {
	if (!str || !operation) {
		return "empty";
	}
	str = str.split(operation);
	if (!(operation in methods)) {
		return "wrong method"
	}
	else if (!isFinite(str[0]) || !isFinite(str[1])) {
		return "wrong numbers"
	}
	result = methods[operation](+str[0], +str[1]);
	return result;
}