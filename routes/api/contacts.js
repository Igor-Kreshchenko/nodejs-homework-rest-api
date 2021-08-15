const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateMongoId,
} = require("./validation");

router
  .get("/", ctrl.listContacts)
  .post("/", validateAddContact, ctrl.addContact);

router
  .get("/:contactId", validateMongoId, ctrl.getContactById)
  .delete("/:contactId", validateMongoId, ctrl.removeContact)
  .patch(
    "/:contactId",
    validateMongoId,
    validateUpdateContact,
    ctrl.updateContact
  );

router.patch(
  "/:contactId/favorite",
  validateUpdateStatusContact,
  ctrl.updateContact
);

module.exports = router;
