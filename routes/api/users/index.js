const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubscription,
} = require("./validation");

router.patch("/", guard, validateUpdateSubscription, ctrl.subscription);
router.post("/signup", validateSignupUser, ctrl.signup);
router.post("/login", validateLoginUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.current);
router.patch("/avatars", guard, upload.single("avatar"), ctrl.uploadAvatars);

module.exports = router;
