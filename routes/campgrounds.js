const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgroundsController = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router
  .route("/")
  // display all the existing campgrounds
  .get(catchAsync(campgroundsController.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundsController.createCamp)
  );

router.get("/new", isLoggedIn, campgroundsController.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundsController.getCamp))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundsController.editCamp)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCamp));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsController.editForm)
);

module.exports = router;
