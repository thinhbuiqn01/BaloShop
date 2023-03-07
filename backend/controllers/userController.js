import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"; // Middleware to handle exceptions inside async express routes
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find a user by email
  const user = await User.findOne({ email });

  // If the user exists and the password matches the one store return the details with JSON web token signature
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  // If the user exists already
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // If the user is successfully created then send back user details in response
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Check which fields were sent in the request else just keep them the same
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.numberPhone = req.body.numberPhone || user.numberPhone;
    user.status = req.body.status || user.status;

    // Check if password was sent with request
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      numberPhone: updateUser.numberPhone,
      status: updateUser.status,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsersAdmin = asyncHandler(async (req, res) => {
  const userAdmin = await User.find({ isAdmin: true });

  if (userAdmin) {
    res.json({
      data: userAdmin,
      //   _id: userAdmin._id,
      //   name: userAdmin.name,
      //   email: userAdmin.email,
      //   isAdmin: userAdmin.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getUsersCustomer = asyncHandler(async (req, res) => {
  const userCustomer = await User.find({ isAdmin: false });

  if (userCustomer) {
    res.json({
      data: userCustomer,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, andress, numberPhone, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  // If the user exists already
  if (userExists) {
    res.status(201).json({
      status: 400,
      data: {
        email: "Email already exists.",
      },
    });
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
    andress,
    numberPhone,
    isAdmin,
  });

  // If the user is successfully created then send back user details in response
  if (user) {
    res.status(201).json({
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        numberPhone: user.numberPhone,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Check which fields were sent in the request else just keep them the same
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.numberPhone = req.body.numberPhone || user.numberPhone;
    user.status = req.body.status ?? user.status;

    const userExists = await User.findOne({ email: user.email });

    // If the user exists already

    // Check if password was sent with request
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (userExists && req.body.email != user.email) {
      res.status(201).json({
        status: 400,
        data: {
          email: "Email already exists.",
        },
      });
    }

    const updateUser = await user.save();
    res.status(201).json({
      status: 200,
      data: {
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        address: updateUser.address,
        numberPhone: updateUser.numberPhone,
        isAdmin: updateUser.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsersAdmin,
  getUsersCustomer,
  createUser,
  getUserById,
  updateUserById,
};
