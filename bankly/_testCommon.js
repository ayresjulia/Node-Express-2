const bcrypt = require("bcrypt");

const db = require("./db.js");
const { BCRYPT_WORK_FACTOR } = require("./config");

async function commonBeforeAll() {
	await db.query("DELETE FROM users");

	await db.query(
		`INSERT INTO users(username,
                          first_name,
                          last_name,
                          email,
                          phone, 
                          password, admin)
        VALUES ('test1', 'test1', 'test1', 'test1@email.com', '222-222-2222', $1, false),
               ('test2', 'test2', 'test2', 'test2@email.com', '222-222-2222', $2, true)
        RETURNING username`,
		[await bcrypt.hash("password1", BCRYPT_WORK_FACTOR), await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)]
	);
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
};
