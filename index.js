import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
const port = process.env.PORT || 8080;
const app = express();
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.get('/', (req, res) => {
    res.send('home page');
})
app.post('/mail', async (req, res) => {
    try {
        const { email,fullname, message } = req.body;
console.log(email,fullname,message);
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPassword
            }
        });

        const mailOptions = {
            from: emailPassword,
            to: 'hs9812946053@gmail.com',
            subject: 'Mail from WeRev website',
            text: `Name:${fullname}
            Email:${email}
            Message:-${message}`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log('server is running on the', port);
})