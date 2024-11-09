const mongoose=require("mongoose")

const addressSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  });

const orderSchema=mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    required:true
   } ,
   sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
   products:[
    {
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",},
        quantity:{type:Number,
            required:true
        },
    },
   ],
   shippingAddress: {
    type: addressSchema,
    required: true,
  },
   shippingMethod: { type: String, required: true },
   shippingCost: { type: Number, required: true },
   paymentMethod: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal'
   paymentStatus: { type: String, default: 'Pending', enum: ["Pending", "Paid", "Failed"] },
   totalAmount: { type: Number, required: true },
   orderStatus: { type: String, default: 'Processing', enum: ["Processing", "Shipped", "Delivered", "Cancelled"] },
 }, { timestamps: true });
 
 const Order = mongoose.model("Order", orderSchema);
 
 module.exports = Order;
