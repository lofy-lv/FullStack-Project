const Image = require("../model/imageModel");
const fs = require("fs");
const path = require("path");

const getImage = async (req, res) => {
  try {
    const imageFiles = await Image.find();
    const imageFileNames = imageFiles.map((file) => file.filename);
    console.log("image filenames:", imageFileNames);
    res.json({ imageFileNames });
  } catch (error) {
    res.status(500).json({ error: "Error reading image directory" });
  }
};

const uploadImage = async (req, res) => {
  console.log("req file", req.file);
  if (req.file) {
    const image = new Image({ filename: req.file.filename });
    await image.save();

    return res.status(200).json({
      success: true,
      message: "image uploaded",
    });
  }

  return res.status(400).json({
    success: false,
    message: "image upload failed",
  });
};
module.exports = { getImage, uploadImage };
