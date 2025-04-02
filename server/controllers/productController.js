const { Product, SubSubCategory } = require("../model/model")
const uuid = require("uuid")
const path = require("path")
class ProductController {
    async create(req, res) {
        try {
            const { name, price, discount, subSubCategoryId } = req.body
            const { img } = req.files

            if (name.length < 13) {
                return res.status(400).json({ message: "Имя не может быть котороче 13 символов" })
            }
            if (price > discount) {
                return res.status(400).json({ message: "Цена не может быть больше скидки" })
            }
            if (price === discount) {
                return res.status(400).json({ message: "Цена не может быть равной скидке" })
            }
            if (!name || !price || !discount || !subSubCategoryId || !img) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const product = await Product.create({ img: fileName, name, price, discount, subSubCategoryId })

            return res.json(product)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }

    async getAll(req, res) {
        try {
            const product = await Product.findAll()
            return res.json(product)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }

    async getAllCategoryProducts(req, res) {
        try {
            const { subSubCategoryId } = req.params
            
            if (!subSubCategoryId) {
                return res.status(400).json({ message: "Не указан ID подкатегории" })
            }

            const products = await Product.findAll({ where: { subSubCategoryId }})

            return res.json(products)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ProductController()