const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const Auth = require("../controllers/auth");

const passport = require("passport");
router.use(passport.initialize());

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "success" });
});

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
