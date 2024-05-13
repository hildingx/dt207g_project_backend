/**
 * Skyddade ruttter för bokningar
 */

const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const xss = require('xss-clean');

//Sanera inkommande data
router.use(xss());

//Hämta alla bokningar
router.get('/', async (req, res) => {
    try {
        const items = await Booking.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid hämtning av bokningar" });
    }
});

//Lägg till ny bokning
router.post('/', async (req, res) => {
    try {
        let items = await Booking.create(req.body);

        return res.json({ message: "Bokningen har lagts till", items });
    } catch (error) {
        return res.status(400).json({ message: "Kunde inte skapa bokning. "});
    }
});

//Ändra bokning
router.put('/:id', async (req, res) => {
    try {
        const items = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!items) {
            return res.status(404).json({ message: "Bokningen hittades inte." });
        }

        return res.json({ message: "Bokningen har ändrats", items });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte uppdatera bokningen. " + error.message });
    }
});

//Ta bort ett menyobjekt
router.delete('/:id', async (req, res) => {
    try {
        const items = await Booking.findByIdAndDelete(req.params.id);

        if (!items) {
            return res.status(404).json({ message: "Bokningen hittades inte och kunde inte tas bort." });
        }

        res.json({ message: "Bokningen har tagits bort." });
    } catch (error) {
        return res.status(500).json({ message: "Kunde inte ta bort bokningen." });
    }
});

module.exports = router;