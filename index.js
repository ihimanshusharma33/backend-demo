import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import { Resend } from '@resend/node';
import { config } from 'dotenv';
config();

const port = process.env.PORT || 8080;
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.send('home page');
});

app.post('/mail', async (req, res) => {
    try {
        const { email, fullname, message } = req.body;
        const data = await resend.emails.send({
            from: 'Himanshusharma<onboarding@resend.dev>', // You can use your verified sender or default
            to: 'werev2022@gmail.com',
            subject: 'Mail from WeRev website',
            text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`
        });
        console.log('Email sent:', data);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log('server is running on the', port);
});