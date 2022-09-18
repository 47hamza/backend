const sequelize = require('./db_connection');

// Authenticate Database
sequelize.authenticate()
    .then(() => {
        console.log("Connected to Mysql");
    })
    .catch((err) => {
        console.log("Error while connecting to Database : " + err);
    })


// Sync Database Tables
sequelize.sync( { force: false})
    .then(() => {
        console.log("Database Sync Successfully");
    })
    .catch((err) => {
        console.log("Error while Sync Database");
    })