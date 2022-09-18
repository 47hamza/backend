const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Booking = require('../models/bookings');
const User = require('../models/users');

// Verify JWT Token Middleware
const verifyJWTWithCleaner=require('../middlewares/verify_cleaner_and_jwt');



// SignIn Cleaner
router.post('/cleaner-login',async (req,res)=>{

    const checkUser = await Helpers.findUserByEmail(req.body.email); // Find Cleaner

    if (checkUser === null) // Cleaner not Found
    {
        res.status(200).json({ 'status': '404', 'message': "Cleaner not registered with this email" });
    }
    else // Cleaner not found
    {
        if (checkUser.type == 'cleaner')
        {
            let checkPassword=Helpers.compareEncryptedPassword(req.body.password,checkUser.password);

            if (checkPassword)
            {
                let jwtToken=Helpers.generateJwtToken(req.body.email)
                Helpers.setUserData(checkUser);
                res.status(200).json({ 'status': '200','message': 'Login Successfully', 'id': checkUser.id, 'name': checkUser.name, 'email': checkUser.email,'phone': checkUser.phone,'address': checkUser.address, 'type':checkUser.type, 'roll': checkUser.roll,'profile_pic': checkUser.profile_pic,'profile_pic_url': checkUser.profile_pic_url, 'token': jwtToken });
            }
            else
            {
                res.status(200).json({ 'status': '404', 'message': "Invalid Credentials" });
            }
        }
        else
        {
            res.status(200).json({ 'status': '404', 'message': "You are not seen to be Cleaner" });
        }
    }
    res.end();
})



// update booking status
router.post('/cleaner-update-booking',verifyJWTWithCleaner,async (req,res)=>{

    await Booking.update(
        {
            status: 'complete',
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "Booking updated successfully" });

    res.end();
})


// get booking by cleaner id
router.post('/cleaner-bookings-by-id',async (req,res)=>{
    let data=await Booking.findAll({where: {assignCleaner: req.body.id}});
    res.status(200).json({ 'status': '200','data':data,'message': "Tasks fetched Found Successfully" });
})

// save cleaner image 1
router.post('/save-cleaner-images-1',async (req,res)=>{

    let imageName=Helpers.saveCleanerFiles(req.files.image);

    await Booking.update(
        {
            cleanerImg1: imageName,
            cleanerImgLink1: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });

    res.end();
})

// save cleaner image 2
router.post('/save-cleaner-images-2',async (req,res)=>{

    let imageName=Helpers.saveCleanerFiles(req.files.image);

    await Booking.update(
        {
            cleanerImg2: imageName,
            cleanerImgLink2: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });

    res.end();
})

// save cleaner image 3
router.post('/save-cleaner-images-3',async (req,res)=>{

    let imageName=Helpers.saveCleanerFiles(req.files.image);

    await Booking.update(
        {
            cleanerImg3: imageName,
            cleanerImgLink3: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });

    res.end();
})


// complete task
router.post('/complete-task',async (req,res)=>{
    await Booking.update(
        {
            status: 'completed',
        },
        {
            where:
                { id: req.body.id }
        });

    res.status(200).json({ 'status': '200', 'message': "Task Completed successfully" });

    res.end();
})


// all cleaner dashboard counts
router.post('/get-all-cleaner-dashboard-counts',async (req,res)=>{

    let allBookings= await Booking.count({where: { assignCleaner: req.body.id }});

    let placedBookings=await Booking.count({where: { status: 'placed',assignCleaner: req.body.id }});

    let completeBookings=await Booking.count({where: { status: 'completed',assignCleaner: req.body.id }});
    let reviewedBookings=await Booking.count({where: { status: 'reviewed',assignCleaner: req.body.id }});

    let data={
        allBookings: allBookings,
        placedBookings: placedBookings,
        completeBookings: parseInt(completeBookings)+parseInt(reviewedBookings),
    }

    res.status(200).json({ 'status': '200','data':data, 'message': "Records Fetched Successfully" });

    res.end();
})


module.exports = router;