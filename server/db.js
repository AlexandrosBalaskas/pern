const { Pool } = require("pg");

const pool = new Pool();

// const pool = new Pool({
//   connectionString: process.env.DB_URL,
//   ssl: {
//     rejectUnauthorized: false, // REQUIRED for Neon
//   },
// });

module.exports = pool;
