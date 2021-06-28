## Bug 1

- in middleware/auth.js - authUser function - instead of jwt.decode, change it to jwt.verify with SECRET_KEY

## Bug 2

- in user.js model - authentication function - I added "delete user.password" so password is not returned with user data after authentication

## Bug 3

- in user.js model I added bcrypt.hash password, as this function can set a new password or make user an admin, inputs must be validates otherwise serious security risks are opened

## Bug 4

- in user.js model - update function - I added "delete user.password" so password is not returned with user data after updating user data

## Bug 5

- in auth.js routes - register route - should return error 401 instead of 400 if username/password is incorrect

## Bug 6

- in auth.js routes - login route - should return error 401 instead of 400 if username/password is incorrect
  
## Bug 7

- in users.js route - delete route - "await" was missing to delete a user
  
## Bug 8

- in auth.js route - login route - "await" was missing to authenticate a user

## Bug 9

- in users.js route - patch route - edit if statement from beginning of try block and add requireUserOrAdmin function, so users can patch themselves, and admins are also authorized to do that. users cannot patch admin data

## Bug 10

- in users.js route - patch route - restricted user to update their username and admin status, throws a 401 err + extra error handling if 'username' and 'admin' were the only fields user wanted to update

