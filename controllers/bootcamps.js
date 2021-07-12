const Bootcamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Get all bootcamps" });
};

// @desc        Get a bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Get bootcamp ${req.params.id}`,
    });
};

// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.postBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ success: true, data: bootcamp });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.putBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`,
    });
};

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`,
    });
};
