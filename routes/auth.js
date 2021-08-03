const express = require("express");
const { register, getUsers, login, getMe } = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/users", getUsers);
router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
