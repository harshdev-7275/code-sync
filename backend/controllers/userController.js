import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/ set token
//route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register new user
//route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { id, name, password, role } = req.body;
  const userExists = await User.findOne({ id });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    id,
    name,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout User
//route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc getUserProfile
//route POST /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = {
    _id: req.user._id,
    id: req.user.id,
    name: req.user.name,
    role: req.user.role,
  };
  res.status(200).json(user);
});

// @desc updateUserProfile
//route put /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
