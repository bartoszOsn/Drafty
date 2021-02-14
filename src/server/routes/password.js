var express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const util = require('util');
const pug = require('pug');
const path = require('path');
const UserDetails = require('./../models/userDetail');
const { mail } = require('./../../../secret');
const {isPasswordValid} = require('./../../shared/validation');
var router = express.Router();


// Creates transporter for sending mails.
// TODO: Get options from config file.
var transporter = nodemailer.createTransport({
    host: 'debugmail.io',
    port: 25,
    auth: mail
});

// Makes some functions work with `await`.
const randomBytes = util.promisify(crypto.randomBytes);
const sendMail = util.promisify((options, cb)=> transporter.sendMail(options, cb));

/**
 * Sends e-mail with link for changing password.
 * @param {String} email address where mail should be sent.
 * @param {*} token Token generated for user.
 * @param {*} userID ID of user changing password.
 * @param {*} hostname Hostname where server is running. Used to generate link.
 */
async function sendEmail(email, token, userID, hostname) {
    const link = `${hostname}/password/forgot/${userID}/${token}`;
    await sendMail({
        from: 'no-reply@localhost',
        to: email,
        subject: "Changing password",
        text: pug.renderFile(path.resolve(__dirname, '..', 'views/account/forgot_password_mail.pug'), {link, type: 'text'}),
        html: pug.renderFile(path.resolve(__dirname, '..', 'views/account/forgot_password_mail.pug'), { link })
    });
}

/**
 * Renders a form for entering e-mail address where link should be sent.
 */
router.get('/forgot', (req, res, next)=> {
    if(req.user) {
        return res.redirect('/password/change');
    }
    return res.render('account/forgot_password');
});

/*
 * Sends link.
 */
router.post('/forgot', async (req, res, next) => {
    let email = req.body.email;
    let token = crypto.randomBytes(20).toString('hex');
    let user = await UserDetails.findOne({ email });
    if(!user) {
        return res.render('account/forgot_password', {warning: "There's no account with given e-mail address."});
    }
    user.token = token;
    user.tokenExpiration = Date.now() + 1000 * 60 * 60 * 24;
    await user.save();
    await sendEmail(email, token, user._id.toString(), req.hostname);
    return res.render('account/info', {
        msgHeader: 'We send you e-mail!',
        message: 'Check your mail box for a mail from us. It has link that will let you change your password.',
        link: '/',
        linksText: 'Get back to home page'
    });
});

/**
 * This is where link sent in e-mail is leading to.
 * This route renders form for changing password, but only when username and token in url is valid.
 */
router.get('/forgot/:user/:token', async (req, res, next) => {
    const userID = req.params.user;
    const token = req.params.token;
    let correctId = true;
    let user
    try {
        user = await UserDetails.findById(userID);
    }
    catch(ex) {
        correctId = false;
    }
    if(!correctId || !user || user.token != token) {
        return res.render('account/info', {
            msgHeader: 'This link is incorrect.',
            link: '/password/forgot',
            linksText: 'Click here to send mail with correct link for changing password'
        });
    }
    if(user.tokenExpiration < Date.now()) {
        return res.render('account/info', {
            msgHeader: 'Your link has expired.',
            link: '/password/forgot',
            linksText: 'Click here to send mail with new link for changing password'
        });
    }
    return res.render('account/new_password', {oldPassword: false});
});

/**
 * Changes password, but only when username and token in url is valid.
 */
router.post('/forgot/:user/:token', async (req, res, next) => {
    const userID = req.params.user;
    const token = req.params.token;
    const newPassword = req.body.newPassword;
    let correctId = true;
    let user
    try {
        user = await UserDetails.findById(userID);
    }
    catch(ex) {
        correctId = false;
    }
    if(!correctId || !user || user.token === null || user.token != token) {
        return res.render('account/info', {
            msgHeader: 'This link is incorrect.',
            link: '/password/forgot',
            linksText: 'Click here to send mail with correct link for changing password.'
        });
    }
    if(user.tokenExpiration < Date.now()) {
        return res.render('account/info', {
            msgHeader: 'Your link has expired.',
            link: '/password/forgot',
            linksText: 'Click here to send mail with new link for changing password.'
        });
    }
    let passwordValidation = isPasswordValid(newPassword);
    if(!passwordValidation.result) {
        return res.render('account/info', {
            msgHeader: 'Your password is too weak.',
            message: 'Password must be at least 8 characters long, and have at least 2 capital letters and 2 numbers.',
            link: req.originalUrl,
            linksText: 'Click here to type another password.'
        });
    }
    try {
        await user.setPassword(newPassword);
        user.token = null;
        await user.save();
        return res.render('account/info', {
            msgHeader: 'Password changed successfully.',
            link: '/login',
            linksText: 'You can log in now.'
        });
    }
    catch(ex) {
        return res.render('account/info', {
            msgHeader: 'Something went wrong.',
            link: '/password/forgot',
            linksText: 'Click here to send another link and try again.'
        });
    }
    
});

module.exports = router;