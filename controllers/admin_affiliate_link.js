const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Link = require('../models/links');
const LinkDetail = require('../models/links_destail');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');


// generate affiliate person link
router.post('/generate-affiliate-person-link',verifyJWTWithAdmin,async (req,res)=>{
    let data=await Helpers.findUserById(req.body.userId); // Find person

    let phone=data.phone

    if (data)
    {
        // let url=process.env.LOCAL_URL+process.env.PORT
        let code=Math.floor(1000 + Math.random() * 9000);

        let data = await Link.create({     // create link with requested data
            userId: req.body.userId,
            code: code,
            type: req.body.type,   // may be "absolute" or "percentage"

        });

        res.status(200).json({ 'status': '200', 'message': "Affiliate person link generated" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "No affiliate person Exist against this id" });
    }

    res.end();
})


// generate affiliate person link
router.post('/delete-affiliate-person-link',verifyJWTWithAdmin,async (req,res)=>{

    await Link.destroy({ where: { id: req.body.id } });
    res.status(200).json({ 'status': '200', 'message': "Affiliate link deleted Successfully" });
    res.end();
})


// all links
router.get('/all-affiliate-links',async (req,res)=>{
    let data=await Link.findAll();  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})

// all links
router.post('/all-affiliate-links-by-id',async (req,res)=>{
    let data=await Link.findAll({where: {userId: req.body.id}});  // Find all Cleaner

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


// all links
router.post('/link-by-code',async (req,res)=>{

    console.log(req.body.code)

    let data=await Link.findOne({where: {code: req.body.code}});  // Find all Cleaner

    console.log(data)
    if (data)
    {
        res.status(200).json({ 'status': '200','data': data, 'message': "Coupon Applied" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "Invalid Code" });
    }

    res.end();
})



// all links
router.post('/link-desc-by-user-plan',async (req,res)=>{

    let data=await LinkDetail.findOne({where: {userId: req.body.userId,  planId: req.body.planId}});  // Find all Cleaner

    console.log(data)
    if (data)
    {
        res.status(200).json({ 'status': '200','data': data, 'message': "Coupon Applied" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "Invalid Code" });
    }

    res.end();
})




// generate affiliate person link
router.post('/generate-affiliate-person-link-desc',async (req,res)=>{


    let data = await LinkDetail.create({     // create link with requested data
        userId: req.body.userId,
        planId: req.body.planId,
        type: req.body.type,   // may be "absolute" or "percentage"
        commission: req.body.commission,
        discount: req.body.discount,
        timesUsed: 0,

    });

    res.status(200).json({ 'status': '200', 'message': "Affiliate person link desc generated" });

    res.end();
})




// generate affiliate person link
router.post('/get-link-desc-by-user',async (req,res)=>{


    let data = await LinkDetail.findAll({where: { userId: req.body.id}})

    res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched Successfully" });

    res.end();
})


module.exports = router;