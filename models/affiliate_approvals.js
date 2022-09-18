const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const Approvals = sequelize.define('approvals', {
        userId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        amount: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        status: {
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

module.exports = Approvals;