const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

const Booking = require('../models/bookings');
const User = require('../models/users');
const Link = require('../models/links');
const LinkDesc = require('../models/links_destail');
const RecentPlan = require('../models/recent_plans');
const COD = require('../models/cod');

const stripe = require("stripe")("sk_test_51LXoKNA82nvbi04Cmn2asxtOjI8nNWf7sX8sD9p6AvuZYUBcjMm8qKaxS6WCIHobYCfva94kEkukpcnV56EwquhP00S7oHfsJx");
const uuid = require("uuid").v4;



router.post("/create-payment", async (req, res) => {

    const {amount,token,carType,
        planId,
        userId,
        extraFeatures,
        date,
        bookingType,
        time,
        brand,
        model,
        plate,
        color,
        parkingNo,
        parkingFloor,
        usrName,
        usrEmail,
        usrAddress,
        couponCode,
        commission,
        discount,
        affiliateId,
        linkId,
        packageType
    } = req.body;

    console.log(amount);
    console.log(linkId);
    console.log(affiliateId);
    const idempotencyKey = uuid();


    if (usrEmail)
    {
        await User.update(
            {
                name: usrName,
                email: usrEmail,
                address: usrAddress
            },
            {
                where:
                    { id: req.body.userId }
            });
    }

    if (affiliateId)
    {

        let user =await User.findOne({where: { id: affiliateId}});


        await User.update(
            {
                total: (parseInt(user.total) + parseInt(commission)),
                nonpaid: (parseInt(user.nonpaid) + parseInt(commission)),
            },
            {
                where:
                    { id: affiliateId }
            });



        let link= await LinkDesc.findOne({where: {id: linkId}});



        await LinkDesc.update(
            {
                timesUsed: (parseInt(link?.timesUsed)+1)
            },
            {
                where:
                    { id: linkId}
            }
        )

    }




    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then( customer => {
        stripe.charges.create({
            amount: amount*100,
            currency: "aed",
            customer: customer.id,
        },{idempotencyKey})
    })
        .then( async (result) => {

            if (packageType == 'onetime')
            {
                let data = await Booking.create({     // create link with requested data
                    carType: carType,
                    planId: JSON.stringify(planId),
                    userId: userId,
                    extraFeatures: JSON.stringify(extraFeatures),
                    date: date,
                    bookingType: bookingType,
                    amount: amount,
                    time: time,
                    brand: brand,
                    model: model,
                    plate: plate,
                    color: color,
                    parkingNo: parkingNo,
                    parkingFloor: parkingFloor,
                    status: 'placed',
                    couponCode: couponCode,
                    couponApplied: couponCode?"Yes":"No",
                    commission: commission,
                    discount: discount,
                    method: "stripe"
                });
            }
            else
            {
                let currentDate = new Date();


                for (let i = 0; i < 8 ; i++)
                {
                    let data = await Booking.create({     // create link with requested data
                        carType: carType,
                        planId: JSON.stringify(planId),
                        userId: userId,
                        extraFeatures: JSON.stringify(extraFeatures),
                        date: JSON.stringify(currentDate).slice(1, 11),
                        bookingType: bookingType,
                        amount: amount,
                        brand: brand,
                        model: model,
                        plate: plate,
                        color: color,
                        parkingNo: parkingNo,
                        parkingFloor: parkingFloor,
                        status: 'placed',
                        couponCode: couponCode,
                        couponApplied: couponCode?"Yes":"No",
                        commission: commission,
                        discount: discount,
                        method: "stripe"
                    });
                    if (data)
                    {
                        currentDate= currentDate.addDays(4);
                    }

                }




            //    create recent plan
                let check=await RecentPlan.findOne({where: {carType: carType,planId: planId,userId: userId,model: model,plate: plate}});

                if (check)
                {

                }
                else
                {
                    let data = await RecentPlan.create({     // create link with requested data
                        carType: carType,
                        planId: JSON.stringify(planId),
                        userId: userId,
                        extraFeatures: JSON.stringify(extraFeatures),
                        date: JSON.stringify(currentDate).slice(1, 11),
                        bookingType: bookingType,
                        amount: amount,
                        brand: brand,
                        model: model,
                        plate: plate,
                        color: color,
                        parkingNo: parkingNo,
                        parkingFloor: parkingFloor,
                        commission: commission,
                        discount: discount,
                        method: "stripe",
                        couponCode: couponCode,
                        couponApplied: couponCode?"Yes":"No",
                    });
                }

            }


            res.status(200).json({ 'status': '200','message': "Booking Confirmed" });
        })
        .catch( err => console.log(err) );


    res.end();

});







