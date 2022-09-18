const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const User = require('../models/users');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');


// add cleaner
router.post('/add-cleaner',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findUserByEmail(req.body.email);  // Find Cleaner

    if (data) // Cleaner Found
    {
        res.status(202).json({ 'status': '404', 'message': "Cleaner already exist with this email." });
    }
    else // Cleaner not found
    {
        let data = await User.create({     // create cleaner with requested data
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            // password: Helpers.encryptData(req.body.password),
            type: 'cleaner',
            roll: 1,
        });

        res.status(200).json({ 'status': '200', 'message': "Cleaner Added Succesfully" });
    }
    res.end();
})


// delete cleaner
router.post('/delete-cleaner',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findUserById(req.body.id);  // Find Cleaner

    if (data) // Cleaner Found
    {
        await User.destroy({ where: { id: req.body.id } });
        res.status(202).json({ 'status': '200', 'message': "Cleaner deleted Successfully." });
    }
    else // Cleaner not found
    {
        res.status(200).json({ 'status': '404', 'message': "No cleaner exist against this Id" });
    }
    res.end();
})



// update cleaner
router.post('/update-cleaner',verifyJWTWithAdmin,async (req,res)=>{

    let data=await Helpers.findUserById(req.body.id); // Find Broker

    if (data)
    {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
            },
            {
                where:
                    { id: req.body.id }
            });

        res.status(200).json({ 'status': '200', 'message': "Cleaner updated successfully" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "No Cleaner Exist against this id" });
    }

    res.end();
})


// all cleaner
router.get('/all-cleaner',async (req,res)=>{
    let data=await User.findAll({where: {type: 'cleaner'}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})

module.exports = router;