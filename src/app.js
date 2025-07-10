const { createReceipt } = require("./services/receipt");
const { testGoogleSheetsConnection } = require("./db");
const apiError = require("./utils/apiError");
const apiResponse = require("./utils/apiResponse");
(async () => {
  const isConnected = await testGoogleSheetsConnection();
  if (isConnected) {
    await createReceipt();
    apiResponse("Receipts created successfully.");
  } else {
    apiError("Failed to connect to Google Sheets.")
  }
})();