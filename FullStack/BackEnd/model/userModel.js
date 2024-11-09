const mongoose = require("mongoose");
const Product = require("./ProductModel");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
    default: 'user', 
    required:true
  },
  banned:{
    type:Boolean,
    default:false
  },
  socketId: { type: String, default: null },
  applicationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected", "not applied","removed"],
    default: "not applied",
  },
 
  
  shopName: String, 

  shopAddress: String, 

  wishList: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  order: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
