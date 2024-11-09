const Seller = require("../model/sellerModel");

// const createSeller = async (req, res) => {
//   try {
//     const { userId,name, shopName,shopAddress } = req.body;
//     const newSeller = new Seller({
//       userId,
//       name,
//       shopName,
//       shopAddress
//     });
//     const savedSeller = await newSeller.save();
//     res.status(201).json(savedSeller);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().populate("userId", "name email");
//     res.status(200).json(sellers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getSellerById = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id)
//       .populate("userId", "name email")
//       .populate("products.productId");
//     if (!seller) {
//       return res.status(404).json({ message: "seller not found" });
//     }
//     res.status(200).json(seller);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateSeller = async (req, res) => {
//   try {
//     const updateSeller = await Seller.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updateSeller) {
//       return res.status(404).json({ message: "seller not found" });
//     }
//     res.status(200).json(updateSeller);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteSeller=async(req,res)=>{
//     try{
// const deleteSeller=await Seller.findByIdAndDelete(req.params.id)
// if(!deleteSeller){
//     return res.status(404).json({message:"Seller not found"})
// }
// res.status(200).json({message:"Seller deleted successfully"})
//     }catch(error){
// res.status(500).json({error:error.message})
//     }
// }

// module.exports={
//     createSeller ,getAllSellers,getSellerById,updateSeller,deleteSeller
// }