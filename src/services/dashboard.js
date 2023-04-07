const elasticSearchInstance = require("../repositories/elastic-search");
const fileManagerInstance = require("../repositories/file");
const { dateFormatter } = require("../helpers/dateFormatter");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

module.exports = {
  getMonthlyVpnConnectedUsers: async (resellerId, callback) => {
    try {
      const today = new Date();
      const firstAndCurrentDayOfCurrentMonth = dateFormatter(today);
      const firstDay = firstAndCurrentDayOfCurrentMonth.formattedFirstDay;
      const currentDay = firstAndCurrentDayOfCurrentMonth.formattedCurrentDay;
      const resellerConnectedUsersList =
        await elasticSearchInstance.getResellerConnectedUsersList(
          `?IResellerId=${resellerId}&sFromDate=${firstDay}&sToDate=${currentDay}`,
          { "Content-Type": "application/json" }
        );
      if (!resellerConnectedUsersList) {
        return callback([], "1", "Monthly VPN Connected Not Found");
      }
      return callback(
        resellerConnectedUsersList,
        "1",
        "Monthly VPN Connected User Found Successfully"
      );
    } catch (error) {
      let code = statusCode.someThingWentWrong;
      let message = headerMessage.someThingWentWrong;
      return { code, message };
    }
  },

  getProtocolList: async (resellerId, callback) => {
    try {
      const protocolsArray = [];
      const protocols = await fileManagerInstance.readFile(
        "connectedProtocolWise.json"
      );
      if ((protocols !== null) & (protocols !== undefined)) {
        const jsonData = JSON.parse(protocols);
        jsonData.body.map(async (list) => {
          protocolsArray.push({
            tunnel_name: list.TunnelTypeName,
            total_unique_users: list.TotalUniqueUsers,
            total_users: list.TotalUsers,
          });
        });
        return callback(protocolsArray);
      }
      return callback(protocolsArray);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getSourceContry: async (resellerId, callback) => {
    try {
      const sourceCountries = await fileManagerInstance.readFile(
        "getCurrentLoadwrtSources.json"
      );
      const jsonData = JSON.parse(sourceCountries);
      if ((jsonData !== null) & (jsonData !== undefined)) {
        return callback(jsonData.body.slice(0, 12));
      }
      return callback(jsonData);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  getDestinationCountry: async (resellerId, callback) => {
    try {
      const destinationCountries = await fileManagerInstance.readFile(
        "getCurrentLoadwrtDestination.json"
      );
      const jsonData = JSON.parse(destinationCountries);
      if ((jsonData !== null) & (jsonData !== undefined)) {
        return callback(jsonData.body.slice(0, 12));
      }
      return callback(jsonData);
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
