const express=require("express")
const router=express.Router()
// const multerConfig=require("../config/multerConfig")

const uploadNewImage=require("../config/multerConfig")
const imageController=require("../controller/imageController")


router.post("/uploadImage",uploadNewImage,imageController.uploadImage)
router.get("/getImage",imageController.getImage)

module.exports=router;