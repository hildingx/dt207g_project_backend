//Importera nödvändiga moduler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Användarmodeller
//user
//menuitem
//order

//Init express
const app = express();
const port = process.env.PORT || 3000;

//Middleware för att parsa JSON och hantera CORS
app.use(express.json());
app.use(cors());

//En enkel route för att testa att servern fungerar
app.get('/', (req, res) => {
    res.send('Hej från din server!');
  });

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Ansluten till MongoDB'))
.catch(err => console.error('Kunde inte ansluta till MongoDB', err));

//Starta applikation
app.listen(port, () => {
    console.log(`Server running on MongoDB at port: ${port}`);
});