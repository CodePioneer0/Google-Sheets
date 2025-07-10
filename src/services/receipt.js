const { readPaymentData, readMaintenanceCharges } = require("../config/read");
const { updatePaymentStatus } = require("../config/write");
const { generatePdf } = require("./pdf");
const { sendReceiptEmail } = require("./email");
const { generateReceiptId, generateDigitalSignature } = require("../utils/signature");

async function createReceipt() {
  const reader1 = await readPaymentData();
  const reader2 = await readMaintenanceCharges();
  
  let flatno, name, date, amount, type, mode, mail;
  for (let i = 2; i < reader2.length; i++) {
    flatno = reader2[i][0];
    name = reader2[i][1];
    mail = reader2[i][2].toString();
    let rowNo = 0;
    reader1.forEach((row) => {
      rowNo++;
      if (row[3] == flatno && row[6] == "TO-ISSUE") {
        date = row[0];
        amount = row[5];
        type = row[4];
        mode = row[2];
        
        generatePdf(flatno, name, date, amount, type, mode);
        updatePaymentStatus(rowNo);
        
        const residentData = {
          name: name,
          flatno: flatno,
          email: mail
        };
        
        const receiptData = {
          amount: amount,
          date: date,
          type: type,
          mode: mode,
          receiptId: generateReceiptId(),
          digitalSignature: generateDigitalSignature({ flatno, amount, date, type, mode })
        };
        
        const attachments = [{ 
          filename: `${name}.pdf`, 
          path: `./outputs/${name}.pdf` 
        }];
        
        sendReceiptEmail(residentData, receiptData, attachments);
      }
    });
  }
}
exports.createReceipt = createReceipt;