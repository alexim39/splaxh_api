const { UserModel, SignUpValidator } = require('../../models/user');
const bcrypt = require('bcryptjs');
//const {EmailClass} = require('./../email/email')
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

module.exports = class SignUp {

    // User singup
    static async register(req, res) {
        try {
           // validate inputs
           const error = await SignUpValidator(req.body);
           if (error.message) return res.status(400).send(error.message);

           // check if tnc is checked
           //if (req.body.tnc === false) return res.status(400).json({ msg: `Please check the terms and condition box to continue`, code: 400 });

           // check if user already exist
           const userExist = await UserModel.findOne({ email: req.body.email });
           if (userExist) return res.status(400).json({ msg: `This email already exist, you can reset your password to continue`, code: 400 });

           // hash password
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(req.body.password, salt);

           const user = await new UserModel({
                name: req.body.name,
                //lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                //tnc: req.body.tnc
            }).save();

            if (user) {
                // send activation email
                
                const mailOptions = {
                    from: 'Tinotune <noreply@tinotune.com>',
                    to: 'fikxit.info@gmail.com, adewale263@yahoo.com',
                    subject: 'Tinotune New Sign Up',
                    html: `Hi, <br>
                    Please not that someone with email ${user.email} just signed up to Tinotune`
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        //res.status(400).json({msg: 'Your subscription was not successful, please try again'})
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({ msg: `Profile created successfully. Sign in to continue`, code: 200, obj: user });
            } else {
                return res.status(404).json({ msg: `Profile creation failed`, code: 404 });
            }  
        } catch (error) {
            return res.status(500).json({ msg: `Sign up process failed`, code: 500 });
        }
    }
}