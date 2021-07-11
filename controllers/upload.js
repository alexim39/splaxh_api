const { VideoModel, VideoValidator } = require('./../models/video');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const { AudioModel, AudioValidator } = require('./../models/audio');

module.exports = class Upload {

    // audio
    static async audio(req, res, next) {
        try {
            jwt.verify(req.token, config.server.token);

            console.log(req.body)

            // validate inputs
            const audioValidatorError = await AudioValidator(req.body);
            if (audioValidatorError.message) return res.status(400).send(audioValidatorError.message);


            const audio = await new AudioModel(req.body).save();

            if (audio) return res.status(200).json({ msg: `Your details uploaded successfully, go ahead to upload audio music`, code: 200, obj: audio });
            return res.status(404).json({ msg: `Upload was not successful, please try again`, code: 404 });

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Audio upload process failed`, code: 500 });
        }
    }

    // vidoe
    static async video(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

            // validate inputs
            const ValidatorError = await VideoValidator(req.body);
            if (ValidatorError.message) return res.status(400).send(ValidatorError.message);


            const video = await new VideoModel(req.body).save();

            if (video) return res.status(200).json({ msg: `Your video uploaded successfully, go ahead to make payment`, code: 200, obj: video });
            return res.status(404).json({ msg: `Upload was not successful, please try again`, code: 404 });
           
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Video upload process failed`, code: 500 });
        }

    }

}