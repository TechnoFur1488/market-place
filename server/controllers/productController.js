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
            console.error(e)
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
            console.log(e)
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
            console.error(e)
            return res.status(400).json({ message: "На сервере произошла ошибка" })
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params
            const { description, size, color, name, price, discount, compound, gender, season } = req.body

            let fileName
            if (req.files?.img) {
                fileName = uuid.v4() + ".jpg"
                await req.files.img.mv(path.resolve(__dirname, "..", "static", fileName))
            }

            const productUpdateData = {}
            if (fileName) productUpdateData.img = fileName
            if (name) productUpdateData.name = name
            if (price) productUpdateData.price = price
            if (discount !== undefined) productUpdateData.discount = discount

            await Product.update(productUpdateData, { where: { id } })

            const optionUpdateData = {}
            if (fileName) optionUpdateData.img = fileName
            if (description) optionUpdateData.description = description
            if (size) optionUpdateData.size = size
            if (color) optionUpdateData.color = color
            if (name) optionUpdateData.name = name
            if (price) optionUpdateData.price = price
            if (discount !== undefined) optionUpdateData.discount = discount
            if (compound) optionUpdateData.compound = compound
            if (gender) optionUpdateData.gender = gender
            if (season) optionUpdateData.season = season

            await ProductOption.update(optionUpdateData, { where: { productId: id } })

            const fullProduct = await Product.findByPk(id, {
                include: [{
                    model: ProductOption
                }]
            })

            return res.json(fullProduct)

        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: "Ошибка сервера при обновлении товара" })
        }
    }

}

module.exports = new ProductController()