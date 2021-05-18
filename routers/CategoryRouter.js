const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const validations = require("../middleware/validationMiddleware")

//  /api/category

router.post("/add", validations.categoryValidation, CategoryController.addCategory);

router.get("/get/:id", CategoryController.getCategory);

router.post("/update", validations.categoryValidation, CategoryController.updateCategory);

router.get("/delete/:id", CategoryController.deleteCategory);

router.get("/destroy/:id", CategoryController.destroyCategory);

router.get("/", CategoryController.getCategories)

module.exports = router