const { elasticSearchURL } = require("../constants/constant");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { dateFormatter } = require("../helpers/dateFormatter");
const { getElasticSearchData } = require("../repositories/elastic-search");
const { getFileData } = require("../repositories/file");


module.exports = {

    getMonthlyVpnConnectedUsers: async (resellerId, callback) => {
        try {
            const today = new Date();

            const firstAndCurrentDayOfCurrentMonth = dateFormatter(today);
            const firstDay = firstAndCurrentDayOfCurrentMonth.formattedFirstDay;
            const currentDay = firstAndCurrentDayOfCurrentMonth.formattedCurrentDay;

            const { resellerConnectedUsers } = await getElasticSearchData(
                elasticSearchURL.getResellerConnectedUsers,
                `?IResellerId=${641}&sFromDate=${firstDay}&sToDate=${currentDay}`,
                { "Content-Type": "application/json" },
            );

            return callback(resellerConnectedUsers)

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    getProtocolList: async (resellerId, callback) => {
        try {

            const protocols = [];
            const protocolData = getFileData("connectedProtocolWise.json");
            const jsonData = JSON.parse(protocolData);
            jsonData.body.filter((list) => {
                body.push({
                    tunnel_name: list.TunnelTypeName,
                    total_unique_users: list.TotalUniqueUsers,
                    total_users: list.TotalUsers,
                });
            });
            return callback(protocols);

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    getSourceContry: async (resellerId, callback) => {
        try {

            const sourceCountryData = getFileData("getCurrentLoadwrtSources.json");
            const jsonData = JSON.parse(sourceCountryData);
            return callback(jsonData.body.slice(0, 12));

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    getDestinationCountry: async (resellerId, callback) => {
        try {

            const destinationCountryData = getFileData("getCurrentLoadwrtDestination.json");
            const jsonData = JSON.parse(destinationCountryData);
            return callback(jsonData.body.slice(0, 12))

        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },
}