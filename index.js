const { google } = require("googleapis");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const auth = new google.auth.GoogleAuth({
  keyFile: "./google.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function writeToSheet(values) {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1DZrPiYA2anm7pWcZc6zNsfQu-Ipj2nvxe1_if2LNqOc";
  const range = "Sheet1!A1";
  const valueInputOption = "USER_ENTERED";
  const resource = { values };

  try {
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    return res;
  } catch (err) {
    console.error("error", err);
  }
}

async function readPaymentData() {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1DZrPiYA2anm7pWcZc6zNsfQu-Ipj2nvxe1_if2LNqOc";
  const range = "PaymentDetail2425!A1:G6";
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return res.data.values;
  } catch (err) {
    console.error("error", err);
  }
}
async function readMaintenanceCharges() {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1DZrPiYA2anm7pWcZc6zNsfQu-Ipj2nvxe1_if2LNqOc";
  const range = "MaintenanceCharges2425!A1:H6";
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return res.data.values;
  } catch (err) {
    console.error("error", err);
  }
}
// (async () => {
//   const writer = await writeToSheet([
//     ["Name", "age", "Location"],
//     ["John", 25, "USA"],
//     ["Jane", 24, "UK"],
//     ["Doe", 26, "Canada"],
//     ["Smith", 27, "Australia"],
//     ["Doe", 26, "Canada"],
//     ["Smith", 27, "Australia"],
//   ]);
//   console.log("Data written to the sheet");
// })();

(async () => {
    const reader1 = await readPaymentData();
    const reader2 = await readMaintenanceCharges();
    console.log(reader1);
    console.log(reader2);
    // const doc = new PDFDocument();
    // doc.pipe(fs.createWriteStream('output.pdf'));
    // doc.font('Helvetica-Bold').fontSize(18).text('Data from the sheet', { align: 'center' });
    // doc.moveDown();
    // doc.font('Helvetica').fontSize(12);
    // reader.forEach(row => {
    //     doc.font('Helvetica-Bold').fontSize(18).text('Name : ', { continued: true }).font('Helvetica-Bold').fontSize(18).text(row[0]);
    //     doc.font('Helvetica-Bold').fontSize(18).text('Age : ', { continued: true }).font('Helvetica-Bold').fontSize(18).text(row[1]);
    //     doc.font('Helvetica-Bold').fontSize(18).text('Location : ', { continued: true }).font('Helvetica-Bold').fontSize(18).text(row[2]);
    //     doc.moveDown();

    // });
    // doc.end();

    // console.log('PDF generated');
})();
