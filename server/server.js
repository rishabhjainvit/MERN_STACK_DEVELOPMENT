require("dotenv").config();
const express = require('express');

const app = express();
const router = require("./router/auth-router");
const connectdb = require("./utils/db");
app.use(express.json());

app.use("/api/auth", router);



// app.get("/",(req,res) => {

//     res.status(200).send("welcome to rishabh mern project");

// } );

// app.get("/register",(req,res) => {

//     res.status(200).send("welcome to registeration page");

// } );

const PORT = 5001;

connectdb().then(() =>{


app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`);


});

});