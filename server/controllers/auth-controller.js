const User = require('../models/user-models');
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Rishabh's MERN project from router");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


const register = async (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming request body
    try {
        const { username, email, phone, password } = req.body;

        // Check if the required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Username, email, and password are required" });
        }

        // Check if email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hash_password,
        });

        // Generate a token for the new user
        const token = await newUser.generateToken();

        // Respond with the new user details and token
        res.status(201).json({
            msg: "User created successfully",
            token,
            userID: newUser._id.toString(),
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};




module.exports = { home, register };
