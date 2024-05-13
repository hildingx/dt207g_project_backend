/**
 * Rutter för registrering, login och autentisering
 */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const xss = require('xss');
require("dotenv").config();


//Användarmodell
const User = require("../models/user.js");

//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        //Validera input och ge specifika felmeddelanden
        if (!username) {
            return res.status(400).json({ error: "Username is required." });
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }

        //Tillämpa XSS-sanering
        const sanitizedUsername = xss(username);

        //Rätt angivet - spara användare
        const user = new User({ username: sanitizedUsername, password });
        await user.save();
        res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ error: "Användarnamnet är redan taget." });
        } else {
            console.error(error);
            res.status(500).json({ error: "Failed to register user due to an internal server error." });
        }
    }
});

//Login användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Both username and password are required to log in." });
        }

        //Användarverifiering
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid login credentials provided." });
        } else {
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
            
            // Skicka tillbaka token och ett framgångsmeddelande till användaren
            res.status(200).json({
            message: "User logged in successfully",
            token: token
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during login." });
    }
});

module.exports = router;