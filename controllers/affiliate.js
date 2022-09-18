//--------------------------------------------------------------------------------------------------------
//  Import Dependencies
//--------------------------------------------------------------------------------------------------------
const router = require('express').Router();

// Model
const User = require('../models/users');

//--------------------------------------------------------------------------------------------------------
//  Affiliates Routes
//--------------------------------------------------------------------------------------------------------


// add withdraw details
router.post('/add-withdraw-details',async (req,res)=>{

    await User.update(
        {
            bankHolder: req.body.bankHolder,
            bankName: req.body.bankName,
            iban: req.body.iban,
            accountNumber: req.body.accountNumber,
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200','message': "Data Saved Successfully" });

    res.end();
})


//--------------------------------------------------------------------------------------------------------
//  Export Router
//--------------------------------------------------------------------------------------------------------
module.exports = router;






