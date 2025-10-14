const express = require("express");
const { getMailTransporter } = require("../helpers/mail_transport");
const userRouter = express.Router();

const { user_email_verification } = require("../template/email-verify");
const { forgot_password_otp_verification } = require("../template/otp/forgot-password-otp-verify");

const mailTransportForUser = getMailTransporter(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REFRESH_TOKEN,
  process.env.EMAIL
);

userRouter.post("/verify_email", (req, res) => {
  const { name, url, email } = req.body;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
  };

  const htmlData = user_email_verification(name, url);
  mailOptions.subject = "Verify your email Adderss";
  mailOptions.html = htmlData;

  mailTransportForUser
    .sendMail(mailOptions)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

userRouter.post("/verify_otp", (req, res) => {
  const { name, otp, email } = req.body;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
  };

  const htmlData = forgot_password_otp_verification(name, otp);
  mailOptions.subject = "Forgot password from Shivi Kirana";
  mailOptions.html = htmlData;

  mailTransportForUser
    .sendMail(mailOptions)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

module.exports = userRouter;
