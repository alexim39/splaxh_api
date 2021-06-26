const express = require('express');
const router = express.Router();
const User = require('./../controllers/user');
const verifyToken = require('../controllers/verify-user')


// get user
router.get('/', verifyToken, User.getUser);
// get users
router.get('/all', verifyToken, User.getUsers);

module.exports = router;