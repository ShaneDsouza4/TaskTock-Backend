const express = require("express");
const router = express.Router();

const Timer = require("../controllers/timer");

const passport = require("passport");
require("../features/jwt")(passport);
router.use(passport.initialize());

router.get(
  "/taskbook",
  passport.authenticate("jwt", { session: false }),
  Timer.getTaskbook
);
router.post(
  "/save",
  passport.authenticate("jwt", { session: false }),
  Timer.saveEntries
);

module.exports = router;
