require('dotenv').config();
const fs = require("fs");
const PDFDocument = require("pdfkit");

function generatePdf(flatno, name, date, amount, type, mode) {
  const doc = new PDFDocument({
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    size: "A4",
  });

  doc.pipe(fs.createWriteStream(`./outputs/${name}.pdf`));

  // Add header with logo placeholder and title
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Receipt #: INV-2024-001", { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" });
  doc.moveDown(0.5);

  // Society name and address
  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .text(process.env.SOCIETY_NAME, { align: "center" });
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(process.env.SOCIETY_ADDRESS, { align: "center" });
  doc.text(`Phone: ${process.env.SOCIETY_PHONE} | Email: ${process.env.SOCIETY_EMAIL}`, {
    align: "center",
  });

  // Horizontal line
  doc.moveDown(1);
  doc
    .lineCap("butt")
    .strokeColor("#999999")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();
  doc.moveDown(1);

  // Bill title
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("PAYMENT RECEIPT", { align: "center" });
  doc.moveDown(1);

  // Create two columns for bill info
  const leftColumnX = 70;
  const rightColumnX = 300;
  let currentY = doc.y;

  // Left column - Resident information
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("BILL TO:", leftColumnX, currentY);
  doc.moveDown(0.4);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Flat No: ${flatno}`, { continued: false });
  doc.text(`Name: ${name}`, { continued: false });
  doc.moveDown(0.5);

  // Right column - Payment information
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("PAYMENT DETAILS:", rightColumnX, currentY);
  doc.moveDown(0.4);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Date: ${date}`, { continued: false });
  doc.text(`Payment Type: ${type}`, { continued: false });
  doc.text(`Payment Mode: ${mode}`, { continued: false });

  // Move down to start the payment table
  doc.moveDown(2);

  // Payment details table
  const tableTop = doc.y;
  const tableHeaders = ["Description", "Period", "Amount"];
  const tableData = [[`${type} Charges`, "Apr 2024 - Mar 2025", `₹ ${amount}`]];

  // Draw table header
  doc.fontSize(10).font("Helvetica-Bold");
  doc.rect(leftColumnX, tableTop, 450, 20).fill("#e6e6e6");
  doc.fillColor("#000000");
  doc.text(tableHeaders[0], leftColumnX + 10, tableTop + 6);
  doc.text(tableHeaders[1], leftColumnX + 200, tableTop + 6);
  doc.text(tableHeaders[2], leftColumnX + 350, tableTop + 6, {
    width: 90,
    align: "right",
  });

  // Draw table rows
  doc.fontSize(10).font("Helvetica");
  let rowY = tableTop + 20;
  tableData.forEach((row, i) => {
    doc.rect(leftColumnX, rowY, 450, 20).stroke();
    doc.text(row[0], leftColumnX + 10, rowY + 6);
    doc.text(row[1], leftColumnX + 200, rowY + 6);
    doc.text(row[2], leftColumnX + 350, rowY + 6, {
      width: 90,
      align: "right",
    });
    rowY += 20;
  });

  // Draw total row
  doc.rect(leftColumnX, rowY, 450, 25).fill("#f0f0f0");
  doc.fillColor("#000000");
  doc.fontSize(12).font("Helvetica-Bold");
  doc.text("Total", leftColumnX + 10, rowY + 7);
  doc.text(`₹ ${amount}`, leftColumnX + 350, rowY + 7, {
    width: 90,
    align: "right",
  });

  // Add notes
  doc.moveDown(3);
  doc.fontSize(10).font("Helvetica-Bold").text("Notes:");
  doc
    .fontSize(9)
    .font("Helvetica")
    .text(
      "1. This is a computer generated receipt and does not require signature."
    );
  doc.text("2. Please keep this receipt for future reference.");

  // Add footer with horizontal line
  doc.moveDown(2);
  doc
    .lineCap("butt")
    .strokeColor("#999999")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();

  doc.moveDown(0.5);
  doc
    .fontSize(8)
    .font("Helvetica")
    .text("Thank you for your payment!", { align: "center" });

  doc.end();
  console.log("PDF receipt created");
}
exports.generatePdf = generatePdf;