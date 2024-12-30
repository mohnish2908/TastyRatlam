const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587, // Use 587 for TLS 465 for SSL and 25 for non secure   587 for TLS and 465 for SSL
  secure: false, // true for 465, false for 587
  auth: {
    user: "info@tastyratlam.com", // Your Zoho email
    pass: "YHA6d6P5ezcm", // Your Zoho email password or app-specific password
  },
});

// Mail options
const mailOptions = {
  from: '"Tasty Ratlam" <info@tastyratlam.com>', // Sender address
  to: "mohnishpanwar29@gmail.com", // Recipient address
  subject: "Hello from Tasty Ratlam", // Subject
  text: "This is a test email from Zoho Mail.", // Plain text body
  html: "<b>This is a test email from Zoho Mail.</b>", // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
