const { default: mongoose } = require("mongoose")

mongoose=require("mongoose")
const adminSchema=mongoose.Schema({
    name:{type:String,
        default:"admin"
    },
    email:{type:String,
        default:"admin@gmail.com"
    },
    password:{type:String,
        default:"123"
    },
    role:{
        type:String,
        default:"admin"
    },
    actions:[
        {
            actionType:String,
            targetType:String,
            targetId:mongoose.Schema.Types.ObjectId,
            date:{type:Date,default:Date.now}
        }
    ]
})

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin

