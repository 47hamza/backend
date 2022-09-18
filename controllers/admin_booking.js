const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Booking = require('../models/bookings');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');



// delete plan
router.post('/delete-booking',verifyJWTWithAdmin,async (req,res)=>{

    await Booking.destroy({ where: { id: req.body.id } });
    res.status(200).json({ 'status': '200', 'message': "Booking deleted Successfully" });
    res.end();
})


// all plans
router.get('/all-booking',async (req,res)=>{
    let data=await Booking.findAll();  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


// all plans
router.get('/all-pending-booking',async (req,res)=>{
    let data=await Booking.findAll({where: {status: 'placed'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


// all plans
router.get('/all-completed-booking',async (req,res)=>{
    let data=await Booking.findAll({where: {status: 'completed'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


// all plans
router.get('/all-assigned-booking',async (req,res)=>{
    let data=await Booking.findAll({where: {status: 'assigned'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})



// assign cleaner
router.post('/assign-cleaner-to-booking',verifyJWTWithAdmin,async (req,res)=>{

    await Booking.update(
        {
            assignCleaner: req.body.cleanerId,
            status: 'assigned',
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "Cleaner assigned successfully" });

    res.end();
})


// assign time to booking
router.post('/assign-time-to-booking',async (req,res)=>{

    await Booking.update(
        {
            time: req.body.time,
        },
        {
            where:
                { id: req.body.bookingId }
        });

    res.status(200).json({ 'status': '200', 'message': "Time assigned successfully" });

    res.end();
})






module.exports = router;