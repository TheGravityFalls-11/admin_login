const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const { verifyOtp } = require("../controllers/verifyOtpController");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

module.exports = router;
