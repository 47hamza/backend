const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const User = require('../models/users');
const Bookings = require('../models/bookings');
const RecentPlan = require('../models/recent_plans');
const Link = require('../models/links');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');


// add affiliate
router.post('/add-affiliate-person',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findUserByEmail(req.body.email);  // Find Person

    if (data) // Person Found
    {
        res.status(202).json({ 'status': '404', 'message': "Affiliate person already exist with this email." });
    }
    else // Person not found
    {
        let data = await User.create({     // create person with requested data
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            // password: Helpers.encryptData(req.body.password),
            wallet: 0,
            type: 'affiliate',
            roll: 2,
            total: 0,
            paid: 0,
            nonpaid: 0
        });

        res.status(200).json({ 'status': '200', 'message': "Affiliate person Added Succesfully" });
    }
    res.end();
})



// delete affiliate
router.post('/delete-affiliate',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findUserById(req.body.id);  // Find person

    if (data) // person Found
    {
        await User.destroy({ where: { id: req.body.id } });
        res.status(202).json({ 'status': '200', 'message': "Affiliate person deleted Successfully." });
    }
    else // Person not found
    {
        res.status(200).json({ 'status': '404', 'message': "No affiliate person exist against this Id" });
    }
    res.end();
})


// all affiliate person
router.get('/all-affiliate',async (req,res)=>{
    let data=await User.findAll({where: {type: 'affiliate'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


router.get('/all-affiliate',async (req,res)=>{
    let data=await User.findAll({where: {type: 'affiliate'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})



// update affiliate
router.post('/update-affiliate',verifyJWTWithAdmin,async (req,res)=>{

    let data=await Helpers.findUserById(req.body.id); // Find Broker

    if (data)
    {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                wallet: req.body.wallet
            },
            {
                where:
                    { id: req.body.id }
            });

        res.status(200).json({ 'status': '200', 'message': "Affiliate person updated successfully" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "No affiliate person Exist against this id" });
    }

    res.end();
})




// update affiliate
router.post('/get-affiliate-bookings',async (req,res)=>{

    let onetime=await Bookings.findAll({where: {couponCode: req.body.code,bookingType: 'onetime'}});
    let monthly=await RecentPlan.findAll({where: {couponCode: req.body.code}});


    res.status(200).json({ 'status': '200','onetime': onetime,'monthly': monthly, 'message': "data fetched successfully" });

    res.end();
})



// update affiliate
router.post('/get-code-by-user',async (req,res)=>{

    let data=await Link.findOne({where: {userId: req.body.id}})


    res.status(200).json({ 'status': '200','data': data, 'message': "data fetched successfully" });

    res.end();
})








module.exports = router;