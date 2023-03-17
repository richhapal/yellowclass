const express = require("express");
const verifyAuth = require("../../middleware/verifyAuth.middleware");
const router = express.Router();
const authRouter = require("./auth.routes");
const contactRouter = require("./contact.routes");

router.use("/auth", authRouter);
router.use("/contact", verifyAuth, contactRouter);

module.exports = router;
