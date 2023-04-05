const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const vpnAccountManagementServices = require("../services/vpn-account-management")


module.exports = {

    getVpnAccountStatus: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.getVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    createVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.createVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    deleteVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.deleteVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    renewVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.renewVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    extendExpiryOfVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.extendExpiryOfVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    updatePreferenceOfVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.updatePreferenceOfVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    changePasswordOfVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.changePasswordOfVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    enableOrDisableVpnAccount: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.enableOrDisableVpnAccount(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    getVpnUserInventory: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.getVpnUserInventory(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

    getVpnUsers: async (request, response) => {
        try {
            const resellerId = request.reseller_id;
            vpnAccountManagementServices.getVpnUsers(resellerId, (data) => {
                if (data !== undefined || data !== null) {
                    return response
                        .status(statusCode.success)
                        .json({
                            status: "1",
                            message: headerMessage.success,
                        });
                }
                else {
                    return response
                        .status(statusCode.notFound)
                        .json({
                            status: "0",
                            message: headerMessage.notFound,
                        });
                }
            })
        } catch (error) {
            return response
                .status(statusCode.someThingWentWrong)
                .json({
                    status: "0",
                    message: headerMessage.someThingWentWrong,
                });
        }
    },

};
