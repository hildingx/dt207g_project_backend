//Importera nödvändiga moduler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const MenuItem = require("./models/menuItem");
//const Booking = require("./models/booking");

//Importera rutter
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
//const bookingRoutes = require("./routes/bookingRoutes");

//Init express
const app = express();
const port = process.env.PORT || 3000;

//Middleware för att parsa JSON och hantera CORS
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api/menu", authenticateToken, menuRoutes);
//app.use("/api", authenticateToken, bookingRoutes);

//Oskyddad meny-route för besökare
app.get("/api/customermenu", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid hämtning av menyn." });
    }
});

//Middleware för att validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Not authorized for this route. Token missing. "});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: "Invalid JWT. "});

        //Om token giltig, extrahera användarnamnet från den dekrypterade tokenen
        req.username = decodedToken.username; // Spara användarnamnet från decodedToken
        next();
    });
}

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Ansluten till MongoDB'))
.catch(err => console.error('Kunde inte ansluta till MongoDB', err));

//Starta applikation
app.listen(port, () => {
    console.log(`Server running on MongoDB at port: ${port}`);
});