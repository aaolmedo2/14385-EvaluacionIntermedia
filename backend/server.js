// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware para manejar CORS
app.use(cors());
app.use(express.json());

// Rutas
const databasePath = path.resolve(__dirname, '../database');

// Inicializar archivos de datos si no existen
const initializeDataFile = (fileName) => {
    const filePath = path.join(databasePath, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `module.exports = [];`);
    }
};

initializeDataFile('dogs');
initializeDataFile('adopters');
initializeDataFile('adoptions');

// Cargar datos al inicio del servidor
let dogsData = require('../database/dogs');
let adoptersData = require('../database/adopters');
let adoptionsData = require('../database/adoptions');

app.get('/dogs', (req, res) => {
    try {
        res.json(dogsData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/adopters', (req, res) => {
    try {
        res.json(adoptersData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/adoptions', (req, res) => {
    try {
        res.json(adoptionsData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/adoptions', (req, res) => {
    try {
        const newAdoption = {
            id: adoptionsData.length + 1,
            dogId: req.body.dogId,
            adopterId: req.body.adopterId,
        };

        adoptionsData.push(newAdoption);
        fs.writeFileSync(path.join(databasePath, 'adoptions.js'), `module.exports = ${JSON.stringify(adoptionsData, null, 2)};`);

        res.json(newAdoption);
    } catch (error) {
        console.error('Error en POST /adoptions:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
