const express = require("express");
const nodemailer = require("nodemailer");
const nodeoutlook = require("nodejs-nodemailer-outlook");
const fs = require("fs");

const sendmail = require("sendmail")({
  silent: false,
  privateKey: fs.readFileSync("./dkim-private.pem", "utf8"),
  keySelector: "mydomainkey",
  devHost: "localhost"
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// // Using OutLook365

app.get("/", (req, res) => {
  res.send("Hello world");
});

// const transport = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secureConnection: false,
//   tls: {
//     rejectUnauthorized: false,
//     ciphers: "SSLv3"
//   },
//   auth: {
//     user: "rssmtp@russelsmithgroup.com",
//     pass: "Nigeria*1"
//   }
// });

// app.post("/mail", (req, res) => {
//   const testEmail = "noreply@russelsmithgroup.com";
//   const options = {
//     from: testEmail,
//     to: req.body.email,
//     subject: "Hello from test app",
//     text: `Hello ${req.body.email}, You've just received an email from ${testEmail}`
//   };
//   transport.sendMail(options, (err, info) => {
//     if (err) {
//       res.status(500).json({ success: false, msg: `Failure to send email` });
//     }
//     res.status(200).json({
//       success: true,
//       infoId: info.messageId
//     });
//     transport.close();
//   });
// });

app.post("/mail", (req, res) => {
  nodeoutlook.sendEmail({
    auth: {
      user: "iarifayan@russelsmithgroup.com",
      pass: "Stizzlearif@2"
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3"
    },
    // secure: true,
    from: "iarifayan@russelsmithgroup.com",
    to: req.body.email,
    subject: `Test email to ${req.body.email}`,
    html: `<h3>This is just a test, so don't be alarmed</h3>`,
    onError: e => console.log(e),
    onSuccess: i => res.status(200).send({ msg: i })
  });
  // sendmail(
  //   {
  //     from: "arifayanidowu@gmail.com",
  //     to: req.body.email,
  //     replyTo: "iarifayan@russelsmithgroup.com",
  //     subject: "Mail to test sendmail package",
  //     html: `This is just a test so don't be alarmed`
  //   },
  //   (err, reply) => {
  //     if (err) {
  //       res.json(err);
  //     }
  //     res.status(200).json(reply);
  //   }
  // );
});

app.listen(PORT, () => console.log(`[Server]: running live on port ${PORT}`));
