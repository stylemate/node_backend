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

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into there resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/").get(getBootcamps).post(postBootcamp);

router.route("/:id").get(getBootcamp).put(putBootcamp).delete(deleteBootcamp);

module.exports = router;
