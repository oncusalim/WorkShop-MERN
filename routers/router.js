const router = require("express").Router()
const CategoryRouter = require("./CategoryRouter");
const ProductRouter = require("./ProductRouter");

//  /api 


router.use("/products", ProductRouter);
router.use("/category", CategoryRouter);

router.use("/", (req,res)=>{
    res.send("api base sayfası")
})

module.exports = router