const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Extra = require('../models/extra_features');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');

// add extra feature
router.post('/add-extra-feature',verifyJWTWithAdmin,async (req,res)=>{

    let data = await Extra.create({     // create extra feature with requested data
        name: req.body.name,
        time: req.body.time,
        price: req.body.price,
    });

    res.status(200).json({ 'status': '200', 'message': "Extra Feature Added Succesfully" });
    res.end();
})


// delete feature
router.post('/delete-extra-feature',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findExtraFeatureById(req.body.id);  // Find Feature

    if (data) // Feature Found
    {
        await Extra.destroy({ where: { id: req.body.id } });
        res.status(202).json({ 'status': '200', 'message': "Extra Feature deleted Successfully." });
    }
    else // Feature not found
    {
        res.status(200).json({ 'status': '404', 'message': "No Extra Feature exist against this Id" });
    }
    res.end();
})


// update feature
router.post('/update-extra-feature',verifyJWTWithAdmin,async (req,res)=>{

    let data=await Helpers.findExtraFeatureById(req.body.id); // Find feature

    if (data)
    {
        await Extra.update(
            {
                name: req.body.name,
                price: req.body.price,
                time: req.body.time,
            },
            {
                where:
                    { id: req.body.id }
            });

        res.status(200).json({ 'status': '200', 'message': "Extra Feature updated successfully" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "No Extra Feature Exist against this id" });
    }

    res.end();
})


// all features
router.get('/all-extra-features',async (req,res)=>{
    let data=await Extra.findAll();  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


module.exports = router;