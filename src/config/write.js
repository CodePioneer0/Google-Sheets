const { auth, google, config } = require("./auth");

async function updatePaymentStatus(rowIndex) {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = config.spreadsheetId;
  const range = `PaymentDetail2425!G${rowIndex}`; // Update column G for that row

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["ISSUED"]],
      },
    });
    console.log(`Status updated to ISSUED for row ${rowIndex}`);
  } catch (err) {
    console.error(`Failed to update status for row ${rowIndex}:`, err);
  }
}
exports.updatePaymentStatus = updatePaymentStatus;