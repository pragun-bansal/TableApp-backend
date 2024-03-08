
const nodemailer = require('nodemailer');
const EntryModel = require('../models/EntryModel');

const emailSender = async (req, res) => {
    const { table, checkedItems, recipientEmail } = req.body;

    try {
        const entries = await EntryModel.find({ _id: { $in: checkedItems } }).lean();

        // Convert JSON array to CSV string
        const csvFields = ['Name', 'Email', 'PhoneNumber', 'Hobby'];
        let csvString = csvFields.join(',') + '\n';

        entries.forEach(entry => {
            csvString += `${entry.name},${entry.email},${entry.phone_number},${entry.hobby}\n`;
        });

        const mailOptions = {
            from: process.env.sender_email,
            to: recipientEmail,
            subject: 'Data from MongoDB',
            text: `Please find attached CSV data from ${table.name} from MongoDB`,
            attachments: [{
                filename: 'data.csv',
                content: csvString
            }]
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.sender_email,
                pass: process.env.sender_email_pass
            }
        });

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email Sent Successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

module.exports = {
    emailSender
};
