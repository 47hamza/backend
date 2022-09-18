const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Booking = require('../models/bookings');
const User = require('../models/users');

// Verify JWT Token Middleware
const verifyJWTAndUser=require('../middlewares/verify_user_and_jwt');


// SignUp user
router.post('/user-signup',async (req,res)=>{
    let data=await Helpers.findUserByEmail(req.body.email);  // Find user

    if (data) // user Found
    {
        res.status(202).json({ 'status': '404', 'message': "User already exist with this email." });
    }
    else // user not found
    {
        let data = await User.create({     // create user with requested data
            name: req.body.name,
            email: req.body.email,
            // password: Helpers.encryptData(req.body.password),
            phone: req.body.phone,
            address: req.body.address,
            type: 'user',
            roll: 3,
        });

        res.status(200).json({ 'status': '200', 'message': "User up successfully! Please log in!" });
    }
    res.end();
})


// SignIn User
router.post('/login',async (req,res)=>{

    const checkUser = await Helpers.findUserByPhone(req.body.phone); // Find user

    if (checkUser === null) // user not Found
    {
        res.status(200).json({ 'status': '404', 'message': "User not registered with this phone" });
    }
    else // user not found
    {
        if (checkUser.type == 'admin')
        {
            res.status(200).json({ 'status': '404', 'message': "You are not seem to be User" });
        }
        else
        {
            let code = Math.floor(100000 + Math.random() * 900000);

            await User.update(
                {
                    reset_code: code
                },
                {
                    where:
                        { phone: req.body.phone }
                });

            res.status(200).json({ 'status': '200', 'message': "OTP has been send to your phone number" });
        }
    }
    res.end();
})


// verify otp
router.post('/verify-otp',async (req,res)=>{
    const checkUser = await Helpers.findUserByResetCode(req.body.code); // Find user

    if (checkUser == null || checkUser == '' || checkUser == [] ) // user not Found
    {
        res.status(200).json({ 'status': '404', 'message': "Invalid Code" });
    }
    else // user not found
    {
        await User.update(
            {
                reset_code: ''
            },
            {
                where:
                    { reset_code: req.body.code }
            });

        res.status(200).json({ 'status': '200','data': checkUser, 'message': "User Login Successful" });
    }
    res.end();
})



// add booking
router.post('/user-add-booking',async (req,res)=>{

    let data = await Booking.create({     // create link with requested data
        carType: req.body.carType,
        planId: req.body.planId,
        userId: req.body.userId,
        extraFeatures: req.body.extraFeatures,
        date: req.body.date,
        comment: req.body.comment,
        status: 'placed',
        amount: req.body.amount,
        paymentId: req.body.paymentId,
    });

    res.status(200).json({ 'status': '200', 'message': "Booking created Successfully" });

    res.end();
})


// update user
router.post('/update-user',verifyJWTAndUser,async (req,res)=>{

    let data=await Helpers.findUserById(req.body.id); // Find user

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

        res.status(200).json({ 'status': '200', 'message': "user updated successfully" });
    }
    else
    {
        res.status(200).json({ 'status': '404', 'message': "No Cleaner Exist against this id" });
    }

    res.end();
})



// Reset Password
router.post('/reset-password',async (req,res)=>{

    let data=await Helpers.findUserByEmail(req.body.email); // Find User

    if (data) // user found
    {
        let reset_code=Math.floor(100000 + Math.random() * 900000); // generate reset code

        await User.update(
            {
                reset_code: reset_code
            },
            {
                where:
                    { email: req.body.email }
            });

        Helpers.sendResetPasswordMail(req.body.email,"Reset Password Mail",reset_code)

        res.status(200).json({ 'status': '200', 'message': "We have send code to you email, please check your inbox." });
    }
    else // user not found
    {
        res.status(200).json({ 'status': '404', 'message': "No data found against this email." });
    }
    res.end();
})



// Change Password
router.post('/change-password',async (req,res)=>{

    let data=await Helpers.findUserByResetCode(req.body.code); // Find user

    if (data) // user found
    {
        if (req.body.password == req.body.repassword)  // password and re-password match
        {
            await User.update(
                {
                    password: Helpers.encryptData(req.body.password),
                    reset_code: null
                },
                {
                    where:
                        { reset_code: req.body.code }
                });
            res.status(200).json({ 'status': '200', 'message': "Password changed successfully. Now Login" });
        }
        else // // password and re-password not match
        {
            res.status(200).json({ 'status': '404', 'message': "Password and Re-Password don't match. Try again" });
        }
    }
    else // admin not found
    {
        res.status(200).json({ 'status': '404', 'message': "Invalid Code." });
    }
    res.end();
})

// get bookings  by user id
router.post('/bookings-by-user',async (req,res)=>{
    let data=await Booking.findAll({where: {userId: req.body.id}});
    res.status(200).json({ 'status': '200','data':data,'message': "Data Fetched Successfully" });
})


// review and update booking
router.post('/review-and-update',async (req,res)=>{
    await Booking.update(
        {
            status: "reviewed",
            review: req.body.review
        },
        {
            where:
                { id: req.body.id }
        });
    res.status(200).json({ 'status': '200','message': "Review added Successfully" });
})


// get user by id
router.post('/user-by-id',async (req,res)=>{
    let data=await Helpers.findUserById(req.body.id);
    res.status(200).json({ 'status': '200','data':data,'message': "User Found Successfully" });
})


// login and signup user by phone
router.post('/user-signin-signup-by-phone',async (req,res)=>{
    const checkUser = await Helpers.findUserByPhone(req.body.phone); // Find user

    if (checkUser == null || checkUser == []) // user not Found
    {
        let data = await User.create({     // create user with requested data
            phone: req.body.phone,
            type: 'user',
            roll: 3,
        });

        let code = Math.floor(100000 + Math.random() * 900000);

        await User.update(
            {
                reset_code: code
            },
            {
                where:
                    { phone: req.body.phone }
            });

        res.status(200).json({ 'status': '200', 'message': "User created and Otp send Successfully" });
    }
    else // user not found
    {
        if (checkUser.type == 'admin' || checkUser.type == 'cleaner' || checkUser.type == 'affiliate')
        {
            res.status(200).json({ 'status': '404', 'message': "You are not seem to be User" });
        }
        else
        {
            let code = Math.floor(100000 + Math.random() * 900000);

            await User.update(
                {
                    reset_code: code
                },
                {
                    where:
                        { phone: req.body.phone }
                });

            res.status(200).json({ 'status': '200', 'message': "Otp send Successfully" });
        }
    }
    res.end();
})



// all cleaner dashboard counts
router.post('/get-all-user-dashboard-counts',async (req,res)=>{

    let allBookings= await Booking.count({where: { userId: req.body.id }});

    let placedBookings=await Booking.count({where: { status: 'placed',userId: req.body.id }});

    let completeBookings=await Booking.count({where: { status: 'completed',userId: req.body.id }});

    let reviewedBookings=await Booking.count({where: { status: 'reviewed',userId: req.body.id }});

    let data={
        allBookings: allBookings,
        placedBookings: placedBookings,
        completeBookings: parseInt(completeBookings)+parseInt(reviewedBookings),
        reviewBooking: completeBookings,
    }

    res.status(200).json({ 'status': '200','data':data, 'message': "Records Fetched Successfully" });

    res.end();
})



module.exports = router;