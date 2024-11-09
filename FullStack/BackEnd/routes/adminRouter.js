const express=require("express");
const router=express.Router();
const adminController=require("../controller/admincontroller");

router.post("/ban-user/:userId",adminController.banUser);
router.post("/unban-user/:userId",adminController.unBanUser);
router.post("/approve-seller/:userId", adminController.approveSeller);
router.post("/reject-seller/:userId", adminController.rejectSeller);
router.delete("/deleteSeller/:sellerId",adminController.deleteSeller);
router.get("/users",adminController.getAllUsers);
router.get("/sellers",adminController.getAllSellers)
router.get("/getSellerById/:userId", adminController.getSellerById);

module.exports=router