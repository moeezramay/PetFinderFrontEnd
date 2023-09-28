const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

const KEY = "asfasfgasghhgewgwedsgawsdg";

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
    res.json({ message: "Server is Up!" });
});

app.post("/api/verify", (req, res) => {
    console.log("function called", req.body); //works
    if (!req.body) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    const { email, password } = req.body;
    if ((email === "admin") & (password == "admin")) {
        res.json({
            token: jwt.sign(
                {
                    username: email,
                },
                KEY
            ),
        });
    } else {
        res.json({ message: "wrong " });
    }
});

app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
});
