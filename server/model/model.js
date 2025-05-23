const { DataTypes } = require("sequelize")
const sequelize = require("../db.js")

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const Cart = sequelize.define("cart", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    discount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})

const ProductOption = sequelize.define("product_option", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    discount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    description: {type: DataTypes.TEXT, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    compound : {type: DataTypes.STRING, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: false},
    season: {type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: true},
    gradeText: {type: DataTypes.TEXT, allowNull: true},
    grade: {type: DataTypes.INTEGER, allowNull : false, defaultValue: 0}
})

const Category = sequelize.define("categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
})

const SubCategory = sequelize.define("sub_categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: true }
})

const SubSubCategory = sequelize.define("sub_sub_categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)
Product.belongsTo(Cart)

Product.hasOne(ProductOption, {onDelete: "CASCADE"})
ProductOption.belongsTo(Product)

ProductOption.hasMany(Rating, {onDelete: "CASCADE"})
Rating.belongsTo(ProductOption)

Category.hasMany(SubCategory, {as: "sub_category"})
SubCategory.belongsTo(Category)

SubCategory.hasMany(SubSubCategory, {as: "sub_sub_category"})
SubSubCategory.belongsTo(SubCategory)

SubSubCategory.hasMany(Product)
Product.belongsTo(SubSubCategory)

module.exports = {
    User,
    Cart,
    Product,
    ProductOption,
    Category,
    SubCategory,
    SubSubCategory,
    Rating
}