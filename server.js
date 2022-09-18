//--------------- Import ---------------
const express = require('express');
const server=express();
const bodyParser=require('body-parser');
const jsonParser=bodyParser.json;
const cors=require('cors')
const fileUpload=require('express-fileupload');

//--------------- Configure Env ---------------
require('dotenv').config();

//--------------- Middelware ---------------
server.use(express.static('public')) // set public directory
server.use('/cleaner-images', express.static('public/cleaners/')); // route for accessing images
server.use(bodyParser.json({ limit: '50mb' })); // setting Request size
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // setting Request size
server.use(express.json());
// server.use(cors()) // allow cors
server.use(cors({    // allow cors from any region
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: '*'
}))
server.use(fileUpload({
    useTempFiles: false,
    tempFileDir: 'public'
}))

//--------------- Controller ---------------
const adminController = require('./controllers/admin');
const adminAffiliateController = require('./controllers/admin_affiliate');
const adminCleanerController = require('./controllers/admin_cleaner');
const adminAffiliateLinkController = require('./controllers/admin_affiliate_link');
const adminExtraFeaturesController = require('./controllers/admin_extra_feature');
const adminPlanController = require('./controllers/admin_plan');
const adminBookingController = require('./controllers/admin_booking');
const adminSlotController = require('./controllers/admin_slot');
const userController= require('./controllers/user');
const cleanerController = require('./controllers/cleaner');
const affiliateCOntroller = require('./controllers/affiliate');
const paymentController = require('./controllers/payment');
const requestController = require('./controllers/admin_approval');
const recentPlanController = require('./controllers/recent_plan');

//--------------- Database Connect, Authenticate & Sync Tables ---------------
require('./connection/authenticate_and_sync');




// User Routes
server.use(adminController);
server.use(adminAffiliateController);
server.use(adminCleanerController);
server.use(adminAffiliateLinkController);
server.use(adminExtraFeaturesController);
server.use(cleanerController);
server.use(adminPlanController);
server.use(adminBookingController);
server.use(userController);
server.use(adminSlotController);
server.use(affiliateCOntroller);
server.use(paymentController);
server.use(requestController);
server.use(recentPlanController);



//--------------- PORT Setting ---------------
server.listen(process.env.PORT, console.log("Running at PORT: "+process.env.PORT));




