import mongoose from "mongoose";

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to database: ${conn.connection.host} 🗄️`)
    } catch (error) {
        console.log("MongoDB error: ", error.message)
    }
}

export default connectDB