// package
import axios from "axios";
import { getAccessToken } from "../helper/access-token.js";

// VPN_ACCOUNT_MANAGEMENT_SERVICES

// create vpn user
export default {
    getVpnUserStatus: async (username, resellerId, callback) => {
        try {
            const formData = username;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            console.log(formData);
            await axios.post(`${process.env.VAM_BASE_URL}/status`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "VPN Account Not Found")
                    } else {
                        callback(body, 200, "1", "VPN Account Status Fetched Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    deleteVpnUser: async (username, resellerId, callback) => {
        try {
            const formData = username;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/delete`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "VPN User Not Found")
                    } else {
                        callback(body, 200, "1", "VPN User Deleted Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    renewVpnUser: async (body, resellerId, callback) => {
        try {
            const formData = body;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }

            await axios.post(`${process.env.VAM_BASE_URL}/renew`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "You Can Renew Account When 10 or Less Days Are Remaining")
                    } else {
                        callback(body, 200, "1", "VPN Account Renewed Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    extendExpiryOfVpnUser: async (username, resellerId, callback) => {
        try {
            const formData = username;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/extendExpiry`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "VPN Account Not Found")
                    } else {
                        callback(body, 200, "1", "VPN Account Expiry Date Extended Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    changePasswordOfVpnUser: async (body, resellerId, callback) => {
        try {
            const formData = body;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/changePassword`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "VPN Account Not Found")
                    } else {
                        callback(body, 200, "1", "VPN Account Password Changed Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    enable_disableVpnUser: async (body, action, resellerId, callback) => {
        try {
            const formData = body;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            if (action === "enable") {
                await axios.post(`${process.env.VAM_BASE_URL}/enable`, formData, headers)
                    .then(({ data }) => {
                        const body = data.body;
                        if (Object.keys(body).length === 0) {
                            callback(body, 404, "0", "VPN Account Not Found")
                        } else {
                            callback(body, 200, "1", "VPN Account Enabled Successfully")
                        }
                    })
            }
            else if (action === "disable") {
                await axios.post(`${process.env.VAM_BASE_URL}/disable`, formData, headers)
                    .then(({ data }) => {
                        const body = data.body;
                        if (Object.keys(body).length === 0) {
                            callback(body, 404, "0", "VPN Account Not Found")
                        } else {
                            callback(body, 200, "1", "VPN Account Disabled Successfully")
                        }
                    })
            }

        } catch (error) {

        }
    },

    createVpnUser: async (body, resellerId, callback) => {
        try {
            console.log(resellerId);
            let concurrentUser, sessionLimit, countries, cities, protocols;
            const accessToken = await getAccessToken(resellerId);
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.get(`${process.env.INVENTORY_BASE_URL}/getAllServiceTypes`, headers)
                .then(async ({ data }) => {
                    data.body.map((service) => {
                        if (service.serviceKey === "session_limit") {
                            sessionLimit = service.serviceId
                        }
                        if (service.serviceKey === "concurrent_users") {
                            concurrentUser = service.serviceId
                        }
                        if (service.serviceKey === "protocol") {
                            protocols = service.serviceId
                        }
                        if (service.serviceKey === "country") {
                            countries = service.serviceId
                        }
                        if (service.serviceKey === "city") {
                            cities = service.serviceId
                        }
                    });

                    const preference = {
                        [sessionLimit]: body.session_limit,
                        [concurrentUser]: body.concurrent_user,
                        [countries]: body.countries,
                        [cities]: body.cities,
                        [protocols]: body.protocols,
                    }

                    const formData = {
                        vpnUsername: body.vpnUsername,
                        vpnPassword: body.vpnPassword,
                        packageType: body.packageType,
                        period: body.period,
                        uuid: body.uuid,
                        preference,
                    }
                    await axios.post(`${process.env.VAM_BASE_URL}/create`, formData, headers)
                        .then(({ data }) => {
                            const body = data.body;
                            if (Object.keys(body).length === 0) {
                                callback(body, 404, "0", "VPN Account Not Created")
                            } else {
                                callback(body, 200, "1", "VPN Account Created Successfully")
                            }
                        })
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    updatePreferencesVpnUser: async (body, resellerId, callback) => {
        try {
            const formData = body;
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/updatePreferences`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "There Is An Error In Updating Preference")
                    } else {
                        callback(body, 200, "1", "VPN Account Preference Updated Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    getVpnUserInventory: async (resellerId, callback) => {
        try {
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.get(`${process.env.INVENTORY_BASE_URL}/getResellerInventory?iId=${resellerId}`, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "There Is An Error In Getting Inventory")
                    } else {
                        callback(body, 200, "1", "VPN Account Inventory Found Successfully")
                    }
                })
            return
        } catch (error) {
            return
        }
    },

    getVpnUsers: async (resellerId, callback) => {
        try {
            const accessToken = await getAccessToken(resellerId)
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            }
            await axios.get(`${process.env.VAP_BASE_URL}/listUsers?iResellerId=${resellerId}&Page=1`, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body.data, 404, "0", "VPN Account Users Not Found")
                    } else {
                        callback(body.data, 200, "1", "VPN Account Users Found Successfully")
                    }
                })

            return
        } catch (error) {
            return callback([], 500, "0", "VPN Account Users Found Successfully")
        }
    }
}