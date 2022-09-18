const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Slot = require('../models/slots');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');

// add slot
router.post('/add-slot',verifyJWTWithAdmin,async (req,res)=>{

    let data = await Slot.create({     // create extra feature with requested data
        time: req.body.time,
        allowed: req.body.allowed,
    });

    res.status(200).json({ 'status': '200', 'message': "Slot Added Successfully" });
    res.end();
})


// delete slot
router.post('/delete-slot',verifyJWTWithAdmin,async (req,res)=>{
    await Slot.destroy({ where: { id: req.body.id } });
    res.status(202).json({ 'status': '200', 'message': "Slot deleted Successfully." });
    res.end();
})


// update slot
router.post('/update-slot',async (req,res)=>{

    await Slot.update(
        {
            time: req.body.time,
            allowed: req.body.allowed,
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "Slot updated successfully" });


    res.end();
})


// all slots
router.get('/all-slots',async (req,res)=>{
    let data=await Slot.findAll();  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})

// get slot by id
router.post('/slot-by-id',async (req,res)=>{
    let data=await Slot.findOne({where: {id:req.body.id}});
    res.status(200).json({ 'status': '200','data':data,'message': "User Found Successfully" });
})


module.exports = router;