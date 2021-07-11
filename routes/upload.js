const express = require('express');
const router = express.Router();
const Upload = require('./../controllers/upload');
const verifyToken = require('../controllers/verify-user')


const multer = require('multer');

// storage
const storage = multer.diskStorage({
    destination: './uploads',
    //destination: 'http://tinotune.com/uploads',
    filename: (req, file, cb) => {
        let fileName = file.originalname.toLocaleLowerCase().split(' ').join('_');
        fileName = fileName.replace(/(\.[\w\d_-]+)$/i, '_' + Date.now() + '_$1');
        cb(null, fileName)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: (req, file, cb) => {
        if (file.image == "undefined") {
            req.fileTypeValidationError = 'File is required';
            return cb(null, false, req.fileTypeValidationError);
        }
        if (file.mimetype == 'audio/mpeg' || file.mimetype == 'audio/mp4') {
            cb(null, true);
        } else {
            req.fileTypeValidationError = 'Only audio file is allowed';
            return cb(null, false, req.fileTypeValidationError);
        }
    }
})


// audio file
router.post('/audioFile', upload.single('file'), (req, res) => {
    if (req.fileTypeValidationError) return res.status(500).json({ msg: req.fileTypeValidationError, code: 500 });
    return res.status(200).json({ msg: `Upload was successful, we will get back to you shortly`, code: 200 });

});

// video
router.post('/audioObj', verifyToken, Upload.audio);

// video
router.post('/video', verifyToken, Upload.video);

module.exports = router;