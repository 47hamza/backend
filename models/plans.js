const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const Plan = sequelize.define('plans', {
        carType: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        price: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        time: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        feature1: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        planType: {
            type: DataTypes.STRING,
            defaultValue: ''
        },

    },
// Other Settings
    {
        //  Change Table Name
        //  tableName: 'userData',
        // Disable TimeStamps
        // timestamps: false,

        // Disable Single Timestamps
        // updatedAt: false,
        // createdAt: false,

        // Change Name of Entity
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',

        // Change Engine
        // engine: 'MYISAM'
    });

module.exports = Plan;