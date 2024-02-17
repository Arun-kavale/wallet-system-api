function handleError(e, res) {
    console.error(e);

    if (e) {
        let statusCode = 500; // Default to Internal Server Error

        if (e instanceof Error) {
            if (e.name === 'ValidationError') {
                statusCode = 400; // Bad Request
            } else if (e.name === 'UnauthorizedError') {
                statusCode = 401; // Unauthorized
            } else if (e.name === 'NotFoundError') {
                statusCode = 404; // Not Found
            }

            res.status(statusCode).send({
                'statusCode': statusCode,
                'message': e.message
            });
        } else if (e.errors instanceof Object) {
            // Handle cases where errors object is present
            const keysOfObject = Object.keys(e.errors);
            res.status(400).send({
                'statusCode': 400,
                'message': e.errors[keysOfObject[0]].message
            });
        } else {
            // Handle generic error cases
            res.status(statusCode).send({
                'statusCode': statusCode,
                'message': "Something went wrong"
            });
        }
    } else {
        res.status(500).send({
            'statusCode': 500,
            'message': "Internal Server Error"
        });
    }
}

module.exports = handleError;
