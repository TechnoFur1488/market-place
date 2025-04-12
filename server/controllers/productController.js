const { Product, ProductOption } = require("../model/model.js")
const uuid = require("uuid")
const path = require("path")
class ProductController {
    async create(req, res) {
        try {
            const { name, price, discount, subSubCategoryId, description, size, color, compound, gender, season } = req.body
            const { img } = req.files

            if (name.length < 13) {
                return res.status(400).json({ message: "Имя не может быть короче чем 13 символов" })
            }
            if (price > discount) {
                return res.status(400).json({ message: "Цена не может быть больше скидки" })
            }
            if (price === discount) {
                return res.status(400).json({ message: "Цена не может быть равна скидке" })
            }
            if (!name || !price || !discount || !subSubCategoryId || !img || !description || !size || !color || !compound || !gender || !season) {
                return res.status(400).json({ message: "Некорректные данные" })
            }
            if (description.length < 550) {
                return res.status(400).json({ message: "Описание не может быть короче чем 550 символов" })
            }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const product = await Product.create({ img: fileName, name, price, discount, subSubCategoryId })

            await ProductOption.create({ img: fileName, name, price, discount, description, size, color, compound, gender, season, productId: product.id })

            const fullProducts = await Product.findByPk(product.id, {
                include: {
                    model: ProductOption,
                }
            })

            return res.json(fullProducts)
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

            const products = await Product.findAll({ where: { subSubCategoryId } })

            return res.json(products)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            await Product.destroy({ where: { id } })

            return res.json({ message: "Товар удален" })

        } catch (e) {
            console.log(e);

        }
    }

}

module.exports = new ProductController()