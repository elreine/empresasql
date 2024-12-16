const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();

// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',      // Reemplaza con tu usuario de PostgreSQL
    host: 'localhost',       // Servidor de la base de datos
    database: 'empresa',     // Nombre de tu base de datos
    password: 'changeme', // Contraseña de tu usuario
    port: 5432,              // Puerto de PostgreSQL
});

app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener empleados
app.get('/empleados', async (req, res) => {
    try {
        // Consultar todos los empleados desde la base de datos
        const result = await pool.query('SELECT * FROM empleados');
        
        // Devolver los datos como JSON
        res.json(result.rows);
    } catch (err) {
        console.error(err); // Imprimir errores en la consola
        res.status(500).send('Error en la conexión con la base de datos');
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
