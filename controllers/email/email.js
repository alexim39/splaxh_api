const nodemailer = require('nodemailer');
const config = require('./../../config/config');

module.exports = class EmailClass { 
  
  constructor() {}

  send(recipients, subject, body) {
    let transporter = nodemailer.createTransport({
      host: 'mail.kudutask.com', //"smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@kudutask.com',
        pass: config.server.email_pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    const mailOptions = {
      from: 'Kudutask <noreply@kudutask.com>',
      to: recipients,
      subject: subject,
      html: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return info;
      }
    })
  }

  sendAccountActivationLink(user) {
    console.log(user)

    // send account activation mail
    // http://kudutask.com/signup/${user._id}
    // http://localhost:4200/signup/${user._id}

    // email body
    const emailBody = `
    <h1>Welcome To Kudutask</h1>
    <p> Hi ${user.firstname},</p>
    <p>Kindly use the link below to activate your account. This will enable you get full access to features in Kudutask</p>
    <br>
    <a href="http://localhost:4200/signup/${user._id}" target="_blank" 
        style="background-color: #4A2781; 
        color: white; 
        padding: 15px 32px;
        text-decoration: none;
        text-align: center;
        border: 1px solid gray; 
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;">Activate Account</a>
    <p>From Kudutask</p> `;

    // send email
    this.send(user.email, 'Account Activation', emailBody);
  }

}