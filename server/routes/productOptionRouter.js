const Router = require("express")
const productOptionController = require("../controllers/productOptionController")
const router = new Router()

router.get("/:productId", productOptionController.getOne)

module.exports = router