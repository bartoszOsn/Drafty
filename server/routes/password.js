var express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const util = require('util');
const pug = require('pug');
const path = require('path');
const UserDetails = require('./../models/userDetail');
const { mail } = require('./../../secret');
var router = express.Router();



var transporter = nodemailer.createTransport({
    host: 'debugmail.io',
    port: 25,
    auth: mail
  });

const randomBytes = util.promisify(crypto.randomBytes);
const sendMail = util.promisify((options, cb)=> transporter.sendMail(options, cb));

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

/* 
    displays a form for entering e-mail address where link will be send
*/
router.get('/forgot', (req, res, next)=> {
    if(req.user) {
        return res.redirect('/password/change');
    }
    return res.render('account/forgot_password');
});

/*
    Sends link
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

router.get('/forgot/:user/:token', (req, res, next) => {
    return res.render('account/new_password', {oldPassword: false});
});

module.exports = router;