// Import required modules
const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/logger.js');

// Import the database 
const db = require('./config/db');
const sequelize = db.sequelize;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import route files
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

sequelize.authenticate()
.then(() => {
 logger.info('Connection has been established successfully.');
})
.catch(err => {
  logger.info('Unable to connect to the database:', err);
});

// Define routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);

app.listen(config.port, ()=>{
    logger.info(`server is listening  on ${config.port}`);
});
 
module.exports = app;