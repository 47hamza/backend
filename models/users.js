const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        password: {
            type: DataTypes.TEXT,
            defaultValue: ""
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        roll: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        bankHolder: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        bankName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        iban: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        accountNumber: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        total: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        paid: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        nonpaid: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        profile_pic: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        profile_pic_url: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        reset_code: {
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


module.exports = User;