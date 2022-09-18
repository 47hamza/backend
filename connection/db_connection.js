const {Sequelize} = require('sequelize');

// Database Instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 }
});

module.exports = sequelize;