const Product = require("../model/ProductModel");
const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, sellerId } = req.body;
    console.log("image",req.file);
    const product =  new Product({
      name,
      description,
      category,
      price,
      stock,
      sellerId,
      image:req.file.filename  // Store uploaded images in the product schema
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    console.log(error); console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async(req,res)=>{
  try{
const product=await Product.findById(req.params.productId);
if(!product) return res.status(404).json({message:"product not found"});
res.status(200).json(product)
  }catch(error){
res.status(500).json({error:error.message})
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, stock, sellerId } = req.body;

    // Build an update object based on req.body
    const updateData = {
      name,
      description,
      category,
      price,
      stock,
      sellerId,
    };

    // Only add image if a file was uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating product");
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send("product deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addProduct, getProduct, getProductById,updateProduct, deleteProduct };
