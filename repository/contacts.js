const fs = require("fs");
const path = require("path");
const util = require("util");
const contactsPath = path.join(__dirname, "..", "model", "contacts.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ContactsRepository {
  constructor() {}

  async listContacts() {
    try {
      const contactsFromDb = await readFile(contactsPath);
      const contacts = JSON.parse(contactsFromDb);

      return contacts;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getContactById(contactId) {
    try {
      const contactsFromDb = await readFile(contactsPath);
      const contacts = JSON.parse(contactsFromDb);
      const contact = contacts.find(
        (contact) => contact.id === Number(contactId)
      );

      if (contact) {
        return contact;
      }

      return null;
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeContact(contactId) {
    try {
      const contactsFromDb = await readFile(contactsPath);
      const contacts = JSON.parse(contactsFromDb);
      const contact = contacts.find(
        (contact) => contact.id === Number(contactId)
      );

      if (contact) {
        const filteredContacts = contacts.filter(
          (contact) => contact.id !== Number(contactId)
        );

        await writeFile(contactsPath, JSON.stringify(filteredContacts));
        return true;
      }

      return false;
    } catch (error) {
      console.log(error.message);
    }
  }

  async addContact(body) {
    try {
      const contactsFromDb = await readFile(contactsPath);
      const contacts = JSON.parse(contactsFromDb);
      const id = contacts[contacts.length - 1].id + 1;
      const newContact = { id, ...body };
      const updatedContacts = [...contacts, newContact];

      await writeFile(contactsPath, JSON.stringify(updatedContacts));
      return newContact;
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateContact(contactId, body) {
    try {
      const contactsFromDb = await readFile(contactsPath);
      const contacts = JSON.parse(contactsFromDb);

      const newContacts = [...contacts];
      const contactToUpdate = newContacts.find(
        (contact) => contact.id === Number(contactId)
      );

      if (contactToUpdate) {
        for (const key in body) {
          contactToUpdate[key] = body[key];
        }

        await writeFile(contactsPath, JSON.stringify(newContacts));
        return contactToUpdate;
      }

      return null;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ContactsRepository;
