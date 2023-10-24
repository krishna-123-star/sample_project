// Import required modules
const config = require('./config');
const Sequelize = require('sequelize');

//database configuration parameters
const { dbhost, dbport, dbuser, dbpassword,database,dbdialect } = config.database;

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

// relationships between models
db.Role.hasMany(db.User);   //A Role can have multiple Users
db.User.belongsTo(db.Role); // A User belongs to one Role
db.User.hasMany(db.Post); // A User can have multiple Posts
db.Post.belongsTo(db.User); // A Post belongs to one User

sequelize.sync();

// Export the 'db' object
module.exports = db;