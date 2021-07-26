const { ContactModel, ContactValidator } = require('./../models/contact');
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

module.exports = class Contact {

    // Create comment
    static async create(req, res) {
        try {
            console.log(req.body)
            // validate inputs
            const error = await ContactValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const comment = await new ContactModel({
                names: req.body.names,
                email: req.body.email,
                phone: req.body.phone,
                coment: req.body.coment,
            }).save();

            if (comment) {

                const mailOptions = {
                    from: 'Tinotune <noreply@tinotune.com>',
                    to: 'fikxit.info@gmail.com, adewale263@yahoo.com, tinotechengineeringltd@gmail.com, waflowventuresltd@yahoo.com',
                    subject: 'Tinotune Contact Form',
                    html: `Hi, <br>
                    Please not that someone with details as below just made a contact request at Tinotune website: <br>
                    Full name: ${comment.names}, <br>
                    Phone number: ${req.body.phone}, <br>
                    Email address: ${comment.email}, <br>
                    Request comment: ${comment.comment}, <br>`
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        //res.status(400).json({msg: 'Your subscription was not successful, please try again'})
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json({ msg: `Contact sent, we will get back to you `, code: 200, obj: comment });
            }
            return res.status(404).json({ msg: `Contact detail could not be sent`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Contact creation process failed`, code: 500 });
        }

    }

}