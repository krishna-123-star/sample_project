// database.js

const mysql = require('mysql2');
const config = require('./config/config');

const { dbhost, dbport, dbuser, dbpassword, database } = config.database;

const pool = mysql.createPool({
  host: dbhost,
  port: dbport,
  user: dbuser,
  password: dbpassword,
});

pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
