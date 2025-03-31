const Router = require("express")
const router = new Router()
const productRouter = require("./productRouter.js")
const categoryRouter = require("./categoryRouter.js")

router.use("/products", productRouter)
router.use("/category", categoryRouter)

module.exports = router