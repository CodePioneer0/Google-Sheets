const { auth, google, config } = require("./auth");

async function readPaymentData() {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = config.spreadsheetId;
  const range = config.ranges.paymentData;
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
  const spreadsheetId = config.spreadsheetId;
  const range = config.ranges.maintenanceCharges;
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
exports.readPaymentData = readPaymentData;
exports.readMaintenanceCharges = readMaintenanceCharges;