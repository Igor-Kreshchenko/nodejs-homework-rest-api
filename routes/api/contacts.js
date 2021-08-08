const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");
const {
  validateAdding,
  validateUpdating,
} = require("../../utils/validate/validator");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const validResult = validateAdding.validate(req.body);
  if (validResult.error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  result
    ? res.status(200).json({ message: "Contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.patch("/:contactId", async (req, res, next) => {
  const validResult = validateUpdating.validate(req.body);
  if (validResult.error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
