const { atomVamURL } = require("../constants/constant");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { getAccessToken } = require("../constants/redis");
const { getAtomData } = require("../repositories/atom");



module.exports = {

    getVpnAccountStatus: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const vpnAccountStatus = await getAtomData(
                atomVamURL.getVpnAccountStatus,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(vpnAccountStatus);


        } catch (error) {
            let code = statusCode.notFound;
            let message = headerMessage.notFound;
            return { code, message }
        }
    },

    deleteVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const deleteVpnAccount = await getAtomData(
                atomVamURL.deleteVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(deleteVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    renewVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const renewVpnAccount = await getAtomData(
                atomVamURL.renewVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(renewVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    createVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const createVpnAccount = await getAtomData(
                atomVamURL.createVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(createVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    extendExpiryOfVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const extendExpiryVpnAccount = await getAtomData(
                atomVamURL.extendExpiryOfVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(extendExpiryVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    changePasswordOfVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const changePasswordOfVpnAccount = await getAtomData(
                atomVamURL.changePasswordOfVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(changePasswordOfVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    updatePreferenceOfVpnAccount: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const updatePreferenceOfVpnAccount = await getAtomData(
                atomVamURL.updatePreferencesOfVpnAccount,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(updatePreferenceOfVpnAccount);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    enableOrDisableVpnAccount: async (resellerId, formData, callback) => {
        try {

            if (formData.action === "enable") {
                const accessToken = await getAccessToken(resellerId);
                const enableVpnAccount = await getAtomData(
                    atomVamURL.enableVpnAccount,
                    "?",
                    formData,
                    {
                        "Content-Type": "application/json",
                        "X-AccessToken": accessToken,
                    }
                );

                return callback(enableVpnAccount);
            }
            else if (formData.action === "disable") {
                const accessToken = await getAccessToken(resellerId);
                const disableVpnAccount = await getAtomData(
                    atomVamURL.disableVpnAccount,
                    "?",
                    formData,
                    {
                        "Content-Type": "application/json",
                        "X-AccessToken": accessToken,
                    }
                );

                return callback(disableVpnAccount);
            }


        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    getVpnUserInventory: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const userInventory = await getAtomData(
                atomVamURL.getUserInventory,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(userInventory);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    getVpnUsers: async (resellerId, formData, callback) => {
        try {

            const accessToken = await getAccessToken(resellerId);
            const vpnUsers = await getAtomData(
                atomVamURL.getUsers,
                "?",
                formData,
                {
                    "Content-Type": "application/json",
                    "X-AccessToken": accessToken,
                }
            );

            return callback(vpnUsers);

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

}