const { default: axios } = require("axios")

exports.getAtomData = async (url, queryString, formData, headers) => {
    try {

        await axios.post(`${process.env.ATOM_BASE_URL}${url}${queryString}`, formData, headers)
            .then(({ data }) => {
                const body = data.body;
                return body;
            })

    } catch (error) {
        const code = statusCode.someThingWentWrong;
        const message = headerMessage.someThingWentWrong;
        return { code, message }
    }
};
