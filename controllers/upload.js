const { VideoModel, VideoValidator } = require('./../models/video');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const { AudioModel, AudioValidator } = require('./../models/audio');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'mail.tinotune.com', //"smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@tinotune.com',
      pass: '@lexim39'
    },
    tls: {
      rejectUnauthorized: false
    }
});

module.exports = class Upload {

    // audio
    static async audio(req, res, next) {
        try {
            jwt.verify(req.token, config.server.token);

            //console.log(req.body); return;

            // validate inputs
            const audioValidatorError = await AudioValidator(req.body);
            if (audioValidatorError.message) return res.status(400).send(audioValidatorError.message);


            const audio = await new AudioModel(req.body).save();

            if (audio) {

                const mailOptions = {
                    from: 'Tinotune <noreply@tinotune.com>',
                    to: 'fikxit.info@gmail.com, adewale263@yahoo.com, tinotechengineeringltd@gmail.com, waflowventuresltd@yahoo.com',
                    subject: 'Tinotune Audio Music Upload',
                    html: `Hi, <br>
                    Please not that someone with email ${req.body.email} just uploaded audio music to Tinotune`
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        //res.status(400).json({msg: 'Your subscription was not successful, please try again'})
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({ msg: `Your details uploaded successfully, go ahead to upload audio music`, code: 200, obj: audio });
            }
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

            if (video) { 

                const mailOptions = {
                    from: 'Tinotune <noreply@tinotune.com>',
                    to: 'fikxit.info@gmail.com, adewale263@yahoo.com, tinotechengineeringltd@gmail.com, waflowventuresltd@yahoo.com',
                    subject: 'Tinotune Video Music Upload',
                    html: `Hi, <br>
                    Please not that someone with email ${user.email} just uploaded video music to Tinotune`
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        //res.status(400).json({msg: 'Your subscription was not successful, please try again'})
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({ msg: `Your video uploaded successfully, go ahead to make payment`, code: 200, obj: video });
            }
            return res.status(404).json({ msg: `Upload was not successful, please try again`, code: 404 });
           
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Video upload process failed`, code: 500 });
        }

    }

}