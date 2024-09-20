const express = require("express");
const router = express.Router();

const Timer = require("../controllers/timer");

const passport = require("passport");
router.use(passport.initialize());

router.get(
  "/workbook",
  passport.authenticate("jwt", { session: false }),
  Timer.getTaskbook
);
router.post(
  "/save",
  passport.authenticate("jwt", { session: false }),
  Timer.saveEntries
);
