// Import required modules
const config = require('./config');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

//database configuration parameters
const { dbhost, dbport, dbuser, dbpassword,database,dbdialect } = config.database;

//Create a MySQL connection pool
const pool = mysql.createPool({
    host: dbhost,
    port: dbport,
    user: dbuser,
    password: dbpassword,
})

//Create Database
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//Initialize the 'db' object
const db = {};
const sequelize = new Sequelize(database, dbuser, dbpassword, {
    dialect: dbdialect,
    pool: {
        max: parseInt(config.pool.max),
        min: parseInt(config.pool.min),
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models for User, Post, and Role
db.User = require('../model/user')(sequelize, Sequelize);
db.Post = require('../model/post')(sequelize, Sequelize);
db.Role = require('../model/role')(sequelize, Sequelize);

db.Role.hasMany(db.User);
db.User.belongsTo(db.Role);
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

sequelize.sync();

// Export the 'db' object
module.exports = db;