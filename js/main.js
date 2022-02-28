import { buttons, output } from "./view.js";

let operation;

const SMALLFONT = "32px";
const MEDIUMFONT = "64px";
const BIGFONT = "96px";

const operations = {
	"÷": "/",
	"×": "*",
	"–": "-",
	"+": "+",
};

const methods = {
	"+": function (a, b) {
		return parseInt(a) + parseInt(b);
	},
	"-": function (a, b) {
		return parseInt(a) - parseInt(b);
	},
	"*": function (a, b) {
		return parseInt(a) * parseInt(b);
	},
	"/": function (a, b) {
		return parseInt(a) / parseInt(b);
	},
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
		let length = output.value.length;
		if (length > 10) {
			output.style.fontSize = SMALLFONT;
		}
		else if (length > 6) {
			output.style.fontSize = MEDIUMFONT;
		}
		else if (length < 7) {
			output.style.fontSize = BIGFONT;
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
	let result = methods[operation](str[0], str[1]);
	return result;
}