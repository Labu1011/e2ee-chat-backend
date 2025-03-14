import express from 'express'
import { config } from "dotenv";

config();

const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT} 🚀`)
})