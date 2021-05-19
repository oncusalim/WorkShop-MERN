const Product = require("../models/ProductModel");
const {validationResult} =require("express-validator")

exports.addProduct = async(req,res)=>{
    try{
        const { productName, description, quantity, unitPrice, categoryId} = req.body
        const validationErr = validationResult(req);
        if (validationErr?.errors?.length >0) {
            return res.status(500).json({errors:validationErr.array()})
        }
        const existProduct = await Product.findOne({productName})
        if (existProduct) {
            return res.status(400).json({errors:[{message:`${productName} has already exist`}]})
        }
        const product = new Product({ productName, description, quantity, unitPrice, categoryId })
        const addedProduct = await product.save({new:true})
        res.status(200).json(addedProduct)
    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}
exports.getProduct = async(req,res)=>{
    try{
        const product = await Product.findOne({categoryId:req.params.id})
        res.status(200).json(product)
    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}
exports.updateProduct = async(req,res)=>{
    try{
        const validationErr = validationResult(req);
        if (validationErr?.errors?.length>0){
            res.status(500).json({errors:validationErr.array()});
        }
        const product = await Product.findOneAndUpdate({id:req.body.id},{
            ...req.body,
            status:"updated",
            updatedDate: Date.now()
        },
        {
            new:true,
            runValidators:true
        })
        res.status(200).json(product)
    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
        const product = await Product.findOneAndUpdate(
            {categoryId:req.params.id},{status:"deleted"}, {new:true, runValidators:true})
            res.status(200).json(product)

    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}
exports.getProducts = async(req,res)=>{
    try{
        const products = await Product.find().where('status', /[^deleted]/)
        res.status(200).json(products)
    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}

exports.destroyProduct = async(req,res)=>{
    try{
        await Product.findOneAndDelete({categoryId:req.params.id})
        res.status(200).send("Product Silindi")
    }
    catch(err){
        res.status(400).json({errors:[{message:err.message}]})
    }
}