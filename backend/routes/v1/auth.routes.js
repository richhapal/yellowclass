const express = require("express");
const authSchema = require("../../validations/auth.validations");
const router = express.Router();
const authJoiValidation = require("../../middleware/validation.middleware");
const { createNewUser, userLoginWithEmailAndPassword } = require("../../controllers/auth.controllers");
// controller imports

router.post("/signin", userLoginWithEmailAndPassword);

router.post("/signup", authJoiValidation(authSchema), createNewUser);

module.exports = router;
