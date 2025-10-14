const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const OAuth2 = google.auth.OAuth2;

const getMailTransporter = (clientId, clientSecret, refreshToken, email) => {
  const oauth2Client = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const accessToken = oauth2Client.getAccessToken();

  const mailTransport = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: email,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  };

  const maillTransporter = nodemailer.createTransport(mailTransport);

  maillTransporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Gmail Server is ready to take messages");
    }
  });

  return maillTransporter;
};

module.exports = { getMailTransporter };
