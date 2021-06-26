const express = require('express');
const router = express.Router();
const Signup = require('../controllers/auth/signup');
const Signin = require('../controllers/auth/signin');
const verifyToken = require('../controllers/verify-user')

// User signup
router.post('/signup', Signup.register);
// User signin
router.post('/signin', Signin.login);
// User signout
router.get('/signout', verifyToken, Signin.logout);
// User change password
//router.put('/password', Auth.create)
//
//router.put('/forgot-password', Auth.create)
//
//router.put('/new-password', Auth.create)
//
//router.get('/activate/:userId', Auth.create)
//
//router.get('/activation-link/:userId', Auth.create)

module.exports = router;