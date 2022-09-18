const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const Booking = require('../models/bookings');
const RecentPlan = require('../models/recent_plans');





router.post('/all-recent-plans-by-user',async (req,res)=>{

    let data=await RecentPlan.findAll({where: {userId: req.body.userId}})

    res.status(200).json({ 'status': '200','data':data, 'message': "Data Fetched Successfully" });

    res.end();
})



router.post('/check-for-resuscribe1',async (req,res)=>{

    let data=await Booking.findAll({where: {userId: req.body.userId, planId: req.body.planId, carType: req.body.carType, model: req.body.model, plate: req.body.plate, status: 'assigned'}})

    res.status(200).json({ 'status': '200','data':data, 'message': "Data Fetched Successfully" });

    res.end();
})

router.post('/check-for-resuscribe2',async (req,res)=>{

    let data=await Booking.findAll({where: {userId: req.body.userId, planId: req.body.planId, carType: req.body.carType, model: req.body.model, plate: req.body.plate, status: 'placed'}})

    res.status(200).json({ 'status': '200','data':data, 'message': "Data Fetched Successfully" });

    res.end();
})






// // get booking by cleaner id
// router.post('/cleaner-bookings-by-id',async (req,res)=>{
//     let data=await Booking.findAll({where: {assignCleaner: req.body.id}});
//     res.status(200).json({ 'status': '200','data':data,'message': "Tasks fetched Found Successfully" });
// })
//
// // save cleaner image 1
// router.post('/save-cleaner-images-1',async (req,res)=>{
//
//     let imageName=Helpers.saveCleanerFiles(req.files.image);
//
//     await Booking.update(
//         {
//             cleanerImg1: imageName,
//             cleanerImgLink1: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
//         },
//         {
//             where:
//                 { id: req.body.id }
//         });
//
//     res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });
//
//     res.end();
// })
//
// // save cleaner image 2
// router.post('/save-cleaner-images-2',async (req,res)=>{
//
//     let imageName=Helpers.saveCleanerFiles(req.files.image);
//
//     await Booking.update(
//         {
//             cleanerImg2: imageName,
//             cleanerImgLink2: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
//         },
//         {
//             where:
//                 { id: req.body.id }
//         });
//
//     res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });
//
//     res.end();
// })
//
// // save cleaner image 3
// router.post('/save-cleaner-images-3',async (req,res)=>{
//
//     let imageName=Helpers.saveCleanerFiles(req.files.image);
//
//     await Booking.update(
//         {
//             cleanerImg3: imageName,
//             cleanerImgLink3: process.env.LOCAL_URL+process.env.PORT+'/cleaner-images/'+imageName
//         },
//         {
//             where:
//                 { id: req.body.id }
//         });
//
//     res.status(200).json({ 'status': '200', 'message': "File Saved successfully" });
//
//     res.end();
// })
//
//
// // complete task
// router.post('/complete-task',async (req,res)=>{
//     await Booking.update(
//         {
//             status: 'completed',
//         },
//         {
//             where:
//                 { id: req.body.id }
//         });
//
//     res.status(200).json({ 'status': '200', 'message': "Task Completed successfully" });
//
//     res.end();
// })
//
//
// // all cleaner dashboard counts
// router.post('/get-all-cleaner-dashboard-counts',async (req,res)=>{
//
//     let allBookings= await Booking.count({where: { assignCleaner: req.body.id }});
//
//     let placedBookings=await Booking.count({where: { status: 'placed',assignCleaner: req.body.id }});
//
//     let completeBookings=await Booking.count({where: { status: 'completed',assignCleaner: req.body.id }});
//     let reviewedBookings=await Booking.count({where: { status: 'reviewed',assignCleaner: req.body.id }});
//
//     let data={
//         allBookings: allBookings,
//         placedBookings: placedBookings,
//         completeBookings: parseInt(completeBookings)+parseInt(reviewedBookings),
//     }
//
//     res.status(200).json({ 'status': '200','data':data, 'message': "Records Fetched Successfully" });
//
//     res.end();
// })


module.exports = router;