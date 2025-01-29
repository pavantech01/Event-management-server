const nodemailer = require('nodemailer');

// Function to send email
exports.sendEmail = async (req, res) => {
    const { name, email, phone, address, message, plan } = req.body;

    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'ashokafae@gmail.com', // Comapny email
            pass: 'your-email-password' // Your email password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'abc@gmail.com', // Recipient email
        subject: `New message from ${name}`,
        text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nPlan: ${plan}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
};
