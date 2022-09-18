const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
var fs = require('fs');

let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

// User Model
const User = require('../models/users');
const Extra = require('../models/extra_features');

// Global Variables
let user=null;

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'test.bliynk@gmail.com',
        pass: 'krfcrkpltxyoqooc',
    }
}));






// Encrypt Data
module.exports.encryptData= function (data)
{
    return bcrypt.hashSync(data,5);
}

// Compare encrypt password
module.exports.compareEncryptedPassword=function (orignalPassword,hashPassword)
{
    return bcrypt.compareSync(orignalPassword,hashPassword)
}

// Generate JWT token
module.exports.generateJwtToken= function (data) {
    return jwt.sign({ email: data }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

// Find User by email
module.exports.findUserByEmail=async function (email) {
    return await User.findOne({where: {email: email}})
}

// Find User by phone
module.exports.findUserByPhone=async function (phone) {
    return await User.findOne({where: {phone: phone}})
}

// Find User by reset code
module.exports.findUserByResetCode=async function (code) {
    return await User.findOne({where: {reset_code: code}})
}

// Find User by id
module.exports.findUserById=async function (id) {
    return await User.findOne({where: {id: id}})
}

// Find extra feature by id
module.exports.findExtraFeatureById=async function (id) {
    return await Extra.findOne({where: {id: id}})
}

// set admin data
module.exports.setUserData= function (data) {
    user=data;
    return ;
}

// get admin data
module.exports.getUserData= function () {
    return user;
}



// send html email
module.exports.sendResetPasswordMail= function (to,subject,code) {

    let mailOptions = {
        from: 'test.bliynk@gmail.com',
        to: to,
        subject: subject,
        html: '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <title>Reset Password</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<p>Hi! your reset code is</p>\n' +
            '<p><b>Code: '+code+'</b></p>\n' +
            '<i>If you not do that please change your password immediately</i>\n' +
            '<p>Thanks</p>\n' +
            '</body>\n' +
            '</html>',
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// save cleaner files
module.exports.saveCleanerFiles=function (_file) {
    let file=_file;
    let fileName=Math.floor(100000000000000000 + Math.random() * 999999999999999999)+file.name;

    file.mv('./public/cleaners/'+fileName,(err)=>{
        if (err)
        {
            console.log(err)
        }
    })

    return fileName;
}


// Delete admin file
// module.exports.deleteAdminFile=async function (fileName) {
//     await fs.unlink('public/admin/'+fileName, function (err) {
//         if (err) throw err;
//         // if no error, file has been deleted successfully
//         console.log('File deleted!');
//     });
// }