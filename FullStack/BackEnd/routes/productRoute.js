const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multerConfig = require("../config/multerConfig");

router.post("/addProduct", 
    multerConfig,
     productController.addProduct);
router.get("/getProduct", productController.getProduct);
router.get("/getProductById/:productId",productController.getProductById)
router.put("/updateProduct/:id",multerConfig, productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
