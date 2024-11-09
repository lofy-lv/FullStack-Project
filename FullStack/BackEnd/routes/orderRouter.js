const express = require("express");
const orderController = require("../controller/orderController");
const router = express.Router();

router.post("/create",orderController.createOrder);
router.get("/getAllOrders/:userId", orderController.getAllOrders);
router.get("/getOrderById/:orderId", orderController.getOrderById);

module.exports = router;
