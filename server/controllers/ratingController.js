const { Rating, ProductOption } = require("../model/model")
const uuid = require("uuid")
const path = require("path")

class RatingController {
    async create(req, res) {
        try {
            const { grade, gradeText } = req.body
            const { productOptionId } = req.params

            const numberGrade = Number(grade)

            if (grade > 5 || grade < 1 || !grade || isNaN(numberGrade)) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const productOption = await ProductOption.findByPk(productOptionId)
            if (!productOption) {
                return res.status(404).json({ message: "Вариант товара не найден" })
            }

            if (gradeText && gradeText.length > 1000) {
                return res.status(400).json({ message: "В отзыве не может быть больше 1000 символов" })
            }

            let fileName = null;
            if (req.files && req.files.img) {
                fileName = uuid.v4() + ".jpg";
                await req.files.img.mv(path.resolve(__dirname, "..", "static", fileName));
            }

            await Rating.create({
                grade: numberGrade,
                gradeText: gradeText || null,
                img: fileName,
                productOptionId: productOption.id
            })

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

    async getAllRating(req, res) {
        try {
            const { productOptionId } = req.params

            const ratingGet = await Rating.findAll({ where: { productOptionId } })

            return res.json(ratingGet)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }

    async deleteRating(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const rating = await Rating.findByPk(id)

            if (!rating) {
                return res.status(404).json({ message: "Рейтинг не найден" })
            }

            const productOptionId = rating.productOptionId

            await Rating.destroy({ where: { id } })

            const fullRatings = await ProductOption.findByPk(productOptionId.id, {
                include: [
                    {
                        model: Rating
                    }
                ]
            })

            return res.json(fullRatings)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }

    async updateRating(req, res) {
        try {
            const { id } = req.params
            const { grade, gradeText, } = req.body
    
            if(!id) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const numberGrade = Number(grade)

            if (grade > 5 || grade < 1 || !grade || isNaN(numberGrade)) {
                return res.status(400).json({ message: "Некорректные данные" })
            }
    
            let fileName
            if (req.files?.img) {
                fileName = uuid.v4() + ".jpg"
                await req.files.img.mv(path.resolve(__dirname, "..", "static", fileName))
            }
    
            const ratingUpdate = {}
    
            if (grade) ratingUpdate.grade = grade
            if(gradeText) ratingUpdate.gradeText = gradeText
    
            await Rating.update(ratingUpdate, {where: {id}})

            const rating = await Rating.findByPk(id)

            return res.json(rating)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }
}

module.exports = new RatingController()