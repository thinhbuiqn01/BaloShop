// const multer = require("multer");
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, file, callBack) => {
    callBack(null, "frontend/public/images");
  },
  filename: (_req, file, callBack) => {
    const uniqueSuffix = `${Date.now() + file.originalname}`;

    callBack(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, callBack) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
      callBack(null, true);
    else {
      callBack(null, false);
      return callBack(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// module.exports = upload;
