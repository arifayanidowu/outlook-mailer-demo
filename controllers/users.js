const User = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createUser = (req, res, next) => {
  const data = req.body;

  const user = new User(data);
  return bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      res.send(err);
      next(err);
    }
    bcryptjs.hash(user.password, salt).then(hash => {
      user.password = hash;
      user
        .save()
        .then(data => {
          res.status(200).send({ success: true, data });
        })
        .catch(err => res.send(err));
    });
  });
};

exports.getUsers = (req, res, next) => {
  User.find({}).exec((err, data) => {
    if (err) {
      res.send(err);
      next(err);
    }
    res.status(200).send({ success: true, data });
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (err, doc) => {
    if (err) {
      res.send(err);
      next(err);
    }
    res.status(200).send({ success: true, doc });
  });
};
