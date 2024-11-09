const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecretKey = "sebin123";
const Product = require("../model/ProductModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ error: "Email already exist" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.send("user created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "an error occurred" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    if (user.banned) {
      return res
        .status(403)
        .json({
          error: "Your account has been banned. Please contact support.",
        });
    }

    const comparePwd = await bcrypt.compare(req.body.password, user.password);
    if (!comparePwd) {
      return res
        .status(400)
        .json({ error: "Incorrect password", success: false });
    }

    const authToken = jwt.sign({ email: user.email }, jwtSecretKey, {
      expiresIn: "1d",
    });

    const io = req.app.get("socketio");
    if (req.headers["socket-id"]) {
      user.socketId = req.headers["socket-id"];
      await user.save();
    }

    res.json({ success: true, authToken, user, userId: user._id });
    console.log("Auth Token:", authToken);
  } catch (error) {
    console.error("Server error during login:", error.message);
    res
      .status(500)
      .json({ success: false, error: "An error occurred on the server" });
  }
};

const applyForSeller = async (req, res) => {
  try {
    const { userId, shopName, shopAddress } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role === "seller")
      return res.status(400).json({ error: "User is already a seller" });
    if (user.applicationStatus === "pending")
      return res.status(400).json({ error: "Application is already pending" });

    user.applicationStatus = "pending";
    user.shopName = shopName;
    user.shopAddress = shopAddress;
    await user.save();

    res
      .status(200)
      .json({ message: "Application submitted, awaiting admin approval" });
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for seller" });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    console.log("user", req.body);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const productExists = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (productExists) {
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId
      );
      await user.save();
      res
        .status(200)
        .json({ message: "product removed from the cart", cart: user.cart });
    } else {
      // user.cart.push({productId:productId}) if it is same name
      user.cart.push({ productId });
      await user.save();
      res
        .status(200)
        .json({ message: "product added to the cart", cart: user.cart });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "server error", errorMessage: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cart.productId"
    );

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: "failed to get cart items" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "product not found" });
    }
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res
      .status(200)
      .json({ message: "product reoved from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: "failed to remove product from cart" });
  }
};

const AddToWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const productExist = user.wishList.find(
      (item) => item.productId.toString() === productId
    );
    if (productExist) {
      user.wishList = user.wishList.filter(
        (item) => item.productId.toString() !== productId
      );
      await user.save();
      res.status(200).json({
        message: "product removed from wishlist",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push({ productId });
      await user.save();
      res.status(200).json({
        message: "product added to the wishlist",
        wishList: user.wishList,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "server error", errorMessage: error.message });
  }
};

const getWishList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "wishList.productId"
    );
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json({ wishList: user.wishList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to get wishlist items" });
  }
};

const deleteWishList = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.wishList = user.wishList.filter(
      (item) => item.productId.toString() !== productId
    );
    await user.save();
    res
      .status(200)
      .json({ message: "item removed from wishlist", wishList: user.wishList });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to remove product from the whishlist" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  applyForSeller,
  AddToCart,
  getCart,
  deleteCartItem,
  AddToWishList,
  getWishList,
  deleteWishList,
};
