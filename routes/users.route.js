const router = require("express").Router();
const usersController = require("../controllers/users");

router.post("/users", usersController.createUser);

router.get("/users", usersController.getUsers);

router.get("/user/:id", usersController.getUser);

module.exports = router;
