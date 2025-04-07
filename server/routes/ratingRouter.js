const Router = require("express")
const ratingController = require("../controllers/ratingController")
const router = new Router()

router.post("/product-option/:productOptionId", ratingController.create)
router.get("/product-option/:productOptionId", ratingController.getAllRatingProductOption)

module.exports = router