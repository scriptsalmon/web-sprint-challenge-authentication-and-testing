const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const router = require('express').Router();
const mw = require('./auth-middleware.js');

const User = require('../users/users-model.js');

router.post('/register', mw.validCredentials, mw.isUsernameTaken, (req, res, next) => {
  let user = req.body;
  //bcrypt the password now
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  
  user.password = hash;

  User.add(user)
    .then(newUser => {
      res.status(201).json({
        message: `Welcome, ${newUser.username}~`});
    })
    .catch(next);
    });
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */

router.post('/login', mw.validCredentials, (req, res, next) => {
  let { username, password } = req.body;
  // check pass with bcrypt compareSync
  // create token
  User.findBy(username)
    .then(([usr]) => {
      if (usr && bcrypt.compareSync(password, usr.password)) {
        const token = tokenBuilder(usr)
        res.status(200).json({message: `Welcome back ${usr.username}`, token})
      } else {
        next({ status: 401, message: "Invalid Credentials"})
      }
    })
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
