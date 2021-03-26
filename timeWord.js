const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teen = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const doubleDigits = ["", "ten", "twenty", "thirty", "forty", "fifty"];

function timeWord(str) {
	let arr1 = [];
	let arr2 = [];
	arr1.push(str[0]);
	arr1.push(str[1]);
	arr2.push(str[3]);
	arr2.push(str[4]);

	let finalAnswer = "";

	// MIDNIGHT -> 00:00
	if (arr1[0] === "0" && arr1[1] === "0") {
		if (arr2[0] === "0" && arr2[1] === "0") {
			finalAnswer = "midnight";
		}
	}

	// NOON -> 12:00
	if (arr1[0] === "1" && arr1[1] === "2") {
		if (arr2[0] === "0" && arr2[1] === "0") {
			finalAnswer = "noon";
		}
	}

	// first two are 00
	if (arr1[0] === "0" && arr1[1] === "0") {
		// 00:01
		if (arr2[0] === "0" && arr2[1] !== "0") {
			finalAnswer = "twelve oh " + digits[arr2[1]] + " am";
			// 00:10
		} else if (arr2[0] !== "0" && arr2[1] === "0") {
			finalAnswer = "twelve " + teen[arr2[1]] + " am";
			// 00:11 -> 00:19
		} else if (arr2[0] === "1" && arr2[1] !== "0") {
			finalAnswer = "twelve " + teen[arr2[1]] + " am";
			// 00:20 -> 00:59
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			finalAnswer = "twelve " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " am";
		}
	}

	// last two are 00
	if (arr2[0] === "0" && arr2[1] === "0") {
		// 01:00
		if (arr1[0] === "0" && arr1[1] !== "0") {
			finalAnswer = digits[arr1[1]] + " o’clock am";
			// 10:00
		} else if (arr1[0] === "1" && arr1[1] === "0") {
			finalAnswer = teen[arr1[1]] + " o'clock am";
			// 20:00
		} else if (arr1[0] === "2" && arr1[1] === "0") {
			finalAnswer = digits[parseInt(arr1[0]) + 6] + " o'clock pm";
			// 11:00
		} else if (arr1[0] === "1" && arr1[1] === "1") {
			finalAnswer = teen[arr1[1]] + " am";
			// 13:00 -> 19:00
		} else if (arr1[0] === "1" && arr1[1] > 2) {
			finalAnswer = digits[arr1[1] - 2] + " o’clock pm";
			// 21:00
		} else if (arr1[0] === "2" && arr1[1] === "1") {
			finalAnswer = digits[parseInt(arr1[1]) + 8] + " o’clock pm";
			//22:00 -> 23:00
		} else if (arr1[0] === "2" && arr1[1] > 1) {
			finalAnswer = teen[arr1[1] - 2] + " o’clock pm";
		}
	}

	/** O -> zero ; X -> some number
	 * checking for:
	 * OX:XX
	 * OX:OX
	 * OX:XO
	 *
	 */
	if (arr1[0] === "0" && arr1[1] !== "0") {
		// 01:11 -> 09:19
		if (arr2[0] === "1" && arr2[1] !== "0") {
			finalAnswer = digits[arr1[1]] + " " + teen[arr2[1]] + " am";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			// 01:20 -> 09:59
			finalAnswer = digits[arr1[1]] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " am";
		} else if (arr2[0] === "0" && arr2[1] !== "0") {
			// 01:01 -> 09:09
			finalAnswer = digits[arr1[1]] + " oh " + digits[arr2[1]] + " am";
		} else if (arr2[0] !== "0" && arr2[1] === "0") {
			// 01:10 -> 09:50
			finalAnswer = digits[arr1[1]] + " " + doubleDigits[arr2[0]] + " am";
		}
	}

	/** O -> zero ; X -> some number
	 * checking for:
	 * XO:XX
	 * XO:OX
	 * XO:XO
	 *
	 */
	if (arr1[0] === "1" && arr1[1] === "0") {
		// 10:11 -> 10:19
		if (arr2[0] === "1" && arr2[1] !== "0") {
			finalAnswer = doubleDigits[arr1[0]] + " " + teen[arr2[1]] + " am";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			// 10:21 -> 20:59
			finalAnswer = doubleDigits[arr1[0]] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " am";
		}
	} else if (arr1[0] === "2" && arr1[1] === "0") {
		// 20:11 -> 20:19
		if (arr2[0] === "1" && arr2[1] !== "0") {
			finalAnswer = digits[parseInt(arr1[0]) + 6] + " " + teen[arr2[1]] + " pm";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			// 20:21 -> 20:59
			finalAnswer = digits[parseInt(arr1[0]) + 6] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " pm";
		}
	}

	/** O -> zero ; X -> some number
	 * checking for:
	 * XX:XX
	 * XX:OX
	 * XX:XO
	 *
	 */
	if (arr1[0] === "1" && arr1[1] !== "0") {
		// 11:10 -> 19:50
		if (arr2[0] !== "0" && arr2[1] === "0") {
			finalAnswer = parseInt(arr1[1]) < 2 ? teen[arr1[1]] + " " + doubleDigits[arr2[0]] + " am" : digits[arr1[1] - 2] + " " + doubleDigits[arr2[0]] + " pm";
		} else if (arr2[0] === "0" && arr2[1] !== "0") {
			// 11:01 -> 19:09
			finalAnswer = parseInt(arr1[1]) < 2 ? teen[arr1[1]] + " oh " + digits[arr2[1]] + " am" : teen[arr1[1]] + " oh " + digits[arr2[1]] + " pm";
		} else if (arr2[0] === "1" && arr2[1] !== "0") {
			// 11:11 -> 19:19
			finalAnswer = parseInt(arr1[1]) < 2 ? teen[arr1[1]] + " " + teen[arr2[1]] + " am" : teen[arr1[1]] + " " + teen[arr2[1]] + " pm";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			// 11:21 -> 19:59
			finalAnswer =
				parseInt(arr1[1]) < 2 ? teen[arr1[1]] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " am" : teen[arr1[1]] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " pm";
		}
	} else if (arr1[0] === "2" && arr1[1] === "1") {
		// 21:10 -> 21:50
		if (arr2[0] !== "0" && arr2[1] === "0") {
			finalAnswer = digits[parseInt(arr1[0]) + 7] + " " + doubleDigits[arr2[0]] + " pm";
		} else if (arr2[0] === "1" && arr2[1] !== "0") {
			//21:11 -> 21:19
			finalAnswer = digits[parseInt(arr1[0]) + 7] + " " + teen[arr2[1]] + " pm";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			//21:21 -> 21:59
			finalAnswer = digits[parseInt(arr1[0]) + 7] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " pm";
		}
	} else if (arr1[0] === "2" && arr1[1] > 1) {
		// 22:10 -> 23:50
		if (arr2[0] !== "0" && arr2[1] === "0") {
			finalAnswer = teen[arr1[1] - 2] + " " + doubleDigits[arr2[0]] + " pm";
		} else if (arr2[0] === "1" && arr2[1] !== "0") {
			//22:11 -> 22:19
			finalAnswer = teen[arr1[1] - 2] + " " + teen[arr2[1]] + " pm";
		} else if (arr2[0] > 1 && arr2[1] !== "0") {
			//22:21 -> 22:59
			finalAnswer = teen[arr1[1] - 2] + " " + doubleDigits[arr2[0]] + " " + digits[arr2[1]] + " pm";
		}
	}

	return finalAnswer;
}

module.exports = timeWord;
