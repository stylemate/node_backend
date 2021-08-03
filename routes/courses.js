const express = require("express");
const {
    getCourses,
    getCourse,
    postCourse,
    putCourse,
    deleteCourse
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(
        advancedResults(Course, {
            path: "bootcamp",
            select: "name description"
        }),
        getCourses
    )
    .post(protect, postCourse);

router
    .route("/:id")
    .get(getCourse)
    .put(protect, putCourse)
    .delete(protect, deleteCourse);

module.exports = router;
