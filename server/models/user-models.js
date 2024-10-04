const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true, 
    },
    phone: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', async function (next) {
    const user = this; 
    if (!user.isModified("password")) {
        return next(); 
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        next(); 
    } catch (error) {
        next(error);
    }
});

// Correctly defining the generateToken method
userSchema.methods.generateToken = function () {
  
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret key is not defined');
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
