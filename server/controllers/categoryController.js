const { SubCategory, Category, SubSubCategory } = require("../model/model");

const slugify = (str) => {
    if (!str) return ""
    const translit = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': '-'
    };

    return str.trim().toLowerCase()
        .split('')
        .map(char => translit[char] || char)
        .join('')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')  
        .replace(/^-|-$/g, '');      
}

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