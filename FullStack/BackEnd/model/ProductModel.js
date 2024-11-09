const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{type: String,
    required:true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: { type: Number, default: 0 },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true, 
  },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
      rating: { type: Number, min: 1, max: 5 },
      date: { type: Date, default: Date.now },
    },
  ],
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
