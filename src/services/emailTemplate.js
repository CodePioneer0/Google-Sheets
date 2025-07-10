require('dotenv').config();

/**
 * Generate beautiful HTML email template for receipt confirmation
 * @param {Object} residentData - Resident information
 * @param {Object} receiptData - Receipt details
 * @returns {string} - HTML email content
 */
function generateReceiptEmailTemplate(residentData, receiptData) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    
    <!-- Email Container -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                ${process.env.SOCIETY_NAME}
            </h1>
            <p style="color: #ecf0f1; margin: 10px 0 0 0; font-size: 16px;">
                Payment Receipt Confirmation
            </p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
            
            <!-- Greeting -->
            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px;">
                Dear ${residentData.name},
            </h2>
            
            <!-- Main Message -->
            <p style="color: #34495e; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                Thank you for your payment! We have successfully received your payment and 
                generated your receipt. Please find the attached PDF receipt for your records.
            </p>
            
            <!-- Payment Summary Card -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #3498db;">
                <h3 style="color: #2980b9; margin: 0 0 20px 0; font-size: 18px;">
                    📋 Payment Summary
                </h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e9ecef;">
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50; width: 40%;">Flat Number:</td>
                        <td style="padding: 8px 0; color: #34495e;">${residentData.flatno}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e9ecef;">
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Amount Paid:</td>
                        <td style="padding: 8px 0; color: #27ae60; font-weight: bold; font-size: 18px;">₹${receiptData.amount}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e9ecef;">
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Payment Date:</td>
                        <td style="padding: 8px 0; color: #34495e;">${receiptData.date}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e9ecef;">
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Payment Type:</td>
                        <td style="padding: 8px 0; color: #34495e;">${receiptData.type}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e9ecef;">
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Payment Mode:</td>
                        <td style="padding: 8px 0; color: #34495e;">${receiptData.mode}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Receipt ID:</td>
                        <td style="padding: 8px 0; color: #8e44ad; font-family: monospace; font-weight: bold;">${receiptData.receiptId}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Security Notice -->
            <div style="background-color: #e8f5e8; border-radius: 6px; padding: 20px; margin: 25px 0; border-left: 4px solid #27ae60;">
                <p style="margin: 0; color: #155724; font-size: 14px;">
                    🔒 <strong>Digitally Secured:</strong> This receipt is digitally signed for your security. 
                    Digital Signature ID: <span style="font-family: monospace; background: #d4edda; padding: 2px 6px; border-radius: 3px;">${receiptData.digitalSignature}</span>
                </p>
            </div>
            
            <!-- Important Note -->
            <div style="background-color: #fff3cd; border-radius: 6px; padding: 20px; margin: 25px 0; border-left: 4px solid #ffc107;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                    📄 <strong>Important:</strong> Please save this email and the attached PDF receipt for your records. 
                    You may need it for future reference or verification purposes.
                </p>
            </div>
            
            <!-- Thank You Message -->
            <p style="color: #34495e; line-height: 1.6; margin: 30px 0 20px 0; font-size: 16px; text-align: center;">
                Thank you for being a valued member of our housing society!
            </p>
            
        </div>
        
        <!-- Footer -->
        <div style="background-color: #34495e; padding: 25px 30px; text-align: center;">
            <p style="color: #ecf0f1; margin: 0 0 10px 0; font-size: 14px;">
                <strong>Contact Information</strong>
            </p>
            <p style="color: #bdc3c7; margin: 0 0 15px 0; font-size: 13px;">
                📞 ${process.env.SOCIETY_PHONE} | ✉️ ${process.env.SOCIETY_EMAIL}
            </p>
            <p style="color: #95a5a6; margin: 0; font-size: 12px;">
                This is an automated message from ${process.env.SOCIETY_NAME}. Please do not reply to this email.
            </p>
        </div>
        
    </div>
    
</body>
</html>
  `;
}

module.exports = {
  generateReceiptEmailTemplate
};
