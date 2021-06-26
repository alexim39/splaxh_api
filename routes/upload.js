const express = require('express');
const router = express.Router();
const Upload = require('./../controllers/upload');
const verifyToken = require('../controllers/verify-user')

// audio
router.post('/audio', verifyToken, Upload.audio);
// video
router.post('/video', verifyToken, Upload.video);

module.exports = router;