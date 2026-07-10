const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const register = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  return {
    user,
    token: generateToken(user),
  };
};

module.exports = {
  register,
  login,
};
