const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../utils/otp");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        password: hashed,
        role: "user"
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log("OTP FOR", email, "=>", otp);

    return res.json({ message: "OTP sent" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
