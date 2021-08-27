const { HttpCode } = require("../helpers/constants");
const Contacts = require("../repositories/contacts");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.listContacts(
      userId,
      req.query
    );

    res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
        ...rest,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await Contacts.addContact(req.body, userId);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
