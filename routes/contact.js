const express = require('express');
const router = express.Router();
const Contact = require('./../controllers/contact');


// Create task
router.post('/', Contact.create);

module.exports = router;