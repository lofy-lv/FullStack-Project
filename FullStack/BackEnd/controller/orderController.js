// controllers/orderController.js
const Order = require("../model/orderModel");
const User = require("../model/userModel");
const Product = require("../model/ProductModel");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      sellerId,
      products,
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentMethod,
      totalAmount
    } = req.body;

    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");
        return { productId: product._id, quantity: item.quantity, price: product.price };
      })
    );

    const order = new Order({
      userId,
      sellerId,
      products: productDetails.map(({ productId, quantity }) => ({ productId, quantity })),
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentMethod,
      totalAmount,
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params; // Use params instead of body
    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("sellerId", "shopName")
      .populate("products.productId", "name price");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};


// Get order by ID
const getOrderById = async (req, res) => {
  try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId)
          .populate("userId", "name email")
          .populate("sellerId", "shopName")
          .populate("products.productId", "name price");

      if (!order) {
          return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve order" });
  }
};

module.exports = { createOrder,getAllOrders,getOrderById};
