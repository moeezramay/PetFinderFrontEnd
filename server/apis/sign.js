const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const mongoose = require("mongoose");

//------MongoDB Initialization------->
var mongoDB =
    "mongodb+srv://moeezramay1:police15SA@cluster0.a68rgqy.mongodb.net/PetFinder";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
});

var User = mongoose.model("User", UserSchema, "Data");
//-------------

const KEY = "asfasfgasghhgewgwedsgawsdg";

app.use(cors());
app.use(express.json());

//Checks for signUp, create user in db
module.exports = app.post("/signUp", async (req, res) => {
    console.log("function called", req.body); //works
    if (!req.body) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    const { username, password } = req.body;

    //Check if user already exists

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
        return res.json({ message: "User already exists!" });
    }

    //Create new user
    var userCreate = new User({
        username: username,
        password: password,
    });
    userCreate.save();

    //Send back token and message
    res.json({
        message: "User created!",
        token: jwt.sign(
            {
                username: username,
            },
            KEY
        ),
    });
});

module.exports = app.post("/signIn", async (req, res) => {
    console.log("function called", req.body); //works
    if (!req.body) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    const { username, password } = req.body;

    //Check if user already exists

    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
        return res.json({ message: "User does not exist!" });
    }

    //Send back token and message
    res.json({
        message: "User found!",
        token: jwt.sign(
            {
                username: username,
            },
            KEY
        ),
    });
});

//Checks if server is running
app.get("/check", (req, res) => {
    res.json({ message: "Server is up!" });
});
