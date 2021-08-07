const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const contact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    return await writeFile(contactsPath, JSON.stringify(filteredContacts));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const id = contacts[contacts.length - 1].id + 1;
    const newContact = { id, ...body };
    const updatedContacts = [...contacts, newContact];

    return await writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
