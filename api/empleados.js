const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleados');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la conexión con la base de datos');
    }
};
