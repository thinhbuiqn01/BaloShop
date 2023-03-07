import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"; // Middleware to handle exceptions inside async express routes
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;

  const slugExists = await User.findOne({ slug });

  // If the user exists already
  if (slugExists) {
    res.status(400);
    throw new Error("Slug already exists");
  }

  // Create a new user
  const category = await Category.create({
    name,
    slug,
    description,
  });

  // If the user is successfully created then send back user details in response
  if (category) {
    res.status(201).json({
      status: 200,
      data: {
        ...category,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Catory not found");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});

  if (category) {
    res.json({
      data: category,
    });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});
const getCategoryEnable = asyncHandler(async (req, res) => {
  const category = await Category.find({ status: 1 });

  if (category) {
    res.json({
      data: category,
    });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

const updateCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Check which fields were sent in the request else just keep them the same
    category.name = req.body.name || category.name;
    category.slug = req.body.slug || category.slug;
    category.description = req.body.description || category?.description;
    category.status = req.body.status ?? category.status;

    const slugExists = await Category.findOne({ slug: category.slug });

    // If the user exists already

    // Check if password was sent with request

    if (slugExists && req.body.slug != category.slug) {
      res.status(201).json({
        status: 400,
        data: {
          email: "Slug already exists.",
        },
      });
    }

    const categoryUp = await category.save();

    res.status(201).json({
      status: 200,
      data: categoryUp,
    });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  createCategory,
  getCategory,
  getCategoryById,
  getCategoryEnable,
  updateCategoryById,
};
