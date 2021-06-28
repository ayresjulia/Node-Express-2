const db = require("../db.js");
const User = require("../models/user.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// TESTS BUG #2 & BUG #8
describe("authenticate a user", () => {
	test("authenticating with username and password", async () => {
		const user = await User.authenticate("test1", "password1");
		expect(user).toEqual({
			username: "test1",
			first_name: "test1",
			last_name: "test1",
			email: "test1@email.com",
			phone: "222-222-2222",
			admin: false
		});
	});

	test("unauth if no such user", async () => {
		try {
			await User.authenticate("nope", "password1");
			fail();
		} catch (err) {
			expect(err).toBeTruthy();
		}
	});

	test("unauth if wrong password", async () => {
		try {
			await User.authenticate("test1", "wrong");
			fail();
		} catch (err) {
			expect(err).toBeTruthy();
		}
	});
});

// TESTS BUG #3 & BUG #4
describe("update a user", () => {
	const updateData = {
		first_name: "New1",
		last_name: "New1",
		email: "new@email.com",
		admin: true,
		phone: "222-222-2222"
	};

	test("updating user data", async () => {
		let user = await User.update("test1", updateData);
		expect(user).toEqual({
			username: "test1",
			...updateData
		});
	});

	test("setting new password", async () => {
		let user = await User.update("test2", {
			password: "new"
		});
		expect(user).toEqual({
			username: "test2",
			first_name: "test2",
			last_name: "test2",
			email: "test2@email.com",
			admin: true,
			phone: "222-222-2222"
		});
		const found = await db.query("SELECT * FROM users WHERE username = 'test2'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
	});

	test("not found if no such user", async () => {
		try {
			await User.update("nope", {
				firstName: "test"
			});
			fail();
		} catch (err) {
			expect(err).toBeTruthy();
		}
	});

	test("bad request if no data", async () => {
		expect.assertions(1);
		try {
			await User.update("test1", {});
			fail();
		} catch (err) {
			expect(err).toBeTruthy();
		}
	});
});
