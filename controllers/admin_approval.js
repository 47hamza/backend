const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

const Approvals = require('../models/affiliate_approvals');
const User = require('../models/users');




router.post("/add-approval-request", async (req, res) => {
    let data = await Approvals.create({     // create admin with requested data
        userId: req.body.userId,
        amount: req.body.amount,
        status: 'pending',
    });

    let user= await User.findOne({where: {id: req.body.userId}})

    await User.update(
        {
            nonpaid: (parseInt(user.nonpaid)-parseInt(req.body.amount))
        },
        {
            where:
                {id: req.body.userId}
        }
    )

    res.status(200).json({ 'status': '200', 'message': "Request Submitted Successfully" });
    res.end();
});


router.get("/all-approval-request", async (req, res) => {

    let data=await Approvals.findAll();

    res.status(200).json({ 'status': '200','data':data, 'message': "Data Fetched Successfully" });
    res.end();
});



router.post("/all-approval-request-by-affiliate", async (req, res) => {

    let data=await Approvals.findAll({where: {userId: req.body.userId}});

    res.status(200).json({ 'status': '200','data':data, 'message': "Data Fetched Successfully" });
    res.end();
});



router.post("/approve-request", async (req, res) => {

    let data=await Approvals.findOne({where: {id: req.body.id}});


    // let user= await User.findOne({where: {id: req.body.userId}});

    await Approvals.update(
        {
            status: 'approved',
        },
        {
            where:
                {id: req.body.id}
        }
    )

    let user=await User.findOne({where: {id: data.userId}})

    await User.update(
        {
            paid: parseInt(user.paid)+parseInt(data.amount),
        },
        {
            where:
                {id: data.userId}
        }
    )

    res.status(200).json({ 'status': '200','message': "Request Approved" });
    res.end();
});


module.exports = router;