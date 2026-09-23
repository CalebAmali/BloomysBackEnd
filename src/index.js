
import express from "express";

import userRoutes from "./routes/userRoutes.js"

import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database Connected!")).catch((err) => console.error)
app.use(express.json()) 
app.use(userRoutes)

app.listen(PORT, () => {
    console.log (`Server running on port ${PORT}`)
})