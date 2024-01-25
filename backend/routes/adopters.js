// backend/routes/adopters.js
const express = require('express');
const router = express.Router();
const db = require('../../database/adopters');

// Obtener la lista de posibles adoptantes
router.get('/', (req, res) => {
    res.json(db);
});

module.exports = router;
