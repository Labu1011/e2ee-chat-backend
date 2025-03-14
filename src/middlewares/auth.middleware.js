import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
    try {
        // check jwt is set or not
        const token = req.cookies["jwt"]
        if(!token) return res.status(401).json({ message: "Unauthorized - No token provided." })

        // verify jwt validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({ message: "Unauthorized - Invalid token." })

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(404).json({ message: "User not found." })

        req.user = user;

        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({ message: "Internal Server Error." })
    }
}