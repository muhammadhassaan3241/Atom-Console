exports.restResponse = (response, code, headerMessage, body) => {
    if (code !== 200 && code !== 400 && 401 !== 403 && code !== 500) {
        code = 404
    }
    return response
        .status(code)
        .json({
            header: {
                message: headerMessage,
                code: code,
            },
            data: body,
        })
}