const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { clouddebugger } = require("googleapis/build/src/apis/clouddebugger");
const OAuth2 = google.auth.OAuth2;
const express = require("express");


require("dotenv").config();

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    console.log(err);
  }
};
const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  let p =  await emailTransporter.sendMail(emailOptions);
  return p
};

const router = express.Router();
router.post("/", async (req, res) => {
  const { subject, text, to } = req.body;
  try {
   let p =  await sendEmail({
      subject: subject,
      text: text,
      to: to,
      from: process.env.EMAIL,
    });
    console.log(p);
    res.status(200).json(p);
    return;
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
