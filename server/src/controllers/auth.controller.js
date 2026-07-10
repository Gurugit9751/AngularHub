const authService = require("../services/auth.service");
const User = require("../models/user.model");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  ApiResponse.success(
    res,

    "User Registered Successfully",

    user,

    201,
  );
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(
    req.body.email,

    req.body.password,
  );

  ApiResponse.success(
    res,

    "Login Successful",

    result,
  );
});

const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

    .select("-password");

  ApiResponse.success(
    res,

    "Profile Details",

    user,
  );
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,

    {
      firstName: req.body.firstName,

      lastName: req.body.lastName,
    },

    {
      new: true,
    },
  ).select("-password");

  ApiResponse.success(
    res,

    "Profile Updated Successfully",

    user,
  );
});

const bcrypt = require("bcrypt");

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const match = await bcrypt.compare(
    req.body.currentPassword,

    user.password,
  );

  if (!match) {
    throw new Error("Current Password Incorrect");
  }

  user.password = await bcrypt.hash(
    req.body.newPassword,

    10,
  );

  await user.save();

  ApiResponse.success(
    res,

    "Password Changed Successfully",
  );
});

module.exports = {
  register,
  login,
  profile,
  updateProfile,
  changePassword
};
