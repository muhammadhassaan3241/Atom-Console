const fs = require("fs")
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");


exports.getFileData = async (filePath) => {
    try {

        fs.readFile(filePath, (error, data) => {
            if (error) {
                return { code: statusCode.notFound, message: headerMessage.notFound }
            }

            return data;
        })

    } catch (error) {
        const code = statusCode.someThingWentWrong;
        const message = headerMessage.someThingWentWrong;
        return { code, message };
    }
};
