const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Plan = require('../models/plans');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');


// add plan
router.post('/add-plan',async (req,res)=>{

    let data = await Plan.create({     // create link with requested data
        carType: req.body.carType,
        name: req.body.name,
        price: req.body.price,    // may be "absolute" or "percentage"
        time: req.body.time,
        feature1: req.body.feature1,
        planType: req.body.planType
    });

    res.status(200).json({ 'status': '200', 'message': "Plan created Successfully" });

    res.end();
})


// delete plan
router.post('/delete-plan',verifyJWTWithAdmin,async (req,res)=>{

    await Plan.destroy({ where: { id: req.body.id } });
    res.status(200).json({ 'status': '200', 'message': "Plan deleted Successfully" });
    res.end();
})


// all plans
router.get('/all-plans',async (req,res)=>{
    let data=await Plan.findAll();  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


// plan by car type
router.post('/plan-by-car-type',async (req,res)=>{
    let data=await Plan.findAll({ where: { carType: req.body.car } });
    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });
    res.end();
})

// plan by car type
router.post('/plan-by-car-type-plan-type',async (req,res)=>{
    let data=await Plan.findAll({ where: { carType: req.body.car, planType:req.body.type  } });
    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });
    res.end();
})

// plan by id
router.post('/plan-by-id',async (req,res)=>{
    let data=await Plan.findOne({ where: { id: req.body.id } });
    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });
    res.end();
})


// update plan
router.post('/update-plan',verifyJWTWithAdmin,async (req,res)=>{

    await Plan.update(
        {
            carTpye: req.body.carTpye,
            name: req.body.name,
            price: req.body.price,    // may be "absolute" or "percentage"
            time: req.body.time,
            feature1: req.body.feature1,
            feature1Status: req.body.feature1Status,
            feature2: req.body.feature2,
            feature2Status: req.body.feature2Status,
            feature3: req.body.feature3,
            feature3Status: req.body.feature3Status,
            feature4: req.body.feature4,
            feature4Status: req.body.feature4Status,
            feature5: req.body.feature5,
            feature5Status: req.body.feature5Status,
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "Cleaner updated successfully" });

    res.end();
})




module.exports = router;