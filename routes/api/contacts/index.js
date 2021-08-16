const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateMongoId,
} = require("./validation");

router
  .get("/", guard, ctrl.listContacts)
  .post("/", guard, validateAddContact, ctrl.addContact);

router
  .get("/:contactId", guard, validateMongoId, ctrl.getContactById)
  .delete("/:contactId", guard, validateMongoId, ctrl.removeContact)
  .patch(
    "/:contactId",
    guard,
    validateMongoId,
    validateUpdateContact,
    ctrl.updateContact
  );

router.patch(
  "/:contactId/favorite",
  guard,
  validateUpdateStatusContact,
  ctrl.updateContact
);

module.exports = router;
