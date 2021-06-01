var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
module.exports.sendMail = async (data) => {
    var MAIL_SENDFROM_NAME = 'Resume app';
    var MAIL_SENDFROM_MAIL = 'sagarmavuduru@gmail.com';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: 'mail.tekpillar.com',
        // port: 465,
        secureConnection: true, // use SSL
        // transportMethod: 'SMTP',
        auth: {
            user: 'Noreplyresumebuilder7@gmail.com',
            pass: 'Sanjay@6464'
        },
    });

    var mail = {
        // from: 'sagarmavuduru@gmail.com',
        from: '"' + MAIL_SENDFROM_NAME + '" <' + MAIL_SENDFROM_MAIL + '>',
        to: data.email,
        subject: data.subject,
        generateTextFromHTML: true,
        // text: data.text,
        // html: `<h1>Password Change Request</h1><p>${data.test}</p>`
        html: `<h1>${data.heading}</h1><p>${data.test}</p>`

    }


    transporter.sendMail(mail, function (error, response1) {
        console.log(error)
        console.log(response1)
        console.log(data);

        if (error) {
            console.log("error while mail sending", error);
            response = { status: 'error', message: 'Error while mail sending.' };
            // res.send(response);                   		                       
        } else {
            response = { status: 'success', message: 'We sent you instruction for password reset on your registred email address. Please check that.' };
            // res.send(response);
        }
    });

}