var http = require('http')
var createHandler = require('gitlab-webhook-handler')
var handler = createHandler({ path: '/webhook' })
var exec = require('child_process').exec;
var nodemailer = require('nodemailer');

// to send email on successful deployment
var smtpConfig = {
    host: 'amtp_host',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'userid',
        pass: 'user_password'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

console.log("Gitlab Hook Server running at https://server_address:7777/webhook");

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    if(event.headers['x-gitlab-token'] == "token_set_at_GIT") {
		
		if(event.payload.ref == "refs/heads/master") {
			var cmd	= "./scripts/frontend.sh";
			var subject = "Project Frontend Site deployment";
		}
		
		exec(cmd, function(error, stdout, stderr) {

			if (error !== null) {}

			// setup e-mail data with unicode symbols
			var mailOptions = {
				from: '"ME" <admin@myserver.com>', // sender address
				to: 'ms.sandeepkaur@gmail.com', // list of receivers
				subject: subject, // Subject line
				html: 'Hi Admin,<br><br> Please check below deployment logs:\n<br><b><pre>' + stdout + '</pre></b><br><br>Thanks,<br>User' // html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					return console.log(error);
				}
				console.log('Message sent');
			});
			
		});
	}
})

