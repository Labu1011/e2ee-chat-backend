import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";

export async function login(req, res) {
    const { email, password } = req.body

    try {
    // find user on db
    const user = await User.findOne({ email })
    if(!user) {
        return res.status(400).json({ message: "Invalid credentials." })
    }
    // verify the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })

    // generate token
    generateToken(user._id, res);

    return res.status(200).json({ _id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic })

    } catch (error) {
        console.log("Error in login controller: ", error)
        return res.status(500).json({ message: "Internal Server Error." })
    }

}

export async function signup(req, res) {
    try {
        const { fullName, email, password } = req.body

        if(!password) return res.status(400).json({ message: "Validation failed", errors: ["Password is required."]  })
        if(password.length < 6) return res.status(400).json({ message: "Validation failed.", errors: ["Password length should be at least 6,"] })
    // check that email not already exists
        const user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({
                message: "User using this email already exists."
            })
        }

    // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            // generate jwt token
            generateToken(newUser._id, res)
            // save to db
            await newUser.save()

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            return res.status(400).json({ message: "Invalid user data." })
        }


        
    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        if(error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ message: "Validation failed.", errors })
        }

        res.status(500).json({ message: "Internal Server Error." })
    }
}

export function logout(req, res) {
    try {
    // remove jwt token
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully." })

    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

export function updateProfile(req, res) {

}

export async function checkAuth(req, res) {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message)
        return res.status(500).json({ message: "Internal Server Error." })
    }
}