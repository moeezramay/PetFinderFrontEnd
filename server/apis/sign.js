const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const KEY = "asfasfgasghhgewgwedsgawsdg";

app.use(cors());
app.use(express.json());

//Checks for signUp
module.exports = app.post("/signUp", (req, res) => {
    console.log("function called", req.body); //works
    if (!req.body) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    const { username, password } = req.body;
    res.json({
        token: jwt.sign(
            {
                username: username,
            },
            KEY
        ),
    });
});

//Checks if server is running
module.exports = app.get("/check", (req, res) => {
    res.json({ message: "Server is up!" });
});
