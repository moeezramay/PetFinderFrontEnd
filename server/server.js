const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

const sign = require("./apis/sign");

const upload = require("./apis/upload");

const KEY = "asfasfgasghhgewgwedsgawsdg";

app.use(cors());
app.use(express.json());

//Redirects to signIn or SignUp Api's
app.use("/sign", sign);

//Redirects to upload for data submitting on found page
app.use("/upload", upload);

app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
});
