const nodemailer = require('nodemailer');

const transporternm = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '2be0b9322d0a45',
        pass: '4518007cd7624b'
    }
});

const mailOptions = {
    from: '"Mail Trap" <mailtrap@example.com>', // Custom sender name and address
};

module.exports = { transporternm, mailOptions }; // Export both transporter and mailOptions