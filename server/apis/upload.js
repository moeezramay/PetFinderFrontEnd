const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const KEY = "asfasfgasghhgewgwedsgawsdg";

const fs = require("fs");
const path = require("path");

//---------------------MongoDB Initialization------------------->
const mongoose = require("mongoose");

var mongoDB =
    "mongodb+srv://moeezramay1:police15SA@cluster0.a68rgqy.mongodb.net/PetFinder";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

var Schema = mongoose.Schema;

var UploadSchema = new Schema({
    fullname: String,
    catName: String,
    imageData: String,
    furColor1: String,
    furColor2: String,
    eyeColor1: String,
    eyeColor2: String,
    email: String,
    contact: String,
    location: String,
});

var UploadData = mongoose.model("UploadData", UploadSchema, "UploadData");

//----------------^^^^^^^^^^^^^^^^^^^^^^^^^----------------->

//-------------------Aes Encryption-------------------------->

const crypto = require("crypto");

const secretKey = process.env.SECRET_KEY;

//----------------^^^^^^^^^^^^^^^^^^^^^^^^^----------------->

//---------------------Data Upload to db------------------->

module.exports = app.post("/uploadedData", async (req, res) => {
    if (!req.body || !req.body.image) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }
    console.log("KEY: " + secretKey);
    const catName = req.body.catName;
    const fullName = req.body.fullName;
    const imageBase64 = req.body.image;
    const furColor1 = req.body.furColor1;
    const furColor2 = req.body.furColor2;
    const eyeColor1 = req.body.eyeColor1;
    const eyeColor2 = req.body.eyeColor2;
    const email = req.body.email;
    const contact = req.body.contact;
    const location = req.body.location;

    console.log(
        "Cat Name: " +
            catName +
            " Owner: " +
            fullName +
            " Fur Color 1: " +
            furColor1 +
            " Fur Color 2: " +
            furColor2 +
            " Eye Color 1: " +
            eyeColor1 +
            " Eye Color 2: " +
            eyeColor2 +
            " Email: " +
            email +
            " Contact: " +
            contact +
            " Location: " +
            location
    );

    const encryptedFullName = encryptData(fullName, secretKey);
    const encryptedCatName = encryptData(catName, secretKey);
    const encryptedEmail = encryptData(email, secretKey);
    const encryptedContact = encryptData(contact, secretKey);
    const encryptedLocation = encryptData(location, secretKey);

    const imageData = imageBase64.split(",")[1];

    var dataCreate = new UploadData({
        fullname: encryptedFullName,
        catName: encryptedCatName,
        imageData: imageData,
        furColor1: furColor1,
        furColor2: furColor2,
        eyeColor1: eyeColor1,
        eyeColor2: eyeColor2,
        email: encryptedEmail,
        contact: encryptedContact,
        location: encryptedLocation,
    });

    try {
        await dataCreate.save();
        res.json({
            message: "Data sent!",
        });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//----------------^^^^^^^^^^^^^^^^^^^^^^^^^----------------->

// Function to encrypt data using AES encryption
function encryptData(data, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedData = cipher.update(data, "utf8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}
