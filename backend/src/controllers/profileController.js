const Profile = require("../models/Profile");

// Get Profile
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user._id,
    });

    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user._id,
    });

    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
      });
    }

    profile.phone = req.body.phone;
    profile.occupation = req.body.occupation;
    profile.monthlyIncome =
      req.body.monthlyIncome;
    profile.monthlySavingsGoal =
      req.body.monthlySavingsGoal;
    profile.city = req.body.city;
    profile.country =
      req.body.country;
    profile.currency =
      req.body.currency;
    profile.bio = req.body.bio;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};