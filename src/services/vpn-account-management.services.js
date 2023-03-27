// package
import axios from "axios"

// VPN_ACCOUNT_MANAGEMENT_SERVICES

// create vpn user
export default {
    getVpnUserStatus: async (username, callback) => {
        try {
            const formData = username;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/status`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Status Found Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    deleteVpnUserStatus: async (username, callback) => {
        try {
            const formData = username;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/delete`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Deleted Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    renewVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }

            await axios.post(`${process.env.VAM_BASE_URL}/renew`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "You Can Renew Account When 10 or Less Days Are Remaining")
                    } else {
                        callback(body, 200, "1", "Vpn User Account Renewed Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    extendExpiryOfVpnUserStatus: async (username, callback) => {
        try {
            const formData = username;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/extendExpiry`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Expiry Date Extended Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    changePasswordOfVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/changePassword`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Password Changed Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    enableVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/enable`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Enabled Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    disableVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/disable`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "User Not Found")
                    } else {
                        callback(body, 200, "1", "Vpn User Disabled Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    createVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;

            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/create`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "Invalid Data")
                    } else {
                        callback(body, 200, "1", "Vpn User Created Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    updatePreferencesVpnUserStatus: async (body, callback) => {
        try {
            const formData = body;
            const headers = {
                headers:
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": process.env.VAP_ACCESS_TOKEN,
                }
            }
            await axios.post(`${process.env.VAM_BASE_URL}/updatePreferences`, formData, headers)
                .then(({ data }) => {
                    const body = data.body;
                    if (Object.keys(body).length === 0) {
                        callback(body, 404, "0", "There Is An Error In updating Preference")
                    } else {
                        callback(body, 200, "1", "Vpn User Preference Updated Successfully")
                    }
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },
}