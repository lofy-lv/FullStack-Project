const User = require("../model/userModel");
const Seller = require("../model/sellerModel");
const Product = require("../model/ProductModel");

const adminController = {
  banUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, { banned: true });
      
      if (user) {
        const io = req.app.get("socketio");
        io.to(user.socketId).emit("forceLogout"); // Emit force logout event to this user
        res.status(200).json({ message: "User has been banned and notified to log out" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to ban user" });
    }
  },

  unBanUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, { banned: false });
  
      if (user) {
        res.status(200).json({ message: "User has been unbanned successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to unban user" });
    }
  },

  approveSeller: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.applicationStatus !== "pending")
        return res
          .status(400)
          .json({ error: "No pending application for this user" });

      // Create Seller record
      const seller = new Seller({
        userId: user._id,
        shopName: user.shopName,
        shopAddress: user.shopAddress,
      });

      await seller.save();
      user.role = "seller";
      user.applicationStatus = "approved";
      await user.save();

      res.status(200).json({ message: "Seller approved", seller });
    } catch (error) {
      res.status(500).json({ error: "Failed to approve seller" });
    }
  },

  // Reject Seller Application
  rejectSeller: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.applicationStatus !== "pending")
        return res
          .status(400)
          .json({ error: "No pending application for this user" });

      user.applicationStatus = "rejected";
      await user.save();

      res.status(200).json({ message: "Seller application rejected" });
    } catch (error) {
      res.status(500).json({ error: "Failed to reject seller application" });
    }
  },
  deleteSeller: async (req, res) => {
    try {
      const { sellerId } = req.params;
      const seller = await Seller.findById(sellerId);
      if (!seller) return res.status(404).json({ error: "Seller not found" });
      await Seller.findByIdAndDelete(sellerId);
      await User.findByIdAndUpdate(seller.userId, { role: "user",applicationStatus:"removed" });
      res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "failed to remove seller" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  },
  getSellerById: async (req, res) => {
    try {
      const seller = await Seller.findOne({ userId: req.params.userId })
        .populate('userId', 'name email') // Populate user details if needed
        .populate('products.productId'); // Populate products if needed
  
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
      
      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllSellers: async (req, res) => {
    try {
      const sellers = await Seller.find({}).populate("userId");
      res.status(200).json(sellers);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve sellers" });
    }
  },
};

module.exports = adminController;
