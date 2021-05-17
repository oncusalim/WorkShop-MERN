const router = require("express").Router();
const productController = require("../controllers/ProductController")
const validations = require("../middleware/validationMiddleware")

router.post("/add", validations.productValidation, productController.addProduct);

router.get("/product/:id", productController.getProduct);

router.post("/update", validations.productValidation, productController.updateProduct);

router.get("/delete/:id", productController.deleteProduct);

router.get("/", productController.getProducts);

module.exports = router;