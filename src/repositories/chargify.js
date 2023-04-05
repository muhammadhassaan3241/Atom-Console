const { default: axios } = require("axios")
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");


exports.getChargifyData = async (url, queryStrings, headers) => {
    try {

        await axios.get(`${process.env.CHARGIFY_BASE_URL}${url}${queryStrings}`, headers)
            .then(({ data }) => {
                const body = data.body;
                return body;
            })

    } catch (error) {
        const code = statusCode.someThingWentWrong;
        const message = headerMessage.someThingWentWrong;
        return { code, message };
    }
};
