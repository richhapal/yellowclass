const express = require("express");
const { addNewContact, updateContact, deleteContact } = require("../../controllers/contact.controllers");
const router = express.Router();

router.post("/add/:userId", addNewContact);

//update contact
router.patch("/update/:userId", updateContact);

//delete UPDATE

router.delete("/delete/:userId", deleteContact);

module.exports = router;
