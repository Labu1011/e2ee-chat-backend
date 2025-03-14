import express from 'express'
import { config } from "dotenv";
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import connectDB from "./lib/db.js";

config();

const app = express()

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Welcome to the E2EE-Chat API.");
})

app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
    console.log(`Server is listening on PORT: ${PORT} 🚀`)
    await connectDB()
})