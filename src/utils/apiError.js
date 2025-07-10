/**
 * Logs API error information to the console in a detailed way.
 * @param {string} message - Error message to log.
 * @param {number} [status=500] - HTTP status code.
 * @param {object} [details] - Additional error details.
 */
function apiError(message, status = 500, details) {
    console.log('--- API ERROR ---');
    console.log('Message:', message);
    console.log('Status:', status);
    if (details) {
        console.log('Details:', JSON.stringify(details, null, 2));
    }
    console.log('-----------------');
}

module.exports = apiError;