import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
