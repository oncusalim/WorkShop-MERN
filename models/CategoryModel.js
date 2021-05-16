const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryName : {
        type:String,
        required: true
    },
    status:{
        type: String,
        default: 'created'
    },
    description:{
        type:String,

    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    updatedDate:{
        type: Date,
        
    },
    deletedDate:{
        type: Date,
       
    }
})


exports.module = Category = mongoose.model("category", "CategorySchema")