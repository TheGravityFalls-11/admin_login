const User = require("../models/User");

exports.getMembers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.updateMembershipStatus = async (req, res) => {
  const { userId, status } = req.body;

  await User.findByIdAndUpdate(userId, {
    membershipStatus: status
  });

  res.json({ message: "Membership status updated" });
};

exports.extendMembership = async (req, res) => {
  const { userId, expiryDate } = req.body;

  await User.findByIdAndUpdate(userId, {
    membershipExpiry: expiryDate,
    membershipStatus: "active"
  });

  res.json({ message: "Membership extended" });
};
