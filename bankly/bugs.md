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
  