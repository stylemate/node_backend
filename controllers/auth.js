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
// @route       POST /api/v1/auth/register
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

    sendTokenResponse(user, 200, res);
});

// @desc        Login user
// @route       POST /api/v1/auth/users
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password (since it doesn't go through mongoose)
    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide valid email and password", 400)
        );
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwt();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token });
};

// @desc        Get current logged in user
// @route       GET /api/v1/auth/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("Invalid token", 401));
    }

    res.status(200).json({ success: true, data: user });
});
