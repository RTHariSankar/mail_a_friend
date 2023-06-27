const router = require('express').Router();
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
 

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


router.post('/sendEmail',(req,res)=>{

    const { userEmail } = req.body;


    let config  = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };


    let transporter = nodemailer.createTransport(config);


    let mailGenerator = new mailgen({

        theme: 'default',
        product: {
            name:'Mailgen',
            link: 'https://mailgen.js/'
        }
    });

    let response = {

        body: {

            name: 'Hari',
            intro: 'Nodemailer api Testing',
            table: {
                data: [
                    {

                        api: 'Nodemailer',
                        description: 'A Backend Application',
                        medium: 'Email'
                    }
                ]
            },

            outro: 'Test Successful'
        }
    };

    let mail = mailGenerator.generate(response);

    let message = {

        from: EMAIL,
        to: userEmail,
        subject: 'Nodemailer',
        html: mail
    };

    transporter.sendMail(message)
    .then(()=>{

        return res.status(201).json({
            msg: `Email sent to ${userEmail} by ${EMAIL}`


        });
    })
    .catch(error=>{

        return res.status(500).json({error});


    });

})

module.exports = router;