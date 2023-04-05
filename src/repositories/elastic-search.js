const { default: axios } = require("axios")
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");


exports.getElasticSearchData = async (url, queryString, headers) => {
    try {

        await axios.get(`${process.env.ELASTIC_SEARCH_BASE_URL}${url}${queryString}`, headers)
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
