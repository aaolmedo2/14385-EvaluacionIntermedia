// backend/routes/adoptions.js
const express = require('express');
const router = express.Router();
const db = require('../../database/adoptions');


// Obtener la lista de adopciones
router.get('/', (req, res) => {
    res.json(db);
});

module.exports = router;
