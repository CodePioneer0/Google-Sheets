/**
 * Utility function for standard API success response.
 */
function successResponse(data = {}, message = 'Success', statusCode = 200) {
    const response = {
        status: 'success',
        statusCode,
        message,
        data,
    };
    console.log(response);
    return response;
}

module.exports = successResponse;
