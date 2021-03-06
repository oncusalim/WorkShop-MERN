const Category = require("../models/CategoryModel")
const {validationResult} = require("express-validator");

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
        const category = await Category.findById({_id:id}) //findOne da kullanılabilir
        res.status(200).json(category)

    }
    catch(err){
        res.status(500).json({errors:[{ message: err.message}]})
    }
    
}
exports.updateCategory =async(req,res)=>{
   
        
        const validationErr = validationResult(req)
        if (validationErr?.errors?.length>0){
             res.status(400).json({errors:validationErr.array()})
        } 
        
        try{
        const category = await Category.findOneAndUpdate({_id:req.body.id}, 
            {
                ...req.body,
                status:"updated",
                updatedDate: Date.now()
            },
            {
                new:true,                  //options bölümü geri veri döndürüyor.
                runValidators:true        //veritabanı ile modelin uyumunu kontrol ediyor.
            }   
            )
             res.status(200).json(category)

    }
    catch(err){
       
        return res.status(500).json({errors:[{message: err.message}]})
    }
}
exports.deleteCategory =async(req,res)=>{
    // try{
    //     const category = await Category.findOneAndDelete({_id:req.params.id})
    //     res.status(200).json(category)
    // }
    // catch(err){
    //     return res.status(500).json({errors:[{message: err.message}]})
    // }
    try{
        const category = await Category.findOneAndUpdate({_id:req.params.id}, 
            {
                status:"deleted",
                deletedDate: Date.now()
            },
            {
                new:true,                 
                runValidators:true       
            }   
            )
             res.status(200).json(category)
            // res.status(200).send("Category deleted")

    }
    catch(err){
       
        return res.status(500).json({errors:[{message: err.message}]})
    }
    
}
exports.getCategories =async(req,res)=>{
    try{
        //deleted olmayan verileri döndürüyoruz. geri dönen veride status bilgisini istemiyorum.
        const categories = await Category.find().where('status', /[^deleted]/).select('-status');
        res.status(200).json(categories)
    }
    catch(err){
        return res.status(500).json({errors:[{message: err.message}]})
    }
}

exports.destroyCategory = async (req,res)=>{
    try{
        await Category.deleteOne({_id:req.params.id})
        res.status(200).send("Data is deleted")
    }
    catch(err){
        return res.status(500).json({errors:[{message: err.message}]})
    }
}