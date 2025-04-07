const { ProductOption } = require("../model/model.js")

class ProductOptionController {
    async getOne(req, res) {
        try {
            const { productId } = req.params

            if (!productId) {
                return res.status(400).json({ message: "Не указан ID продукта" })
            }

            const productOption = await ProductOption.findOne({ where: { productId } })

            return res.json(productOption)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }
}

module.exports = new ProductOptionController()