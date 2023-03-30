// module
import vpnAccountManagementServices from "../services/vpn-account-management.services.js";

// VPN_MANAGEMENT_CONTROLLER
export const getVpnUserStatus = async (request, response) => {
    try {
        const username = request.body;
        await vpnAccountManagementServices.getVpnUserStatus(username, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const deleteVpnUser = async (request, response) => {
    try {
        const username = request.body;
        await vpnAccountManagementServices.deleteVpnUserStatus(username, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const renewVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.renewVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const extendExpiryOfVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.extendExpiryOfVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const changePasswordOfVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.changePasswordOfVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const enableVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.enableVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const disableVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.disableVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const createVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.createVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const updatePreferencesofVpnUser = async (request, response) => {
    try {
        const body = request.body;
        await vpnAccountManagementServices.updatePreferencesVpnUserStatus(body, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}

export const getVpnUserInventory = async (request, response) => {
    try {
        const resellerId = request.user.reseller_id;

        await vpnAccountManagementServices.getVpnUserInventory(resellerId, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
};

export const getVpnUsers = async (request, response) => {
    try {
        const resellerId = request.user.reseller_id;
        vpnAccountManagementServices.getVpnUsers(resellerId, (data, statusCode, customStatus, customMessage) => {
            return response
                .status(statusCode)
                .send({
                    status: customStatus,
                    message: customMessage,
                    data: data
                })
        })
    } catch (error) {
        return response
            .status(statusCode)
            .send({
                message: customMessage,
            })
    }
}