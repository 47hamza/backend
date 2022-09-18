const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const Link = sequelize.define('links', {
        userId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        code: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        // link: {
        //     type: DataTypes.STRING,
        //     defaultValue: ''
        // },
        type: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        // total: {
        //     type: DataTypes.STRING,
        //     defaultValue: ''
        // },
        // paid: {
        //     type: DataTypes.STRING,
        //     defaultValue: ''
        // },
        // nonpaid: {
        //     type: DataTypes.STRING,
        //     defaultValue: ''
        // },


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

module.exports = Link;