const express = require("express");
const {
    getBootcamps,
    getBootcamp,
    postBootcamp,
    putBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require("../controllers/bootcamps");
const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(postBootcamp);

router.route("/:id").get(getBootcamp).put(putBootcamp).delete(deleteBootcamp);

module.exports = router;
