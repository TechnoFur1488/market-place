const { SubCategory, Category, SubSubCategory } = require("../model/model");

class CategoryController {
    async create(req, res) {
        try {
            const { name, subName, subSubName } = req.body


            if (!name) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const category = await Category.create({ name })

            if (subName) {
                const subCategory = await SubCategory.create({
                    name: subName,
                    url: `/category-products/${category.id}`,
                    categoryId: category.id
                })
                if (subSubName) {
                    const subSubCategory = await SubSubCategory.create({
                        name: subSubName,
                        subCategoryId: subCategory.id
                    })

                    subSubCategory.url = `/category-products/${subSubCategory.id}`
                    await subSubCategory.save()
                }
            }
            const fullCategory = await Category.findByPk(category.id, {
                include: [
                    {
                        model: SubCategory,
                        as: "sub_categories",
                        include: [
                            {
                                model: SubSubCategory,
                                as: "sub_sub_categories"
                            }
                        ]
                    }
                ]
            })

            return res.json(fullCategory)

        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const category = await Category.findAll({
                include: [
                    {
                        model: SubCategory,
                        as: "sub_category",
                        include: [
                            {
                                model: SubSubCategory,
                                as: "sub_sub_category"
                            }
                        ]
                    }
                ]
            })

            return res.json(category)
        } catch (e) {
            return res.status(500).json({ message: "На сервере произошла ошибка" })
        }
    }
}

module.exports = new CategoryController()