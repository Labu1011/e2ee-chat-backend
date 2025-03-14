import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v)
            },
            message: (props) => `${props.value} is not a valid email.`
        },
        unique: [true, "Email already exists, must be unique."]
    },
    password: {
        type: String,
        minLength: [6, "Password should be at least of length 6."],
        required: [true, "Password is required."],
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User