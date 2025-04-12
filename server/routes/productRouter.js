const Router = require("express")
const router = new Router()
const productController = require("../controllers/productController.js")

router.post("/", productController.create)
router.get("/", productController.getAll)
router.get("/:subSubCategoryId", productController.getAllCategoryProducts)
router.delete("/:id", productController.deleteProduct)

module.exports = router