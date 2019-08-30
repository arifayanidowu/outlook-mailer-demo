require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();
const cors = require("cors");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: `Welcome to API playground.` });
});

app.post("/mail", (req, res) => {
  sgMail.s;
  const msg = {
    to: req.body.email,
    from: "test@example.com",
    subject: "Sending with Twilio SendGrid is Fun",
    templateId: process.env.TEMPLATE_ID,
    dynamic_template_data: {
      subject: "Sending with Twilio SendGrid is Fun",
      name: req.body.username,
      sender_name: "stizzleB",
      sender_address: "10, Owonikoko Blvd, Ajah, Lagos."
    }
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  return sgMail.send(msg, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, err });
    }
    res.status(200).send({ success: true, result });
  });
});

app.listen(PORT, (req, res) =>
  console.log(`[Server]: Started on port ${PORT}`)
);
