require('dotenv').config();
const nodemailer = require("nodemailer");
const { generateReceiptEmailTemplate } = require("./emailTemplate");

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmail(to, subject, text, attachments) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: text,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendReceiptEmail(residentData, receiptData, attachments) {
  const htmlContent = generateReceiptEmailTemplate(residentData, receiptData);
  const subject = `Payment Receipt Confirmation - ${receiptData.receiptId} | ${process.env.SOCIETY_NAME}`;
  
  const mailOptions = {
    from: `"${process.env.SOCIETY_NAME}" <${process.env.EMAIL_FROM}>`,
    to: residentData.email,
    subject: subject,
    html: htmlContent,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending receipt email:", error);
    } else {
      console.log(`Receipt email sent to ${residentData.name}:`, info.response);
    }
  });
}

exports.sendEmail = sendEmail;
exports.sendReceiptEmail = sendReceiptEmail;

exports.sendEmail = sendEmail;