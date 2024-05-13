//Importera nödvändiga moduler
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const xss = require("xss-clean");
require("dotenv").config();

//Modeller
const MenuItem = require("./models/menuItem");
const Booking = require("./models/booking");

//Importera rutter
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

//Init express
const app = express();
const port = process.env.PORT || 3000;

//Middleware för att parsa JSON och hantera CORS
app.use(express.json());
app.use(cors());

//Sanera inkommande data
app.use(xss());

//Routes
app.use("/api", authRoutes);
app.use("/api/menu", authenticateToken, menuRoutes);
app.use("/api/booking", authenticateToken, bookingRoutes);

//Oskyddad meny-route för besökare
app.get("/api/customermenu", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid hämtning av menyn." });
    }
});

//Oskyddad boknings-route för besökare
app.post("/api/customerbooking", async (req, res) => {
    try {
        let items = await Booking.create(req.body);

        return res.json({ message: "Bokningen har lagts till", items });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte skapa bokning. "});
    }
});

//Skyddad route
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route. " });
});

//Middleware för att validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Not authorized for this route. Token missing. "});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: "Invalid or expired JWT. "});

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