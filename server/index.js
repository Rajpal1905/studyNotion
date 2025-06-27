const express = require('express')
const app = express()  

require('dotenv').config()
const userRoutes = require("./routes/userRoutes")
const profileRoutes = require("./routes/profileRoutes")
const contactRoutes = require("./routes/contactRoutes")
const courseRoutes = require("./routes/courseRoutes")
const paymentRoutes = require("./routes/paymentsRoutes")
require("./config/database").dbConnection()
require("./config/cloudinary").cloudinaryConnect()
const cookieParer = require("cookie-parser")
const cors = require('cors')
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParer())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp',

    })
)

//routes

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes )
app.use("/api/v1/course",courseRoutes )
app.use("/api/v1/contact",contactRoutes )
app.use("/api/v1/payment",paymentRoutes )

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        msg:"your server is up and running"
    })
})

app.listen(PORT , ()=>{
    console.log(`App is listing at ${PORT}`)
})


