const express = require("express");
const router = express.Router();

const requireLogin = require("../middleware/requireLogin");
const requireAdmin = require("../middleware/requireAdmin");

const {
  getMembers,
  updateMembershipStatus,
  extendMembership
} = require("../controllers/adminController");

router.use(requireLogin, requireAdmin);

router.get("/members", getMembers);
router.put("/membership/status", updateMembershipStatus);
router.put("/membership/extend", extendMembership);

module.exports = router;
