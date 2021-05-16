const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

//  /api/category

router.post("/add", CategoryController.addCategory);

router.get("/get/:id", CategoryController.getCategory);

router.post("/update", CategoryController.updateCategory);

router.get("/delete/:id", CategoryController.deleteCategory);

router.get("/", CategoryController.getCategories)