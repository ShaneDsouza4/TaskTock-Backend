const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const Auth = require("../controllers/auth");

const passport = require("passport");
require("../features/jwt")(passport);
router.use(passport.initialize());

router.post(
  "/register",
  [
    check("email", "Email is invalid").isEmail().normalizeEmail(),
    check(
      "password",
      "Password must be at least 6 characters and less than 20"
    ).isLength({ min: 6, max: 20 }),
  ],
  Auth.register
);

router.post(
  "/login",
  [check("email", "Email is invalid").isEmail().normalizeEmail()],
  Auth.login
);

module.exports = router;
