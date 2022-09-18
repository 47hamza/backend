const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const RecentPlan = sequelize.define('recent_plans', {
        carType: {
            type: DataTypes.STRING,

        },
        planId: {
            type: DataTypes.STRING,

        },
        userId: {
            type: DataTypes.STRING,

        },
        extraFeatures: {
            type: DataTypes.STRING,
            defaultValue: ''
        },

        bookingType: {
            type: DataTypes.STRING,
            defaultValue: ''
        },

        amount: {
            type: DataTypes.STRING,
            defaultValue: ''
        },


        brand: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        model: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        plate: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        parkingNo: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        parkingFloor: {
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
        method: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        couponApplied: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        couponCode: {
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

module.exports = RecentPlan;