require("dotenv").config()
const express = require("express")
const sequelize = require("./db.js")
const models = require("./model/model.js")
const router = require("./routes/index.js")
const fileUpload = require("express-fileupload")
const path = require("path")
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(express.json())
app.use("/api", router)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    } 
}

start()