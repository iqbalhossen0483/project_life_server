const multer = require("multer");

const ALLOWED_FILE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "/public");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.split(".").slice(0, -1).join(".");

    const fileExtension = file.originalname.split(".").pop();

    const sanitizedFileName = originalName
      .replace(/[^a-zA-Z0-9-_]/g, "")
      .replace(/\s+/g, "_");

    const timestamp = Date.now();

    const finalFileName = `${sanitizedFileName}_${timestamp}.${fileExtension}`;
    cb(null, finalFileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (_req, file, cb) => {
    const mimetype = file.mimetype;
    if (mimetype in ALLOWED_FILE_TYPES) {
      cb(null, true);
    } else {
      cb(new Error("Error: Only allowed file types are accepted."));
    }
  },
});

module.exports = upload;
