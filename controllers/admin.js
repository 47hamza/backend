const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const User = require('../models/users');
const Booking = require('../models/bookings');
const Approvals = require('../models/affiliate_approvals');


// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');


// SignUp Admin
router.post('/admin-signup',async (req,res)=>{
    let data=await Helpers.findUserByEmail(req.body.email);  // Find Admin

    if (data) // Admin Found
    {
        res.status(202).json({ 'status': '404', 'message': "Admin already exist with this email." });
    }
    else // Admin not found
    {
        let data = await User.create({     // create admin with requested data
            name: req.body.name,
            email: req.body.email,
            password: Helpers.encryptData(req.body.password),
            type: 'admin',
            roll: 0,
        });

        res.status(200).json({ 'status': '200', 'message': "Signed up successfully! Please log in!" });
    }
    res.end();
})



// SignIn Admin
router.post('/admin-login',async (req,res)=>{

    const checkUser = await Helpers.findUserByEmail(req.body.email); // Find Admin

    if (checkUser === null) // Admin not Found
    {
        res.status(200).json({ 'status': '404', 'message': "User not registered with this email" });
    }
    else // Admin not found
    {
        if (checkUser.type == 'admin')
        {
            let checkPassword=Helpers.compareEncryptedPassword(req.body.password,checkUser.password);

            if (checkPassword)
            {
                let jwtToken=Helpers.generateJwtToken(req.body.email)
                Helpers.setUserData(checkUser);
                res.status(200).json({ 'status': '200','message': 'Login Successfully', 'id': checkUser.id, 'name': checkUser.name, 'email': checkUser.email, 'type':checkUser.type, 'roll': checkUser.roll,'profile_pic': checkUser.profile_pic,'profile_pic_url': checkUser.profile_pic_url, 'token': jwtToken });
            }
            else
            {
                res.status(200).json({ 'status': '404', 'message': "Invalid Credentials" });
            }
        }
        else
        {
            res.status(200).json({ 'status': '404', 'message': "You are not seen to be Admin" });
        }
    }
    res.end();
})


// assign cleaner
router.get('/get-all-admin-dashboard-counts',async (req,res)=>{

    let allBookings= await Booking.count();

    let placedBookings=await Booking.count({where: { status: 'placed' }});

    let completeBookings=await Booking.count({where: { status: 'completed' }});
    let reviewedBookings=await Booking.count({where: { status: 'reviewed' }});

    let allAffiliates=await User.count({where: { type: 'affiliate' }});

    let allCleaner=await User.count({where: { type: 'cleaner' }});
    let allApprovals=await Approvals.count({where: { status: 'pending' }});

    let data={
        allBookings: allBookings,
        placedBookings: placedBookings,
        completeBookings: parseInt(completeBookings)+parseInt(reviewedBookings),
        allAffiliates: allAffiliates,
        allCleaner: allCleaner,
        allApprovals: allApprovals
    }

    res.status(200).json({ 'status': '200','data':data, 'message': "Records Fetched Successfully" });

    res.end();
})




// Reset Password
// router.post('/admin-reset-password',async (req,res)=>{
//
//     let data=await Helpers.findAdminByEmail(req.body.email); // Find Admin
//
//     if (data) // admin found
//     {
//         let reset_code=Math.floor(Math.random() * 9999999999999); // generate reset code
//
//         await Admin.update(
//             {
//                 reset_code: reset_code
//             },
//             {
//                 where:
//                     { email: req.body.email }
//             });
//
//         Helpers.sendResetPasswordMail(req.body.email,"Reset Password Mail",reset_code)
//
//         res.status(200).json({ 'status': '200', 'message': "We have send code to you email, please check your inbox." });
//     }
//     else // admin not found
//     {
//         res.status(200).json({ 'status': '404', 'message': "No data found against this email." });
//     }
//     res.end();
// })

// Change Password
// router.post('/admin-change-password',async (req,res)=>{
//
//     let data=await Helpers.findAdminByResetCode(req.body.code); // Find Admin
//
//     if (data) // admin found
//     {
//         if (req.body.password == req.body.repassword)  // password and re-password match
//         {
//             await Admin.update(
//                 {
//                     password: Helpers.encryptData(req.body.password),
//                     reset_code: null
//                 },
//                 {
//                     where:
//                         { reset_code: req.body.code }
//                 });
//             res.status(200).json({ 'status': '200', 'message': "Password changed successfully. Now Login" });
//         }
//         else // // password and re-password not match
//         {
//             res.status(200).json({ 'status': '404', 'message': "Password and Re-Password don't match. Try again" });
//         }
//     }
//     else // admin not found
//     {
//         res.status(200).json({ 'status': '404', 'message': "Invalid Code." });
//     }
//     res.end();
// })



// Update Profile -> Profile picture
// router.post('/admin-update-profile-picture',verifyJWT,async (req,res)=>{
//
//     let loginUser=Helpers.getAdminData(); // get login admin id
//
//     let data=await Helpers.findAdminById(loginUser.id); // get admin data
//
//     // console.log(data);
//
//     if (data.profile_pic == "" || data.profile_pic == null) // if previous file not exist
//     {
//     }
//     else // if previous file exists
//     {
//         await Helpers.deleteAdminFile(data.profile_pic);
//     }
//
//     if (req.files)
//     {
//         let profile_pic=Helpers.saveAdminFile(req.files.profile_pic)
//
//         await Admin.update(
//             {
//                 profile_pic: profile_pic,
//                 profile_pic_url: process.env.LOCAL_URL+process.env.PORT+process.env.GET_ADMIN_FILES+profile_pic,
//             },
//             {
//                 where:
//                     { id: loginUser.id }
//             });
//
//         let newData=await Helpers.findAdminById(loginUser.id); // get admin data
//
//         res.status(200).json({ 'status': '200','data': newData,'url': process.env.LOCAL_URL+process.env.PORT+process.env.GET_ADMIN_FILES+profile_pic, 'message': "Profile picture updated successfully." });
//     }
//     else // either one of data is null
//     {
//         res.status(200).json({ 'status': '200', 'message': "Data contain empty or null value" });
//     }
//     res.end();
// })


module.exports = router;