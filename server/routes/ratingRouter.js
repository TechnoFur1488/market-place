const Router = require("express")
const ratingController = require("../controllers/ratingController")
const router = new Router()

router.post("/product-option/:productOptionId", ratingController.create)
router.get("/product-option/:productOptionId", ratingController.getAllRating)
router.delete("/:id", ratingController.deleteRating)
router.put("/:id", ratingController.updateRating)

module.exports = router