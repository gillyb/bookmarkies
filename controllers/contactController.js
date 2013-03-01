
var mailer = require('nodemailer');

app.get('/contact', function(request, response)	{
	response.render('contact');
});

app.post('/-/contact/send', function(request, response) {

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = mailer.createTransport('SMTP', {
	    service: 'Gmail',
	    auth: {
	        user: 'gillyb@gmail.com',
	        pass: ''
	    }
	});

	// setup e-mail data with unicode symbols
	var emailMessage = 'FROM : ' + request.body.contactName + '\n' +
				 	   'EMAIL : ' + request.body.contactEmail + '\n' +
					   'MESSAGE : ' + request.body.contactMessage;
	var mailOptions = {
	    from: 'Bookmarki.es ✔ <admin@bookmarki.es>', // sender address
	    to: 'gillyb@gmail.com', // list of receivers (comma delimited)
	    subject: 'bookmarki.es - contact form', // Subject line
	    text: emailMessage //, // plaintext body
	    //html: "<b>Hello world ✔</b>" // html body
	};

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if (error) {
	        console.log(error);
	    } else {
	        console.log('Message sent: ' + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});

	response.end();

});