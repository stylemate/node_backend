const express = require("express");
const { getCourses, getCourse, postCourse } = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(postCourse);

router.route("/:id").get(getCourse);

module.exports = router;
