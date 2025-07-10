const { auth, google, config } = require("../config/auth");

async function testGoogleSheetsConnection() {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = config.spreadsheetId;
    
    // Simple test - get spreadsheet metadata
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    console.log("Google Sheets connected successfully!");
    console.log("Spreadsheet title:", response.data.properties.title);
    return true;
  } catch (error) {
    console.error("Google Sheets connection failed:", error.message);
    return false;
  }
}
exports.testGoogleSheetsConnection = testGoogleSheetsConnection;
