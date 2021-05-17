const Category = require("../models/CategoryModel")
const {validationResult} = require("express-validator");
const { Mongoose } = require("mongoose");

exports.addCategory =async(req,res)=>{
    try{
        const {categoryName, description} = req.body;

    const validationErr= validationResult(req);
    if (validationErr?.errors?.length > 0) {
        return res.status(400).json({errors: validationErr.array()})
    }
    const existCategory = await Category.findOne({categoryName}) 
    if (existCategory) {
        return res.status(400).json({errors:[{message:"Category already exist"}]})
    }

    const category = new Category({   //newCategory(req.body) değişkenler aynı isimdeyse olabilir. 
        categoryName,
        description,
    });
   const addedCategory = await category.save({new:true}); // database kaydedip geri döndürmek için new:true objesi gönder
    //res.status(200).send("Category added")
    res.status(200).json(addedCategory)  // eklendiğini göstermek için geri gönderdik. zorunlu değil.
    }
    catch(err){
        res.status(500).json({errors:[{ message: err.message}]})
    }
}

exports.getCategory =async(req,res)=>{
    try {
        const {id} = req.params;
        const category = await Category.findOne({id})
        res.status(200).json(category)

    }
    catch(err){
        res.status(500).json({errors:[{ message: err.message}]})
    }
    
}
exports.updateCategory =(req,res)=>{
    
}
exports.deleteCategory =(req,res)=>{
    
}
exports.getCategories =(req,res)=>{
    
}