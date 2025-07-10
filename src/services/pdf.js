require('dotenv').config();
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { generateDigitalSignature, generateReceiptId } = require("../utils/signature");

function generatePdf(flatno, name, date, amount, type, mode) {
  const doc = new PDFDocument({
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    size: "A4",
  });

  doc.pipe(fs.createWriteStream(`./outputs/${name}.pdf`));

  const receiptData = { flatno, amount, date, type, mode };
  const digitalSignature = generateDigitalSignature(receiptData);
  const receiptId = generateReceiptId();
  const currentDate = new Date().toLocaleDateString();
  const timestamp = new Date().toISOString();

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Receipt #: ${receiptId}`, 50, 60, { align: "right" });
  doc.text(`Date: ${currentDate}`, 50, 75, { align: "right" });
  doc.moveDown(0.5);

  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(process.env.SOCIETY_NAME, 50, 120, { align: "center" });
  doc
    .fontSize(11)
    .font("Helvetica")
    .text(process.env.SOCIETY_ADDRESS, 50, 150, { align: "center" });
  doc.text(`Phone: ${process.env.SOCIETY_PHONE} | Email: ${process.env.SOCIETY_EMAIL}`, 50, 170, {
    align: "center",
  });

  doc.moveDown(1);
  const lineY1 = 200;
  doc
    .strokeColor("#cccccc")
    .lineWidth(2)
    .moveTo(50, lineY1)
    .lineTo(doc.page.width - 50, lineY1)
    .stroke();

  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .fillColor("#2c3e50")
    .text("PAYMENT RECEIPT", 50, 220, { align: "center" });

  const leftCol = 70;
  const rightCol = 320;
  let currentY = 270;

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor("#34495e")
    .text("BILL TO:", leftCol, currentY);
  
  currentY += 25;
  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#000000")
    .text(`Flat No: ${flatno}`, leftCol, currentY);
  
  currentY += 20;
  doc.text(`Resident: ${name}`, leftCol, currentY);

  currentY = 270;
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor("#34495e")
    .text("PAYMENT DETAILS:", rightCol, currentY);
  
  currentY += 25;
  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#000000")
    .text(`Payment Date: ${date}`, rightCol, currentY);
  
  currentY += 20;
  doc.text(`Payment Type: ${type}`, rightCol, currentY);
  
  currentY += 20;
  doc.text(`Payment Mode: ${mode}`, rightCol, currentY);

  const tableTop = 400;
  const tableLeft = 70;
  const tableWidth = 450;
  const rowHeight = 30;

  doc
    .rect(tableLeft, tableTop, tableWidth, rowHeight)
    .fill("#3498db");
  
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor("#ffffff")
    .text("Description", tableLeft + 15, tableTop + 10)
    .text("Period", tableLeft + 200, tableTop + 10)
    .text("Amount", tableLeft + 350, tableTop + 10, { width: 85, align: "right" });

  const rowY = tableTop + rowHeight;
  doc
    .rect(tableLeft, rowY, tableWidth, rowHeight)
    .stroke("#cccccc")
    .fillColor("#ffffff")
    .fill();

  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#000000")
    .text(`${type} Charges`, tableLeft + 15, rowY + 10)
    .text("Apr 2024 - Mar 2025", tableLeft + 200, rowY + 10)
    .text(`₹ ${amount}`, tableLeft + 350, rowY + 10, { width: 85, align: "right" });

  const totalY = rowY + rowHeight;
  doc
    .rect(tableLeft, totalY, tableWidth, rowHeight)
    .fill("#ecf0f1");

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("#2c3e50")
    .text("TOTAL AMOUNT", tableLeft + 15, totalY + 10)
    .text(`₹ ${amount}`, tableLeft + 350, totalY + 10, { width: 85, align: "right" });

  const sigY = 550;
  doc
    .rect(50, sigY, 500, 100)
    .stroke("#3498db")
    .fillColor("#f8f9fa")
    .fill();

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("#2c3e50")
    .text("🔒 DIGITALLY VERIFIED", 70, sigY + 15);

  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor("#34495e")
    .text(`Signature ID: ${digitalSignature}`, 70, sigY + 40)
    .text(`Receipt ID: ${receiptId}`, 70, sigY + 55)
    .text(`Authorized by: ${process.env.SOCIETY_NAME}`, 70, sigY + 70);

  doc
    .text(`Generated: ${timestamp.split('T')[0]}`, 320, sigY + 40)
    .text(`Time: ${timestamp.split('T')[1].split('.')[0]}`, 320, sigY + 55)
    .text("Digitally signed document", 320, sigY + 70);

  doc
    .fontSize(8)
    .font("Helvetica-Oblique")
    .fillColor("#7f8c8d")
    .text("⚠️ This document is digitally signed. Any modification will invalidate the signature.", 70, sigY + 85);

  const footerY = 680;
  doc
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, footerY)
    .lineTo(doc.page.width - 50, footerY)
    .stroke();

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("#7f8c8d")
    .text("Thank you for your payment! Keep this receipt for your records.", 50, footerY + 15, { 
      align: "center" 
    });

  doc
    .fontSize(8)
    .text("This is a computer-generated receipt and does not require a physical signature.", 50, footerY + 35, { 
      align: "center" 
    });

  doc.end();
  console.log(`Professional PDF receipt generated: ${name}.pdf`);
}
exports.generatePdf = generatePdf;