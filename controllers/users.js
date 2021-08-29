const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");

require("dotenv").config();

const UploadAvatarService = require("../services/local-upload");
const SECRET_KEY = process.env.SECRET_KEY;
const Users = require("../repositories/users");

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: `${HttpCode.CONFLICT} Conflict`,
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }

    const { id, email, subscription, avatar } = await Users.create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { user: { id, email, subscription, avatar } },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassport = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassport) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    await Users.updateToken(id, token);
    const { email, subscription } = user;

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);

    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await Users.findById(id);
    const { email, subscription } = user;

    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const subscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await Users.updateSubscription(id, req.body);
    const { email, subscription } = user;

    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} success`,
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(
      path.join(process.env.PUBLIC_DIR, process.env.AVATAR_OF_USERS)
    );
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });

    try {
      await fs.unlink(
        path.join(
          process.env.PUBLIC_DIR,
          process.env.AVATAR_OF_USERS,
          req.user.avatar
        )
      );
    } catch (error) {
      console.log(error.message);
    }

    await Users.updateAvatar(id, avatarUrl);

    res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  avatars,
};
