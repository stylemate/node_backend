const express = require("express");
const { register, getUsers } = require("../controllers/auth");

const router = express.Router();


router.get("/users", getUsers);
router.post("/register", register);

module.exports = router;
