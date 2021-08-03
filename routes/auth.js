const express = require("express");
const { register, getUsers, login } = require("../controllers/auth");

const router = express.Router();


router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
