const fs = require("fs").promises
const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const dir = path.join(__dirname, "../public/uploads/images");

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    try {
      await fs.mkdir(dir, { recursive: true });
      callback(null, dir);
    } catch (error) {
      callback(error);
    }
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!MIME_TYPES[file.mimetype]) {
    cb("File must be an image", false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2MB file size limit
  },
  fileFilter,
}).single("image");
