const mongoose = require("mongoose");
const User = require("./userModel");
const Product = require("./ProductModel");

const sellerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopName: { type: String, required: true },
  shopAddress: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  rating: [
    {
      rating: { type: Number, min: 1, max: 5 },
      comments: String,
      date: { type: Date, default: Date.now },
    },
  ],
},{ timestamps: true });

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
