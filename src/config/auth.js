require('dotenv').config();
const { google } = require("googleapis");

// Create authentication instance
const auth = new google.auth.GoogleAuth({
  keyFile: "./google.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Google Sheets configuration
const config = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  ranges: {
    paymentData: `${process.env.PAYMENT_SHEET}!A1:G82`,
    maintenanceCharges: `${process.env.MAINTENANCE_SHEET}!A1:H35`
  }
};

module.exports = {
  auth,
  google,
  config
};
