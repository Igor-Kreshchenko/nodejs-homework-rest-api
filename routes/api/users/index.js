const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const { validateSignupUser, validateLoginUser } = require("./validation");

router.post("/signup", validateSignupUser, ctrl.signup);
router.post("/login", validateLoginUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.current);

module.exports = router;
