const fileManagerInstance = require("../repositories/file");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

module.exports = {
  protocolList: async (resellerId, callback) => {
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
        return callback(
          protocolsArray,
          statusCode.success,
          "1",
          "VPN protocol list found successfully"
        );
      }
      return callback(
        protocolsArray,
        statusCode.notFound,
        "0",
        "VPN protocol list not found"
      );
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  sourceContry: async (resellerId, callback) => {
    try {
      const sourceCountries = await fileManagerInstance.readFile(
        "getCurrentLoadwrtSources.json"
      );
      const jsonData = JSON.parse(sourceCountries);
      if ((jsonData !== null) & (jsonData !== undefined)) {
        return callback(
          jsonData.body.slice(0, 12),
          statusCode.success,
          "1",
          "VPN source country found list successfully"
        );
      }
      return callback(
        jsonData,
        statusCode.notFound,
        "0",
        "VPN source country list not found"
      );
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },

  destinationCountry: async (resellerId, callback) => {
    try {
      const destinationCountries = await fileManagerInstance.readFile(
        "getCurrentLoadwrtDestination.json"
      );
      const jsonData = JSON.parse(destinationCountries);
      if ((jsonData !== null) & (jsonData !== undefined)) {
        return callback(
          jsonData.body.slice(0, 12),
          statusCode.success,
          "1",
          "VPN destination country list found successfully"
        );
      }
      return callback(
        jsonData,
        statusCode.notFound,
        "0",
        "VPN destination country list not found"
      );
    } catch (error) {
      let code = statusCode.notFound;
      let message = headerMessage.notFound;
      return { code, message };
    }
  },
};
