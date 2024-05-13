/**
 * Skyddade ruttter för meny
 */

const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");
const xss = require("xss-clean");

//Sanera inkommande data
router.use(xss());

//Hämta alla menyobjekt
router.get("/", async (req, res) => {
    try {
        let items = await MenuItem.find();

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid hämtning av meny" });
    }
});

//Lägg till ett nytt menyobjekt
router.post("/", async (req, res) => {
    try {
        let items = await MenuItem.create(req.body);

        return res.json({ message: "Menyobjektet har lagts till", items });
    } catch (error) {
        return res.status(400).json({ message: `Kunde inte skapa menyobjektet. + ${error} `});
    }
});

//Ändra ett menyobjekt
router.put("/:id", async (req, res) => {
    try {
        const items = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!items) {
            return res.status(404).json({ message: "Menyobjektet hittades inte." });
        }

        return res.json({ message: "Menyobjektet har ändrats", items });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte uppdatera menyobjektet. " + error.message });
    }
});

//Ta bort ett menyobjekt
router.delete("/:id", async (req, res) => {
    try {
        const items = await MenuItem.findByIdAndDelete(req.params.id);

        if (!items) {
            return res.status(404).json({ message: "Menyobjektet hittades inte och kunde inte tas bort." });
        }

        res.status(204).json({ message: "Menyobjektet har tagits bort." });
    } catch (error) {
        res.status(500).json({ message: "Kunde inte ta bort menyobjektet." });
    }
});

module.exports = router;