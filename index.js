require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: `Welcome to API playground.` });
});

app.post("/mail", (req, res) => {
  const msg = {
    to: req.body.email,
    from: "Sent <noreply@russelsmithgroup.com>",
    subject: "This is a test, don't be alarmed",
    text: "Welcome to API playground",
    html: "<strong>Welcome to API playground</strong>"
  };
  sgMail
    .send(msg)
    .then(res => res.status(200).json({ success: true, msg: res }))
    .catch(err => res.status(500).json({ success: false, err }));
});

app.listen(PORT, (req, res) =>
  console.log(`[Server]: Started on port ${PORT}`)
);
