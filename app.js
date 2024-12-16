const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_LOCAL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener empleados
app.get('/empleados', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleados');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la conexión con la base de datos:', err);
        res.status(500).send('Error en la conexión con la base de datos');
    }
});

// Puerto dinámico para local o Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
