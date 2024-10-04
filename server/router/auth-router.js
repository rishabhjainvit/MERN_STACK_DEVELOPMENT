const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
// const { register } = require("../controllers/auth-controller");


// router.get("/",(req,res) => {

//     res.status(200).send("welcome to rishabh mern project from router");

// } );

router.route("/").get(authcontroller.home);

router.route("/register").post(authcontroller.register);

// app.get("/register",(req,res) => {

//     res.status(200).send("welcome to registeration page");

// } ); 

module.exports = router;
