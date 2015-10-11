
var secrets = require('../config/secrets');
var mailgun = require('mailgun-js')({apiKey: secrets.mailgun.apiKey, domain: secrets.mailgun.domain});

exports.userRegistered = function(email) {
    var data = {
        from: 'Bookmarki.es <info@bookmarki.es>',
        to: 'gillyb@gmail.com',
        subject: 'New user registered',
        text: 'A new user registered to the site.\nUser : ' + email
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};