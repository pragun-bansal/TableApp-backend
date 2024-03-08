
import nodemailer from 'nodemailer';


function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.sender_email,
          pass: process.env.sender_email_pass,
        },
      });
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('error', error);
          return reject({
            message: `An error has occured`,
          });
          //   res.status(401).json({status:401,message:"Email not sent"})
        } else {
          console.log('Email sent', info.response);
          //   res.status(201).json({status:201,message:"Email sent successfully"});
          return resolve({
            message: `Email Sent Successfully`,
          });
        }
      });
    });
  }