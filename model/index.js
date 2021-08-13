const fs = require("fs");
const path = require("path");
const util = require("util");
const contactsPath = path.join(__dirname, "contacts.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readData = async () => {
  const data = await readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();
  const result = data.find((contact) => contact.id === Number(contactId));

  return result;
};

const removeContact = async (contactId) => {
  const data = await readData();
  const result = data.find((contact) => contact.id === Number(contactId));

  if (result) {
    const filteredData = data.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await writeFile(contactsPath, JSON.stringify(filteredData));
    return result;
  }

  return null;
};

const addContact = async (body) => {
  const data = await readData();
  const id = data[data.length - 1].id + 1;
  const record = { id, ...body };
  data.push(record);

  await writeFile(contactsPath, JSON.stringify(data));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await readData();
  const result = data.find((contact) => contact.id === Number(contactId));

  if (result) {
    Object.assign(result, body);
    await writeFile(contactsPath, JSON.stringify(data));
    return result;
  }

  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
