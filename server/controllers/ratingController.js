const { Rating, ProductOption } = require("../model/model")
const uuid = require("uuid")
const path = require("path")

class RatingController {
    async create(req, res) {
        try {
            const { grade, gradeText } = req.body
            const { img } = req.files
            const { productOptionId } = req.params

            const numberGrade = Number(grade)

            if (grade > 5 || grade < 1 || !grade || isNaN(numberGrade)) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const productOption = await ProductOption.findByPk(productOptionId)
            if (!productOption) {
                return res.status(404).json({ message: "Вариант товара не найден" })
            }

            if (gradeText.length > 1000) {
                return res.status(400).json({ message: "В отзыве не может быть больше 1000 символов" })
            }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            await Rating.create({ grade, gradeText, img: fileName, productOptionId: productOption.id })

            const fullProductsRating = await ProductOption.findByPk(productOption.id, {
                include: [
                    {
                        model: Rating
                    }
                ]
            })

            return res.json(fullProductsRating)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }

    async getAllRatingProductOption(req, res) {
        try {
            const { productOptionId } = req.params

            const ratingGet = await Rating.findAll({ where: { productOptionId } })

            return res.json(ratingGet)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }
}

module.exports = new RatingController()