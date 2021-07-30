const express = require("express");
const {
    getCourses,
    getCourse,
    postCourse,
    putCourse,
    deleteCourse
} = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(postCourse);

router.route("/:id").get(getCourse).put(putCourse).delete(deleteCourse);

module.exports = router;
