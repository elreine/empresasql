const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno desde .env
const app = express();

// Configuración de la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_LOCAL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener empleados
app.get('/empleados', async (req, res) => {
    try {
        // Consultar todos los empleados desde la base de datos
        const result = await pool.query('SELECT * FROM empleados');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la conexión con la base de datos:', err);
        res.status(500).send('Error en la conexión con la base de datos');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