router.post("/cod-payment", async (req, res) => {

    const {amount,carType,
        planId,
        userId,
        extraFeatures,
        date,
        bookingType,
        time,
        brand,
        model,
        plate,
        color,
        parkingNo,
        parkingFloor,
        usrName,
        usrEmail,
        usrAddress,
        couponCode,
        commission,
        discount,
        affiliateId,
        linkId,
        packageType
    } = req.body;

    console.log(amount);
    console.log(linkId);
    console.log(affiliateId);


    if (usrEmail)
    {
        await User.update(
            {
                name: usrName,
                email: usrEmail,
                address: usrAddress
            },
            {
                where:
                    { id: req.body.userId }
            });
    }

    if (affiliateId)
    {

        let user =await User.findOne({where: { id: affiliateId}});


        await User.update(
            {
                total: (parseInt(user.total) + parseInt(commission)),
                nonpaid: (parseInt(user.nonpaid) + parseInt(commission)),
            },
            {
                where:
                    { id: affiliateId }
            });



        let link= await LinkDesc.findOne({where: {id: linkId}});



        await LinkDesc.update(
            {
                timesUsed: (parseInt(link?.timesUsed)+1)
            },
            {
                where:
                    { id: linkId}
            }
        )

    }



    if (packageType == 'onetime')
    {
        let data = await Booking.create({     // create link with requested data
            carType: carType,
            planId: JSON.stringify(planId),
            userId: userId,
            extraFeatures: JSON.stringify(extraFeatures),
            date: date,
            bookingType: bookingType,
            amount: amount,
            time: time,
            brand: brand,
            model: model,
            plate: plate,
            color: color,
            parkingNo: parkingNo,
            parkingFloor: parkingFloor,
            status: 'placed',
            couponCode: couponCode,
            couponApplied: couponCode?"Yes":"No",
            commission: commission,
            discount: discount,
            method: 'COD'
        });
    }
    else
    {
        let currentDate = new Date();


        for (let i = 0; i < 8 ; i++)
        {
            let data = await Booking.create({     // create link with requested data
                carType: carType,
                planId: JSON.stringify(planId),
                userId: userId,
                extraFeatures: JSON.stringify(extraFeatures),
                date: JSON.stringify(currentDate).slice(1, 11),
                bookingType: bookingType,
                amount: amount,
                brand: brand,
                model: model,
                plate: plate,
                color: color,
                parkingNo: parkingNo,
                parkingFloor: parkingFloor,
                status: 'placed',
                couponCode: couponCode,
                couponApplied: couponCode?"Yes":"No",
                commission: commission,
                discount: discount,
                method: 'COD'
            });
            if (data)
            {
                currentDate= currentDate.addDays(4);
            }

        }




        //    create recent plan
        let check=await RecentPlan.findOne({where: {carType: carType,planId: planId,userId: userId,model: model,plate: plate}});

        if (check)
        {

        }
        else
        {
            let data = await RecentPlan.create({     // create link with requested data
                carType: carType,
                planId: JSON.stringify(planId),
                userId: userId,
                extraFeatures: JSON.stringify(extraFeatures),
                date: JSON.stringify(currentDate).slice(1, 11),
                bookingType: bookingType,
                amount: amount,
                brand: brand,
                model: model,
                plate: plate,
                color: color,
                parkingNo: parkingNo,
                parkingFloor: parkingFloor,
                commission: commission,
                discount: discount,
                method: 'COD',
                couponCode: couponCode,
                couponApplied: couponCode?"Yes":"No",
            });
        }

        res.status(200).json({ 'status': '200','message': "Booking Confirmed" });

    }



    res.end();

});


router.post('/tooggle-cod',async (req,res)=>{

    let data=await COD.findOne({where: {id: '1'}});

    if (data.status == 'false')
    {
        await COD.update(
            {
                status: 'true'
            },
            {
                where:
                    { id: '1' }
            });
        res.status(200).json({ 'status': '200','message': "COD button enabled" });
    }
    else
    {
        await COD.update(
            {
                status: 'false'
            },
            {
                where:
                    { id: '1' }
            });
        res.status(200).json({ 'status': '200','message': "COD button disabled" });
    }

    res.end();
})



router.get('/cod-button-status',async (req,res)=>{

    let data=await COD.findOne({where: {id: '1'}});


    res.status(200).json({ 'status': '200','data': data,'message': "COD button disabled" });



})



Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};


module.exports = router;