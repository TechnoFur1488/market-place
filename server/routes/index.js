const Router = require("express")
const router = new Router()
const productRouter = require("./productRouter.js")
const categoryRouter = require("./categoryRouter.js")
const productOptionRouter = require("./productOptionRouter.js")
const ratingRouter = require("./ratingRouter.js")

router.use("/products", productRouter)
router.use("/category", categoryRouter)
router.use("/product-option", productOptionRouter)
router.use("/ratings", ratingRouter)

module.exports = router