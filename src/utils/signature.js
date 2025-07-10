const crypto = require('crypto');

/**
 * Generate digital signature for receipt data
 * @param {Object} receiptData - Receipt information
 * @returns {string} - Digital signature hash
 */
function generateDigitalSignature(receiptData) {
  const { flatno, amount, date, type, mode } = receiptData;
  
  // Create data string to sign
  const dataToSign = `${flatno}-${amount}-${date}-${type}-${mode}`;
  
  // Get secret key from environment or use default
  const secretKey = process.env.SIGNATURE_SECRET || 'HousingSociety2025SecretKey';
  
  // Generate HMAC SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataToSign)
    .digest('hex');
    
  // Return first 16 characters for display
  return signature.substring(0, 16).toUpperCase();
}

/**
 * Verify digital signature
 * @param {Object} receiptData - Receipt information
 * @param {string} providedSignature - Signature to verify
 * @returns {boolean} - True if signature is valid
 */
function verifySignature(receiptData, providedSignature) {
  const expectedSignature = generateDigitalSignature(receiptData);
  return expectedSignature === providedSignature;
}

/**
 * Generate receipt ID with timestamp
 * @returns {string} - Unique receipt ID
 */
function generateReceiptId() {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HS-${timestamp.slice(-6)}-${randomPart}`;
}

module.exports = {
  generateDigitalSignature,
  verifySignature,
  generateReceiptId
};
