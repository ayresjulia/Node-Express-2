const timeWord = require("./timeWord");

describe("#timeword", () => {
	test("it is a function", () => {
		expect(typeof timeWord).toBe("function");
	});
	test("testing excercise times", () => {
		expect(timeWord("00:00")).toEqual("midnight");
		expect(timeWord("00:12")).toEqual("twelve twelve am");
		expect(timeWord("01:00")).toEqual("one o’clock am");
		expect(timeWord("06:01")).toEqual("six oh one am");
		expect(timeWord("06:10")).toEqual("six ten am");
		expect(timeWord("06:18")).toEqual("six eighteen am");
		expect(timeWord("06:30")).toEqual("six thirty am");
		expect(timeWord("10:34")).toEqual("ten thirty four am");
		expect(timeWord("12:00")).toEqual("noon");
		expect(timeWord("12:09")).toEqual("twelve oh nine pm");
		expect(timeWord("23:23")).toEqual("eleven twenty three pm");
	});
	test("more testing", () => {
		expect(timeWord("00:01")).toEqual("twelve oh one am");
		expect(timeWord("00:10")).toEqual("twelve ten am");
		expect(timeWord("00:45")).toEqual("twelve forty five am");
		expect(timeWord("10:00")).toEqual("ten o'clock am");
		expect(timeWord("20:00")).toEqual("eight o'clock pm");
		expect(timeWord("09:19")).toEqual("nine nineteen am");
		expect(timeWord("13:10")).toEqual("one ten pm");
		expect(timeWord("23:19")).toEqual("eleven nineteen pm");
	});
});
