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
    imageSrc: String,
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

const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
//----------------^^^^^^^^^^^^^^^^^^^^^^^^^----------------->

//---------------------Data Upload to db------------------->

module.exports = app.post("/uploadedData", async (req, res) => {
    console.log("function called");
    if (!req.body || !req.body.image) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }
    const catName = req.body.catName;
    const fullName = req.body.fullName;
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
    console.log("works till encryption");
    const imageData = req.body.image;
    console.log("works till image data is defined");
    const encodedImageData = encodeURIComponent(imageData);
    console.log("works till encodedImageData is defined");

    var dataCreate = new UploadData({
        fullname: encryptedFullName,
        catName: encryptedCatName,
        imageSrc: encodedImageData,
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

// Function to encrypt data using AES (Advanced Encryption Standard) encryption
function encryptData(data, key) {
    const keyBuffer = Buffer.from(key, "hex");
    const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);

    let encryptedData =
        cipher.update(data, "utf8", "base64") + cipher.final("base64");
    return Buffer.from(encryptedData).toString("base64");
}

//---------------------Data download from db------------------->

app.get("/recieve", async (req, res) => {
    try {
        const data = await UploadData.find();

        const decryptedData = data.map((item) => {
            const decryptedFullName = decryptData(item.fullname, secretKey);
            const decryptedCatName = decryptData(item.catName, secretKey);
            const decryptedEmail = decryptData(item.email, secretKey);
            const decryptedContact = decryptData(item.contact, secretKey);
            const decryptedLocation = decryptData(item.location, secretKey);

            return {
                ...item.toObject(),
                fullname: decryptedFullName,
                catName: decryptedCatName,
                email: decryptedEmail,
                contact: decryptedContact,
                location: decryptedLocation,
            };
        });
        res.json(decryptedData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//----------------^^^^^^^^^^^^^^^^^^^^^^^^^----------------->
function decryptData(encryptedData, key) {
    try {
        const buff = Buffer.from(encryptedData, "base64");
        encryptedData = buff.toString("utf-8");
        var decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        return (
            decipher.update(encryptedData, "base64", "utf8") +
            decipher.final("utf8")
        );
    } catch (error) {
        console.log("Error decrypting data:", error);
        return null;
    }
}
