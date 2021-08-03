const express = require("express");
const {
    getBootcamps,
    getBootcamp,
    postBootcamp,
    putBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into there resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getBootcamps)
    .post(protect, postBootcamp);

router
    .route("/:id")
    .get(getBootcamp)
    .put(protect, putBootcamp)
    .delete(protect, deleteBootcamp);

module.exports = router;
