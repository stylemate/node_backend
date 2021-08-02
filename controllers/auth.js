const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// @desc        Get all users
// @route       GET /api/v1/auth/users
// @access      Public
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
});

// @desc        Register user
// @route       GET /api/v1/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create User
    // password will be hashed through middleware
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Create token
    const token = user.getSignedJwt();

    res.status(200).json({ success: true, token });
});
