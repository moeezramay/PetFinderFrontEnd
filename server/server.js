const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

const sign = require("./apis/sign");

const KEY = "asfasfgasghhgewgwedsgawsdg";

app.use(cors());
app.use(express.json());

//Redirects to signIn or SignUp Api's
app.use("/sign", sign);

app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
});
