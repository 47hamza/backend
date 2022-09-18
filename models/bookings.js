const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const Booking = sequelize.define('bookings', {
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
        date: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        bookingType: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        assignCleaner: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        amount: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        review: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        time: {
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
        couponApplied: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        couponCode: {
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
        cleanerImg1: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cleanerImg2: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cleanerImg3: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cleanerImgLink1: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cleanerImgLink2: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cleanerImgLink3: {
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

module.exports = Booking;