const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");
const xss = require('xss-clean');

//Sanera inkommande data
router.use(xss());

//Hämta alla menyobjekt
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid hämtning av meny" });
    }
});

//Lägg till ett nytt menyobjekt
router.post('/', async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const newItem = new MenuItem({ name, description, price, category });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte skapa menyobjekt." });
    }
});

//Ändra ett menyobjekt
router.put('/:id', async (req, res) => {
    try {
        const result = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!result) {
            return res.status(404).json({ message: "Menyobjektet hittades inte." });
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte uppdatera menyobjektet. " + error.message });
    }
});

//Ta bort ett menyobjekt
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await MenuItem.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Menyobjektet hittades inte och kunde inte tas bort." });
        }

        res.status(204).json({ message: "Menyobjektet har tagits bort." });
    } catch (error) {
        res.status(500).json({ message: "Kunde inte ta bort menyobjektet." });
    }
});

module.exports = router;