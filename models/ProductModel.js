const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    productName:{
        type: String,
        required : true
    },
    status:{
        type:String,
        default: 'created'
    },
    description:{
        type:String
    },
    imagePath:{
        type:String,
        default: "https://via.placeholder.com/250x250.png?text=No+Image"
    },
    quantity:{
        type: Number,
        default: 0
    },
    unitPrice:{
        type: Number,
        default: 0,
    },
    createdDate:{
        type: Date,
        default : Date.now,
    },
    updatedDate:{
        type: Date,
       
    },
    deletedDate:{
        type: Date,
       
    },
    categoryId:{
        type: String
    }
})

exports.module = Product = mongoose.model('product', ProductSchema)