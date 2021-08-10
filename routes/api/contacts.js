const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/controllers");
const {
  validateAddContact,
  validateUpdateContact,
} = require("../../utils/validate/validator");

router.get("/", controllers.listContacts);
router.get("/:contactId", controllers.getContactById);
router.post("/", validateAddContact, controllers.addContact);
router.delete("/:contactId", controllers.removeContact);
router.patch("/:contactId", validateUpdateContact, controllers.updateContact);

module.exports = router;
