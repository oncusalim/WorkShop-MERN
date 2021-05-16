const router = require("express").Router()
const CategoryRouter = require("./CategoryRouter");
const ProductRouter = require("./ProductRouter");

//  /api 

router.use("/", (req,res)=>{
    res.send("api base sayfası")
})
router.use("/products", ProductRouter);
router.use("/category", CategoryRouter);






module.exports = router