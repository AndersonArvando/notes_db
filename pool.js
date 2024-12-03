const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER, // Sesuaikan dengan user MySQL kamu
  password: process.env.PASSWORD, // Sesuaikan dengan password MySQL kamu
  database: process.env.DATABASE // Nama database yang sudah dibuat
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
