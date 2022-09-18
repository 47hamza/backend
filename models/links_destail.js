const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const LinkDescription = sequelize.define('link_descriptions', {
        userId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        // link: {
        //     type: DataTypes.STRING,
        //     defaultValue: ''
        // },
        planId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        commission: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        discount: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        timesUsed: {
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

module.exports = LinkDescription;