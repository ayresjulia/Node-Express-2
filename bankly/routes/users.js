/** User related routes. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const { authUser, requireLogin, requireAdmin, requireUserOrAdmin } = require("../middleware/auth");

/** GET /
 *
 * Get list of users. Only logged-in users should be able to use this.
 *
 * It should return only *basic* info:
 *    {users: [{username, first_name, last_name}, ...]}
 *
 */

router.get("/", authUser, requireLogin, async function (req, res, next) {
	try {
		let users = await User.getAll();
		return res.json({ users });
	} catch (err) {
		return next(err);
	}
}); // end

/** GET /[username]
 *
 * Get details on a user. Only logged-in users should be able to use this.
 *
 * It should return:
 *     {user: {username, first_name, last_name, phone, email}}
 *
 * If user cannot be found, return a 404 err.
 *
 */

router.get("/:username", authUser, requireLogin, async function (req, res, next) {
	try {
		let user = await User.get(req.params.username);
		return res.json({ user });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[username]
 *
 * Update user. Only the user themselves or any admin user can use this.
 *
 * It should accept:
 *  {first_name, last_name, phone, email}
 *
 * It should return:
 *  {user: all-data-about-user}
 *
 * It user cannot be found, return a 404 err. If they try to change
 * other fields (including non-existent ones), an error should be raised.
 *
 */

// BUG #9
router.patch("/:username", authUser, requireUserOrAdmin, async function (req, res, next) {
	try {
		//end
		if (!req.curr_admin && req.params.username === "admin") {
			throw new ExpressError("Only admin can patch admin data", 401);
		} else if (!req.curr_admin && req.params.username !== req.curr_username) {
			throw new ExpressError("Only admin can patch another user's data", 401);
		}
		// get fields to change; remove token so we don't try to change them
		let fields = { ...req.body };
		delete fields._token;
		// BUG #10 - will ignore username and admin fields
		if (req.curr_admin === false) {
			delete fields.username;
			delete fields.admin;
		}

		if (Object.keys(fields).length === 0) {
			throw new ExpressError("Updating those fields is not allowed, please try again.", 401);
		} else {
			let user = await User.update(req.params.username, fields);
			return res.json({ user });
		}
		//end
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[username]
 *
 * Delete a user. Only an admin user should be able to use this.
 *
 * It should return:
 *   {message: "deleted"}
 *
 * If user cannot be found, return a 404 err.
 */

router.delete("/:username", authUser, requireAdmin, async function (req, res, next) {
	try {
		// FIXED BUG #7
		await User.delete(req.params.username);
		return res.json({ message: "deleted" });
	} catch (err) {
		return next(err);
	}
}); // end

module.exports = router;
