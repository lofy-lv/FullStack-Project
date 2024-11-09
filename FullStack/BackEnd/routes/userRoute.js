const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.get("/getUserById/:userId",userController.getUserById)
router.post("/applyForSeller", userController.applyForSeller);
router.post("/AddToCart", userController.AddToCart);
router.get("/getCart/:userId", userController.getCart);
router.delete("/deleteCartItem", userController.deleteCartItem)
router.post("/AddToWishList",userController.AddToWishList)
router.get("/getWishList/:userId",userController.getWishList)
router.delete("/deleteWishList",userController.deleteWishList)
module.exports = router;
